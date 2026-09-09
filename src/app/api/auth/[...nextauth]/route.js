import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { DBConnection } from "@/lib/db";
import User from "@/models/user";
import LoginAttempt from "@/models/LoginAttempt";

const MAX_ATTEMPTS = 5;
const LOCK_MINUTES = 15;

export const authOptions = {
  session: { strategy: "jwt" },
  providers: [
    CredentialsProvider({
      async authorize(credentials) {
        await DBConnection();

        const email = credentials.email?.toLowerCase().trim();

        // Check if this email is currently locked out
        const attempt = await LoginAttempt.findOne({ email });
        if (attempt?.blockedUntil && attempt.blockedUntil > new Date()) {
          const minsLeft = Math.ceil((attempt.blockedUntil - new Date()) / 60000);
          throw new Error(
            `Too many failed attempts. Try again in ${minsLeft} minute(s).`
          );
        }

        const user = await User.findOne({ email });
        const isValid =
          user && (await bcrypt.compare(credentials.password, user.password));

        if (!isValid) {
          // Increment failed attempt counter
          const updated = await LoginAttempt.findOneAndUpdate(
            { email },
            { $inc: { attempts: 1 }, $set: { lastAttempt: new Date() } },
            { upsert: true, new: true }
          );

          // Lock after MAX_ATTEMPTS failures
          if (updated.attempts >= MAX_ATTEMPTS) {
            await LoginAttempt.updateOne(
              { email },
              {
                $set: {
                  blockedUntil: new Date(
                    Date.now() + LOCK_MINUTES * 60 * 1000
                  ),
                },
              }
            );
          }

          return null;
        }

        // Successful login — clear the attempt record
        await LoginAttempt.deleteOne({ email });

        return {
          id: user._id.toString(),
          name: user.name,
          email: user.email,
          role: user.role,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) token.role = user.role;
      return token;
    },
    async session({ session, token }) {
      session.user.role = token.role;
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);

/**
 * Next.js 16 made ctx.params a Promise. next-auth v4 reads params.nextauth
 * synchronously, which causes a silent crash → 404.
 * Fix: await params first, then pass a reconstructed context to the handler.
 */
async function authHandler(req, ctx) {
  const params = await ctx.params;
  return handler(req, { ...ctx, params });
}

export { authHandler as GET, authHandler as POST };

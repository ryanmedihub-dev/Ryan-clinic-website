import { getToken } from "next-auth/jwt";

export const dynamic = "force-dynamic";

export async function GET(req) {
  const cookieNames = req.cookies.getAll().map((c) => c.name);

  let token = null;
  let tokenError = null;
  try {
    token = await getToken({
      req,
      secret: process.env.NEXTAUTH_SECRET,
      secureCookie: true,
    });
  } catch (e) {
    tokenError = e.message;
  }

  let tokenNonSecure = null;
  try {
    tokenNonSecure = await getToken({
      req,
      secret: process.env.NEXTAUTH_SECRET,
      secureCookie: false,
    });
  } catch (e) {}

  return Response.json({
    cookieNames,
    nextauthUrl: process.env.NEXTAUTH_URL || "NOT SET",
    hasSecret: !!process.env.NEXTAUTH_SECRET,
    secretLength: process.env.NEXTAUTH_SECRET?.length || 0,
    hasMongoUrl: !!process.env.MONGO_URL,
    tokenFoundSecure: !!token,
    tokenFoundNonSecure: !!tokenNonSecure,
    tokenError,
    deployment: process.env.VERCEL_DEPLOYMENT_ID || process.env.VERCEL_URL,
  });
}
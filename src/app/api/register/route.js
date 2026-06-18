import { DBConnection } from "@/lib/db";
import User from "@/models/user";
import bcrypt from "bcryptjs";
import { requireAdmin } from "@/lib/requireAdmin";

export async function POST(req) {
  const authError = await requireAdmin();
  if (authError) return authError;

  try {
    const { name, email, password } = await req.json();

    await DBConnection();

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return new Response(JSON.stringify({ error: "User already exists" }), { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    return new Response(JSON.stringify({ message: "User registered successfully" }), { status: 201 });
  } catch (error) {
    console.error("Registration error:", error);
    return new Response(JSON.stringify({ error: "Something went wrong" }), { status: 500 });
  }
}

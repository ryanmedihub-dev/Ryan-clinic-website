import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import AppliedSubmissionsDashboard from "./AppliedSubmissionsDashboard";

export const dynamic = "force-dynamic";

export default async function AppliedSubmissionsPage() {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    redirect("/login?callbackUrl=%2Fapplied-submissions");
  }

  if (session.user.role !== "admin") {
    redirect("/login?error=AccessDenied");
  }

  return <AppliedSubmissionsDashboard />;
}

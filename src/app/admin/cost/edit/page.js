"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function EditPageRedirect() {
  const router = useRouter();
  useEffect(() => {
    router.replace("/admin/cost");
  }, [router]);

  return null;
}

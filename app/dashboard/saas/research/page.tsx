"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function ResearchRedirect() {
  const router = useRouter();
  useEffect(() => {
    router.replace("/dashboard");
  }, [router]);

  return (
    <div className="flex items-center justify-center h-96">
      <p className="text-slate-400 animate-pulse">Redirecting to Smart Research Engine...</p>
    </div>
  );
}

"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { PageLoader } from "@/shared/components/SharedComponents";

export default function DashboardRedirect() {
  const router = useRouter();
  
  useEffect(() => {
    router.replace("/dashboard/saas");
  }, [router]);

  return <PageLoader message="Loading SaaS Command Hub..." />;
}

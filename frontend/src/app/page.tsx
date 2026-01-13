"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/use-auth";

export default function Home() {
  const { isAuthenticated, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading) {
      if (isAuthenticated) {
        router.push("/todos");
      } else {
        router.push("/login");
      }
    }
  }, [isLoading, isAuthenticated, router]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <p>読み込み中...</p>
    </div>
  );
}

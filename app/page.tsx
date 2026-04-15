"use client";
import { useUser, useClerk } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Page() {
  const { user, isLoaded } = useUser();
  const { redirectToSignIn } = useClerk();
  const router = useRouter();

  useEffect(() => {
    if (!isLoaded) return;

    if (user) {
      router.push("/dashboard/home");
    } else {
      redirectToSignIn();
    }
  }, [isLoaded, user, router]);

  if (!isLoaded) return null;

  return <div className="w-full h-screen"></div>;
}

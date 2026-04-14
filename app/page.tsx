"use client";

import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Page() {
  const { user, isLoaded } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (isLoaded && user) { 
      router.push("/dashboard/home");
    }
  }, [isLoaded, user, router]);

  if (!isLoaded) return null;

  console.log(user);
  console.log("user id:", user?.id);
  console.log(user?.emailAddresses);
  console.log(user?.fullName);

  return <div className="container"></div>;
}

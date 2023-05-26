"use client";
import Home from "@/containers/Home";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function HomePage() {
  const router = useRouter();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("userDetails")!);
    if (user) {
      router.push("/chats");
    }
  }, [router]);

  return <Home />;
}

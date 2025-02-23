"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function AcceptInvitePage() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const router = useRouter();
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (!token) {
      setMessage("Invalid or missing invitation token.");
      return;
    }

    const acceptInvite = async () => {
      const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
      const res = await fetch(`${API_URL}/teams/accept-invite`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token }),
      });

      const data = await res.json();
      if (res.ok) {
        setMessage("Successfully joined the team! Redirecting to password setup...");
        setTimeout(() => router.push(`/set-password?userId=${data.userId}`), 2000);
      } else {
        setMessage(data.error || "Failed to accept invitation.");
      }
    };

    acceptInvite();
  }, [token, router]);

  return (
    <div className="h-screen flex items-center justify-center">
      <div className="p-6 bg-white shadow-md rounded">{message}</div>
    </div>
  );
}

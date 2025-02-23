"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useState } from "react";

export default function SetPasswordPage() {
  const searchParams = useSearchParams();
  const userId = searchParams.get("userId");
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSetPassword = async () => {
    if (password !== confirmPassword) {
      setMessage("Passwords do not match.");
      return;
    }

    const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

    const res = await fetch(`${API_URL}/auth/set-password`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId, password }),
    });

    if (res.ok) {
      setMessage("Password set successfully! Redirecting to login...");
      setTimeout(() => router.push("/login"), 2000);
    } else {
      setMessage("Failed to set password. Please try again.");
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gray-100">
      <div className="p-6 bg-white shadow-md rounded">
        <h2 className="text-2xl font-bold mb-4">Set Your Password</h2>
        <input
          type="password"
          className="w-full p-2 border mb-3"
          placeholder="Enter new password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          type="password"
          className="w-full p-2 border mb-3"
          placeholder="Confirm password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <button onClick={handleSetPassword} className="w-full bg-blue-500 text-white p-2 rounded">
          Set Password
        </button>
        {message && <p className="mt-2 text-red-500">{message}</p>}
      </div>
    </div>
  );
}

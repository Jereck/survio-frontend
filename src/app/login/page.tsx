"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useState } from "react";

export default function SignupPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const plan = searchParams.get("plan") || "free_monthly"; // Default to Free plan

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignup = async () => {
    setLoading(true);
    setError("");

    const res = await fetch("http://localhost:5000/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password, subscription_plan: plan }),
    });

    const data = await res.json();

    if (res.ok) {
      // Redirect to checkout with user_id
      localStorage.setItem("token", data.token);

      router.push(`/checkout?user_id=${data.user.id}&plan=${plan}&token=${data.token}`);
    } else {
      setError(data.message || "Signup failed");
      setLoading(false);
    }
  };

  return (
    <div className="h-screen flex items-center justify-center">
      <div className="p-6 bg-white shadow-md rounded w-96">
        <h2 className="text-xl font-bold mb-4">Sign Up</h2>
        {error && <p className="text-red-500">{error}</p>}
        <input
          type="email"
          placeholder="Email"
          className="w-full border p-2 rounded mb-2"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full border p-2 rounded mb-2"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          onClick={handleSignup}
          disabled={loading}
          className="w-full bg-blue-500 text-white px-4 py-2 rounded"
        >
          {loading ? "Signing Up..." : "Continue"}
        </button>
      </div>
    </div>
  );
}

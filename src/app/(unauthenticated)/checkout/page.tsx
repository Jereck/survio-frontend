"use client";

import { useSearchParams } from "next/navigation";
import { useEffect } from "react";

export default function CheckoutPage() {
  const searchParams = useSearchParams();
  const userId = searchParams.get("user_id");
  const plan = searchParams.get("plan") || "free_monthly";
  // const [loading, setLoading] = useState(true);

  useEffect(() => {
    const startCheckout = async () => {
      if (!userId) return;

      const token = searchParams.get("token") || localStorage.getItem("token");
      
      const res = await fetch("http://localhost:5000/payments/create-checkout-session", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify({ user_id: userId, lookup_key: plan }),
      });

      const data = await res.json();
      if (data.url) window.location.href = data.url;
    };

    startCheckout();
  }, [userId, plan, searchParams]);

  return (
    <div className="h-screen flex items-center justify-center">
      <p className="text-xl">Redirecting to checkout...</p>
    </div>
  );
}

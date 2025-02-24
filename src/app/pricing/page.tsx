"use client";

const plans = [
  { name: "Free", price: "$0", features: ["2 Team Members", "Limited Surveys"], lookup_key: "free_monthly" },
  { name: "Hobbyist", price: "$10/month", features: ["More Surveys", "More Team Members"], lookup_key: "hobby_monthly" },
  { name: "Pro", price: "$50/month", features: ["Unlimited Everything"], lookup_key: "pro_monthly" },
];

export default function PricingPage() {
  const handleSubscription = async (lookupKey: string) => {
    try {
      const res = await fetch("http://localhost:5000/payments/create-checkout-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ lookup_key: lookupKey }),
      });

      const data = await res.json();
      if (data.url) window.location.href = data.url;
    } catch (error) {
      console.error("Failed to create checkout session:", error);
    }
  };

  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold text-center mb-6">Choose a Plan</h1>
      <div className="grid grid-cols-4 gap-6">
        {plans.map((plan) => (
          <div key={plan.name} className="border p-6 rounded shadow">
            <h2 className="text-xl font-bold">{plan.name}</h2>
            <p className="text-lg">{plan.price}</p>
            <ul className="mt-2">
              {plan.features.map((feature, i) => (
                <li key={i} className="text-sm">✅ {feature}</li>
              ))}
            </ul>
            {plan.lookup_key && (
              <button
                onClick={() => handleSubscription(plan.lookup_key)}
                className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
              >
                Subscribe
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

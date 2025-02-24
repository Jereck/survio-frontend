"use client"

import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Check, X } from "lucide-react"

const plans = [
  {
    name: "Free",
    price: "$0",
    description: "Perfect for trying out Survur.io",
    features: {
      included: ["2 Team Members", "3 Active Surveys", "Basic Analytics", "Email Support"],
      notIncluded: ["Custom Branding", "Advanced Analytics", "Priority Support", "API Access"],
    },
    lookup_key: "free_monthly",
    popular: false,
  },
  {
    name: "Hobbyist",
    price: "$10",
    description: "Great for indie developers and small teams",
    features: {
      included: ["5 Team Members", "10 Active Surveys", "Basic Analytics", "Email Support", "Custom Branding"],
      notIncluded: ["Advanced Analytics", "Priority Support", "API Access"],
    },
    lookup_key: "hobby_monthly",
    popular: true,
  },
  {
    name: "Pro",
    price: "$50",
    description: "For professional teams and organizations",
    features: {
      included: [
        "Unlimited Team Members",
        "Unlimited Surveys",
        "Advanced Analytics",
        "Priority Support",
        "Custom Branding",
        "API Access",
      ],
      notIncluded: [],
    },
    lookup_key: "pro_monthly",
    popular: false,
  },
]

export default function PricingPage() {
  const router = useRouter()

  const handleSelectPlan = (lookupKey: string) => {
    router.push(`/login?plan=${lookupKey}`)
  }

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="text-center space-y-4 mb-16">
        <h1 className="text-4xl font-bold tracking-tight">Simple, Transparent Pricing</h1>
        <p className="text-xl text-muted-foreground max-w-[600px] mx-auto">
          Choose the perfect plan for your needs. All plans include a 14-day free trial.
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {plans.map((plan) => (
          <Card
            key={plan.name}
            className={`relative flex flex-col ${plan.popular ? "border-primary shadow-lg scale-105" : ""}`}
          >
            {plan.popular && (
              <Badge className="absolute -top-3 left-1/2 -translate-x-1/2" variant="secondary">
                Most Popular
              </Badge>
            )}
            <CardHeader>
              <CardTitle>
                <div className="flex items-baseline justify-between">
                  <span>{plan.name}</span>
                  <div className="flex items-baseline">
                    <span className="text-2xl font-bold">{plan.price}</span>
                    {plan.price !== "$0" && <span className="text-muted-foreground ml-1">/month</span>}
                  </div>
                </div>
              </CardTitle>
              <CardDescription>{plan.description}</CardDescription>
            </CardHeader>
            <CardContent className="flex-grow">
              <div className="space-y-4">
                {plan.features.included.map((feature) => (
                  <div key={feature} className="flex items-center">
                    <Check className="h-4 w-4 text-primary mr-2" />
                    <span>{feature}</span>
                  </div>
                ))}
                {plan.features.notIncluded.map((feature) => (
                  <div key={feature} className="flex items-center text-muted-foreground">
                    <X className="h-4 w-4 mr-2" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <Button
                className="w-full"
                variant={plan.popular ? "default" : "outline"}
                onClick={() => handleSelectPlan(plan.lookup_key)}
              >
                {plan.price === "$0" ? "Get Started" : "Start Free Trial"}
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      <div className="mt-16 text-center space-y-4">
        <h2 className="text-2xl font-bold">Need something different?</h2>
        <p className="text-muted-foreground max-w-[600px] mx-auto">
          Contact us for custom pricing options for larger teams and special requirements.
        </p>
        <Button variant="outline" size="lg">
          Contact Sales
        </Button>
      </div>

      <div className="mt-16 border-t pt-16">
        <div className="grid md:grid-cols-3 gap-8 text-center">
          <div className="space-y-2">
            <h3 className="font-semibold">14-Day Free Trial</h3>
            <p className="text-sm text-muted-foreground">Try any plan risk-free for 14 days</p>
          </div>
          <div className="space-y-2">
            <h3 className="font-semibold">No Credit Card Required</h3>
            <p className="text-sm text-muted-foreground">Get started immediately, no credit card needed</p>
          </div>
          <div className="space-y-2">
            <h3 className="font-semibold">Cancel Anytime</h3>
            <p className="text-sm text-muted-foreground">No long-term contracts, cancel when you want</p>
          </div>
        </div>
      </div>
    </div>
  )
}


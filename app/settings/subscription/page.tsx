"use client"

import { Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { useSubscription } from "@/providers/subscription-provider"

const tiers = [
  {
    name: "Free",
    price: "$0",
    description: "Perfect for getting started",
    features: ["1 Job Board", "5 Job Applications per month", "Basic CV template", "Basic Cover Letter template"],
  },
  {
    name: "Pro",
    price: "$9.99",
    description: "Best for active job seekers",
    features: [
      "Unlimited Job Boards",
      "Unlimited Job Applications",
      "Premium CV templates",
      "Premium Cover Letter templates",
      "AI-powered job matching",
      "Priority support",
    ],
  },
  {
    name: "Enterprise",
    price: "$29.99",
    description: "For teams and organizations",
    features: [
      "Everything in Pro",
      "Team collaboration",
      "Custom templates",
      "API access",
      "Dedicated account manager",
      "Custom integrations",
    ],
  },
]

export default function SubscriptionPage() {
  const { subscription, isLoading } = useSubscription()

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Subscription Plan</h3>
        <p className="text-sm text-muted-foreground">Choose the perfect plan for your needs</p>
      </div>
      <div className="grid gap-6 lg:grid-cols-3">
        {tiers.map((tier) => (
          <Card key={tier.name} className={tier.name === subscription?.plan ? "border-primary" : ""}>
            <CardHeader>
              <CardTitle>{tier.name}</CardTitle>
              <CardDescription>{tier.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{tier.price}</div>
              <p className="text-sm text-muted-foreground">per month</p>
              <ul className="mt-4 space-y-2">
                {tier.features.map((feature) => (
                  <li key={feature} className="flex items-center text-sm">
                    <Check className="mr-2 h-4 w-4 text-primary" />
                    {feature}
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter>
              <Button className="w-full" variant={tier.name === subscription?.plan ? "outline" : "default"}>
                {tier.name === subscription?.plan ? "Current Plan" : "Upgrade"}
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}


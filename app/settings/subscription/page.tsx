
"use client"

import { useState } from "react"
import { Check, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { useSubscription } from "@/providers/subscription-provider"
import { useToast } from "@/hooks/use-toast"

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
  const [showCancelDialog, setShowCancelDialog] = useState(false)
  const { toast } = useToast()

  const handleCancelSubscription = async () => {
    try {
      // Add your subscription cancellation logic here
      toast({
        title: "Subscription cancelled",
        description: "Your subscription will remain active until the end of the billing period.",
      })
      setShowCancelDialog(false)
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to cancel subscription. Please try again.",
        variant: "destructive",
      })
    }
  }

  if (isLoading) {
    return <div>Loading...</div>
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-lg font-medium">Subscription Plan</h3>
          <p className="text-sm text-muted-foreground">Choose the perfect plan for your needs</p>
        </div>
        {subscription?.plan !== "Free" && (
          <Dialog open={showCancelDialog} onOpenChange={setShowCancelDialog}>
            <DialogTrigger asChild>
              <Button variant="destructive">Cancel Subscription</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Cancel Subscription</DialogTitle>
                <DialogDescription>
                  Are you sure you want to cancel your subscription? You'll lose access to premium features at the end of
                  your billing period.
                </DialogDescription>
              </DialogHeader>
              <div className="flex items-center gap-2 bg-muted p-3 rounded-lg">
                <AlertCircle className="h-5 w-5 text-muted-foreground" />
                <p className="text-sm text-muted-foreground">
                  Your subscription will remain active until {new Date(subscription?.expiresAt || "").toLocaleDateString()}
                </p>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setShowCancelDialog(false)}>
                  Keep Subscription
                </Button>
                <Button variant="destructive" onClick={handleCancelSubscription}>
                  Cancel Subscription
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        )}
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
              <Button 
                className="w-full" 
                variant={tier.name === subscription?.plan ? "outline" : "default"}
                disabled={tier.name === subscription?.plan}
              >
                {tier.name === subscription?.plan ? "Current Plan" : "Upgrade"}
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}

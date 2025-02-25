"use client"

import type React from "react"

import { createContext, useContext, useState, useEffect } from "react"

interface Subscription {
  plan: "Free" | "Pro" | "Enterprise"
  features: string[]
  expiresAt: string
}

interface SubscriptionContextType {
  subscription: Subscription | null
  isLoading: boolean
  checkAccess: (feature: string) => boolean
}

const SubscriptionContext = createContext<SubscriptionContextType | undefined>(undefined)

export function SubscriptionProvider({ children }: { children: React.ReactNode }) {
  const [subscription, setSubscription] = useState<Subscription | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate fetching subscription data
    const fetchSubscription = async () => {
      try {
        // In a real app, this would be an API call
        await new Promise((resolve) => setTimeout(resolve, 1000))
        setSubscription({
          plan: "Free",
          features: ["1 Job Board", "5 Job Applications per month", "Basic CV template", "Basic Cover Letter template"],
          expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
        })
      } catch (error) {
        console.error("Error fetching subscription:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchSubscription()
  }, [])

  const checkAccess = (feature: string) => {
    if (!subscription) return false
    return subscription.features.includes(feature)
  }

  return (
    <SubscriptionContext.Provider value={{ subscription, isLoading, checkAccess }}>
      {children}
    </SubscriptionContext.Provider>
  )
}

export function useSubscription() {
  const context = useContext(SubscriptionContext)
  if (context === undefined) {
    throw new Error("useSubscription must be used within a SubscriptionProvider")
  }
  return context
}


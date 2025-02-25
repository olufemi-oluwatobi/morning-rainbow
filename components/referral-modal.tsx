"use client"

import { useState } from "react"
import { Copy, Share2, Gift } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { toast } from "sonner"

export function ReferralModal() {
  const [copied, setCopied] = useState(false)
  // In a real app, this would come from your backend
  const referralLink = `${window.location.origin}?ref=user123`

  const copyToClipboard = () => {
    navigator.clipboard.writeText(referralLink)
    setCopied(true)
    toast.success("Referral link copied!")
    setTimeout(() => setCopied(false), 2000)
  }

  const shareLink = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: "Join me on JobMatch",
          text: "Get your perfect job match with AI-powered recommendations!",
          url: referralLink,
        })
      } else {
        copyToClipboard()
      }
    } catch (error) {
      console.error("Error sharing:", error)
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="gap-2">
          <Gift className="h-4 w-4" />
          Refer & Earn
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Share your referral link</DialogTitle>
          <DialogDescription>
            Get one free CV and cover letter generation for every person that signs up using your link!
          </DialogDescription>
        </DialogHeader>
        <div className="flex items-center space-x-2">
          <div className="grid flex-1 gap-2">
            <Input value={referralLink} readOnly className="w-full" />
          </div>
          <Button variant="outline" size="icon" onClick={copyToClipboard}>
            <Copy className={`h-4 w-4 ${copied ? "text-green-500" : ""}`} />
          </Button>
          <Button variant="outline" size="icon" onClick={shareLink}>
            <Share2 className="h-4 w-4" />
          </Button>
        </div>
        <div className="mt-4 rounded-lg bg-muted p-4">
          <div className="flex items-center gap-2 text-sm">
            <Gift className="h-4 w-4 text-primary" />
            <span>0 referrals completed</span>
          </div>
          <div className="mt-2 text-xs text-muted-foreground">Share your link to start earning rewards!</div>
        </div>
      </DialogContent>
    </Dialog>
  )
}


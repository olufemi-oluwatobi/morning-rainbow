import Link from "next/link"
import { Plus } from "lucide-react"
import { ArrowRight, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function Page() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container px-4 md:px-6 py-24 space-y-8 md:py-32 lg:py-40">
        <div className="flex flex-col items-center space-y-4 text-center">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
              Build Your Professional Profile
            </h1>
            <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
              Create your professional profile in minutes. We'll help you showcase your experience and skills to stand
              out.
            </p>
          </div>
          <div className="space-y-4 w-full max-w-sm">
            <div className="flex gap-4 w-full">
              <Link href="/onboarding" className="flex-1">
                <Button className="w-full" size="lg">
                  Get Started
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link href="/jobs" className="flex-1">
                <Button className="w-full" variant="outline" size="lg">
                  Browse Jobs
                </Button>
              </Link>
              <Link href="/boards" className="flex-1">
                <Button className="w-full" variant="outline" size="lg">
                  Create Board
                  <Plus className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
            <p className="text-xs text-muted-foreground">No credit card required. Set up your profile in minutes.</p>
          </div>
        </div>

        <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-3 lg:gap-12">
          {features.map((feature, index) => (
            <div key={index} className="flex flex-col items-center space-y-4 text-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                <CheckCircle className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>

        <div className="mx-auto max-w-2xl text-center">
          <div className="flex items-center justify-center space-x-4">
            <div className="flex -space-x-4">
              {[...Array(4)].map((_, i) => (
                <div
                  key={i}
                  className="h-12 w-12 rounded-full border-2 border-background bg-muted"
                  style={{
                    backgroundImage: `url(/placeholder.svg?height=48&width=48)`,
                    backgroundSize: "cover",
                  }}
                />
              ))}
            </div>
            <p className="text-muted-foreground">
              Join <span className="font-semibold text-foreground">2,000+</span> professionals who have already created
              their profiles
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

const features = [
  {
    title: "Easy Setup",
    description: "Complete your profile in minutes with our guided setup process.",
  },
  {
    title: "Professional Format",
    description: "Your information is formatted to professional standards automatically.",
  },
  {
    title: "Career Growth",
    description: "Get insights and opportunities tailored to your experience level.",
  },
]
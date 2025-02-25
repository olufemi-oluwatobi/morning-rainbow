"use client"

import { useReducer, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ThemeToggle } from "@/components/theme-toggle"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { initialState, onboardingReducer } from "@/lib/reducer"
import { InfoIcon, Loader2 } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

export default function OnboardingPage() {
  const [isStarted, setIsStarted] = useState(false)
  const { 
    step,
    setStep,
    fullName,
    setFullName,
    cv,
    setCV,
    linkedin,
    setLinkedin,
    addEmployment,
    addEducation,
    setProfileSummary,
    completeOnboarding
  } = useOnboardingStore()

  const steps = [
    {
      title: "Welcome! Let's get started",
      description: "First, tell us your full name",
      content: (
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="fullName">Full Name</Label>
            <Input
              id="fullName"
              placeholder="John Doe"
              value={state.fullName}
              onChange={(e) => dispatch({ type: "SET_FULL_NAME", payload: e.target.value })}
            />
          </div>
        </div>
      ),
    },
    {
      title: "Upload your CV",
      description: "Upload your CV in PDF format",
      content: (
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="cv">CV Upload</Label>
            <Input
              id="cv"
              type="file"
              accept=".pdf"
              onChange={(e) => {
                const file = e.target.files?.[0]
                if (file) {
                  dispatch({ type: "SET_CV", payload: file })
                }
              }}
            />
          </div>
        </div>
      ),
    },
    {
      title: "LinkedIn Profile",
      description: "Add your LinkedIn profile URL",
      content: (
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="linkedin">LinkedIn URL</Label>
            <Input
              id="linkedin"
              placeholder="https://linkedin.com/in/johndoe"
              value={state.linkedin}
              onChange={(e) => dispatch({ type: "SET_LINKEDIN", payload: e.target.value })}
            />
          </div>
        </div>
      ),
    },
    {
      title: "Employment History",
      description: "Tell us about your work experience",
      content: (
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="employer">Employer</Label>
            <Input id="employer" placeholder="Company name" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="role">Role</Label>
            <Input id="role" placeholder="Job title" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="startDate">Start Date</Label>
              <Input id="startDate" type="date" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="endDate">End Date</Label>
              <Input id="endDate" type="date" />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea id="description" placeholder="Describe your responsibilities and achievements" />
          </div>
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Label htmlFor="salary">Salary Range (Optional)</Label>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <InfoIcon className="h-4 w-4 text-muted-foreground" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>This information helps us find better paying opportunities for you</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            <Input id="salary" placeholder="e.g. $50,000 - $70,000" />
          </div>
          <Button
            onClick={() =>
              dispatch({
                type: "ADD_EMPLOYMENT",
                payload: {
                  employer: "Test Corp",
                  role: "Developer",
                  startDate: "2023-01",
                  endDate: "2024-01",
                  description: "Worked on various projects",
                  salaryRange: "$50,000 - $70,000",
                },
              })
            }
          >
            Add Employment
          </Button>
        </div>
      ),
    },
    {
      title: "Education",
      description: "Tell us about your education",
      content: (
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="institution">Institution</Label>
            <Input id="institution" placeholder="University name" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="degree">Degree</Label>
            <Input id="degree" placeholder="e.g. Bachelor's" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="field">Field of Study</Label>
            <Input id="field" placeholder="e.g. Computer Science" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="graduationYear">Graduation Year</Label>
            <Input id="graduationYear" type="number" placeholder="2020" />
          </div>
          <Button
            onClick={() =>
              dispatch({
                type: "ADD_EDUCATION",
                payload: {
                  institution: "Test University",
                  degree: "Bachelor's",
                  field: "Computer Science",
                  graduationYear: "2020",
                },
              })
            }
          >
            Add Education
          </Button>
        </div>
      ),
    },
    {
      title: "Profile Summary",
      description: "Add a brief summary about yourself",
      content: (
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="summary">Summary</Label>
            <Textarea
              id="summary"
              placeholder="Tell us about yourself..."
              value={state.profileSummary}
              onChange={(e) => dispatch({ type: "SET_PROFILE_SUMMARY", payload: e.target.value })}
            />
          </div>
        </div>
      ),
    },
  ]

  const currentStep = steps[state.step]

  if (!isStarted) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <ThemeToggle />
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <Card className="w-[90vw] max-w-lg">
            <CardHeader className="text-center">
              <CardTitle className="text-4xl">Welcome!</CardTitle>
              <CardDescription className="text-lg">
                Let's create your professional profile together. It'll only take a few minutes.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 text-center pb-8">
              <motion.div
                className="flex justify-center space-x-4"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                {[1, 2, 3, 4, 5].map((step) => (
                  <div key={step} className="flex flex-col items-center space-y-2">
                    <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center">
                      {step}
                    </div>
                    <div className="text-xs text-muted-foreground">Step {step}</div>
                  </div>
                ))}
              </motion.div>
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}>
                <p className="text-muted-foreground mt-6">
                  We'll help you create a standout profile by gathering information about your:
                </p>
                <ul className="text-left mt-4 space-y-2 max-w-sm mx-auto">
                  <li className="flex items-center space-x-2">
                    <InfoIcon className="w-4 h-4 text-primary" />
                    <span>Professional experience</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <InfoIcon className="w-4 h-4 text-primary" />
                    <span>Education background</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <InfoIcon className="w-4 h-4 text-primary" />
                    <span>Skills and achievements</span>
                  </li>
                </ul>
              </motion.div>
            </CardContent>
            <CardFooter className="flex justify-center">
              <Button size="lg" onClick={() => setIsStarted(true)}>
                Begin Setup
                <motion.div
                  className="ml-2"
                  animate={{ x: [0, 5, 0] }}
                  transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1.5 }}
                >
                  →
                </motion.div>
              </Button>
            </CardFooter>
          </Card>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background text-foreground p-4">
      <ThemeToggle />
      <div className="max-w-2xl mx-auto pt-20">
        <div className="mb-8">
          <div className="flex space-x-2">
            {steps.map((_, index) => (
              <div
                key={index}
                className={`h-2 flex-1 rounded-full ${index <= state.step ? "bg-primary" : "bg-secondary"}`}
              />
            ))}
          </div>
        </div>
        <AnimatePresence mode="wait">
          <motion.div
            key={state.step}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.2 }}
          >
            <Card>
              <CardHeader>
                <CardTitle>{currentStep.title}</CardTitle>
                <CardDescription>{currentStep.description}</CardDescription>
              </CardHeader>
              <CardContent>{currentStep.content}</CardContent>
              <CardFooter className="flex justify-between">
                <Button
                  variant="outline"
                  onClick={() => {
                    if (state.step === 0) {
                      setIsStarted(false)
                    } else {
                      dispatch({ type: "PREV_STEP" })
                    }
                  }}
                >
                  {state.step === 0 ? "Back to Home" : "Previous"}
                </Button>
                <Button
                  onClick={() => {
                    if (state.step === steps.length - 1) {
                      dispatch({ type: "COMPLETE_ONBOARDING" })
                    } else {
                      dispatch({ type: "NEXT_STEP" })
                    }
                  }}
                >
                  {state.step === steps.length - 1 ? "Complete" : "Next"}
                </Button>
              </CardFooter>
            </Card>
          </motion.div>
        </AnimatePresence>

        {state.isComplete && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="fixed inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center"
            onAnimationComplete={() => {
              setTimeout(() => {
                window.location.href = '/boards?new=true'
              }, 2000)
            }}
          >
            <Card className="w-[90%] max-w-md">
              <CardHeader>
                <CardTitle className="text-center">🎉 Welcome Aboard!</CardTitle>
                <CardDescription className="text-center">Your profile has been successfully created</CardDescription>
              </CardHeader>
              <CardContent className="text-center">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 200, damping: 20 }}
                  className="w-16 h-16 rounded-full bg-primary/10 text-primary flex items-center justify-center mx-auto mb-4"
                >
                  <Loader2 className="w-8 h-8 animate-spin" />
                </motion.div>
                <p className="text-muted-foreground">
                  We're setting up your dashboard. You'll be redirected shortly...
                </p>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </div>
    </div>
  )
}


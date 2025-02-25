export type OnboardingState = {
  step: number
  fullName: string
  cv: File | null
  linkedin: string
  employmentHistory: {
    employer: string
    role: string
    startDate: string
    endDate: string
    description: string
    salaryRange?: string
  }[]
  education: {
    institution: string
    degree: string
    field: string
    graduationYear: string
  }[]
  profileSummary: string
  isComplete: boolean
}

export type OnboardingAction =
  | { type: "NEXT_STEP" }
  | { type: "PREV_STEP" }
  | { type: "SET_FULL_NAME"; payload: string }
  | { type: "SET_CV"; payload: File }
  | { type: "SET_LINKEDIN"; payload: string }
  | { type: "ADD_EMPLOYMENT"; payload: OnboardingState["employmentHistory"][0] }
  | { type: "ADD_EDUCATION"; payload: OnboardingState["education"][0] }
  | { type: "SET_PROFILE_SUMMARY"; payload: string }
  | { type: "COMPLETE_ONBOARDING" }


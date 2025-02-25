
import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { OnboardingState } from '../types'

interface OnboardingStore extends OnboardingState {
  setStep: (step: number) => void
  setFullName: (name: string) => void
  setCV: (cv: File | null) => void
  setLinkedin: (url: string) => void
  addEmployment: (employment: OnboardingState['employmentHistory'][0]) => void
  addEducation: (education: OnboardingState['education'][0]) => void
  setProfileSummary: (summary: string) => void
  completeOnboarding: () => void
  reset: () => void
}

const initialState: OnboardingState = {
  step: 0,
  fullName: '',
  cv: null,
  linkedin: '',
  employmentHistory: [],
  education: [],
  profileSummary: '',
  isComplete: false
}

export const useOnboardingStore = create<OnboardingStore>()(
  persist(
    (set) => ({
      ...initialState,
      setStep: (step) => set({ step }),
      setFullName: (fullName) => set({ fullName }),
      setCV: (cv) => set({ cv }),
      setLinkedin: (linkedin) => set({ linkedin }),
      addEmployment: (employment) => 
        set((state) => ({ 
          employmentHistory: [...state.employmentHistory, employment] 
        })),
      addEducation: (education) =>
        set((state) => ({ 
          education: [...state.education, education] 
        })),
      setProfileSummary: (profileSummary) => set({ profileSummary }),
      completeOnboarding: () => set({ isComplete: true }),
      reset: () => set(initialState)
    }),
    {
      name: 'onboarding-storage'
    }
  )
)

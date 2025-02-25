import type { OnboardingState, OnboardingAction } from "./types"

export const initialState: OnboardingState = {
  step: 0,
  fullName: "",
  cv: null,
  linkedin: "",
  employmentHistory: [],
  education: [],
  profileSummary: "",
  isComplete: false,
}

export function onboardingReducer(state: OnboardingState, action: OnboardingAction): OnboardingState {
  switch (action.type) {
    case "NEXT_STEP":
      return {
        ...state,
        step: state.step + 1,
      }
    case "PREV_STEP":
      return {
        ...state,
        step: Math.max(0, state.step - 1),
      }
    case "SET_FULL_NAME":
      return {
        ...state,
        fullName: action.payload,
      }
    case "SET_CV":
      return {
        ...state,
        cv: action.payload,
      }
    case "SET_LINKEDIN":
      return {
        ...state,
        linkedin: action.payload,
      }
    case "ADD_EMPLOYMENT":
      return {
        ...state,
        employmentHistory: [...state.employmentHistory, action.payload],
      }
    case "ADD_EDUCATION":
      return {
        ...state,
        education: [...state.education, action.payload],
      }
    case "SET_PROFILE_SUMMARY":
      return {
        ...state,
        profileSummary: action.payload,
      }
    case "COMPLETE_ONBOARDING":
      return {
        ...state,
        isComplete: true,
      }
    default:
      return state
  }
}


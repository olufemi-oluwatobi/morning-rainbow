
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface Profile {
  id: string
  fullName: string
  email: string
  bio: string
  skills: string[]
  avatar?: string
}

interface ProfileStore {
  profile: Profile | null
  setProfile: (profile: Profile) => void
  updateProfile: (updates: Partial<Profile>) => void
  clearProfile: () => void
}

export const useProfileStore = create<ProfileStore>()(
  persist(
    (set) => ({
      profile: null,
      setProfile: (profile) => set({ profile }),
      updateProfile: (updates) =>
        set((state) => ({
          profile: state.profile ? { ...state.profile, ...updates } : null
        })),
      clearProfile: () => set({ profile: null })
    }),
    {
      name: 'profile-storage'
    }
  )
)

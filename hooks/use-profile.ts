import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { api } from "@/lib/api"
import type { Profile } from "@/lib/api-types"

export function useUserProfile(userId: string) {
  return useQuery({
    queryKey: ["user-profile", userId],
    queryFn: () => api.getUserProfile(userId),
    enabled: !!userId,
  })
}

export function useCreateProfile() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: Profile) => api.createProfile(data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["user-profile", variables.user_id] })
    },
  })
}


import { useMutation } from "@tanstack/react-query"
import { api } from "@/lib/api"
import type { GenerateRequest } from "@/lib/api-types"

export function useGenerateCoverLetter() {
  return useMutation({
    mutationFn: (params: GenerateRequest) => api.generateCoverLetter(params),
  })
}


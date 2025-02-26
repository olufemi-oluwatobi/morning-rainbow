import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { api } from "@/lib/api"
import type { GenerateRequest } from "@/lib/api-types"

export function useCVText(cvId: string) {
  return useQuery({
    queryKey: ["cv-text", cvId],
    queryFn: () => api.getCVText(cvId),
    enabled: !!cvId,
  })
}

export function useUploadCV() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ userId, file }: { userId: string; file: File }) => api.uploadCV(userId, file),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["user-profile", variables.userId] })
    },
  })
}

export function useAttachCVToBoard() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ boardId, cvId }: { boardId: string; cvId: string }) => api.attachCVToBoard(boardId, cvId),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["board-analytics", variables.boardId] })
    },
  })
}

export function useGenerateCV() {
  return useMutation({
    mutationFn: (params: GenerateRequest) => api.generateCV(params),
  })
}

export function useAttachCV() {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: ({ boardId, cvId }: { boardId: string; cvId: string }) => api.attachCVToBoard(boardId, cvId),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["board-analytics", variables.boardId] })
    },
  })
}

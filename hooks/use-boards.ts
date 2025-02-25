import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { api } from "@/lib/api"
import type { FastTrackBoardCreate } from "@/lib/api-types"

export function useBoards() {
  return useQuery({
    queryKey: ["boards"],
    queryFn: api.getBoards,
  })
}

export function useBoardJobs(boardId: string) {
  return useQuery({
    queryKey: ["board-jobs", boardId],
    queryFn: () => api.getBoardJobs(boardId),
    enabled: !!boardId,
  })
}

export function useBoardAnalytics(boardId: string) {
  return useQuery({
    queryKey: ["board-analytics", boardId],
    queryFn: () => api.getBoardAnalytics(boardId),
    enabled: !!boardId,
  })
}

export function useCreateFastTrackBoard() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: FastTrackBoardCreate) => api.createFastTrackBoard(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["boards"] })
    },
  })
}


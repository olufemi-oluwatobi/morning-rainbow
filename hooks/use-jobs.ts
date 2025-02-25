import { useQuery } from "@tanstack/react-query"
import { api } from "@/lib/api"
import type { JobPost, BoardJobsResponse } from "@/lib/api-types"

export function useJobs() {
  return useQuery<JobPost[]>({
    queryKey: ["jobs"],
    queryFn: api.getAllJobs,
  })
}

export function useBoardJobs(boardId: string) {
  return useQuery<BoardJobsResponse>({
    queryKey: ["board-jobs", boardId],
    queryFn: () => api.getBoardJobs(boardId),
    enabled: !!boardId,
  })
}


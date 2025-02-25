import { LinearClient } from "@linear/sdk"
import type { Task } from "../constants/demoTasks"

export async function getLinearTasks(): Promise<Task[]> {
  const client = new LinearClient({
    apiKey: process.env.LINEAR_API_TOKEN,
  })

  const me = await client.viewer
  const issues = await me.assignedIssues({
    filter: {
      state: { type: { in: ["started", "unstarted"] } },
    },
  })

  const sortedIssues = issues.nodes.sort((a, b) => {
    const priorityOrder = { urgent: 0, high: 1, medium: 2, low: 3, "": 4 }
    return (priorityOrder[a.priority ?? ""] ?? 5) - (priorityOrder[b.priority ?? ""] ?? 5)
  })

  return sortedIssues.slice(0, 5).map((issue) => ({
    id: issue.id,
    title: issue.title,
    team: { name: issue.team.name },
    completed: false,
    url: issue.url,
  }))
}

export async function updateLinearTaskStatus(taskId: string): Promise<{ completed: boolean }> {
  const client = new LinearClient({
    apiKey: process.env.LINEAR_API_TOKEN,
  })

  const issue = await client.issue(taskId)
  const team = await issue.team
  const states = await team.states()

  const isDoneState = Boolean(issue.completedAt)

  const newState = states.nodes.find((state) =>
    isDoneState ? ["backlog", "unstarted", "started"].includes(state.type) : state.type === "completed",
  )

  if (!newState) {
    throw new Error(`Could not find appropriate state to move to`)
  }

  await issue.update({ stateId: newState.id })

  return { completed: newState.type === "completed" }
}



export interface Task {
  id: string
  title: string
  completed?: boolean
  url?: string
}

export const demoTasks: Task[] = [
  { id: "1", title: "Implement new feature" },
  { id: "2", title: "Fix critical bug" },
  { id: "3", title: "Update documentation" },
  { id: "4", title: "Prepare for team meeting" },
  { id: "5", title: "Review pull requests" },
]

"use client"

import { useState, useEffect } from "react"
import { ExternalLink } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { type Task, demoTasks } from "../constants/demoTasks"

function SkeletonLoader() {
  return (
    <ul className="space-y-4 mb-8 w-full">
      {[...Array(5)].map((_, index) => (
        <li key={index} className="py-3">
          <div className="flex items-center space-x-3">
            <div className="w-5 h-5 bg-gray-200 dark:bg-gray-600 rounded-full flex-shrink-0 animate-pulse"></div>
            <div className="flex-grow flex items-center justify-between">
              <div className={`h-4 bg-gray-600 rounded-md animate-pulse w-${["3/4", "2/3", "5/6", "1/2", "4/5"][index]}`}></div>
            </div>
          </div>
        </li>
      ))}
    </ul>
  )
}

export function TaskList() {
  const [tasks, setTasks] = useState<Task[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [updatingTaskId, setUpdatingTaskId] = useState<string | null>(null)

  useEffect(() => {
    const loadTasks = async () => {
      await new Promise((resolve) => setTimeout(resolve, 1000))
      setTasks(demoTasks)
      setIsLoading(false)
    }
    loadTasks()
  }, [])

  const toggleTaskCompletion = async (taskId: string) => {
    setUpdatingTaskId(taskId)
    setTasks((prevTasks) =>
      prevTasks
        .map((task) => (task.id === taskId ? { ...task, completed: !task.completed } : task))
        .sort((a, b) => (a.completed === b.completed ? 0 : a.completed ? 1 : -1))
    )
    setTimeout(() => setUpdatingTaskId(null), 500)
  }

  const openTaskInNewWindow = (url: string) => {
    window.open(url, "_blank", "noopener,noreferrer")
  }

  return (
    <div className="min-h-screen bg-white dark:bg-black text-gray-900 dark:text-white p-4 flex flex-col relative">
      <div className="flex-grow flex items-center justify-center">
        <div className="w-full max-w-md">
          <h1 className="text-2xl font-bold mb-6 text-center">Tasks</h1>
          {isLoading ? (
            <SkeletonLoader />
          ) : (
            <motion.ul layout className="space-y-4 mb-8 w-full">
              <AnimatePresence initial={false}>
                {tasks.map((task) => (
                  <motion.li
                    key={task.id}
                    layout
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 50 }}
                    transition={{ type: "spring", stiffness: 500, damping: 30, duration: 0.3 }}
                    className={`py-3 cursor-pointer group ${task.completed ? "opacity-60" : ""}`}
                    onClick={() => toggleTaskCompletion(task.id)}
                  >
                    <div className="flex items-center space-x-3">
                      <motion.div
                        className="w-5 h-5 flex-shrink-0 relative"
                        animate={updatingTaskId === task.id ? { rotate: 360 } : { rotate: 0 }}
                        transition={
                          updatingTaskId === task.id
                            ? { duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }
                            : { duration: 0 }
                        }
                      >
                        <svg
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          className="w-full h-full"
                        >
                          <circle
                            cx="12"
                            cy="12"
                            r="10"
                            stroke={task.completed ? "#5e6ad2" : "#4b5563"}
                            strokeWidth="2"
                            fill={task.completed ? "#5e6ad2" : "none"}
                            className={
                              updatingTaskId === task.id
                                ? "opacity-30"
                                : task.completed
                                  ? ""
                                  : "group-hover:stroke-white"
                            }
                          />
                          {task.completed && updatingTaskId !== task.id && (
                            <path
                              d="M8 12L11 15L16 9"
                              stroke="black"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          )}
                        </svg>
                      </motion.div>
                      <div className="flex-grow flex items-center justify-between overflow-hidden">
                        <span className="text-sm truncate text-gray-500 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white transition-colors duration-300 ease-in-out">
                          {task.title}
                        </span>
                      </div>
                      {task.url && (
                        <div
                          className="hidden group-hover:block transition-opacity duration-200 ml-2"
                          onClick={(e) => {
                            e.stopPropagation()
                            openTaskInNewWindow(task.url!)
                          }}
                        >
                          <ExternalLink className="w-4 h-4 text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors duration-300 ease-in-out" />
                        </div>
                      )}
                    </div>
                  </motion.li>
                ))}
              </AnimatePresence>
            </motion.ul>
          )}
        </div>
      </div>
    </div>
  )
}
"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import {
  Plus,
  Search,
  SwitchCamera,
  Bookmark,
  Star,
  Upload,
  RefreshCw,
  DollarSign,
  FileText,
  Send,
  TrendingUp,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Avatar } from "@/components/ui/avatar"
import { AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { useCreateFastTrackBoard } from "@/hooks/use-boards"
import { useBoards, useBoardAnalytics } from "@/hooks/use-boards"
import { toast } from "sonner"
import { useBoardJobs } from "@/hooks/use-jobs"
import { useBoardsStore } from "@/lib/stores/boards-store"

export default function BoardsPage() { 
  const [showBoardModal, setShowBoardModal] = useState(false)
  const [newBoardPrompt, setNewBoardPrompt] = useState("")
  const createBoard = useCreateFastTrackBoard()
  const { boards, addBoard, selectedBoard, setSelectedBoard } = useBoardsStore()
  console.log(boards)
  const { data: boardJobsData, isLoading: isLoadingJobs } = useBoardJobs(selectedBoard || "")
  const { data: boardAnalytics, isLoading: isLoadingAnalytics } = useBoardAnalytics(selectedBoard || "")

  const defaultPrompts = [
    "Frontend Developer",
    "Senior Product Manager",
    "UX Designer",
    "Data Scientist",
    "DevOps Engineer",
    "Technical Writer",
  ]

  const allBoards = [...boards, ...defaultPrompts.map(prompt => ({
    id: prompt,
    name: prompt,
    description: `Job board for ${prompt} positions`,
    createdAt: new Date().toISOString()
  }))]

  const jobs = boardJobsData?.jobs || [
    {
      id: 1,
      title: "Senior Frontend Developer",
      company: "TechCorp",
      logo: "/placeholder.svg?height=40&width=40",
      description: "We're looking for an experienced frontend developer to join our team...",
      tags: ["React", "TypeScript", "Next.js"],
      matchScore: 92,
      matchDetails: [
        "Your React experience matches the job requirements perfectly",
        "You have 5+ years of experience they're looking for",
        "Your TypeScript skills are a great fit",
        "Your location preference matches their office location",
        "You might need more experience with their specific testing framework",
      ],
      isBookmarked: false,
      salary: "$120,000 - $150,000",
      location: "San Francisco, CA",
    },
    {
      id: 2,
      title: "Lead Product Designer",
      company: "DesignHub",
      logo: "/placeholder.svg?height=40&width=40",
      description: "Join our design team to create beautiful and functional interfaces...",
      tags: ["UI/UX", "Figma", "Design Systems"],
      matchScore: 88,
      matchDetails: [
        "Your design system experience is exactly what they need",
        "Your portfolio shows similar projects",
        "You have experience with their tech stack",
        "You might need more team leadership experience",
      ],
      isBookmarked: true,
      salary: "$110,000 - $140,000",
      location: "Remote",
    },
  ]

  const boardAnalyticsData = {
    totalJobs: 245,
    lastRefresh: "2 hours ago",
    averageSalary: "$125,000",
    attachedCV: false,
  }

  const handleCreateBoard = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newBoardPrompt.trim()) return

    try {
      const result = await createBoard.mutateAsync({ prompt: newBoardPrompt })
      const newBoard = {
        id: result.board_id,
        name: newBoardPrompt,
        description: result.description || '',
        createdAt: new Date().toISOString(),
        boardId: result.board_id
      }
      addBoard(newBoard)
      setNewBoardPrompt("")
      toast.success("Board created successfully")
    } catch (error) {
      toast.error("Failed to create board")
    }
  }

  return (
    <div className="min-h-screen bg-background p-4 md:p-6">
      {boards.length === 0 ? (
        <div className="max-w-2xl mx-auto text-center space-y-8">
          <h1 className="text-4xl font-bold">Create Your First Job Board</h1>
          <p className="text-muted-foreground">Get started by creating a job board that matches your interests</p>
          <form onSubmit={handleCreateBoard} className="relative">
            <Input
              placeholder="Create a new job board..."
              className="pl-4 pr-12 py-6 text-lg shadow-lg"
              value={newBoardPrompt}
              onChange={(e) => setNewBoardPrompt(e.target.value)}
              disabled={createBoard.isPending}
            />
            <Button
              type="submit"
              size="icon"
              className="absolute right-2 top-1/2 -translate-y-1/2"
              disabled={createBoard.isPending}
            >
              {createBoard.isPending ? (
                <RefreshCw className="h-4 w-4 animate-spin" />
              ) : (
                <Plus className="h-4 w-4" />
              )}
            </Button>
          </form>
        </div>
      ) : !selectedBoard ? (
        <div className="max-w-4xl mx-auto space-y-8">
          <h1 className="text-4xl font-bold text-center mb-12">What Job Are You Looking For?</h1>

          <div className="relative">
            <div className="max-w-2xl mx-auto">
              <form onSubmit={handleCreateBoard} className="relative max-w-2xl mx-auto">
                <Input
                  placeholder="Create a new job board..."
                  className="pl-4 pr-12 py-6 text-lg shadow-lg"
                  value={newBoardPrompt}
                  onChange={(e) => setNewBoardPrompt(e.target.value)}
                  disabled={createBoard.isPending}
                />
                <Button
                  type="submit"
                  size="icon"
                  className="absolute right-2 top-1/2 -translate-y-1/2"
                  disabled={createBoard.isPending}
                >
                  {createBoard.isPending ? (
                    <RefreshCw className="h-4 w-4 animate-spin" />
                  ) : (
                    <Plus className="h-4 w-4" />
                  )}
                </Button>
              </form>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {allBoards.map((board, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                onClick={() => setSelectedBoard(board.id)}
                className="group cursor-pointer"
              >
                <div className="bg-card hover:bg-accent p-6 rounded-lg border border-border transition-colors duration-200">
                  <h3 className="font-medium group-hover:text-accent-foreground">{board.name}</h3>
                  <p className="text-sm text-muted-foreground mt-2">{board.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      ) : (
        <div className="max-w-6xl mx-auto space-y-8">
          <div className="flex flex-col space-y-4 md:flex-row md:justify-between md:items-center">
            <div>
              <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70">
                {selectedBoard}
              </h2>
              <p className="text-muted-foreground text-lg">Find your perfect match</p>
            </div>
            <div className="flex flex-wrap gap-2">
              <Button variant="outline" className="bg-blue-50 dark:bg-blue-950 border-blue-200 dark:border-blue-800">
                <FileText className="h-4 w-4 mr-2 text-blue-600 dark:text-blue-400" />
                Generate CV
              </Button>
              <Button
                variant="outline"
                className="bg-purple-50 dark:bg-purple-950 border-purple-200 dark:border-purple-800"
              >
                <Send className="h-4 w-4 mr-2 text-purple-600 dark:text-purple-400" />
                Generate Cover Letter
              </Button>
              <Dialog open={showBoardModal} onOpenChange={setShowBoardModal}>
                <DialogTrigger asChild>
                  <Button variant="outline" size="icon">
                    <SwitchCamera className="h-4 w-4" />
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Switch Board</DialogTitle>
                    <DialogDescription>Select an existing board or create a new one</DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4 mt-4">
                    {defaultPrompts.map((prompt, index) => (
                      <div
                        key={index}
                        className="p-4 rounded-lg border cursor-pointer hover:bg-accent"
                        onClick={() => {
                          setSelectedBoard(prompt)
                          setShowBoardModal(false)
                        }}
                      >
                        {prompt}
                      </div>
                    ))}
                    <Button className="w-full">
                      <Plus className="h-4 w-4 mr-2" />
                      Create New Board
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>-
            </div>
          </div>

          {/* Analytics Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card className="bg-blue-50/50 dark:bg-blue-950/50 border-blue-100 dark:border-blue-900">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-blue-700 dark:text-blue-300">Total Jobs</CardTitle>
                <Search className="h-4 w-4 text-blue-600 dark:text-blue-400" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-blue-700 dark:text-blue-300">{boardAnalyticsData.totalJobs}</div>
                <p className="text-xs text-blue-600/80 dark:text-blue-400/80 flex items-center gap-1">
                  <TrendingUp className="h-3 w-3" />
                  +12 from last week
                </p>
              </CardContent>
            </Card>

            <Card className="bg-purple-50/50 dark:bg-purple-950/50 border-purple-100 dark:border-purple-900">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-purple-700 dark:text-purple-300">Last Refresh</CardTitle>
                <RefreshCw className="h-4 w-4 text-purple-600 dark:text-purple-400" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-purple-700 dark:text-purple-300">
                  {boardAnalyticsData.lastRefresh}
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  className="mt-2 h-8 text-purple-600 dark:text-purple-400 hover:text-purple-700 hover:bg-purple-100 dark:hover:bg-purple-900"
                >
                  Refresh Now
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-green-50/50 dark:bg-green-950/50 border-green-100 dark:border-green-900">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-green-700 dark:text-green-300">Average Salary</CardTitle>
                <DollarSign className="h-4 w-4 text-green-600 dark:text-green-400" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-700 dark:text-green-300">
                  {boardAnalyticsData.averageSalary}
                </div>
                <p className="text-xs text-green-600/80 dark:text-green-400/80">Based on available listings</p>
              </CardContent>
            </Card>

            <Card className="bg-amber-50/50 dark:bg-amber-950/50 border-amber-100 dark:border-amber-900">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-amber-700 dark:text-amber-300">CV Status</CardTitle>
                <FileText className="h-4 w-4 text-amber-600 dark:text-amber-400" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-amber-700 dark:text-amber-300">
                  {boardAnalyticsData.attachedCV ? "Attached" : "Not Attached"}
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  className="mt-2 h-8 text-amber-600 dark:text-amber-400 hover:text-amber-700 hover:bg-amber-100 dark:hover:bg-amber-900"
                >
                  <Upload className="h-4 w-4 mr-2" />
                  Attach CV
                </Button>
              </CardContent>
            </Card>
          </div>

          {selectedBoard && (
            <div className="mt-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <DollarSign className="h-4 w-4" />
                      Salary Range
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    {isLoadingAnalytics ? (
                      <div>Loading...</div>
                    ) : (
                      <div className="text-2xl font-bold">
                        ${boardAnalytics?.salary_range.min.toLocaleString()} - ${boardAnalytics?.salary_range.max.toLocaleString()}
                      </div>
                    )}
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Star className="h-4 w-4" />
                      CV Strength
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    {isLoadingAnalytics ? (
                      <div>Loading...</div>
                    ) : (
                      <div>
                        <div className="text-2xl font-bold">{boardAnalytics?.cv_strength_score}%</div>
                        <div className="mt-2">
                          <div className="text-sm text-muted-foreground">Recommended Improvements:</div>
                          <ul className="mt-1 space-y-1">
                            {boardAnalytics?.recommended_improvements.map((improvement, i) => (
                              <li key={i} className="text-sm">{improvement}</li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <TrendingUp className="h-4 w-4" />
                      Skills Match
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    {isLoadingAnalytics ? (
                      <div>Loading...</div>
                    ) : (
                      <div>
                        <div className="text-2xl font-bold">{boardAnalytics?.skill_match_score}%</div>
                        <div className="mt-2">
                          <div className="text-sm text-muted-foreground">Missing Skills:</div>
                          <div className="mt-1 flex flex-wrap gap-1">
                            {boardAnalytics?.top_missing_skills.map((skill, i) => (
                              <Badge key={i} variant="secondary">{skill}</Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <FileText className="h-4 w-4" />
                      Experience Match
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    {isLoadingAnalytics ? (
                      <div>Loading...</div>
                    ) : (
                      <div className="text-2xl font-bold">
                        {boardAnalytics?.experience_match_score}%
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            </div>
          )}

          {/* Jobs Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {jobs.map((job) => (
              <Link href={`/jobs/${job.id}`} key={job.id}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="group bg-card rounded-lg border border-border p-6 space-y-4 hover:shadow-lg transition-all hover:border-primary/20 hover:bg-primary/[0.02]"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-4">
                      <Avatar>
                        <AvatarImage src={job.logo} alt={job.company} />
                      </Avatar>
                      <div>
                        <h3 className="font-semibold group-hover:text-primary transition-colors">{job.title}</h3>
                        <p className="text-sm text-muted-foreground">{job.company}</p>
                        <p className="text-sm text-muted-foreground">{job.location}</p>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      className={job.isBookmarked ? "text-primary" : "text-muted-foreground"}
                    >
                      <Bookmark className="h-4 w-4" />
                    </Button>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <div
                        className={`px-2 py-1 rounded-md text-sm font-medium
                        ${
                          job.matchScore >= 90
                            ? "bg-green-50 text-green-700 dark:bg-green-950 dark:text-green-300"
                            : job.matchScore >= 80
                              ? "bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-300"
                              : "bg-amber-50 text-amber-700 dark:bg-amber-950 dark:text-amber-300"
                        }`}
                      >
                        <Star className="h-4 w-4 inline-block mr-1" />
                        {job.matchScore}% Match
                      </div>
                    </div>
                    <ul className="text-sm text-muted-foreground list-disc pl-5 space-y-1">
                      {job.matchDetails?.slice(0, 2).map((detail, index) => (
                        <li key={index}>{detail}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {job.tags?.map((tag) => (
                      <Badge key={tag} variant="secondary" className="bg-primary/10 text-primary hover:bg-primary/20">
                        {tag}
                      </Badge>
                    ))}
                  </div>

                  <div className="flex items-center justify-between pt-2">
                    <span className="text-sm font-medium text-green-600 dark:text-green-400">{job.salary}</span>
                  </div>
                </motion.div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

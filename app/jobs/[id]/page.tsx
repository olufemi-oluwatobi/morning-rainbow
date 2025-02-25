"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { useParams } from "next/navigation"
import { ArrowLeft, Bookmark, Star, Bot, FileText, Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Avatar } from "@/components/ui/avatar"
import { AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import Markdown from "react-markdown"

export default function JobPage() {
  const [showActions, setShowActions] = useState(false)
  const [scrollPosition, setScrollPosition] = useState(0)
  const [isAnalysisExpanded, setIsAnalysisExpanded] = useState(false);
  const params = useParams();

  const job = {
    id: params.id,
    title: "Senior Frontend Developer",
    company: "TechCorp",
    logo: "/placeholder.svg?height=40&width=40",
    location: "San Francisco, CA",
    salary: "$120,000 - $150,000",
    matchScore: 92,
    matchAnalysis: {
      skills: 95,
      experience: 90,
      education: 85,
      location: 98,
    },
    aiSummary: `## Key Insights

🎯 **Perfect Match Areas**
- Your React expertise aligns perfectly with their tech stack
- Your experience level matches their senior role requirements
- Your location preference is ideal for this position

⭐ **Unique Advantages**
- Your TypeScript proficiency is a strong differentiator
- Your mentoring experience matches their leadership needs
- Your performance optimization skills are particularly relevant

💡 **Strategic Tips**
- Emphasize your experience with large-scale applications
- Highlight your team leadership experience
- Focus on your architectural decision-making skills

⚡ **Quick Actions**
- Prepare examples of successful mentoring experiences
- Gather metrics from your performance optimization work
- Review their tech blog for recent engineering challenges`,
    description: `We are seeking a Senior Frontend Developer to join our growing team. 
    
    Responsibilities:
    • Lead the development of complex web applications
    • Mentor junior developers
    • Collaborate with designers and product managers
    • Write clean, maintainable code
    
    Requirements:
    • 5+ years of experience with React
    • Strong TypeScript skills
    • Experience with Next.js
    • Understanding of web performance optimization
    
    Benefits:
    • Competitive salary
    • Remote work options
    • Health insurance
    • 401(k) matching
    • Professional development budget`,
    tags: ["React", "TypeScript", "Next.js", "Senior Level"],
  }

  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY)
      setShowActions(window.scrollY > 200)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <div className="min-h-screen bg-background">
      <div className="sticky top-0 z-10 bg-background/80 backdrop-blur-sm border-b">
        <div className="max-w-4xl mx-auto p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href="/boards">
                <Button variant="ghost" size="icon">
                  <ArrowLeft className="h-4 w-4" />
                </Button>
              </Link>
              {showActions && (
                <motion.h2
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="font-semibold truncate"
                >
                  {job.title}
                </motion.h2>
              )}
            </div>
            <div className="flex items-center space-x-2">
              {showActions && (
                <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}>
                  <Button>Apply Now</Button>
                </motion.div>
              )}
              <Button variant="ghost" size="icon">
                <Bookmark className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      <main className="max-w-4xl mx-auto p-4 space-y-6">
        <div className="space-y-6">
          <div className="flex items-start justify-between">
            <div className="flex items-center space-x-4">
              <Avatar className="h-16 w-16">
                <AvatarImage src={job.logo} alt={job.company} />
              </Avatar>
              <div>
                <h1 className="text-2xl font-bold">{job.title}</h1>
                <p className="text-lg text-muted-foreground">{job.company}</p>
                <div className="flex items-center space-x-2 mt-1">
                  <Badge variant="secondary">{job.location}</Badge>
                  <Badge variant="secondary">{job.salary}</Badge>
                </div>
              </div>
            </div>
            <Button size="lg">Apply Now</Button>
          </div>

          {/* AI Summary Card */}
          <Card className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-950/50 dark:to-purple-950/50 border-blue-100 dark:border-blue-900">
            <CardHeader className="space-y-1 pb-2">
              <div className="flex items-center space-x-2">
                <Bot className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                <CardTitle className="text-lg text-blue-700 dark:text-blue-300">AI Match Analysis</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="prose prose-blue dark:prose-invert max-w-none">
                <Markdown>{job.aiSummary}</Markdown>
              </div>
            </CardContent>
          </Card>

          <div className="bg-card rounded-lg border p-6 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Star className="h-5 w-5 text-yellow-400 fill-yellow-400" />
                <span className="text-xl font-bold">{job.matchScore}% Match</span>
              </div>
              <div className="flex gap-2">
                <Link href={`/jobs/${params.id}/cover-letter`}>
                  <Button variant="outline">
                    <Send className="h-4 w-4 mr-2" />
                    Generate Cover Letter
                  </Button>
                </Link>
                <Button variant="outline">
                  <FileText className="h-4 w-4 mr-2" />
                  Generate CV
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {Object.entries(job.matchAnalysis).map(([key, value]) => (
                <div key={key} className="space-y-2">
                  <Progress
                    value={value}
                    className={`h-2 ${
                      value >= 90
                        ? "bg-green-100 dark:bg-green-900 [&>div]:bg-green-600 dark:[&>div]:bg-green-400"
                        : value >= 80
                          ? "bg-blue-100 dark:bg-blue-900 [&>div]:bg-blue-600 dark:[&>div]:bg-blue-400"
                          : "bg-amber-100 dark:bg-amber-900 [&>div]:bg-amber-600 dark:[&>div]:bg-amber-400"
                    }`}
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            {job.tags.map((tag) => (
              <Badge key={tag} variant="outline" className="bg-primary/5 text-primary hover:bg-primary/10">
                {tag}
              </Badge>
            ))}
          </div>

          <div className="prose prose-gray dark:prose-invert max-w-none">
            <div className="whitespace-pre-line">{job.description}</div>
          </div>
        </div>
      </main>
    </div>
  )
}


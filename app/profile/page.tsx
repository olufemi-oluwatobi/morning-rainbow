"use client"

import { useState } from "react"
import { Pencil, Trash2, Plus, FileText, Briefcase, GraduationCap, BookMarked, LayoutGrid } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"

export default function ProfilePage() {
  const [editingSection, setEditingSection] = useState<string | null>(null)

  const profile = {
    name: "John Doe",
    email: "john@example.com",
    summary:
      "Experienced frontend developer with 5+ years of experience building modern web applications. Specialized in React and TypeScript.",
    employment: [
      {
        id: 1,
        employer: "TechCorp",
        role: "Senior Frontend Developer",
        period: "2020 - Present",
        description: "Leading frontend development team, implementing new features and mentoring junior developers.",
        salary: "$120,000 - $150,000",
      },
      {
        id: 2,
        employer: "WebStudio",
        role: "Frontend Developer",
        period: "2018 - 2020",
        description: "Developed responsive web applications using React and TypeScript.",
        salary: "$90,000 - $110,000",
      },
    ],
    education: [
      {
        id: 1,
        institution: "Tech University",
        degree: "BSc Computer Science",
        year: "2018",
        description: "Focus on web technologies and software engineering",
      },
    ],
    cvs: [
      {
        id: 1,
        name: "Main CV",
        lastUpdated: "2024-02-24",
        size: "245 KB",
      },
      {
        id: 2,
        name: "Technical CV",
        lastUpdated: "2024-02-20",
        size: "180 KB",
      },
    ],
    boards: [
      {
        id: 1,
        name: "Frontend Developer",
        jobCount: 245,
        lastUpdated: "2 hours ago",
      },
      {
        id: 2,
        name: "React Developer",
        jobCount: 156,
        lastUpdated: "1 day ago",
      },
    ],
    bookmarkedJobs: [
      {
        id: 1,
        title: "Senior Frontend Developer",
        company: "TechCorp",
        location: "San Francisco, CA",
        matchScore: 92,
      },
      {
        id: 2,
        title: "Lead React Developer",
        company: "StartupCo",
        location: "Remote",
        matchScore: 88,
      },
    ],
  }

  return (
    <div className="min-h-screen bg-background p-4 md:p-6">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Profile Header */}
        <Card>
          <CardHeader>
            <div className="flex items-start justify-between">
              <div>
                <CardTitle className="text-2xl">{profile.name}</CardTitle>
                <CardDescription>{profile.email}</CardDescription>
              </div>
              <Button variant="outline" size="icon">
                <Pencil className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">{profile.summary}</p>
          </CardContent>
        </Card>

        {/* Employment History */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Briefcase className="h-5 w-5" />
                <CardTitle>Employment History</CardTitle>
              </div>
              <Button variant="outline" size="sm">
                <Plus className="h-4 w-4 mr-2" />
                Add Position
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            {profile.employment.map((job) => (
              <div key={job.id} className="space-y-2">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-semibold">{job.role}</h3>
                    <p className="text-sm text-muted-foreground">
                      {job.employer} • {job.period}
                    </p>
                  </div>
                  <div className="flex space-x-2">
                    <Button variant="ghost" size="icon">
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">{job.description}</p>
                {job.salary && <Badge variant="secondary">{job.salary}</Badge>}
                <Separator className="mt-4" />
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Education */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <GraduationCap className="h-5 w-5" />
                <CardTitle>Education</CardTitle>
              </div>
              <Button variant="outline" size="sm">
                <Plus className="h-4 w-4 mr-2" />
                Add Education
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            {profile.education.map((edu) => (
              <div key={edu.id} className="space-y-2">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-semibold">{edu.degree}</h3>
                    <p className="text-sm text-muted-foreground">
                      {edu.institution} • {edu.year}
                    </p>
                  </div>
                  <div className="flex space-x-2">
                    <Button variant="ghost" size="icon">
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">{edu.description}</p>
                <Separator className="mt-4" />
              </div>
            ))}
          </CardContent>
        </Card>

        {/* CVs */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <FileText className="h-5 w-5" />
                <CardTitle>My CVs</CardTitle>
              </div>
              <Button variant="outline" size="sm">
                <Plus className="h-4 w-4 mr-2" />
                Upload CV
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {profile.cvs.map((cv) => (
                <div key={cv.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <h3 className="font-medium">{cv.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      Updated {cv.lastUpdated} • {cv.size}
                    </p>
                  </div>
                  <div className="flex space-x-2">
                    <Button variant="ghost" size="icon">
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Job Boards */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <LayoutGrid className="h-5 w-5" />
                <CardTitle>My Boards</CardTitle>
              </div>
              <Button variant="outline" size="sm">
                <Plus className="h-4 w-4 mr-2" />
                Create Board
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {profile.boards.map((board) => (
                <div key={board.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <h3 className="font-medium">{board.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      {board.jobCount} jobs • Last updated {board.lastUpdated}
                    </p>
                  </div>
                  <div className="flex space-x-2">
                    <Button variant="ghost" size="icon">
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Bookmarked Jobs */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <BookMarked className="h-5 w-5" />
                <CardTitle>Bookmarked Jobs</CardTitle>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {profile.bookmarkedJobs.map((job) => (
                <div key={job.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <h3 className="font-medium">{job.title}</h3>
                    <p className="text-sm text-muted-foreground">
                      {job.company} • {job.location}
                    </p>
                  </div>
                  <div className="flex items-center space-x-4">
                    <Badge variant="secondary">{job.matchScore}% Match</Badge>
                    <Button variant="ghost" size="icon">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}


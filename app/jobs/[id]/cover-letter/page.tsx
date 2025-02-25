"use client"

import { useState } from "react"
import { useParams } from "next/navigation"
import { ArrowLeft, Copy, RefreshCw, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { useGenerateCoverLetter } from "@/hooks/use-cover-letter"
import { toast } from "sonner"

export default function CoverLetterPage() {
  const params = useParams()
  const [context, setContext] = useState("")
  const [coverLetter, setCoverLetter] = useState("")
  const [copied, setCopied] = useState(false)

  const generateLetter = useGenerateCoverLetter()

  const handleGenerate = async () => {
    try {
      // In a real app, you'd get these from auth/context
      const userId = "user123"
      const boardId = "board123"

      const result = await generateLetter.mutateAsync({
        user_id: userId,
        job_id: params.id,
        board_id: boardId,
      })

      // Assuming the content has a 'text' field
      setCoverLetter(result.cover_letter_text || "")
      toast.success("Cover letter generated successfully!")
    } catch (error) {
      toast.error("Failed to generate cover letter")
    }
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(coverLetter)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="min-h-screen bg-background p-4 md:p-6">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="flex items-center justify-between">
          <Link href={`/jobs/${params.id}`}>
            <Button variant="ghost" size="sm">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Job
            </Button>
          </Link>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Generate Cover Letter</CardTitle>
            <CardDescription>Add any specific context you&apos;d like to include in your cover letter</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Textarea
              placeholder="E.g., I recently completed a similar project using the same tech stack..."
              className="min-h-[100px]"
              value={context}
              onChange={(e) => setContext(e.target.value)}
            />
            <Button onClick={handleGenerate} disabled={generateLetter.isPending}>
              {generateLetter.isPending ? (
                <>
                  <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                  Generating...
                </>
              ) : (
                "Generate Cover Letter"
              )}
            </Button>
          </CardContent>
        </Card>

        {generateLetter.isPending ? (
          <Card>
            <CardContent className="p-6">
              <div className="space-y-4">
                <div className="h-4 bg-muted rounded w-3/4 animate-pulse" />
                <div className="h-4 bg-muted rounded w-1/2 animate-pulse" />
                <div className="h-4 bg-muted rounded w-5/6 animate-pulse" />
                <div className="h-4 bg-muted rounded w-2/3 animate-pulse" />
                <div className="h-4 bg-muted rounded w-4/5 animate-pulse" />
              </div>
            </CardContent>
          </Card>
        ) : coverLetter ? (
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Your Cover Letter</CardTitle>
                <div className="flex gap-2">
                  <Button variant="outline" onClick={handleGenerate}>
                    <RefreshCw className="h-4 w-4 mr-2" />
                    Regenerate
                  </Button>
                  <Button variant="outline" onClick={copyToClipboard}>
                    {copied ? (
                      <>
                        <CheckCircle className="h-4 w-4 mr-2 text-green-500" />
                        Copied!
                      </>
                    ) : (
                      <>
                        <Copy className="h-4 w-4 mr-2" />
                        Copy
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="prose prose-blue dark:prose-invert max-w-none">
                <pre className="whitespace-pre-wrap font-sans">{coverLetter}</pre>
              </div>
            </CardContent>
          </Card>
        ) : null}
      </div>
    </div>
  )
}


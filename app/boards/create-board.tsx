"use client"

import { useFormStatus } from "react-dom"
import { useRouter } from "next/navigation"
import { createBoard } from "@/app/actions"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { toast } from "sonner"

export function CreateBoardForm() {
  const router = useRouter()
  const { pending } = useFormStatus()

  async function handleSubmit(formData: FormData) {
    const result = await createBoard(formData)

    if (result.error) {
      toast.error(result.error)
      return
    }

    toast.success("Board created successfully")
    router.refresh()
  }

  return (
    <form action={handleSubmit} className="space-y-4">
      <Input type="text" name="prompt" placeholder="Create a new job board..." required />
      <Button type="submit" disabled={pending}>
        {pending ? "Creating..." : "Create Board"}
      </Button>
    </form>
  )
}


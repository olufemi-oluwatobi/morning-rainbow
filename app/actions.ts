"use server"

import { z } from "zod"
import { revalidatePath } from "next/cache"

const CreateBoardSchema = z.object({
  prompt: z.string().min(1),
})

export async function createBoard(formData: FormData) {
  const result = CreateBoardSchema.safeParse({
    prompt: formData.get("prompt"),
  })

  if (!result.success) {
    return { error: "Invalid input" }
  }

  try {
    // Your board creation logic here
    // Using the new recommended pattern for server actions

    revalidatePath("/boards")
    return { success: true }
  } catch (error) {
    return { error: "Failed to create board" }
  }
}


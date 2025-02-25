// Move the existing boards page content here
// Update imports to include auth check
import { auth } from "@clerk/nextjs"
import { redirect } from "next/navigation"

export default async function BoardsPage() {
  const { userId } = await auth()

  if (!userId) {
    redirect("/sign-in")
  }

  // Rest of the existing boards page component...
}


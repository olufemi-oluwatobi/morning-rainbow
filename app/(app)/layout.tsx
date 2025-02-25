import type React from "react"
import { Nav } from "@/components/nav"

export default function AppLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="relative flex min-h-screen flex-col">
      <Nav />
      <main className="flex-1">{children}</main>
    </div>
  )
}


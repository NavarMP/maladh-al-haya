"use client" // Mark as Client Component

import type React from "react"

import { useEffect } from "react"

export default function ClientWrapper({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Remove the unexpected attribute
    document.body.removeAttribute("inmaintabuse")
  }, [])

  return <>{children}</>
}


"use client"

import { useState, useEffect } from "react"
import { cn } from "@/lib/utils"

export default function CursorEffect() {
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [clicked, setClicked] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const [linkHovered, setLinkHovered] = useState(false)
  const [isTouch, setIsTouch] = useState(false)
  const [isActive, setIsActive] = useState(false)

  useEffect(() => {
    // Check if device is touch-based
    const isTouchDevice = () => {
      return "ontouchstart" in window || navigator.maxTouchPoints > 0
    }

    setIsTouch(isTouchDevice())

    if (isTouchDevice()) return

    let timeout: NodeJS.Timeout

    const addEventListeners = () => {
      document.addEventListener("mousemove", onMouseMove)
      document.addEventListener("mouseenter", onMouseEnter)
      document.addEventListener("mouseleave", onMouseLeave)
      document.addEventListener("mousedown", onMouseDown)
      document.addEventListener("mouseup", onMouseUp)
      document.addEventListener("mouseover", onMouseOver)
    }

    const removeEventListeners = () => {
      document.removeEventListener("mousemove", onMouseMove)
      document.removeEventListener("mouseenter", onMouseEnter)
      document.removeEventListener("mouseleave", onMouseLeave)
      document.removeEventListener("mousedown", onMouseDown)
      document.removeEventListener("mouseup", onMouseUp)
      document.removeEventListener("mouseover", onMouseOver)
    }

    const onMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY })
      setIsActive(true)

      // Auto-hide cursor after 3 seconds of inactivity
      clearTimeout(timeout)
      timeout = setTimeout(() => {
        setIsActive(false)
      }, 3000)
    }

    const onMouseEnter = () => {
      setIsVisible(true)
    }

    const onMouseLeave = () => {
      setIsVisible(false)
    }

    const onMouseDown = () => {
      setClicked(true)
    }

    const onMouseUp = () => {
      setClicked(false)
    }

    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (
        target.tagName.toLowerCase() === "a" ||
        target.tagName.toLowerCase() === "button" ||
        target.closest("a") ||
        target.closest("button")
      ) {
        setLinkHovered(true)
      } else {
        setLinkHovered(false)
      }
    }

    addEventListeners()
    return () => {
      removeEventListeners()
      clearTimeout(timeout)
    }
  }, [])

  if (isTouch) return null

  return (
    <>
      <div
        className={cn(
          "custom-cursor rounded-full mix-blend-difference",
          isVisible && "block",
          isActive && "active",
          clicked && "scale-75",
          linkHovered ? "h-8 w-8 bg-white" : "h-4 w-4 bg-white",
        )}
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          transform: "translate(-50%, -50%)",
        }}
      />
      <div
        className={cn(
          "custom-cursor rounded-full border border-white/30 mix-blend-difference",
          isVisible && "block",
          isActive && "active",
          linkHovered ? "h-16 w-16" : "h-10 w-10",
        )}
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          transform: "translate(-50%, -50%)",
          transition: "width 0.2s, height 0.2s, opacity 0.3s",
        }}
      />
    </>
  )
}


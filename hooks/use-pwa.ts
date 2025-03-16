"use client"

import { useState, useEffect } from "react"
import { useLocalStorage } from "./use-local-storage"

type BeforeInstallPromptEvent = Event & {
  prompt: () => Promise<void>
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>
}

export function usePWA() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null)
  const [isInstallable, setIsInstallable] = useState(false)
  const [isInstalled, setIsInstalled] = useState(false)
  const [showPrompt, setShowPrompt] = useState(false)
  const [promptDismissed, setPromptDismissed] = useLocalStorage("pwa-prompt-dismissed", false)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    // Check if device is mobile
    const checkMobile = () => {
      setIsMobile(/Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent))
    }

    checkMobile()

    const handleBeforeInstallPrompt = (e: Event) => {
      // Prevent Chrome 67 and earlier from automatically showing the prompt
      e.preventDefault()
      // Stash the event so it can be triggered later
      setDeferredPrompt(e as BeforeInstallPromptEvent)
      setIsInstallable(true)

      // Show prompt after a short delay
      setTimeout(() => {
        if (isMobile && !promptDismissed) {
          setShowPrompt(true)
        }
      }, 3000)
    }

    const handleAppInstalled = () => {
      setIsInstalled(true)
      setIsInstallable(false)
      setDeferredPrompt(null)
      setShowPrompt(false)
    }

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt)
    window.addEventListener("appinstalled", handleAppInstalled)

    // Check if app is already installed
    if (window.matchMedia("(display-mode: standalone)").matches) {
      setIsInstalled(true)
    }

    return () => {
      window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt)
      window.removeEventListener("appinstalled", handleAppInstalled)
    }
  }, [isMobile, promptDismissed])

  const showInstallPrompt = async () => {
    if (!deferredPrompt) {
      // If no deferred prompt is available, try to show the native install prompt
      alert("Please use your browser's install option to add this app to your home screen.")
      return
    }

    // Show the install prompt
    deferredPrompt.prompt()

    try {
      // Wait for the user to respond to the prompt
      const { outcome } = await deferredPrompt.userChoice

      if (outcome === "accepted") {
        setIsInstalled(true)
        console.log("User accepted the install prompt")
      } else {
        setPromptDismissed(true)
        console.log("User dismissed the install prompt")
      }
    } catch (error) {
      console.error("Error with install prompt:", error)
    }

    // We've used the prompt, and can't use it again, discard it
    setDeferredPrompt(null)
    setShowPrompt(false)
  }

  const dismissPrompt = () => {
    setShowPrompt(false)
    setPromptDismissed(true)
  }

  return {
    isInstallable,
    isInstalled,
    showPrompt,
    showInstallPrompt,
    dismissPrompt,
  }
}


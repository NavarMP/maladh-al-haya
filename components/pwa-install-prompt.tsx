"use client"
import { Button } from "@/components/ui/button"
import { X } from "lucide-react"
import { cn } from "@/lib/utils"
import { usePWA } from "@/hooks/use-pwa"
import { useLanguage } from "./language-provider"

export default function PWAInstallPrompt() {
  const { showPrompt, showInstallPrompt, dismissPrompt } = usePWA()
  const { t } = useLanguage()

  return (
    <div className={cn("pwa-prompt", !showPrompt && "hidden")}>
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-medium">{t("installApp")}</h3>
          <p className="text-sm text-muted-foreground">{t("installAppDescription")}</p>
        </div>
        <div className="flex gap-2">
          <Button size="sm" onClick={showInstallPrompt}>
            {t("install")}
          </Button>
          <Button variant="ghost" size="icon" onClick={dismissPrompt}>
            <X className="h-4 w-4" />
            <span className="sr-only">{t("dismiss")}</span>
          </Button>
        </div>
      </div>
    </div>
  )
}
"use client"

import { useEffect } from "react"
import Link from "next/link"
import { X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { useLanguage } from "./language-provider"
import { useSideMenu } from "@/hooks/use-side-menu"
import { usePathname } from "next/navigation"

export default function SideMenu() {
  const { t } = useLanguage()
  const { isOpen, closeSideMenu } = useSideMenu()
  const pathname = usePathname()

  // Close side menu when route changes
  useEffect(() => {
    closeSideMenu()
  }, [pathname, closeSideMenu])

  // Handle mouse approach to left edge
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (e.clientX < 20 && !isOpen) {
        useSideMenu.getState().openSideMenu()
      }
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [isOpen])

  return (
    <>
      <div className={cn("side-menu", isOpen && "open")} onClick={closeSideMenu}>
        <div className="h-full p-6 overflow-y-auto" onClick={(e) => e.stopPropagation()}>
          <div className="flex justify-between items-center mb-8">
            <div className="flex items-center gap-2">
              <div className="h-10 w-10 rounded-full bg-primary flex items-center justify-center">
                <span className="text-primary-foreground font-bold">MH</span>
              </div>
              <div className="flex flex-col">
                <span className="brand-arabic text-xl">ملاذ الحياء</span>
                <span className="text-xs text-muted-foreground">Maladh Al Haya</span>
              </div>
            </div>
            <Button variant="ghost" size="icon" onClick={closeSideMenu}>
              <X className="h-5 w-5" />
              <span className="sr-only">Close</span>
            </Button>
          </div>

          <nav className="space-y-4">
            <Link
              href="/"
              className={cn(
                "block py-2 px-4 rounded-md transition-colors",
                pathname === "/" ? "bg-primary/10 text-primary" : "hover:bg-muted",
              )}
            >
              {t("home")}
            </Link>
            <Link
              href="/products"
              className={cn(
                "block py-2 px-4 rounded-md transition-colors",
                pathname === "/products" ? "bg-primary/10 text-primary" : "hover:bg-muted",
              )}
            >
              {t("products")}
            </Link>
            <Link
              href="/categories"
              className={cn(
                "block py-2 px-4 rounded-md transition-colors",
                pathname === "/categories" ? "bg-primary/10 text-primary" : "hover:bg-muted",
              )}
            >
              {t("categories")}
            </Link>

            <div className="pt-4 border-t">
              <h3 className="font-medium mb-2">Categories</h3>
              <div className="space-y-2">
                <Link href="/products/kandura" className="block py-1 px-4 hover:text-primary">
                  Kandura
                </Link>
                <Link href="/products/jubba" className="block py-1 px-4 hover:text-primary">
                  Jubba
                </Link>
                <Link href="/products/kurta" className="block py-1 px-4 hover:text-primary">
                  Kurta
                </Link>
                <Link href="/products/mund" className="block py-1 px-4 hover:text-primary">
                  Mund
                </Link>
                <Link href="/products/turban" className="block py-1 px-4 hover:text-primary">
                  Turban
                </Link>
                <Link href="/products/shall" className="block py-1 px-4 hover:text-primary">
                  Shall
                </Link>
                <Link href="/products/abaya" className="block py-1 px-4 hover:text-primary">
                  Abaya
                </Link>
                <Link href="/products/hijab" className="block py-1 px-4 hover:text-primary">
                  Hijab
                </Link>
              </div>
            </div>
          </nav>
        </div>
      </div>
      {isOpen && <div className="fixed inset-0 bg-background/50 backdrop-blur-sm z-20" onClick={closeSideMenu} />}
    </>
  )
}


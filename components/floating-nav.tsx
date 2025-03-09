"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Home, ShoppingCart, User } from "lucide-react"
import { cn } from "@/lib/utils"
import { useLanguage } from "./language-provider"
import { usePathname } from "next/navigation"
import { Badge } from "@/components/ui/badge"
import { useCart } from "@/hooks/use-cart"

export default function FloatingNav() {
  const [isVisible, setIsVisible] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)
  const { t } = useLanguage()
  const pathname = usePathname()
  const { cartCount } = useCart()

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY

      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false)
      } else {
        setIsVisible(true)
      }

      setLastScrollY(currentScrollY)
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [lastScrollY])

  return (
    <div className={cn("floating-nav", !isVisible && "hidden-nav")}>
      <div className="flex items-center justify-around p-3 w-64">
        <Link href="/">
          <div className="flex flex-col items-center">
            <div
              className={cn(
                "p-2 rounded-full transition-colors",
                pathname === "/" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground",
              )}
            >
              <Home className="h-5 w-5" />
            </div>
            <span className="text-xs mt-1">{t("home")}</span>
          </div>
        </Link>

        <Link href="/cart">
          <div className="flex flex-col items-center">
            <div
              className={cn(
                "p-2 rounded-full transition-colors relative",
                pathname === "/cart"
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground",
              )}
            >
              <ShoppingCart className="h-5 w-5" />
              {cartCount > 0 && (
                <Badge
                  className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0"
                  variant="destructive"
                >
                  {cartCount}
                </Badge>
              )}
            </div>
            <span className="text-xs mt-1">{t("cart")}</span>
          </div>
        </Link>

        <Link href="/profile">
          <div className="flex flex-col items-center">
            <div
              className={cn(
                "p-2 rounded-full transition-colors",
                pathname === "/profile"
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground",
              )}
            >
              <User className="h-5 w-5" />
            </div>
            <span className="text-xs mt-1">{t("profile")}</span>
          </div>
        </Link>
      </div>
    </div>
  )
}


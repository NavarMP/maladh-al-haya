"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { useLanguage } from "@/components/language-provider"
import { ModeToggle } from "@/components/mode-toggle"
import { LanguageToggle } from "@/components/language-toggle"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, ShoppingCart, User, Menu } from "lucide-react"
import { cn } from "@/lib/utils"
import { usePathname } from "next/navigation"
import { Badge } from "@/components/ui/badge"
import { useSideMenu } from "@/hooks/use-side-menu"
import { useCart } from "@/hooks/use-cart"
import Image from "next/image"

export default function Header() {
  const {t, dir} = useLanguage()
  const [isScrolled, setIsScrolled] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const pathname = usePathname()
  const { openSideMenu } = useSideMenu()
  const { cartCount } = useCart()
  
  // Use useRef to store the timeout ID with proper typing
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)
  // Use useRef to store the header element to avoid null checks
  const headerRef = useRef<HTMLElement>(null)

  useEffect(() => {
    let lastScrollY = window.scrollY
    let ticking = false

    const handleScroll = () => {
      const currentScrollY = window.scrollY

      if (!ticking) {
        window.requestAnimationFrame(() => {
          // Set isScrolled based on scroll position
          setIsScrolled(currentScrollY > 50)

          // Get the header element safely
          const headerElement = headerRef.current
          
          // Only apply transform if header element exists
          if (headerElement) {
            // Hide header when scrolling (both up and down)
            if (Math.abs(currentScrollY - lastScrollY) > 5) {
              headerElement.style.transform = "translateY(-100%)"
            }

            lastScrollY = currentScrollY
            ticking = false

            // Clear previous timeout
            if (timeoutRef.current) {
              clearTimeout(timeoutRef.current)
            }

            // Set timeout to show header when scrolling stops
            timeoutRef.current = setTimeout(() => {
              headerElement.style.transform = "translateY(0)"
            }, 500)
          }
        })

        ticking = true
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => {
      window.removeEventListener("scroll", handleScroll)
      
      // Clean up timeout on unmount
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [])

  return (
    <header
      ref={headerRef}
      className={cn(
        "sticky top-0 z-40 w-full transition-all duration-300",
        isScrolled ? "bg-background/80 backdrop-blur-md shadow-md py-2" : "bg-background py-4",
      )}
      style={{ transition: "transform 0.3s ease-in-out" }}
      dir={dir()} // Call the function to get "ltr" or "rtl"
    >
      <div className="container flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" className="md:hidden" onClick={openSideMenu}>
            <Menu className="h-5 w-5" />
            <span className="sr-only">Menu</span>
          </Button>
          <Link href="/" className="flex items-center gap-2">
            <div className="h-10 w-10 relative">
              <Image src="/assets/logo.svg" alt="Maladh Al Haya Logo" fill priority />
            </div>
            <div className="flex flex-col">
              <span className="brand-arabic text-xl">ملاذ الحياء</span>
              <span className="text-xs text-muted-foreground">Maladh Al Haya</span>
            </div>
          </Link>
        </div>

        <nav className="hidden md:flex items-center gap-6">
          <Link
            href="/"
            className={cn(
              "text-sm font-medium transition-colors hover:text-primary",
              pathname === "/" ? "text-primary" : "text-muted-foreground",
            )}
          >
            {t("home")}
          </Link>
          <Link
            href="/products"
            className={cn(
              "text-sm font-medium transition-colors hover:text-primary",
              pathname === "/products" ? "text-primary" : "text-muted-foreground",
            )}
          >
            {t("products")}
          </Link>
          <Link
            href="/categories"
            className={cn(
              "text-sm font-medium transition-colors hover:text-primary",
              pathname === "/categories" ? "text-primary" : "text-muted-foreground",
            )}
          >
            {t("categories")}
          </Link>
        </nav>

        <div className="flex items-center gap-2">
          <div className={cn("transition-all duration-300 overflow-hidden", isSearchOpen ? "w-64" : "w-0")}>
            <div className="relative">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input placeholder={t("search")} className="pl-8" onBlur={() => setIsSearchOpen(false)} />
            </div>
          </div>
          <Button variant="ghost" size="icon" onClick={() => setIsSearchOpen(!isSearchOpen)}>
            <Search className="h-5 w-5" />
            <span className="sr-only">{t("search")}</span>
          </Button>
          <LanguageToggle />
          <ModeToggle />
          <Link href="/cart">
            <Button variant="ghost" size="icon" className="relative">
              <ShoppingCart className="h-5 w-5" />
              {cartCount > 0 && (
                <Badge
                  className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0"
                  variant="destructive"
                >
                  {cartCount}
                </Badge>
              )}
              <span className="sr-only">{t("cart")}</span>
            </Button>
          </Link>
          <Link href="/profile">
            <Button variant="ghost" size="icon">
              <User className="h-5 w-5" />
              <span className="sr-only">{t("profile")}</span>
            </Button>
          </Link>
        </div>
      </div>
    </header>
  )
}
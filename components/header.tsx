"use client"

import { useState, useEffect } from "react"
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

export default function Header() {
  const { t, dir } = useLanguage()
  const [isScrolled, setIsScrolled] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const pathname = usePathname()
  const { openSideMenu } = useSideMenu()
  const { cartCount } = useCart()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header
      className={cn(
        "sticky top-0 z-40 w-full transition-all duration-300",
        isScrolled ? "bg-background/80 backdrop-blur-md shadow-md py-2" : "bg-background py-4",
      )}
    >
      <div className="container flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" className="md:hidden" onClick={openSideMenu}>
            <Menu className="h-5 w-5" />
            <span className="sr-only">Menu</span>
          </Button>
          <Link href="/" className="flex items-center gap-2">
            <div className="h-10 w-10 rounded-full bg-primary flex items-center justify-center">
              <span className="text-primary-foreground font-bold">MH</span>
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


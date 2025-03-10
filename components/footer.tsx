"use client"

import Link from "next/link"
// import { useLanguage } from "./language-provider"
import { Facebook, Instagram, Twitter, Youtube } from "lucide-react"

export default function Footer() {
  // const { t } = useLanguage()

  return (
    <footer className="bg-muted/30 pt-12 pb-6 mt-12">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="h-10 w-10 rounded-full bg-primary flex items-center justify-center">
                <span className="text-primary-foreground font-bold">MH</span>
              </div>
              <div className="flex flex-col">
                <span className="brand-arabic text-xl">ملاذ الحياء</span>
                <span className="text-xs text-muted-foreground">Maladh Al Haya</span>
              </div>
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              Your destination for authentic Islamic clothing and items.
            </p>
            <div className="flex gap-4">
              <Link href="#" className="text-muted-foreground hover:text-primary">
                <Facebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-primary">
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-primary">
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-primary">
                <Youtube className="h-5 w-5" />
                <span className="sr-only">Youtube</span>
              </Link>
            </div>
          </div>

          <div>
            <h3 className="font-medium mb-4">Categories</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/products/kandura" className="text-muted-foreground hover:text-primary">
                  Kandura
                </Link>
              </li>
              <li>
                <Link href="/products/jubba" className="text-muted-foreground hover:text-primary">
                  Jubba
                </Link>
              </li>
              <li>
                <Link href="/products/kurta" className="text-muted-foreground hover:text-primary">
                  Kurta
                </Link>
              </li>
              <li>
                <Link href="/products/hijab" className="text-muted-foreground hover:text-primary">
                  Hijab
                </Link>
              </li>
              <li>
                <Link href="/products/abaya" className="text-muted-foreground hover:text-primary">
                  Abaya
                </Link>
              </li>
              <li>
                <Link href="/products" className="text-primary hover:underline">
                  View All
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-medium mb-4">Information</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/about" className="text-muted-foreground hover:text-primary">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-muted-foreground hover:text-primary">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/shipping" className="text-muted-foreground hover:text-primary">
                  Shipping & Returns
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-muted-foreground hover:text-primary">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-muted-foreground hover:text-primary">
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-muted-foreground hover:text-primary">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-medium mb-4">Contact</h3>
            <ul className="space-y-2 text-sm">
              <li className="text-muted-foreground">Kerala, India</li>
              <li>
                <a href="tel:+971123456789" className="text-muted-foreground hover:text-primary">
                  +91 9746 902268
                </a>
              </li>
              <li>
                <a href="mailto:info@maladhalhaya.com" className="text-muted-foreground hover:text-primary">
                  navarmp@gmail.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t mt-12 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} Maladh Al Haya. All rights reserved.
          </p>
          <p className="text-sm text-muted-foreground mt-2 md:mt-0">
            Designed & Developed by{" "}
            <a
              href="https://navarmp.digibayt.com"
              className="text-primary hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              Muhammed Navar
            </a>
          </p>
        </div>
      </div>
    </footer>
  )
}


import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import localFont from "next/font/local"
import "./globals.css"
// import { ThemeProvider } from "@/components/theme-provider"
import { LanguageProvider } from "@/components/language-provider"
import Header from "@/components/header"
import Footer from "@/components/footer"
import FloatingNav from "@/components/floating-nav"
import SideMenu from "@/components/side-menu"
import CursorEffect from "@/components/cursor-effect"
import { Toaster } from "@/components/ui/toaster"

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" })

const monadi = localFont({
  src: "/assets/fonts/Monadi Reguler.ttf",
  variable: "--font-monadi",
  display: "swap",
})

export const metadata: Metadata = {
  title: "ملاذ الحياء | Maladh Al Haya",
  description: "Islamic clothing and items for Muslims and Islamic students",
  manifest: "/manifest.json",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/icon-192x192.png" />
      </head>
      <body className={`${inter.variable} ${monadi.variable} font-sans`}>
        {/* <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange> */}
          <LanguageProvider>
            <CursorEffect />
            <div className="relative min-h-screen flex flex-col">
              <Header />
              <SideMenu />
              <main className="flex-1">{children}</main>
              <Footer />
              <FloatingNav />
            </div>
            <Toaster />
          </LanguageProvider>
        {/* </ThemeProvider> */}
      </body>
    </html>
  )
}


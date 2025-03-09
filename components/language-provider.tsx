"use client"

import type React from "react"

import { createContext, useContext, useEffect } from "react"
import { useLocalStorage } from "@/hooks/use-local-storage"

type Language = "en" | "ar" | "ml"

type Translations = {
  [key: string]: {
    [key in Language]: string
  }
}

// Sample translations
const translations: Translations = {
  home: {
    en: "Home",
    ar: "الرئيسية",
    ml: "ഹോം",
  },
  products: {
    en: "Products",
    ar: "المنتجات",
    ml: "ഉൽപ്പന്നങ്ങൾ",
  },
  cart: {
    en: "Cart",
    ar: "عربة التسوق",
    ml: "കാർട്ട്",
  },
  profile: {
    en: "Profile",
    ar: "الملف الشخصي",
    ml: "പ്രൊഫൈൽ",
  },
  login: {
    en: "Login",
    ar: "تسجيل الدخول",
    ml: "ലോഗിൻ",
  },
  signup: {
    en: "Sign Up",
    ar: "التسجيل",
    ml: "സൈൻ അപ്പ്",
  },
  search: {
    en: "Search",
    ar: "بحث",
    ml: "തിരയുക",
  },
  categories: {
    en: "Categories",
    ar: "التصنيفات",
    ml: "വിഭാഗങ്ങൾ",
  },
  addToCart: {
    en: "Add to Cart",
    ar: "أضف إلى السلة",
    ml: "കാർട്ടിലേക്ക് ചേർക്കുക",
  },
  buyNow: {
    en: "Buy Now",
    ar: "اشتر الآن",
    ml: "ഇപ്പോൾ വാങ്ങുക",
  },
  seeAll: {
    en: "See All",
    ar: "عرض الكل",
    ml: "എല്ലാം കാണുക",
  },
  // Add more translations as needed
}

type LanguageContextType = {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
  dir: () => "ltr" | "rtl"
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useLocalStorage<Language>("language", "en")

  const setLanguage = (lang: Language) => {
    setLanguageState(lang)
    document.documentElement.lang = lang
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr"
  }

  const t = (key: string): string => {
    return translations[key]?.[language] || key
  }

  const dir = (): "ltr" | "rtl" => {
    return language === "ar" ? "rtl" : "ltr"
  }

  useEffect(() => {
    document.documentElement.lang = language
    document.documentElement.dir = language === "ar" ? "rtl" : "ltr"
  }, [language])

  return <LanguageContext.Provider value={{ language, setLanguage, t, dir }}>{children}</LanguageContext.Provider>
}

export const useLanguage = () => {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}


"use client"

import type React from "react"

import { useState, useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { useLanguage } from "@/components/language-provider"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Heart, ShoppingCart, ChevronRight, ChevronLeft } from "lucide-react"
import { cn } from "@/lib/utils"
import { useCart } from "@/hooks/use-cart"
import { usePWA } from "@/hooks/use-pwa"
import { motion } from "framer-motion"

// Sample featured products
const featuredProducts = [
  {
    id: "1",
    name: "Premium White Kandura",
    price: 1299,
    image: "/placeholder.svg?height=600&width=400",
    category: "kandura",
    description: "Elegant white kandura made from premium cotton for maximum comfort and style.",
    features: ["100% Cotton", "Hand-stitched", "Breathable fabric", "Traditional design"],
  },
  {
    id: "2",
    name: "Classic Jubba",
    price: 1499,
    image: "/placeholder.svg?height=600&width=400",
    category: "jubba",
    description: "Classic jubba with modern touches, perfect for daily wear and special occasions.",
    features: ["Premium fabric", "Comfortable fit", "Elegant design", "Multiple sizes available"],
  },
  {
    id: "3",
    name: "Silk Turban",
    price: 599,
    image: "/placeholder.svg?height=600&width=400",
    category: "turban",
    description: "Luxurious silk turban that adds elegance to your traditional attire.",
    features: ["Pure silk", "Easy to wrap", "Comfortable fit", "Elegant finish"],
  },
]

// Sample categories with products
const categories = [
  {
    name: "Kandura",
    products: [
      {
        id: "4",
        name: "White Kandura",
        price: 999,
        image: "/placeholder.svg?height=300&width=300",
      },
      {
        id: "5",
        name: "Embroidered Kandura",
        price: 1599,
        image: "/placeholder.svg?height=300&width=300",
      },
      {
        id: "6",
        name: "Premium Kandura",
        price: 1899,
        image: "/placeholder.svg?height=300&width=300",
      },
      {
        id: "7",
        name: "Daily Wear Kandura",
        price: 799,
        image: "/placeholder.svg?height=300&width=300",
      },
    ],
  },
  {
    name: "Jubba",
    products: [
      {
        id: "8",
        name: "Classic Jubba",
        price: 1299,
        image: "/placeholder.svg?height=300&width=300",
      },
      {
        id: "9",
        name: "Modern Jubba",
        price: 1499,
        image: "/placeholder.svg?height=300&width=300",
      },
      {
        id: "10",
        name: "Premium Jubba",
        price: 1899,
        image: "/placeholder.svg?height=300&width=300",
      },
      {
        id: "11",
        name: "Casual Jubba",
        price: 999,
        image: "/placeholder.svg?height=300&width=300",
      },
    ],
  },
  {
    name: "Hijab & Abaya",
    products: [
      {
        id: "12",
        name: "Silk Hijab",
        price: 499,
        image: "/placeholder.svg?height=300&width=300",
      },
      {
        id: "13",
        name: "Premium Abaya",
        price: 1999,
        image: "/placeholder.svg?height=300&width=300",
      },
      {
        id: "14",
        name: "Daily Wear Hijab",
        price: 299,
        image: "/placeholder.svg?height=300&width=300",
      },
      {
        id: "15",
        name: "Embroidered Abaya",
        price: 2499,
        image: "/placeholder.svg?height=300&width=300",
      },
    ],
  },
]

export default function Home() {
  const { t } = useLanguage()
  const { addItem } = useCart()
  const { showInstallPrompt } = usePWA()
  const [currentFeaturedIndex, setCurrentFeaturedIndex] = useState(0)
  const [touchStart, setTouchStart] = useState(0)
  const [touchEnd, setTouchEnd] = useState(0)
  const featuredRef = useRef<HTMLDivElement>(null)

  const handlePrevFeatured = () => {
    setCurrentFeaturedIndex((prev) => (prev === 0 ? featuredProducts.length - 1 : prev - 1))
  }

  const handleNextFeatured = () => {
    setCurrentFeaturedIndex((prev) => (prev === featuredProducts.length - 1 ? 0 : prev + 1))
  }

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX)
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX)
  }

  const handleTouchEnd = () => {
    if (touchStart - touchEnd > 100) {
      // Swipe left
      handleNextFeatured()
    }

    if (touchStart - touchEnd < -100) {
      // Swipe right
      handlePrevFeatured()
    }
  }

  const addToCart = (product: any) => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: 1,
    })
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section with Featured Product */}
      <section
        className="relative h-[80vh] overflow-hidden"
        ref={featuredRef}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {featuredProducts.map((product, index) => (
          <motion.div
            key={product.id}
            className={cn(
              "absolute inset-0 flex flex-col md:flex-row items-center",
              index === currentFeaturedIndex ? "opacity-100 z-10" : "opacity-0 z-0",
            )}
            initial={{ opacity: 0, x: index > currentFeaturedIndex ? 100 : -100 }}
            animate={{
              opacity: index === currentFeaturedIndex ? 1 : 0,
              x: index === currentFeaturedIndex ? 0 : index > currentFeaturedIndex ? 100 : -100,
            }}
            transition={{ duration: 0.5 }}
          >
            <div className="w-full md:w-1/2 h-1/2 md:h-full relative">
              <Image
                src={product.image || "/placeholder.svg"}
                alt={product.name}
                fill
                className="object-cover"
                priority
              />
            </div>
            <div className="w-full md:w-1/2 h-1/2 md:h-full flex items-center justify-center p-8 bg-gradient-to-r from-background/90 to-background">
              <div className="max-w-md space-y-6">
                <Badge className="mb-2">{product.category}</Badge>
                <h1 className="text-4xl font-bold tracking-tight">{product.name}</h1>
                <p className="text-muted-foreground">{product.description}</p>
                <ul className="space-y-2">
                  {product.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-primary"></span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <p className="text-2xl font-bold">₹{product.price.toLocaleString()}</p>
                <div className="flex gap-4">
                  <Button onClick={() => addToCart(product)}>
                    <ShoppingCart className="mr-2 h-4 w-4" />
                    {t("addToCart")}
                  </Button>
                  <Button variant="outline">{t("buyNow")}</Button>
                </div>
              </div>
            </div>
          </motion.div>
        ))}

        <Button
          variant="ghost"
          size="icon"
          className="absolute left-4 top-1/2 transform -translate-y-1/2 z-20 bg-background/50 backdrop-blur-sm hover:bg-background/80"
          onClick={handlePrevFeatured}
        >
          <ChevronLeft className="h-6 w-6" />
          <span className="sr-only">Previous</span>
        </Button>

        <Button
          variant="ghost"
          size="icon"
          className="absolute right-4 top-1/2 transform -translate-y-1/2 z-20 bg-background/50 backdrop-blur-sm hover:bg-background/80"
          onClick={handleNextFeatured}
        >
          <ChevronRight className="h-6 w-6" />
          <span className="sr-only">Next</span>
        </Button>

        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-20 flex gap-2">
          {featuredProducts.map((_, index) => (
            <button
              key={index}
              className={cn(
                "h-2 w-2 rounded-full transition-all",
                index === currentFeaturedIndex ? "bg-primary w-6" : "bg-muted",
              )}
              onClick={() => setCurrentFeaturedIndex(index)}
            >
              <span className="sr-only">Go to slide {index + 1}</span>
            </button>
          ))}
        </div>
      </section>

      {/* Categories Sections */}
      <div className="container py-16 space-y-24">
        {categories.map((category, index) => (
          <motion.section
            key={category.name}
            className="space-y-8"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <div className="flex items-center justify-between">
              <h2 className="text-3xl font-bold tracking-tight">{category.name}</h2>
              <Link
                href={`/products/${category.name.toLowerCase()}`}
                className="flex items-center text-primary hover:underline"
              >
                {t("seeAll")}
                <ChevronRight className="ml-1 h-4 w-4" />
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
              {category.products.map((product) => (
                <Link href={`/products/${product.id}`} key={product.id}>
                  <Card className="product-card overflow-hidden h-full">
                    <div className="relative aspect-square">
                      <Image
                        src={product.image || "/placeholder.svg"}
                        alt={product.name}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                      <Button
                        variant="ghost"
                        size="icon"
                        className="absolute top-2 right-2 bg-background/50 backdrop-blur-sm hover:bg-background/80 rounded-full"
                        onClick={(e) => {
                          e.preventDefault()
                          e.stopPropagation()
                        }}
                      >
                        <Heart className="h-5 w-5" />
                        <span className="sr-only">Add to favorites</span>
                      </Button>
                    </div>
                    <CardContent className="p-4">
                      <h3 className="font-medium line-clamp-1">{product.name}</h3>
                      <p className="text-lg font-bold mt-1">₹{product.price.toLocaleString()}</p>
                      <Button
                        className="w-full mt-4"
                        onClick={(e) => {
                          e.preventDefault()
                          e.stopPropagation()
                          addToCart(product)
                        }}
                      >
                        <ShoppingCart className="mr-2 h-4 w-4" />
                        {t("addToCart")}
                      </Button>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </motion.section>
        ))}
      </div>
    </div>
  )
}


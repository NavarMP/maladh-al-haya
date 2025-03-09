"use client"

import Image from "next/image"
import Link from "next/link"
import { useLanguage } from "@/components/language-provider"
import { Card, CardContent } from "@/components/ui/card"
import { motion } from "framer-motion"

// Sample categories
const categories = [
  {
    id: "kandura",
    name: "Kandura",
    description: "Traditional Arabic dress for men",
    image: "/placeholder.svg?height=400&width=400",
  },
  {
    id: "jubba",
    name: "Jubba",
    description: "Long outer garment worn by Muslim men",
    image: "/placeholder.svg?height=400&width=400",
  },
  {
    id: "kurta",
    name: "Kurta",
    description: "Loose collarless shirt worn in many regions",
    image: "/placeholder.svg?height=400&width=400",
  },
  {
    id: "mund",
    name: "Mund",
    description: "Traditional lower garment for men",
    image: "/placeholder.svg?height=400&width=400",
  },
  {
    id: "turban",
    name: "Turban",
    description: "Traditional head covering for men",
    image: "/placeholder.svg?height=400&width=400",
  },
  {
    id: "shall",
    name: "Shall",
    description: "Elegant shawl for various occasions",
    image: "/placeholder.svg?height=400&width=400",
  },
  {
    id: "inners",
    name: "Inners",
    description: "Comfortable inner garments",
    image: "/placeholder.svg?height=400&width=400",
  },
  {
    id: "abaya",
    name: "Abaya",
    description: "Loose over-garment worn by Muslim women",
    image: "/placeholder.svg?height=400&width=400",
  },
  {
    id: "parda",
    name: "Parda",
    description: "Traditional covering for modesty",
    image: "/placeholder.svg?height=400&width=400",
  },
  {
    id: "hijab",
    name: "Hijab",
    description: "Head covering worn by Muslim women",
    image: "/placeholder.svg?height=400&width=400",
  },
  {
    id: "niqab",
    name: "Niqab",
    description: "Face veil that leaves the eyes uncovered",
    image: "/placeholder.svg?height=400&width=400",
  },
  {
    id: "fragrance",
    name: "Fragrance",
    description: "Alcohol-free perfumes and fragrances",
    image: "/placeholder.svg?height=400&width=400",
  },
  {
    id: "quran",
    name: "Quran",
    description: "Holy book of Islam in various editions",
    image: "/placeholder.svg?height=400&width=400",
  },
  {
    id: "kithabs",
    name: "Kithabs",
    description: "Islamic books and literature",
    image: "/placeholder.svg?height=400&width=400",
  },
  {
    id: "prayer-mats",
    name: "Prayer Mats",
    description: "Mats used for daily prayers",
    image: "/placeholder.svg?height=400&width=400",
  },
]

export default function CategoriesPage() {
  const { t } = useLanguage()

  return (
    <div className="container py-8">
      <h1 className="text-3xl font-bold mb-8">Categories</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {categories.map((category, index) => (
          <motion.div
            key={category.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
          >
            <Link href={`/products/${category.id}`}>
              <Card className="overflow-hidden h-full hover:shadow-lg transition-all duration-300">
                <div className="relative aspect-square">
                  <Image
                    src={category.image || "/placeholder.svg"}
                    alt={category.name}
                    fill
                    className="object-cover transition-transform duration-300 hover:scale-105"
                  />
                </div>
                <CardContent className="p-4">
                  <h3 className="font-medium text-lg">{category.name}</h3>
                  <p className="text-sm text-muted-foreground mt-1">{category.description}</p>
                </CardContent>
              </Card>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  )
}


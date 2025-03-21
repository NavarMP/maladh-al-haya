"use client"

import Image from "next/image"
import Link from "next/link"
// import { useLanguage } from "@/components/language-provider"
import { Card, CardContent } from "@/components/ui/card"
import { motion } from "framer-motion"

// Sample categories
const categories = [
  {
    id: "kandura",
    name: "Kandura",
    description: "Traditional Arabic dress for men",
    image: "/assets/images/kandura-1.avif?height=300&width=300",
  },
  {
    id: "jubba",
    name: "Jubba",
    description: "Long outer garment worn by Muslim men",
    image: "/assets/images/kandura-1.avif?height=300&width=300",
  },
  {
    id: "kurta",
    name: "Kurta",
    description: "Loose collarless shirt worn in many regions",
    image: "/assets/images/kandura-1.avif?height=300&width=300",
  },
  {
    id: "mund",
    name: "Mund",
    description: "Traditional lower garment for men",
    image: "/assets/images/kandura-1.avif?height=300&width=300",
  },
  {
    id: "turban",
    name: "Turban",
    description: "Traditional head covering for men",
    image: "/assets/images/kandura-1.avif?height=300&width=300",
  },
  {
    id: "shall",
    name: "Shall",
    description: "Elegant shawl for various occasions",
    image: "/assets/images/kandura-1.avif?height=300&width=300",
  },
  {
    id: "inners",
    name: "Inners",
    description: "Comfortable inner garments",
    image: "/assets/images/kandura-1.avif?height=300&width=300",
  },
  {
    id: "abaya",
    name: "Abaya",
    description: "Loose over-garment worn by Muslim women",
    image: "/assets/images/kandura-1.avif?height=300&width=300",
  },
  {
    id: "parda",
    name: "Parda",
    description: "Traditional covering for modesty",
    image: "/assets/images/kandura-1.avif?height=300&width=300",
  },
  {
    id: "hijab",
    name: "Hijab",
    description: "Head covering worn by Muslim women",
    image: "/assets/images/kandura-1.avif?height=300&width=300",
  },
  {
    id: "niqab",
    name: "Niqab",
    description: "Face veil that leaves the eyes uncovered",
    image: "/assets/images/kandura-1.avif?height=300&width=300",
  },
  {
    id: "fragrance",
    name: "Fragrance",
    description: "Alcohol-free perfumes and fragrances",
    image: "/assets/images/kandura-1.avif?height=300&width=300",
  },
  {
    id: "quran",
    name: "Quran",
    description: "Holy book of Islam in various editions",
    image: "/assets/images/kandura-1.avif?height=300&width=300",
  },
  {
    id: "kithabs",
    name: "Kithabs",
    description: "Islamic books and literature",
    image: "/assets/images/kandura-1.avif?height=300&width=300",
  },
  {
    id: "prayer-mats",
    name: "Prayer Mats",
    description: "Mats used for daily prayers",
    image: "/assets/images/kandura-1.avif?height=300&width=300",
  },
]

export default function CategoriesPage() {
  // const { t } = useLanguage()

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
                    src={category.image || "/assets/images/kandura-1.avif?height=300&width=300"}
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


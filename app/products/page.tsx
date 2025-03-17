"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { useLanguage } from "@/components/language-provider"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Checkbox } from "@/components/ui/checkbox"
import { Heart, ShoppingCart, Filter, X, ChevronDown, ChevronUp, SlidersHorizontal } from "lucide-react"
import { useCart } from "@/hooks/use-cart"
import { motion } from "framer-motion"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Define interfaces for our data types
interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
}

// interface CartItem extends Product {
//   quantity: number;
// }

interface Category {
  id: string;
  name: string;
}

interface PriceRange {
  min: number;
  max: number;
}

// Sample product data
const allProducts: Product[] = [
  {
    id: "1",
    name: "Premium White Kandura",
    price: 1299,
    image: "/assets/images/kandura-1.avif?height=300&width=300",
    category: "kandura",
  },
  {
    id: "2",
    name: "Classic Jubba",
    price: 1499,
    image: "/assets/images/kandura-1.avif?height=300&width=300",
    category: "jubba",
  },
  {
    id: "3",
    name: "Silk Turban",
    price: 599,
    image: "/assets/images/kandura-1.avif?height=300&width=300",
    category: "turban",
  },
  {
    id: "4",
    name: "White Kandura",
    price: 999,
    image: "/assets/images/kandura-1.avif?height=300&width=300",
    category: "kandura",
  },
  {
    id: "5",
    name: "Embroidered Kandura",
    price: 1599,
    image: "/assets/images/kandura-1.avif?height=300&width=300",
    category: "kandura",
  },
  {
    id: "6",
    name: "Premium Kandura",
    price: 1899,
    image: "/assets/images/kandura-1.avif?height=300&width=300",
    category: "kandura",
  },
  {
    id: "7",
    name: "Daily Wear Kandura",
    price: 799,
    image: "/assets/images/kandura-1.avif?height=300&width=300",
    category: "kandura",
  },
  {
    id: "8",
    name: "Classic Jubba",
    price: 1299,
    image: "/assets/images/kandura-1.avif?height=300&width=300",
    category: "jubba",
  },
  {
    id: "9",
    name: "Modern Jubba",
    price: 1499,
    image: "/assets/images/kandura-1.avif?height=300&width=300",
    category: "jubba",
  },
  {
    id: "10",
    name: "Premium Jubba",
    price: 1899,
    image: "/assets/images/kandura-1.avif?height=300&width=300",
    category: "jubba",
  },
  {
    id: "11",
    name: "Casual Jubba",
    price: 999,
    image: "/assets/images/kandura-1.avif?height=300&width=300",
    category: "jubba",
  },
  {
    id: "12",
    name: "Silk Hijab",
    price: 499,
    image: "/assets/images/kandura-1.avif?height=300&width=300",
    category: "hijab",
  },
  {
    id: "13",
    name: "Premium Abaya",
    price: 1999,
    image: "/assets/images/kandura-1.avif?height=300&width=300",
    category: "abaya",
  },
  {
    id: "14",
    name: "Daily Wear Hijab",
    price: 299,
    image: "/assets/images/kandura-1.avif?height=300&width=300",
    category: "hijab",
  },
  {
    id: "15",
    name: "Embroidered Abaya",
    price: 2499,
    image: "/assets/images/kandura-1.avif?height=300&width=300",
    category: "abaya",
  },
]

// Categories
const categories: Category[] = [
  { id: "all", name: "All Categories" },
  { id: "kandura", name: "Kandura" },
  { id: "jubba", name: "Jubba" },
  { id: "turban", name: "Turban" },
  { id: "hijab", name: "Hijab" },
  { id: "abaya", name: "Abaya" },
]

// Price range
const priceRanges: PriceRange[] = [
  { min: 0, max: 500 },
  { min: 500, max: 1000 },
  { min: 1000, max: 1500 },
  { min: 1500, max: 2000 },
  { min: 2000, max: 3000 },
]

// Type for filter sections that can be expanded/collapsed
type FilterSection = 'categories' | 'price';

export default function ProductsPage() {
  const { t } = useLanguage()
  const { addItem } = useCart()
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 3000])
  const [sortBy, setSortBy] = useState("featured")
  const [expandedFilters, setExpandedFilters] = useState<{
    categories: boolean;
    price: boolean;
  }>({
    categories: true,
    price: true,
  })

  // Filter products based on search, category, and price
  const filteredProducts = allProducts.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === "all" || product.category === selectedCategory
    const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1]
    return matchesSearch && matchesCategory && matchesPrice
  })

  // Sort products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === "price-low") return a.price - b.price
    if (sortBy === "price-high") return b.price - a.price
    if (sortBy === "name-asc") return a.name.localeCompare(b.name)
    if (sortBy === "name-desc") return b.name.localeCompare(a.name)
    return 0 // Default: featured
  })

  const toggleFilter = (filter: FilterSection) => {
    setExpandedFilters({
      ...expandedFilters,
      [filter]: !expandedFilters[filter],
    })
  }

  const handleCategoryChange = (categoryId: string) => {
    setSelectedCategory(categoryId)
  }

  const handlePriceChange = (values: [number, number]) => {
    setPriceRange(values)
  }

  const clearFilters = () => {
    setSearchQuery("")
    setSelectedCategory("all")
    setPriceRange([0, 3000])
    setSortBy("featured")
  }

  const addToCart = (product: Product) => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: 1,
    })
  }

  return (
    <div className="container py-8">
      <h1 className="text-3xl font-bold mb-8">Products</h1>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Mobile Filters */}
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" className="md:hidden mb-4">
              <Filter className="h-4 w-4 mr-2" />
              Filters
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-[300px] sm:w-[400px]">
            <SheetHeader>
              <SheetTitle>Filters</SheetTitle>
            </SheetHeader>
            <div className="py-4">
              <div className="space-y-6">
                {/* Categories */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-medium">Categories</h3>
                  </div>
                  <div className="space-y-2">
                    {categories.map((category) => (
                      <div key={category.id} className="flex items-center space-x-2">
                        <Checkbox
                          id={`mobile-category-${category.id}`}
                          checked={selectedCategory === category.id}
                          onCheckedChange={() => handleCategoryChange(category.id)}
                        />
                        <Label
                          htmlFor={`mobile-category-${category.id}`}
                          className="text-sm font-normal cursor-pointer"
                        >
                          {category.name}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Price Range */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-medium">Price Range</h3>
                  </div>
                  <div className="px-2">
                    <Slider
                      defaultValue={[0, 3000]}
                      max={3000}
                      step={100}
                      value={priceRange}
                      onValueChange={handlePriceChange}
                      className="my-6"
                    />
                    <div className="flex items-center justify-between">
                      <p className="text-sm">₹{priceRange[0]}</p>
                      <p className="text-sm">₹{priceRange[1]}</p>
                    </div>
                  </div>
                </div>

                <Button onClick={clearFilters} variant="outline" className="w-full">
                  Clear Filters
                </Button>
              </div>
            </div>
          </SheetContent>
        </Sheet>

        {/* Desktop Filters */}
        <div className="hidden md:block w-64 flex-shrink-0">
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="font-medium text-lg">Filters</h2>
              <Button variant="ghost" size="sm" onClick={clearFilters} className="h-8 px-2 text-xs">
                Clear All
              </Button>
            </div>

            {/* Categories */}
            <div>
              <div
                className="flex items-center justify-between mb-2 cursor-pointer"
                onClick={() => toggleFilter("categories")}
              >
                <h3 className="font-medium">Categories</h3>
                {expandedFilters.categories ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
              </div>
              {expandedFilters.categories && (
                <div className="space-y-2">
                  {categories.map((category) => (
                    <div key={category.id} className="flex items-center space-x-2">
                      <Checkbox
                        id={`category-${category.id}`}
                        checked={selectedCategory === category.id}
                        onCheckedChange={() => handleCategoryChange(category.id)}
                      />
                      <Label htmlFor={`category-${category.id}`} className="text-sm font-normal cursor-pointer">
                        {category.name}
                      </Label>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Price Range */}
            <div>
              <div
                className="flex items-center justify-between mb-2 cursor-pointer"
                onClick={() => toggleFilter("price")}
              >
                <h3 className="font-medium">Price Range</h3>
                {expandedFilters.price ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
              </div>
              {expandedFilters.price && (
                <div className="px-2">
                  <Slider
                    defaultValue={[0, 3000]}
                    max={3000}
                    step={100}
                    value={priceRange}
                    onValueChange={handlePriceChange}
                    className="my-6"
                  />
                  <div className="flex items-center justify-between">
                    <p className="text-sm">₹{priceRange[0]}</p>
                    <p className="text-sm">₹{priceRange[1]}</p>
                  </div>
                </div>
              )}
            </div>

            {/* Price Ranges Checkboxes */}
            <div className="space-y-2">
              {priceRanges.map((range, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <Checkbox
                    id={`price-range-${index}`}
                    checked={priceRange[0] === range.min && priceRange[1] === range.max}
                    onCheckedChange={() => setPriceRange([range.min, range.max])}
                  />
                  <Label htmlFor={`price-range-${index}`} className="text-sm font-normal cursor-pointer">
                    ₹{range.min} - ₹{range.max}
                  </Label>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Products */}
        <div className="flex-1">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
            <div className="relative w-full sm:w-64">
              <Input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
              <div className="absolute left-3 top-2.5">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-muted-foreground"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
              {searchQuery && (
                <Button
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3"
                  onClick={() => setSearchQuery("")}
                >
                  <X className="h-4 w-4" />
                  <span className="sr-only">Clear search</span>
                </Button>
              )}
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto">
              <SlidersHorizontal className="h-4 w-4 text-muted-foreground" />
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-full sm:w-[180px]">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="featured">Featured</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                  <SelectItem value="name-asc">Name: A to Z</SelectItem>
                  <SelectItem value="name-desc">Name: Z to A</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {sortedProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {sortedProducts.map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                >
                  <Link href={`/products/${product.id}`}>
                    <Card className="product-card overflow-hidden h-full">
                      <div className="relative aspect-square">
                        <Image
                          src={product.image || "/assets/images/kandura-1.avif"}
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
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="h-24 w-24 mx-auto mb-4 text-muted-foreground">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-medium mb-2">No products found</h3>
              <p className="text-muted-foreground mb-6">Try adjusting your search or filter criteria</p>
              <Button onClick={clearFilters}>Clear Filters</Button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
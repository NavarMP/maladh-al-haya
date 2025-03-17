"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { useParams } from "next/navigation"
import { useLanguage } from "@/components/language-provider"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Heart, ShoppingCart, Share2, Star, ThumbsUp, ThumbsDown, ChevronRight, Minus, Plus } from "lucide-react"
import { useCart } from "@/hooks/use-cart"

// Define product interfaces
interface Review {
  id: string
  user: string
  rating: number
  comment: string
  date: string
}

interface Specifications {
  Material: string
  Color: string
  Sizes: string
  Care: string
  Origin: string
}

interface Product {
  id: string
  name: string
  price: number
  images: string[]
  category: string
  description: string
  features: string[]
  specifications: Specifications
  reviews: Review[]
  relatedProducts: string[]
}

// Define the products type as a Record with string keys
const products: Record<string, Product> = {
  "1": {
    id: "1",
    name: "Premium White Kandura",
    price: 1299,
    images: [
      "/assets/images/kandura-1.png?height=300&width=300",
      "/assets/images/kandura-1.png?height=300&width=300",
      "/assets/images/kandura-1.png?height=300&width=300",
      "/assets/images/kandura-1.png?height=300&width=300",
    ],
    category: "kandura",
    description:
      "Elegant white kandura made from premium cotton for maximum comfort and style. Perfect for daily wear and special occasions.",
    features: [
      "100% Premium Cotton",
      "Hand-stitched details",
      "Breathable fabric",
      "Traditional design with modern touches",
      "Available in multiple sizes",
      "Easy care and maintenance",
    ],
    specifications: {
      Material: "100% Cotton",
      Color: "White",
      Sizes: "S, M, L, XL, XXL",
      Care: "Machine washable, gentle cycle",
      Origin: "UAE",
    },
    reviews: [
      {
        id: "r1",
        user: "Ahmed",
        rating: 5,
        comment: "Excellent quality kandura. The fabric is soft and comfortable for all-day wear.",
        date: "2023-12-15",
      },
      {
        id: "r2",
        user: "Mohammed",
        rating: 4,
        comment: "Great product, but sizing runs a bit large. Consider ordering one size down.",
        date: "2023-11-20",
      },
    ],
    relatedProducts: ["4", "5", "6"],
  },
  // Add more products as needed
}

export default function ProductPage() {
  const { id } = useParams()
  const { t } = useLanguage()
  const { addItem } = useCart()
  const [selectedImage, setSelectedImage] = useState(0)
  const [quantity, setQuantity] = useState(1)
  const [activeTab, setActiveTab] = useState("description")

  // Type the product safely
  const productId = Array.isArray(id) ? id[0] : id || "1" // Handle potential array from useParams
  const product = products[productId] || products["1"] // Fallback to first product if not found

  const incrementQuantity = () => {
    setQuantity((prev) => prev + 1)
  }

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity((prev) => prev - 1)
    }
  }

  const addToCart = () => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.images[0],
      quantity,
    })
  }

  return (
    <div className="container py-8">
      <div className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
        <Link href="/" className="hover:text-primary">
          Home
        </Link>
        <ChevronRight className="h-4 w-4" />
        <Link href="/products" className="hover:text-primary">
          Products
        </Link>
        <ChevronRight className="h-4 w-4" />
        <Link href={`/products/${product.category}`} className="hover:text-primary capitalize">
          {product.category}
        </Link>
        <ChevronRight className="h-4 w-4" />
        <span className="text-foreground">{product.name}</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
        <div className="space-y-4">
          <div className="relative aspect-square overflow-hidden rounded-lg">
            <Image
              src={product.images[selectedImage] || "/assets/images/kandura-1.png"}
              alt={product.name}
              fill
              className="object-cover"
              priority
            />
          </div>
          <div className="grid grid-cols-4 gap-2">
            {product.images.map((image, index) => (
              <button
                key={index}
                className={`relative aspect-square overflow-hidden rounded-md ${
                  selectedImage === index ? "ring-2 ring-primary" : ""
                }`}
                onClick={() => setSelectedImage(index)}
              >
                <Image
                  src={image || "/assets/images/kandura-1.png?height=300&width=300"}
                  alt={`${product.name} - Image ${index + 1}`}
                  fill
                  className="object-cover"
                />
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <div>
            <Badge className="mb-2">{product.category}</Badge>
            <h1 className="text-3xl font-bold">{product.name}</h1>
            <div className="flex items-center gap-2 mt-2">
              <div className="flex">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={`h-4 w-4 ${star <= 4 ? "text-yellow-500 fill-yellow-500" : "text-muted-foreground"}`}
                  />
                ))}
              </div>
              <span className="text-sm text-muted-foreground">(4.0) · {product.reviews.length} reviews</span>
            </div>
          </div>

          <p className="text-3xl font-bold">₹{product.price.toLocaleString()}</p>

          <p className="text-muted-foreground">{product.description}</p>

          <div className="space-y-4">
            <h3 className="font-medium">Features:</h3>
            <ul className="space-y-2">
              {product.features.map((feature, index) => (
                <li key={index} className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-primary"></span>
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex items-center gap-4">
            <span className="font-medium">Quantity:</span>
            <div className="flex items-center">
              <Button
                variant="outline"
                size="icon"
                className="rounded-r-none"
                onClick={decrementQuantity}
                disabled={quantity <= 1}
              >
                <Minus className="h-4 w-4" />
                <span className="sr-only">Decrease quantity</span>
              </Button>
              <div className="h-10 w-12 flex items-center justify-center border-y">{quantity}</div>
              <Button variant="outline" size="icon" className="rounded-l-none" onClick={incrementQuantity}>
                <Plus className="h-4 w-4" />
                <span className="sr-only">Increase quantity</span>
              </Button>
            </div>
          </div>

          <div className="flex flex-wrap gap-4">
            <Button size="lg" className="flex-1" onClick={addToCart}>
              <ShoppingCart className="mr-2 h-5 w-5" />
              {t("addToCart")}
            </Button>
            <Button size="lg" variant="secondary" className="flex-1">
              {t("buyNow")}
            </Button>
            <Button variant="outline" size="icon" className="rounded-full">
              <Heart className="h-5 w-5" />
              <span className="sr-only">Add to favorites</span>
            </Button>
            <Button variant="outline" size="icon" className="rounded-full">
              <Share2 className="h-5 w-5" />
              <span className="sr-only">Share</span>
            </Button>
          </div>
        </div>
      </div>

      <Tabs defaultValue="description" className="mb-16">
        <TabsList className="w-full justify-start border-b rounded-none h-auto p-0">
          <TabsTrigger
            value="description"
            className={`rounded-none border-b-2 border-transparent px-4 py-2 ${
              activeTab === "description" ? "border-primary" : ""
            }`}
            onClick={() => setActiveTab("description")}
          >
            Description
          </TabsTrigger>
          <TabsTrigger
            value="specifications"
            className={`rounded-none border-b-2 border-transparent px-4 py-2 ${
              activeTab === "specifications" ? "border-primary" : ""
            }`}
            onClick={() => setActiveTab("specifications")}
          >
            Specifications
          </TabsTrigger>
          <TabsTrigger
            value="reviews"
            className={`rounded-none border-b-2 border-transparent px-4 py-2 ${
              activeTab === "reviews" ? "border-primary" : ""
            }`}
            onClick={() => setActiveTab("reviews")}
          >
            Reviews ({product.reviews.length})
          </TabsTrigger>
        </TabsList>
        <TabsContent value="description" className="pt-6">
          <div className="prose dark:prose-invert max-w-none">
            <p>{product.description}</p>
            <h3>Features</h3>
            <ul>
              {product.features.map((feature, index) => (
                <li key={index}>{feature}</li>
              ))}
            </ul>
          </div>
        </TabsContent>
        <TabsContent value="specifications" className="pt-6">
          <div className="overflow-hidden rounded-lg border">
            <table className="w-full text-sm">
              <tbody>
                {Object.entries(product.specifications).map(([key, value]) => (
                  <tr key={key} className="border-b last:border-b-0">
                    <th className="p-4 text-left font-medium bg-muted/50">{key}</th>
                    <td className="p-4">{value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </TabsContent>
        <TabsContent value="reviews" className="pt-6">
          <div className="space-y-8">
            {product.reviews.map((review) => (
              <div key={review.id} className="border-b pb-6 last:border-b-0">
                <div className="flex justify-between items-start">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{review.user}</span>
                      <div className="flex">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star
                            key={star}
                            className={`h-3 w-3 ${
                              star <= review.rating ? "text-yellow-500 fill-yellow-500" : "text-muted-foreground"
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                    <p className="text-xs text-muted-foreground">{new Date(review.date).toLocaleDateString()}</p>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <ThumbsUp className="h-4 w-4" />
                      <span className="sr-only">Helpful</span>
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <ThumbsDown className="h-4 w-4" />
                      <span className="sr-only">Not helpful</span>
                    </Button>
                  </div>
                </div>
                <p className="mt-2">{review.comment}</p>
              </div>
            ))}

            <Button variant="outline">Write a Review</Button>
          </div>
        </TabsContent>
      </Tabs>

      <section className="mb-16">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold">Related Products</h2>
          <Link href="/products" className="text-primary hover:underline flex items-center">
            View All
            <ChevronRight className="ml-1 h-4 w-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {product.relatedProducts.map((productId) => {
            const relatedProduct = {
              id: productId,
              name: `Related Product ${productId}`,
              price: 999,
              image: "/assets/images/kandura-1.png?height=300&width=300",
            }

            return (
              <Link href={`/products/${productId}`} key={productId}>
                <Card className="product-card overflow-hidden h-full">
                  <div className="relative aspect-square">
                    <Image
                      src={relatedProduct.image || "/assets/images/kandura-1.png?height=300&width=300"}
                      alt={relatedProduct.name}
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
                    <h3 className="font-medium line-clamp-1">{relatedProduct.name}</h3>
                    <p className="text-lg font-bold mt-1">₹{relatedProduct.price.toLocaleString()}</p>
                    <Button
                      className="w-full mt-4"
                      onClick={(e) => {
                        e.preventDefault()
                        e.stopPropagation()
                        addItem({
                          id: relatedProduct.id,
                          name: relatedProduct.name,
                          price: relatedProduct.price,
                          image: relatedProduct.image,
                          quantity: 1,
                        })
                      }}
                    >
                      <ShoppingCart className="mr-2 h-4 w-4" />
                      {t("addToCart")}
                    </Button>
                  </CardContent>
                </Card>
              </Link>
            )
          })}
        </div>
      </section>
    </div>
  )
}


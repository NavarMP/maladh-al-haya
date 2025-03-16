"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { User, Package, Heart, LogOut, MapPin, CreditCard, Settings, Bell, ShoppingBag } from "lucide-react"
import { motion } from "framer-motion"

// Sample order data
const orders = [
  {
    id: "ORD-12345",
    date: "2023-12-15",
    status: "Delivered",
    total: 2499,
    items: [
      {
        id: "1",
        name: "Premium White Kandura",
        price: 1299,
        quantity: 1,
        image: "/placeholder.svg?height=300&width=300",
      },
      {
        id: "3",
        name: "Silk Turban",
        price: 599,
        quantity: 2,
        image: "/placeholder.svg?height=300&width=300",
      },
    ],
  },
  {
    id: "ORD-12346",
    date: "2024-01-05",
    status: "Processing",
    total: 1499,
    items: [
      {
        id: "2",
        name: "Classic Jubba",
        price: 1499,
        quantity: 1,
        image: "/placeholder.svg?height=300&width=300",
      },
    ],
  },
]

// Sample wishlist data
const wishlist = [
  {
    id: "4",
    name: "White Kandura",
    price: 999,
    image: "/placeholder.svg?height=300&width=300",
  },
  {
    id: "8",
    name: "Classic Jubba",
    price: 1299,
    image: "/placeholder.svg?height=300&width=300",
  },
  {
    id: "12",
    name: "Silk Hijab",
    price: 499,
    image: "/placeholder.svg?height=300&width=300",
  },
]

// Sample address data
const addresses = [
  {
    id: "addr1",
    name: "Home",
    address: "123 Main Street, Apartment 4B",
    city: "Dubai",
    state: "Dubai",
    zip: "12345",
    country: "UAE",
    isDefault: true,
  },
  {
    id: "addr2",
    name: "Work",
    address: "456 Business Avenue, Floor 7",
    city: "Abu Dhabi",
    state: "Abu Dhabi",
    zip: "67890",
    country: "UAE",
    isDefault: false,
  },
]

export default function ProfilePage() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("overview")

  // User data - in a real app, this would come from your auth system
  const user = {
    name: "Mohammed Ahmed",
    email: "mohammed@example.com",
    phone: "+971 50 123 4567",
    avatar: "/placeholder.svg?height=100&width=100",
  }

  const handleLogout = () => {
    // In a real app, you would implement actual logout logic here
    router.push("/auth/login")
  }

  return (
    <div className="container py-8">
      <h1 className="text-3xl font-bold mb-8">My Account</h1>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Sidebar */}
        <Card className="md:col-span-1 h-fit">
          <CardContent className="p-6">
            <div className="flex flex-col items-center mb-6">
              <div className="relative w-24 h-24 rounded-full overflow-hidden mb-4">
                <Image src={user.avatar || "/placeholder.svg"} alt={user.name} fill className="object-cover" />
              </div>
              <h2 className="text-xl font-bold">{user.name}</h2>
              <p className="text-sm text-muted-foreground">{user.email}</p>
            </div>

            <Separator className="my-4" />

            <nav className="space-y-1">
              <Button
                variant={activeTab === "overview" ? "secondary" : "ghost"}
                className="w-full justify-start"
                onClick={() => setActiveTab("overview")}
              >
                <User className="mr-2 h-4 w-4" />
                Overview
              </Button>
              <Button
                variant={activeTab === "orders" ? "secondary" : "ghost"}
                className="w-full justify-start"
                onClick={() => setActiveTab("orders")}
              >
                <Package className="mr-2 h-4 w-4" />
                Orders
              </Button>
              <Button
                variant={activeTab === "wishlist" ? "secondary" : "ghost"}
                className="w-full justify-start"
                onClick={() => setActiveTab("wishlist")}
              >
                <Heart className="mr-2 h-4 w-4" />
                Wishlist
              </Button>
              <Button
                variant={activeTab === "addresses" ? "secondary" : "ghost"}
                className="w-full justify-start"
                onClick={() => setActiveTab("addresses")}
              >
                <MapPin className="mr-2 h-4 w-4" />
                Addresses
              </Button>
              <Button
                variant={activeTab === "payment" ? "secondary" : "ghost"}
                className="w-full justify-start"
                onClick={() => setActiveTab("payment")}
              >
                <CreditCard className="mr-2 h-4 w-4" />
                Payment Methods
              </Button>
              <Button
                variant={activeTab === "settings" ? "secondary" : "ghost"}
                className="w-full justify-start"
                onClick={() => setActiveTab("settings")}
              >
                <Settings className="mr-2 h-4 w-4" />
                Account Settings
              </Button>
              <Button
                variant={activeTab === "notifications" ? "secondary" : "ghost"}
                className="w-full justify-start"
                onClick={() => setActiveTab("notifications")}
              >
                <Bell className="mr-2 h-4 w-4" />
                Notifications
              </Button>
            </nav>

            <Separator className="my-4" />

            <Button variant="outline" className="w-full text-destructive" onClick={handleLogout}>
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </Button>
          </CardContent>
        </Card>

        {/* Main Content */}
        <div className="md:col-span-3">
          {/* Overview Tab */}
          {activeTab === "overview" && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
              <Card>
                <CardHeader>
                  <CardTitle>Account Overview</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="text-lg font-medium mb-4">Personal Information</h3>
                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="name">Full Name</Label>
                          <Input id="name" value={user.name} readOnly className="mt-1" />
                        </div>
                        <div>
                          <Label htmlFor="email">Email Address</Label>
                          <Input id="email" value={user.email} readOnly className="mt-1" />
                        </div>
                        <div>
                          <Label htmlFor="phone">Phone Number</Label>
                          <Input id="phone" value={user.phone} readOnly className="mt-1" />
                        </div>
                        <Button>Edit Information</Button>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-medium mb-4">Recent Orders</h3>
                      {orders.length > 0 ? (
                        <div className="space-y-4">
                          {orders.slice(0, 2).map((order) => (
                            <div key={order.id} className="border rounded-lg p-4">
                              <div className="flex justify-between items-center mb-2">
                                <div>
                                  <p className="font-medium">{order.id}</p>
                                  <p className="text-sm text-muted-foreground">
                                    {new Date(order.date).toLocaleDateString()}
                                  </p>
                                </div>
                                <Badge variant={order.status === "Delivered" ? "outline" : "secondary"}>
                                  {order.status}
                                </Badge>
                              </div>
                              <p className="font-medium">₹{order.total.toLocaleString()}</p>
                              <div className="flex mt-2">
                                <Button variant="link" className="h-auto p-0" onClick={() => setActiveTab("orders")}>
                                  View Details
                                </Button>
                              </div>
                            </div>
                          ))}
                          <Button variant="outline" className="w-full" onClick={() => setActiveTab("orders")}>
                            View All Orders
                          </Button>
                        </div>
                      ) : (
                        <div className="text-center py-8">
                          <ShoppingBag className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                          <p className="text-muted-foreground">You haven&apos;t placed any orders yet.</p>
                          <Link href="/products">
                            <Button className="mt-4">Start Shopping</Button>
                          </Link>
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {/* Orders Tab */}
          {activeTab === "orders" && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
              <Card>
                <CardHeader>
                  <CardTitle>My Orders</CardTitle>
                </CardHeader>
                <CardContent>
                  {orders.length > 0 ? (
                    <div className="space-y-6">
                      {orders.map((order) => (
                        <Card key={order.id} className="overflow-hidden">
                          <CardHeader className="bg-muted/50 py-3">
                            <div className="flex flex-wrap justify-between items-center">
                              <div>
                                <p className="font-medium">{order.id}</p>
                                <p className="text-sm text-muted-foreground">
                                  Ordered on {new Date(order.date).toLocaleDateString()}
                                </p>
                              </div>
                              <Badge variant={order.status === "Delivered" ? "outline" : "secondary"}>
                                {order.status}
                              </Badge>
                            </div>
                          </CardHeader>
                          <CardContent className="p-4">
                            <div className="space-y-4">
                              {order.items.map((item) => (
                                <div key={item.id} className="flex gap-4">
                                  <div className="relative h-20 w-20 rounded-md overflow-hidden flex-shrink-0">
                                    <Image
                                      src={item.image || "/placeholder.svg"}
                                      alt={item.name}
                                      fill
                                      className="object-cover"
                                    />
                                  </div>
                                  <div className="flex-1">
                                    <Link href={`/products/${item.id}`} className="font-medium hover:underline">
                                      {item.name}
                                    </Link>
                                    <p className="text-sm text-muted-foreground">Qty: {item.quantity}</p>
                                    <p className="font-medium">₹{item.price.toLocaleString()}</p>
                                  </div>
                                </div>
                              ))}
                            </div>
                            <div className="flex justify-between items-center mt-4 pt-4 border-t">
                              <p className="font-medium">Total: ₹{order.total.toLocaleString()}</p>
                              <div className="flex gap-2">
                                <Button variant="outline" size="sm">
                                  Track Order
                                </Button>
                                <Button size="sm">View Details</Button>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <ShoppingBag className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                      <p className="text-muted-foreground">You haven&apos;t placed any orders yet.</p>
                      <Link href="/products">
                        <Button className="mt-4">Start Shopping</Button>
                      </Link>
                    </div>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          )}

          {/* Wishlist Tab */}
          {activeTab === "wishlist" && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
              <Card>
                <CardHeader>
                  <CardTitle>My Wishlist</CardTitle>
                </CardHeader>
                <CardContent>
                  {wishlist.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                      {wishlist.map((item) => (
                        <Card key={item.id} className="overflow-hidden">
                          <div className="relative aspect-square">
                            <Image
                              src={item.image || "/placeholder.svg"}
                              alt={item.name}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <CardContent className="p-4">
                            <Link href={`/products/${item.id}`} className="font-medium hover:underline">
                              {item.name}
                            </Link>
                            <p className="font-bold mt-1">₹{item.price.toLocaleString()}</p>
                            <div className="flex gap-2 mt-4">
                              <Button className="w-full">Add to Cart</Button>
                              <Button variant="outline" size="icon">
                                <Heart className="h-4 w-4 fill-current" />
                                <span className="sr-only">Remove from wishlist</span>
                              </Button>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <Heart className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                      <p className="text-muted-foreground">Your wishlist is empty.</p>
                      <Link href="/products">
                        <Button className="mt-4">Explore Products</Button>
                      </Link>
                    </div>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          )}

          {/* Addresses Tab */}
          {activeTab === "addresses" && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle>My Addresses</CardTitle>
                  <Button>Add New Address</Button>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {addresses.map((address) => (
                      <Card key={address.id} className="overflow-hidden">
                        <CardContent className="p-4">
                          <div className="flex justify-between items-start">
                            <div>
                              <div className="flex items-center gap-2">
                                <h3 className="font-medium">{address.name}</h3>
                                {address.isDefault && (
                                  <Badge variant="outline" className="text-xs">
                                    Default
                                  </Badge>
                                )}
                              </div>
                              <p className="text-sm mt-2">{address.address}</p>
                              <p className="text-sm">
                                {address.city}, {address.state} {address.zip}
                              </p>
                              <p className="text-sm">{address.country}</p>
                            </div>
                          </div>
                          <div className="flex gap-2 mt-4">
                            <Button variant="outline" size="sm">
                              Edit
                            </Button>
                            {!address.isDefault && (
                              <Button variant="outline" size="sm">
                                Set as Default
                              </Button>
                            )}
                            {!address.isDefault && (
                              <Button variant="outline" size="sm" className="text-destructive">
                                Delete
                              </Button>
                            )}
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {/* Payment Methods Tab */}
          {activeTab === "payment" && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle>Payment Methods</CardTitle>
                  <Button>Add Payment Method</Button>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-12">
                    <CreditCard className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                    <p className="text-muted-foreground">You haven&apos;t added any payment methods yet.</p>
                    <Button className="mt-4">Add Payment Method</Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {/* Account Settings Tab */}
          {activeTab === "settings" && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
              <Card>
                <CardHeader>
                  <CardTitle>Account Settings</CardTitle>
                </CardHeader>
                <CardContent>
                  <Tabs defaultValue="profile">
                    <TabsList className="grid w-full grid-cols-3">
                      <TabsTrigger value="profile">Profile</TabsTrigger>
                      <TabsTrigger value="password">Password</TabsTrigger>
                      <TabsTrigger value="preferences">Preferences</TabsTrigger>
                    </TabsList>
                    <TabsContent value="profile" className="space-y-4 pt-4">
                      <div>
                        <Label htmlFor="profile-name">Full Name</Label>
                        <Input id="profile-name" defaultValue={user.name} className="mt-1" />
                      </div>
                      <div>
                        <Label htmlFor="profile-email">Email Address</Label>
                        <Input id="profile-email" defaultValue={user.email} className="mt-1" />
                      </div>
                      <div>
                        <Label htmlFor="profile-phone">Phone Number</Label>
                        <Input id="profile-phone" defaultValue={user.phone} className="mt-1" />
                      </div>
                      <Button>Save Changes</Button>
                    </TabsContent>
                    <TabsContent value="password" className="space-y-4 pt-4">
                      <div>
                        <Label htmlFor="current-password">Current Password</Label>
                        <Input id="current-password" type="password" className="mt-1" />
                      </div>
                      <div>
                        <Label htmlFor="new-password">New Password</Label>
                        <Input id="new-password" type="password" className="mt-1" />
                      </div>
                      <div>
                        <Label htmlFor="confirm-password">Confirm New Password</Label>
                        <Input id="confirm-password" type="password" className="mt-1" />
                      </div>
                      <Button>Change Password</Button>
                    </TabsContent>
                    <TabsContent value="preferences" className="space-y-4 pt-4">
                      <div>
                        <Label>Email Notifications</Label>
                        <div className="space-y-2 mt-2">
                          <div className="flex items-center justify-between">
                            <Label htmlFor="marketing-emails" className="font-normal">
                              Marketing emails
                            </Label>
                            <input type="checkbox" id="marketing-emails" className="toggle" />
                          </div>
                          <div className="flex items-center justify-between">
                            <Label htmlFor="order-updates" className="font-normal">
                              Order updates
                            </Label>
                            <input type="checkbox" id="order-updates" className="toggle" defaultChecked />
                          </div>
                          <div className="flex items-center justify-between">
                            <Label htmlFor="newsletter" className="font-normal">
                              Newsletter
                            </Label>
                            <input type="checkbox" id="newsletter" className="toggle" />
                          </div>
                        </div>
                      </div>
                      <Button>Save Preferences</Button>
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {/* Notifications Tab */}
          {activeTab === "notifications" && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
              <Card>
                <CardHeader>
                  <CardTitle>Notifications</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-12">
                    <Bell className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                    <p className="text-muted-foreground">You don&apos;t have any notifications.</p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  )
}


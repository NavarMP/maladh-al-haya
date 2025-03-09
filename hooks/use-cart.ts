"use client"

import { create } from "zustand"
import { persist } from "zustand/middleware"

export type CartItem = {
  id: string
  name: string
  price: number
  image: string
  quantity: number
}

type CartStore = {
  items: CartItem[]
  cartCount: number
  addItem: (item: CartItem) => void
  removeItem: (id: string) => void
  updateQuantity: (id: string, quantity: number) => void
  clearCart: () => void
}

export const useCart = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      cartCount: 0,
      addItem: (item) => {
        const currentItems = get().items
        const existingItem = currentItems.find((i) => i.id === item.id)

        if (existingItem) {
          const updatedItems = currentItems.map((i) =>
            i.id === item.id ? { ...i, quantity: i.quantity + item.quantity } : i,
          )
          set({
            items: updatedItems,
            cartCount: updatedItems.reduce((acc, item) => acc + item.quantity, 0),
          })
        } else {
          const updatedItems = [...currentItems, item]
          set({
            items: updatedItems,
            cartCount: updatedItems.reduce((acc, item) => acc + item.quantity, 0),
          })
        }
      },
      removeItem: (id) => {
        const updatedItems = get().items.filter((i) => i.id !== id)
        set({
          items: updatedItems,
          cartCount: updatedItems.reduce((acc, item) => acc + item.quantity, 0),
        })
      },
      updateQuantity: (id, quantity) => {
        const updatedItems = get().items.map((item) => (item.id === id ? { ...item, quantity } : item))
        set({
          items: updatedItems,
          cartCount: updatedItems.reduce((acc, item) => acc + item.quantity, 0),
        })
      },
      clearCart: () => set({ items: [], cartCount: 0 }),
    }),
    {
      name: "cart-storage",
    },
  ),
)


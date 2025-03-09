"use client"

import { create } from "zustand"

type SideMenuStore = {
  isOpen: boolean
  openSideMenu: () => void
  closeSideMenu: () => void
  toggleSideMenu: () => void
}

export const useSideMenu = create<SideMenuStore>((set) => ({
  isOpen: false,
  openSideMenu: () => set({ isOpen: true }),
  closeSideMenu: () => set({ isOpen: false }),
  toggleSideMenu: () => set((state) => ({ isOpen: !state.isOpen })),
}))


"use client"
import { AnimatedThemeToggler } from "../ui/animated-theme-toggler"
import UserMenu from "../auth/UserMenu"

export default function TopNavbar() {
  return (
    <nav className="sticky flex top-0 z-40 bg-secondary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
        <p className="text-sm md:text-center font-semibold text-white dark:text-primary">
          Envío gratis por compras superiores a $50 USD
        </p>
      </div>
      <div className="absolute flex gap-3 right-3 sm:right-6 md:right-9 lg:right-36 top-2 text-primary dark:text-white">
        <UserMenu />
        <AnimatedThemeToggler className="cursor-pointer mt-1" />
      </div>
    </nav>
  )
}

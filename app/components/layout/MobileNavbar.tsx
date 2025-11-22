"use client"

import { Button } from "@/app/components/ui/button"
import { Menu, Search, ShoppingCart, X } from "lucide-react"
import Link from "next/link"
import { useState } from "react"
import { AnimatedThemeToggler } from "../ui/animated-theme-toggler"

/**
 * Menú mobile - TODO: Agregar animaciones
 */
export default function MobileNavbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <div className="md:hidden absolute top-3 right-6">
      <div className="flex gap-4 items-center text-primary dark:text-secondary">
        <AnimatedThemeToggler className="cursor-pointer" />
        <Search className="cursor-pointer" />
        <ShoppingCart className="cursor-pointer" />
        <Button
          variant="ghost"
          size="icon"
          className="bg-primary dark:bg-secondary text-primary-foreground"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          onMouseEnter={() => setMobileMenuOpen(true)}
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? (
            <X className="h-5 w-5" />
          ) : (
            <Menu className="h-5 w-5" />
          )}
        </Button>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="pb-2 px-4 space-y-2 bg-secondary text-white rounded-md w-fit ml-auto">
          <Link
            href="/"
            className="block px-3 py-2 text-sm font-medium transition-colors"
            onClick={() => setMobileMenuOpen(false)}
          >
            Inicio
          </Link>
          <Link
            href="/about"
            className="block px-3 py-2 text-sm font-medium transition-colors"
            onClick={() => setMobileMenuOpen(false)}
          >
            Acerca de
          </Link>
        </div>
      )}
    </div>
  )
}

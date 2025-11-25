import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/app/components/ui/navigation-menu"
import Link from "next/link"
import MobileNavbar from "./MobileNavbar"
import Image from "next/image"
import { AnimatedThemeToggler } from "../ui/animated-theme-toggler"
import { Search, ShoppingCart } from "lucide-react"

export default function Navbar() {
  return (
    <nav className="sticky top-0 bg-white dark:bg-primary z-50 border-b border-border shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 font-bold text-lg">
            <Image
              src="/logo.png"
              alt="Logo principal"
              className="h-20 w-20"
              width={80}
              height={80}
              priority
            />
            <div className="tracking-wider">
              <span className="text-secondary font-light">ECO</span>
              <span className="text-primary dark:text-primary-foreground">
                SHOP
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-3">
            <NavigationMenu>
              <NavigationMenuList className="flex gap-1">
                <NavigationMenuItem>
                  <NavigationMenuLink
                    asChild
                    className="px-3 py-2 text-sm font-medium text-secondary dark:text-white hover:text-white transition-colors rounded-md hover:bg-muted"
                  >
                    <Link href="/">Inicio</Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuLink
                    asChild
                    className="px-3 py-2 text-sm font-medium text-secondary dark:text-white hover:text-white transition-colors rounded-md hover:bg-muted"
                  >
                    <Link href="/store">Productos</Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuLink
                    asChild
                    className="px-3 py-2 text-sm font-medium text-secondary dark:text-white hover:text-white transition-colors rounded-md hover:bg-muted"
                  >
                    <Link href="/contact">Contacto</Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
            <div className="flex gap-2 text-primary dark:text-secondary">
              <AnimatedThemeToggler className="cursor-pointer" />
              <Search className="cursor-pointer" />
              <ShoppingCart className="cursor-pointer" />
            </div>
          </div>

          {/* Mobile Navigation */}
          <MobileNavbar />
        </div>
      </div>
    </nav>
  )
}

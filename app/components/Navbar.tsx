import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu"
import Link from "next/link"
import MobileNavbar from "./MobileNavbar"
import Image from "next/image"

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 border-b border-border bg-card shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2 font-bold text-lg hover:text-primary transition-colors"
          >
            <Image
              src="/logo.png"
              alt="Logo principal"
              className="h-20 w-20"
              width={80}
              height={80}
            />
            <span className="text-secondary">Ecoshop</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center">
            <NavigationMenu>
              <NavigationMenuList className="flex gap-1">
                <NavigationMenuItem>
                  <NavigationMenuLink
                    asChild
                    className="px-3 py-2 text-sm font-medium text-muted-foreground hover:text-white transition-colors rounded-md hover:bg-muted"
                  >
                    <Link href="/">Inicio</Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuLink
                    asChild
                    className="px-3 py-2 text-sm font-medium text-muted-foreground hover:text-white transition-colors rounded-md hover:bg-muted"
                  >
                    <Link href="/about">Acerca de</Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuLink
                    asChild
                    className="px-3 py-2 text-sm font-medium text-muted-foreground hover:text-white transition-colors rounded-md hover:bg-muted"
                  >
                    <Link href="/contact">Contacto</Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </div>

          <MobileNavbar />
        </div>
      </div>
    </nav>
  )
}

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import Link from "next/link";
import MobileNavbar from "./MobileNavbar";

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 border-b border-border bg-card shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2 font-bold text-lg text-foreground hover:text-primary transition-colors"
          >
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-primary-foreground text-sm font-bold">
              E
            </div>
            <span>Ecoshop</span>
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
  );
}

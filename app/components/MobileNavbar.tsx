"use client";

import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function MobileNavbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div>
      <Button
        variant="ghost"
        size="icon"
        className="md:hidden"
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        aria-label="Toggle menu"
      >
        {mobileMenuOpen ? (
          <X className="h-5 w-5" />
        ) : (
          <Menu className="h-5 w-5" />
        )}
      </Button>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden pb-4 space-y-2">
          <Link
            href="/"
            className="block px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted rounded-md transition-colors"
            onClick={() => setMobileMenuOpen(false)}
          >
            Inicio
          </Link>
          <Link
            href="/about"
            className="block px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted rounded-md transition-colors"
            onClick={() => setMobileMenuOpen(false)}
          >
            Acerca de
          </Link>
        </div>
      )}
    </div>
  );
}

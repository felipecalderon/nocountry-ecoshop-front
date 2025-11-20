import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import "./globals.css"
import Footer from "./components/Footer"
import Navbar from "./components/Navbar"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "Ecoshop | E-commerce",
  description:
    "EcoShop es una plataforma de comercio electrónico enfocada en productos sostenibles, que permite visualizar el impacto ambiental de cada compra. Integra indicadores ecológicos, trazabilidad y una experiencia de usuario moderna orientada al consumo responsable.",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  // const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  return (
    <html lang="es">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div className="flex flex-col min-h-screen bg-background">
          <Navbar />
          <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8">
            {children}
          </main>

          <Footer />
        </div>
      </body>
    </html>
  )
}

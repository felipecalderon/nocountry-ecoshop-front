import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { Toaster } from "sonner"
import "./globals.css"
import Footer from "./components/Footer"
import Navbar from "./components/layout/Navbar"
import TopNavbar from "./components/layout/TopNavbar"
import { auth0 } from "@/lib/auth0"
import { loginUser } from "@/actions/auth"
import { ViewTransitions } from "next-view-transitions"

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

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const session = await auth0.getSession()
  // console.log(session)
  const { accessToken } = session ? session.tokenSet : { accessToken: "" }
  let user = null
  if (accessToken) {
    user = await loginUser(accessToken)
  }
  // console.log({ session })
  return (
    <ViewTransitions>
      <html lang="es">
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          <div className="flex flex-col min-h-screen bg-background">
            <TopNavbar />
            <Navbar user={user} />
            <main className="flex-1 max-w-7xl w-full mx-auto pt-8">
              {children}
            </main>
            <Footer />
          </div>
          <Toaster richColors closeButton expand position="bottom-left" />
        </body>
      </html>
    </ViewTransitions>
  )
}

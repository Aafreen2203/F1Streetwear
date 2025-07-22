import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { CartProvider } from "@/contexts/CartContext"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Apex Racing - F1 Inspired Streetwear",
  description:
    "Premium F1-inspired streetwear for racing enthusiasts. Shop exclusive collections, racing tees, speed jackets, and championship accessories.",
  keywords: "F1, Formula 1, racing, streetwear, fashion, motorsport, clothing, apparel",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <body className={inter.className}>
        <CartProvider>
          {children}
        </CartProvider>
      </body>
    </html>
  )
}

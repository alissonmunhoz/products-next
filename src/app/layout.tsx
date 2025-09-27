import type React from "react"
import { Inter, JetBrains_Mono } from "next/font/google"
import "./globals.css"
import { Toaster } from "@/components/ui/sonner"

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
})

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
})

export const metadata = {
  title: "Gestão de Produtos | Sistema CRUD Moderno",
  description: "Plataforma completa para gerenciamento de produtos com design moderno e funcionalidades avançadas",
  keywords: ["produtos", "gestão", "CRUD", "sistema", "moderno"],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html suppressHydrationWarning lang="pt-BR" className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <body className="min-h-screen bg-background font-sans antialiased" suppressHydrationWarning>
        {children}
        <Toaster
          position="top-right"
          toastOptions={{
            style: {
              background: "rgba(24, 24, 27, 0.95)",
              border: "1px solid rgba(255, 255, 255, 0.1)",
              color: "rgb(250, 250, 250)",
            },
          }}
        />
      </body>
    </html>
  )
}

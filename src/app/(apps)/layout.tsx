import type React from "react"
import { Header } from "./_components/header"

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <div className="min-h-screen bg-white">
          <Header />
          <div className="relative">{children}</div>
        </div>
      </body>
    </html>
  )
}
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
          <div className="relative bg-[#F3F4F4] p-6">
            <div className="mx-auto px-4 py-8 rounded-xl bg-white">
              <div className="max-w-6xl mx-auto">{children}</div>
            </div>
          </div>
        </div>
      </body>
    </html>
  )
}
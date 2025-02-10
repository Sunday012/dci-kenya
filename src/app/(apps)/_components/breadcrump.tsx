"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

export function BreadcrumbNav() {
  const pathname = usePathname()
  const paths = pathname.split("/").filter(Boolean)

  if (paths.length === 0 || pathname === "/onboarding") return null

  return (
    <nav className="flex items-center gap-2 text-sm text-gray-500">
      <Link href="/snapshot">Apps</Link>
      {paths.map((path, index) => (
        <div key={path} className="flex items-center gap-2">
          <span>/</span>
          <Link href={`/${paths.slice(0, index + 1).join("/")}`} className="capitalize">
            {path}
          </Link>
        </div>
      ))}
    </nav>
  )
}

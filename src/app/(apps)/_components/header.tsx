"use client"

import { Search } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import { BreadcrumbNav } from "./breadcrump"
import { NotificationsDropdown } from "./notification-dropdown"

export function Header() {
  return (
    <header className="sticky top-0 z-40 flex h-[81px] items-center justify-between border-b bg-white px-4 lg:px-6">
      <div className="flex items-center gap-4">
        <Link className="flex items-center gap-2 font-semibold" href="/">
          <div className="h-8 w-8 rounded-full bg-blue-600 text-white grid place-items-center font-bold">D</div>
          <span>Logo</span>
        </Link>
        <BreadcrumbNav />
      </div>
      <div className="flex-1 flex justify-center max-w-xl">
        <div className="w-full relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
          <Input
            type="search"
            placeholder="Search DCI"
            className="w-full bg-gray-100 pl-8 focus-visible:ring-0 border-none"
          />
        </div>
      </div>
      <div className="flex items-center gap-4">
        <NotificationsDropdown />
        <Avatar className="h-8 w-8">
          <AvatarImage src="https://v0.dev/placeholder.svg" alt="Avatar" />
          <AvatarFallback>JD</AvatarFallback>
        </Avatar>
      </div>
    </header>
  )
}


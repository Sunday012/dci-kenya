"use client"

import { Bell } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Icons } from "@/app/_components/Icons"
import Link from "next/link"

const notifications = [
  {
    title: "New case for you!",
    description: "Burglary at Manhattan, two men down injured in a...",
    code: "Code 4",
    date: "Just now",
    href: "/cases/1"
  },
  {
    title: "New case for you!",
    description: "Burglary at Manhattan, two men down injured in a...",
    code: "Code 3",
    date: "Jan 22",
    href: "/cases/2"
  },
  {
    title: "New case for you!",
    description: "Burglary at Manhattan, two men down injured in a...",
    code: "Code 3",
    date: "Jan 22",
    href: "/cases/3"
  },
  {
    title: "New case for you!",
    description: "Burglary at Manhattan, two men down injured in a...",
    code: "Code 3",
    date: "Jan 22",
    href: "/cases/4"
  },
]

export function NotificationsDropdown() {
  const [open, setOpen] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const mainContent = document.getElementById("main-content")
    if (mainContent) {
      if (open) {
        mainContent.classList.add("blur-sm")
      } else {
        mainContent.classList.remove("blur-sm")
      }
    }
  }, [open])

  const handleViewAll = () => {
    setOpen(false)
    router.push("/snapshot/notifications")
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-red-600" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[500px] py-[28px] px-[25px] bg-[#F3F4F4]" align="end">
        <div className="flex items-center justify-between border-b">
          <h2 className="font-semibold">Recent notifications</h2>
          <Button variant="link" size="sm" onClick={handleViewAll}>
            View all
          </Button>
        </div>
        <div className="space-y-[12px] h-[350px] overflow-auto no-scrollbar">
          {notifications.map((notification, i) => (
            <Link href={notification.href} key={i} className="flex bg-white rounded-[10px] items-start gap-4 p-4 cursor-pointer">
              <div className="h-8 w-8 rounded-full bg-gray-100 grid place-items-center">
                <Icons.alarm className="h-4 w-4" />
              </div>
              <div className="flex-1 space-y-1">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium">{notification.title}</p>
                  <span className="text-xs text-gray-500">{notification.date}</span>
                </div>
                <p className="text-sm text-gray-500">{notification.description}</p>
                <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold">
                  {notification.code}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  )
}


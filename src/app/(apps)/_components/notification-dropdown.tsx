"use client"

import { Bell } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"

const notifications = [
  {
    title: "New case for you!",
    description: "Burglary at Manhattan, two men down injured in a...",
    code: "Code 4",
    date: "Just now",
  },
  {
    title: "New case for you!",
    description: "Burglary at Manhattan, two men down injured in a...",
    code: "Code 3",
    date: "Jan 22",
  },
  {
    title: "New case for you!",
    description: "Burglary at Manhattan, two men down injured in a...",
    code: "Code 3",
    date: "Jan 22",
  },
  {
    title: "New case for you!",
    description: "Burglary at Manhattan, two men down injured in a...",
    code: "Code 3",
    date: "Jan 22",
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
      <PopoverContent className="w-80 p-0" align="end">
        <div className="flex items-center justify-between border-b p-4">
          <h2 className="font-semibold">Recent notifications</h2>
          <Button variant="link" size="sm" onClick={handleViewAll}>
            View all
          </Button>
        </div>
        <div className="divide-y">
          {notifications.map((notification, i) => (
            <div key={i} className="flex items-start gap-4 p-4">
              <div className="h-8 w-8 rounded-full bg-gray-100 grid place-items-center">
                <Bell className="h-4 w-4" />
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
            </div>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  )
}


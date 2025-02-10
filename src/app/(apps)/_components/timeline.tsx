import { FileText, MessageCircle, Bell, Files } from "lucide-react"
import { cn } from "@/lib/utils"
import { Icons } from "@/app/_components/Icons"
import Link from "next/link"

interface TimelineItem {
  id: string
  title: string
  description: string
  date: string
  code?: number
  isNew?: boolean
  type?: string
}

interface TimelineGroup {
  month: string
  notifications: TimelineItem[]
}

interface TimelineProps {
  items: TimelineGroup[]
}

export function Timeline({ items }: TimelineProps) {
  const getIcon = (type?: string) => {
    switch (type) {
      case "report":
        return <Icons.file className="h-5 w-5 text-gray-600" />
      case "chat":
        return <Icons.messageChat className="h-5 w-5 text-gray-600" />
      case "case":
        return <Icons.file className="h-5 w-5 text-gray-600" />
      default:
        return <Icons.file className="h-5 w-5 text-gray-600" />
    }
  }

  const getHref = (type?: string, id?: string) => {
    switch (type) {
      case "report":
        return `/reports/${id}`
      case "chat":
        return `/chats/${id}`
      case "case":
        return `/cases/${id}`
      default:
        return `/cases/${id}`
    }
  }

  return (
    <div className="relative max-w-2xl bg-[#F3F4F4] rounded-[10px] p-8">
      {items.map((group, groupIndex) => (
        <div key={group.month} className="relative">
          <div className="sticky top-0 py-2 z-10">
            <h3 className="text-sm font-medium text-gray-500">{group.month}</h3>
          </div>
          <div className="relative ml-3 pb-8">
            <div
              className="absolute left-0 top-0 -bottom-8 w-px bg-gray-200"
              style={{
                bottom: groupIndex === items.length - 1 ? "0" : "-2rem",
              }}
            />
            <div className="space-y-6">
              {group.notifications.map((item) => (
                <div key={item.id} className="relative">
                  <div className="absolute -left-7 mt-3">
                    <div
                      className={cn(
                        "h-3 w-3 rounded-full border-2 border-white",
                        item.isNew ? "bg-blue-500" : "bg-gray-300",
                      )}
                    />
                  </div>
                  <div className="ml-6">
                    <Link href={getHref(item.type, item.id)}>
                      <div className="rounded-lg border bg-white h-[136px] p-4 shadow-sm cursor-pointer">
                        <div className="flex items-start gap-4">
                          <div className="h-10 w-10 rounded-lg bg-gray-100 grid place-items-center">
                            {getIcon(item.type)}
                          </div>
                          <div className="flex-1 space-y-1">
                            <div className="flex items-center justify-between">
                              <p className="text-sm font-medium">{item.title}</p>
                              <div className="flex flex-col items-end">
                              <span className="text-xs text-gray-500">{item.date}</span>
                                {item.isNew && (
                                <div className="w-6 h-6 rounded-full mt-2 bg-[#2AA9ED]"></div>
                                )}
                              </div>
                            </div>
                            <p className="text-sm text-gray-500">{item.description}</p>
                            {item.code && (
                              <div
                                className={cn(
                                  "inline-flex items-center rounded-full border px-2.5 py-1 text-[#81889B] text-xs font-semibold",
                                  item.code === 4 ? "bg-[#FFEDED] text-[#E9272A]" : ""
                                )}
                              >
                                Code {item.code}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

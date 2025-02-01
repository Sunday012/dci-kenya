import Link from "next/link"
import { Grid3X3, FileText, Megaphone, Users2 } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import Image from "next/image"

const apps = [
  {
    name: "Snapshot",
    icon: "/snapshot.svg",
    href: "/snapshot",
  },
  {
    name: "Cases",
    icon: "/cases.svg",
    href: "/cases",
  },
  {
    name: "Reports",
    icon: "reports.svg",
    href: "/reports",
  },
  {
    name: "Chats",
    icon: "/chats.svg",
    href: "/chats",
  },
]

export function AppGrid() {
  return (
    <div className="grid bg-[#F3F4F4] py-[48px] px-[55px] rounded-[40px] max-w-4xl grid-cols-2 md:grid-cols-4 items-center justify-center gap-[50px]">
      {apps.map((app) => (
        <Link key={app.name} href={app.href} className="flex flex-col items-center gap-2">
          <Card className="hover:bg-gray-50 size-[154px] cursor-pointer rounded-[40px] flex items-center justify-center shadow-none border-none transition-colors">
            <CardContent className="p-6 flex flex-col items-center gap-4">
              <div className="p-2 rounded-lg">
                <Image src={app.icon} alt="report" width={64} height={64} />
              </div>
            </CardContent>
          </Card>
              <span className="text-sm text-gray-600">{app.name}</span>
        </Link>
      ))}
    </div>
  )
}


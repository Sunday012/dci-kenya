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
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {apps.map((app) => (
        <Link key={app.name} href={app.href}>
          <Card className="hover:bg-gray-50 cursor-pointer transition-colors">
            <CardContent className="p-6 flex flex-col items-center gap-4">
              <div className="p-2 rounded-lg bg-blue-50">
                <Image src={app.icon} alt="report" width={40} height={40} />
              </div>
              <span className="text-sm text-gray-600">{app.name}</span>
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  )
}


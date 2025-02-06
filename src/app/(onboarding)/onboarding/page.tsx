import { Search } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { AppGrid } from "../_components/app-grid"
import { Icons } from "@/app/_components/Icons"
import { Header } from "@/app/(apps)/_components/header"

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <Header />

      {/* Main Content */}
      <main className="flex-1 px-8 pt-8 pb-40 flex flex-col items-center justify-center">
        <div className="max-w-6xl w-full space-y-8 text-center">
          <div className="space-y-2 mb-[58px] mt-5">
            <h1 className="text-[40px] font-medium">Welcome, <span className="font-bold">John Jay</span></h1>
            <p className="text-gray-500">Solve your cases with digitized investigation and evidence management.</p>
          </div>

          <div className="space-y-4 flex flex-col items-center">
            <div className="flex items-center justify-center gap-2 mb-4 text-sm text-gray-500">
              <Icons.block />
              <span>All apps</span>
            </div>
            <AppGrid />
          </div>
        </div>
      </main>
    </div>
  )
}


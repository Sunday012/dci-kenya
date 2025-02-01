import { Search } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { AppGrid } from "../_components/app-grid"

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <header className="flex h-16 items-center justify-between border-b px-4 lg:px-6">
        <div className="flex items-center gap-4">
          <a className="flex items-center gap-2 font-semibold" href="#">
            <div className="h-8 w-8 rounded-full bg-blue-600 text-white grid place-items-center font-bold">D</div>
          </a>
        </div>
        <div className="flex-1 flex justify-center max-w-xl">
          <div className="w-full relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
            <Input
              type="search"
              placeholder="Search DGI"
              className="w-full bg-gray-100 pl-8 focus-visible:ring-0 border-none"
            />
          </div>
        </div>
        <div className="flex items-center gap-4">
          <Avatar className="h-8 w-8">
            <AvatarImage src="https://v0.dev/placeholder.svg" alt="Avatar" />
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 p-8 flex flex-col items-center">
        <div className="max-w-6xl w-full space-y-8 text-center">
          <div className="space-y-2">
            <h1 className="text-3xl font-medium">Welcome, John Jay</h1>
            <p className="text-gray-500">Solve your cases with digitized investigation and evidence management.</p>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
              <div className="h-1 w-1 rounded-full bg-gray-300" />
              <span>All apps</span>
            </div>
            <AppGrid />
          </div>
        </div>
      </main>
    </div>
  )
}


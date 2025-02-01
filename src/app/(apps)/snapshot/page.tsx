import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { FileText, ChevronRight, Image, Video } from "lucide-react"

export default function SnapshotPage() {
  return (
    <main className="p-8">
      <h1 className="text-2xl font-semibold mb-8">Snapshot</h1>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-3 mb-8">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Total cases</p>
                <h2 className="text-2xl font-bold">
                  <span className="text-red-500">•</span> 107
                </h2>
              </div>
              <ChevronRight className="h-5 w-5 text-gray-400" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Pending cases</p>
                <h2 className="text-2xl font-bold">
                  <span className="text-yellow-500">•</span> 32
                </h2>
              </div>
              <ChevronRight className="h-5 w-5 text-gray-400" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Resolved cases</p>
                <h2 className="text-2xl font-bold">
                  <span className="text-green-500">•</span> 75
                </h2>
              </div>
              <ChevronRight className="h-5 w-5 text-gray-400" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Reports and Cases */}
      <div className="grid gap-8 md:grid-cols-2 mb-8">
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold">Recent reports</h2>
            <Button variant="link" size="sm">
              View all
            </Button>
          </div>
          <div className="space-y-4">
            {[...Array(6)].map((_, i) => (
              <Card key={i}>
                <CardContent className="p-4">
                  <div className="flex items-center gap-4">
                    <div className="h-10 w-10 rounded-lg bg-gray-100 grid place-items-center">
                      {i % 3 === 0 && <FileText className="h-5 w-5 text-gray-600" />}
                      {i % 3 === 1 && <Video className="h-5 w-5 text-gray-600" />}
                      {i % 3 === 2 && <Image className="h-5 w-5 text-gray-600" />}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">
                        {i % 3 === 0 && "doc.274l2l2..."}
                        {i % 3 === 1 && "vid93kmnd..."}
                        {i % 3 === 2 && "IMG383mdnd..."}
                      </p>
                      <p className="text-xs text-gray-500">PDF</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm">10:27AM</p>
                      <p className="text-xs text-gray-500">Jan. 4, 2025</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold">Recent cases</h2>
            <Button variant="link" size="sm">
              View all
            </Button>
          </div>
          <div className="space-y-4">
            {[...Array(6)].map((_, i) => (
              <Card key={i}>
                <CardContent className="p-4">
                  <div className="flex items-center gap-4">
                    <div className="h-10 w-10 rounded-lg bg-gray-100 grid place-items-center">
                      <FileText className="h-5 w-5 text-gray-600" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">GHb7858</p>
                      <p className="text-xs text-gray-500">On 24 January 2025 at approxi...</p>
                    </div>
                    <div className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold border">
                      {i % 2 === 0 ? (
                        <span className="flex items-center gap-1">
                          <span className="h-1 w-1 rounded-full bg-yellow-500" />
                          In progress
                        </span>
                      ) : (
                        <span className="flex items-center gap-1">
                          <span className="h-1 w-1 rounded-full bg-green-500" />
                          Resolved
                        </span>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Crime Map */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-semibold">Crime map</h2>
          <Button variant="link" size="sm">
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
        <Card>
          <CardContent className="p-0 aspect-[2/1] bg-gray-100" />
        </Card>
      </div>
    </main>
  )
}



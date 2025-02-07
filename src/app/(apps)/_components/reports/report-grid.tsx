"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Search, Filter, FileText, ImageIcon, Video, Music } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Report, ReportFilters, PaginationState, MediaType } from "@/types/reports"
import { Icons } from "@/app/_components/Icons"

const ITEMS_PER_PAGE = 10

const mediaIcons = {
  image: ImageIcon,
  video: Video,
  audio: Music,
  document: FileText,
}

export function ReportsGrid() {
  const [filters, setFilters] = useState<ReportFilters>({
    search: "",
    type: "all",
    status: "all",
  })

  const [pagination, setPagination] = useState<PaginationState>({
    page: 1,
    totalPages: 10,
    itemsPerPage: ITEMS_PER_PAGE,
  })

  // Mock data - replace with actual API call
  const reports: Report[] = [
    {
      id: "IMG0673hNS",
      filename: "IMG0673hNS.png",
      type: "image",
      description: "Suspect #1 brandished a firearm and demanded cash and valuables...",
      date: "24 January 2025",
      time: "14:00",
      location: "456 Market Street, Nairobi",
      caseId: "GHb7858",
      status: "in_progress",
      url: "",
    },
    // Add more mock data here
  ]

  const filteredReports = reports.filter((report) => {
    const matchesSearch = report.filename.toLowerCase().includes(filters.search.toLowerCase())
    const matchesType = filters.type === "all" || report.type === filters.type
    const matchesStatus = filters.status === "all" || report.status === filters.status
    return matchesSearch && matchesType && matchesStatus
  })

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex flex-col justify-between items-start">
        <h1 className="text-2xl font-bold mb-4">Reports</h1>
        <div className="flex gap-2">
          <div className="relative">
            <Input
              placeholder="Search reports..."
              value={filters.search}
              onChange={(e) => setFilters((prev) => ({ ...prev, search: e.target.value }))}
              className="pl-10 w-[300px]"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>
          <Button variant="outline" size="icon" className="w-[109px]">
            <Icons.filter className="h-4 w-4" />
            Filter
          </Button>
        </div>
      </div>

      <div className="flex gap-[28px]">
        <Button
          variant={filters.type === "all" ? "default" : "outline"}
          className="rounded-[20px]"
          onClick={() => setFilters((prev) => ({ ...prev, type: "all" }))}
        >
          All
        </Button>
        {Object.keys(mediaIcons).map((type) => {
          const Icon = mediaIcons[type as MediaType]
          return (
            <Button
              key={type}
              variant={filters.type === type ? "default" : "outline"}
              className="rounded-[20px]"
              onClick={() => setFilters((prev) => ({ ...prev, type: type as MediaType }))}
            >
              {type.charAt(0).toUpperCase() + type.slice(1)}s
            </Button>
          )
        })}
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {filteredReports.map((report) => (
          <Link key={report.id} href={`/reports/${report.id}`}>
            <Card className="cursor-pointer hover:shadow-lg transition-shadow">
              <CardContent className="size-[213px]">
                <div className="relative mb-2 bg-gray-100 rounded-lg overflow-hidden">
                  {report.type === "image" ? (
                    <Image src={report.url || "/placeholder.svg"} alt={report.filename} fill className="object-cover" />
                  ) : (
                    <div className="flex items-center justify-center h-full">
                      {(() => {
                        const Icon = mediaIcons[report.type]
                        return <Icon className="h-12 w-12 text-gray-400" />
                      })()}
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
                <div className="space-y-2 mt-2">
                  <div className="flex items-start justify-between">
                    <p className="font-medium truncate">{report.filename}</p>
                    {/* <Badge variant={report.status === "resolved" ? "default" : "destructive"}>
                      {report.status === "resolved" ? "Resolved" : "In Progress"}
                    </Badge> */}
                  </div>
                  <p className="text-sm text-gray-500 truncate">{report.caseId}</p>
                </div>
          </Link>
        ))}
      </div>

      <div className="flex items-end justify-end w-full">
        <div className="flex gap-2 items-center">
        <p className="text-sm text-muted-foreground">
          Page {pagination.page} of {pagination.totalPages}
        </p>
          <Button
           className="bg-dci-grey hover:bg-dci-grey text-[#81889B]"
            disabled={pagination.page === 1}
            onClick={() => {
              setPagination((prev) => ({ ...prev, page: prev.page - 1 }))
            }}
          >
            Previous
          </Button>
          <Button
          className="bg-dci-blue hover:bg-dci-blue"
            disabled={pagination.page === pagination.totalPages}
            onClick={() => {
              setPagination((prev) => ({ ...prev, page: prev.page + 1 }))
            }}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  )
}


"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
// import { CRIME_TYPES, STATUS_TYPES, generateMockCases } from "@/lib/utils"
import type { CaseFilters, PaginationState } from "@/types/cases"
import { generateMockCases,CRIME_TYPES, STATUS_TYPES } from "@/lib/case-utils"

const ITEMS_PER_PAGE = 10
const TOTAL_ITEMS = 1000

export function CasesTable() {
  const router = useRouter()
  const searchParams = useSearchParams()

  // State management
  const [filters, setFilters] = useState<CaseFilters>({
    search: searchParams.get("search") || "",
    crimeType: searchParams.get("crimeType") || "All",
    status: searchParams.get("status") || "All",
  })

  const [pagination, setPagination] = useState<PaginationState>({
    page: Number(searchParams.get("page")) || 1,
    totalPages: Math.ceil(TOTAL_ITEMS / ITEMS_PER_PAGE),
    itemsPerPage: ITEMS_PER_PAGE,
  })

  // Generate mock data for the current page
  const cases = generateMockCases(pagination.itemsPerPage)

  // Filter cases based on current filters
  const filteredCases = cases.filter((case_) => {
    const matchesSearch = case_.id.toLowerCase().includes(filters.search.toLowerCase())
    const matchesCrimeType = filters.crimeType === "All" || case_.crimeType === filters.crimeType
    const matchesStatus =
      filters.status === "All" ||
      (filters.status === "In progress" ? case_.status === "in_progress" : case_.status === "resolved")

    return matchesSearch && matchesCrimeType && matchesStatus
  })

  // Update URL with current filters and pagination
  const updateURL = (newFilters: Partial<CaseFilters>, newPage?: number) => {
    const updatedFilters = { ...filters, ...newFilters }
    const params = new URLSearchParams()

    if (updatedFilters.search) params.set("search", updatedFilters.search)
    if (updatedFilters.crimeType !== "All") params.set("crimeType", updatedFilters.crimeType)
    if (updatedFilters.status !== "All") params.set("status", updatedFilters.status)
    if (newPage && newPage > 1) params.set("page", newPage.toString())

    router.push(`?${params.toString()}`)
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <Select
          value={filters.crimeType}
          onValueChange={(value) => {
            setFilters((prev) => ({ ...prev, crimeType: value }))
            updateURL({ crimeType: value })
          }}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select crime type" />
          </SelectTrigger>
          <SelectContent>
            {CRIME_TYPES.map((type) => (
              <SelectItem key={type} value={type}>
                {type}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Input
          placeholder="Search case ID"
          value={filters.search}
          onChange={(e) => {
            setFilters((prev) => ({ ...prev, search: e.target.value }))
            updateURL({ search: e.target.value })
          }}
          className="max-w-sm"
        />

        <Select
          value={filters.status}
          onValueChange={(value) => {
            setFilters((prev) => ({ ...prev, status: value }))
            updateURL({ status: value })
          }}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select status" />
          </SelectTrigger>
          <SelectContent>
            {STATUS_TYPES.map((type) => (
              <SelectItem key={type} value={type}>
                {type}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Case ID</TableHead>
              <TableHead>Personnel</TableHead>
              <TableHead>Time</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredCases.map((case_) => (
              <TableRow key={case_.id}>
                <TableCell>
                  <Link href={`/cases/${case_.id}`} className="hover:underline">
                    {case_.id}
                  </Link>
                </TableCell>
                <TableCell>
                  <div className="flex -space-x-2">
                    <div className="flex items-center gap-2">
                      <div className="flex -space-x-2">
                      {case_.personnel.map((person, i) => (
                        <Avatar key={i} className="border-2 border-background">
                        <AvatarImage src={person.avatar} alt={person.name} />
                        <AvatarFallback>{person.name[0]}</AvatarFallback>
                        </Avatar>
                      ))}
                      </div>
                      <span className="ml-2">
                      {case_.personnel.map((person) => person.name).join(", ").length > 20
                        ? `${case_.personnel.map((person) => person.name).join(", ").slice(0, 20)}...`
                        : case_.personnel.map((person) => person.name).join(", ")}
                      </span>
                    </div>
                  </div>
                </TableCell>
                <TableCell>{case_.time}</TableCell>
                <TableCell>{case_.date}</TableCell>
                <TableCell>
                    <Badge className={`rounded-[10px] text-black shadow-none py-[6px] px-3 ${case_.status === "resolved" ? "bg-[#EEF7EB] hover:bg-dci-lightGreen" : "bg-[#F7F4EB] hover:bg-dci-lightYellow"}`}>
                    <span className="inline-block w-2 h-2 mr-2 rounded-full" style={{ backgroundColor: case_.status === "resolved" ? "#4FCB2A" : "#F0C22D" }}></span>
                    {case_.status === "resolved" ? "Resolved" : "In progress"}
                    </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
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
              updateURL({}, pagination.page - 1)
            }}
          >
            Previous
          </Button>
          <Button
          className="bg-dci-blue hover:bg-dci-blue"
            disabled={pagination.page === pagination.totalPages}
            onClick={() => {
              setPagination((prev) => ({ ...prev, page: prev.page + 1 }))
              updateURL({}, pagination.page + 1)
            }}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  )
}


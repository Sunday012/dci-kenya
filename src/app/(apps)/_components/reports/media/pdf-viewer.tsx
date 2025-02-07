"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"

interface PDFViewerProps {
  src: string
  title: string
}

export function PDFViewer({ src, title }: PDFViewerProps) {
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  const handlePrevious = () => {
    setCurrentPage((page) => Math.max(page - 1, 1))
  }

  const handleNext = () => {
    setCurrentPage((page) => Math.min(page + 1, totalPages))
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center p-8 bg-gray-100 rounded-lg">
        <AlertCircle className="h-12 w-12 text-red-500 mb-2" />
        <p className="text-gray-500">{error}</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <p className="font-medium">{title}</p>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon" onClick={handlePrevious} disabled={currentPage === 1}>
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <span className="text-sm">
            Page {currentPage} of {totalPages}
          </span>
          <Button variant="outline" size="icon" onClick={handleNext} disabled={currentPage === totalPages}>
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="relative bg-white rounded-lg shadow overflow-hidden">
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900" />
          </div>
        )}
        <iframe
          src={`${src}#page=${currentPage}`}
          className="w-full h-[800px]"
          onLoad={() => setIsLoading(false)}
          onError={() => setError("Failed to load PDF")}
        />
      </div>
    </div>
  )
}


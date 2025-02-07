export type MediaType = "image" | "video" | "audio" | "document"

export interface Report {
  id: string
  filename: string
  type: MediaType
  description: string
  date: string
  time: string
  location: string
  caseId: string
  status: "in_progress" | "resolved"
  url: string
}

export interface ReportFilters {
  search: string
  type: MediaType | "all"
  status: "all" | "in_progress" | "resolved"
}

export interface PaginationState {
  page: number
  totalPages: number
  itemsPerPage: number
}


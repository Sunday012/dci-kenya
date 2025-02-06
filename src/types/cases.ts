export interface Case {
    id: string
    personnel: {
      name: string
      avatar?: string
    }[]
    time: string
    date: string
    status: "in_progress" | "resolved"
    crimeType: string
  }
  
  export interface CaseFilters {
    search: string
    crimeType: string
    status: string
  }
  
  export interface PaginationState {
    page: number
    totalPages: number
    itemsPerPage: number
  }
  
  
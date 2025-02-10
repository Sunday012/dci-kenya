import axios from "axios"

export const api = axios.create({
  baseURL: "http://167.235.51.199:8000/api/v1",
})

export type CaseStatus = "pending" | "in_progress" | "resolved"

export interface CaseData {
  id: string
  status: CaseStatus
  summary: string
  date: string
  time: string
  timeReported: string
  location: string
  witness: {
    name: string
    avatar?: string
  }
  attachments: Array<{
    id: string
    name: string
    type: "image" | "video" | "pdf"
    url: string
  }>
  notes: Array<{
    id: string
    content: string
    attachments: Array<{
      id: string
      name: string
      type: "image" | "video" | "pdf"
      url: string
    }>
    createdAt: string
  }>
}

export const updateCaseStatus = async (caseId: string, status: CaseStatus) => {
  const { data } = await api.patch(`/case_officer/report/update-status/${caseId}`, {
    status,
  })
  return data
}

export const uploadFile = async (caseId: string, file: File, onProgress?: (progress: number) => void) => {
  const formData = new FormData()
  formData.append("file", file)

  const { data } = await api.post(`/case_officer/report/${caseId}/upload`, formData, {
    onUploadProgress: (progressEvent) => {
      if (progressEvent.total) {
        const progress = (progressEvent.loaded * 100) / progressEvent.total
        onProgress?.(progress)
      }
    },
  })
  return data
}

export const addNote = async (caseId: string, content: string, attachments: File[]) => {
  const formData = new FormData()
  formData.append("content", content)
  attachments.forEach((file) => {
    formData.append("attachments", file)
  })

  const { data } = await api.post(`/case_officer/report/${caseId}/notes`, formData)
  return data
}


"use client"

import { useRef, useState } from "react"
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { Pencil, Upload } from "lucide-react"
import { api, type CaseData, type CaseStatus, updateCaseStatus, uploadFile, addNote } from "@/lib/queries/update-status"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Icons } from "@/app/_components/Icons"
import { UploadReportDialog } from "../../_components/upload-report-dialog"

interface Attachment {
  id: string
  type: "pdf" | "image" | "video"
  url: string
}

interface Note {
  id: string
  content: string
  attachments: Attachment[]
}

interface NotesSectionProps {
  caseData: {
    notes: Note[]
  }
  note: string
  setNote: (note: string) => void
  onUpload: (file: File) => Promise<Attachment>
  addNoteMutation: {
    mutate: () => void
    isPending: boolean
  }
}

interface PageProps {
  params: {
    id: string[]
  }
  searchParams: { [key: string]: string | string[] | undefined }
}

export default function CasePageClient({ caseId }: { caseId: string }) {
  const queryClient = useQueryClient()
  const [note, setNote] = useState("")
  const [attachments, setAttachments] = useState<File[]>([])
  const [uploadProgress, setUploadProgress] = useState<Record<string, number>>({})
  const [showUploadDialog, setShowUploadDialog] = useState(false)
  const [currentUpload, setCurrentUpload] = useState<{
    file: File
    progress: number
  } | null>(null)
  const [isUploading, setIsUploading] = useState(false)
  const [currentAttachments, setCurrentAttachments] = useState<Attachment[]>([])
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    try {
      setIsUploading(true)
      // Simulate upload progress
      const progressInterval = setInterval(() => {
        setUploadProgress((prev) => ({
          ...prev,
          [file.name]: Math.min((prev[file.name] || 0) + 10, 90)
        }))
      }, 200)

      const response = await uploadFileMutation.mutateAsync(file)
      const attachment = { id: '1', type: 'image' as const, url: URL.createObjectURL(file) }

      clearInterval(progressInterval)
      setUploadProgress({ [file.name]: 100 })

      setCurrentAttachments((prev) => [...prev, attachment])

      // Reset after completion
      setTimeout(() => {
        setIsUploading(false)
        setUploadProgress({})
      }, 500)
    } catch (error) {
      console.error("Upload failed:", error)
      setIsUploading(false)
      setUploadProgress({})
    }
  }

  const mockData: CaseData = {
    id: caseId,
    status: "pending",
    summary: "On 24 January 2025 at approximately 14:00 hours, the victim, Mary Njeri, was at her shop located at 456 Market Street, Nairobi, when two male suspects entered the premises. Suspect #1 brandished a firearm and demanded cash and valuables. Suspect #2 acted as a lookout near the entrance. The suspects forced the victim to open the cash register and took approximately 50,000 Kenyan Shillings in cash and various items of jewelry. The suspects then fled the scene on foot heading east on Market Street.",
    date: "2024-01-15",
    time: "14:30",
    timeReported: "2024-01-15 15:00",
    location: "123 Test Street, Demo City",
    witness: {
      name: "John Doe",
      avatar: "",
    },
    notes: [
      {
        id: "1",
        content: "Initial investigation started",
        attachments: [
          { id: "1", name: "image1.jpg", type: "image", url: "/images/crime.png" },
          { id: "2", name: "document.pdf", type: "pdf", url: "/pdf/COS-Textbook.pdf" },
        ],
        createdAt: "2024-01-15T15:00:00Z",
      },
    ],
    attachments: [
      { id: "1", name: "image1.jpg", type: "image", url: "/images/crime.png" },
      { id: "2", name: "video1.mp4", type: "video", url: "/videos/video.mp4" },
      { id: "3", name: "document.pdf", type: "pdf", url: "/pdf/COS-Textbook.pdf" },
    ],
  }

  const { data: caseData, isLoading } = useQuery<CaseData>({
    queryKey: ["case", caseId],
    queryFn: () => Promise.resolve(mockData),
  })

  // const { data: caseData, isLoading } = useQuery<CaseData>({
  //   queryKey: ["case", caseId],
  //   queryFn: () => api.get(`/case_officer/report/${caseId}`).then((res) => res.data),
  // })

  const updateStatusMutation = useMutation({
    mutationFn: ({ status }: { status: CaseStatus }) => updateCaseStatus(caseId, status),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["case", caseId] })
    },
  })

  const addNoteMutation = useMutation({
    mutationFn: async () => {
      if (!note) return
      await addNote(caseId, note, attachments)
      setNote("")
      setAttachments([])
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["case", caseId] })
    },
  })

  const uploadFileMutation = useMutation({
    mutationFn: async (file: File) => {
      setCurrentUpload({ file, progress: 0 })
      await uploadFile(caseId, file, (progress) => {
        setCurrentUpload((prev) => (prev ? { ...prev, progress } : null))
      })
      setCurrentUpload(null)
      setShowUploadDialog(false)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["case", caseId] })
    },
  })

  if (isLoading || !caseData) {
    return <div>Loading...</div>
  }

  return (
    <div className="flex min-h-screen">
      {/* Left Panel */}
      <div className="w-[50%] p-8 border-r">
        <div className="max-w-3xl mx-auto space-y-6">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-semibold">Report {caseData.id}</h1>
            <Select
              value={caseData.status}
              onValueChange={(value: CaseStatus) => updateStatusMutation.mutate({ status: value })}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="in_progress">In Progress</SelectItem>
                <SelectItem value="resolved">Resolved</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <section>
            <h2 className="font-medium mb-2">Report Summary</h2>
            <p className="text-gray-600">{caseData.summary}</p>
          </section>

          <div className="grid grid-cols-3 gap-8">
            <section>
              <h2 className="font-medium mb-2">Crime Date</h2>
              <p className="text-gray-600">{caseData.date}</p>
            </section>
            <section>
              <h2 className="font-medium mb-2">Crime Time</h2>
              <p className="text-gray-600">{caseData.time}</p>
            </section>
            <section>
              <h2 className="font-medium mb-2">Time Reported</h2>
              <p className="text-gray-600">{caseData.timeReported}</p>
            </section>
          </div>

          <div className="grid grid-cols-2 gap-8">
          <section>
              <h2 className="font-medium mb-2">Witness</h2>
              <div className="flex items-center gap-3">
                <Avatar>
                  <AvatarImage src={caseData.witness.avatar} />
                  <AvatarFallback>
                    {caseData.witness.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <span className="text-gray-600">{caseData.witness.name}</span>
              </div>
            </section>
            <section>
              <h2 className="font-medium mb-2">Location</h2>
              <p className="text-gray-600">{caseData.location}</p>
            </section>
          </div>
        </div>
      </div>

      {/* Right Panel */}
      <div className="w-[60%] p-8">
        <h2 className="font-medium mb-4">Attachments</h2>
        <div className="grid grid-cols-3 gap-8">
          {caseData.attachments.map((attachment) => (
            <div key={attachment.id} className="w-[179px] h-[179px] rounded-lg bg-gray-100 overflow-hidden relative group">
              {attachment.type === "image" ? (
                <img src={attachment.url || "/placeholder.svg"} alt="" className="w-full h-full object-cover" />
              ) : attachment.type === "video" ? (
                <video src={attachment.url} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full grid place-items-center">
                  <span className="text-sm text-gray-500">PDF</span>
                </div>
              )}
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <Button variant="ghost" size="icon" className="text-white">
                  <Pencil className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
     
    <section className="space-y-6 mt-5">
      <div className="flex items-center gap-2">
      <Icons.book />
        <h2 className="font-medium">Add notes</h2>
      </div>

      <div className="grid grid-cols-[1fr,200px] gap-4">
        <div className="relative">
          <Textarea
            placeholder="Type your notes here..."
            value={note}
            onChange={(e) => setNote(e.target.value)}
            className="min-h-[120px] border-dashed resize-none"
          />
        </div>

        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileUpload}
          className="hidden"
          accept="image/*,application/pdf,video/*"
        />

        <div
          className="relative border-2 border-dashed rounded-lg flex items-center justify-center cursor-pointer hover:bg-gray-50 transition-colors"
          onClick={() => fileInputRef.current?.click()}
        >
          {isUploading ? (
            <div className="text-center space-y-2">
              <div className="w-full h-1 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-blue-500 transition-all duration-300"
                  style={{ width: `${uploadProgress}%` }}
                />
              </div>
              <p className="text-sm text-gray-600">{Object.values(uploadProgress)[0] || 0}%</p>
            </div>
          ) : (
            <div className="text-center space-y-2">
              <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center mx-auto">
                <Upload className="h-4 w-4 text-gray-600" />
              </div>
              <p className="text-sm text-gray-600">Upload a file</p>
            </div>
          )}
        </div>
      </div>

      {/* Current attachments */}
      {currentAttachments.length > 0 && (
        <div className="grid grid-cols-3 gap-4">
          {currentAttachments.map((attachment) => (
            <div key={attachment.id} className="space-y-2">
              <div className="aspect-square rounded-lg bg-gray-100 overflow-hidden">
                {attachment.type === "image" ? (
                  <img src={attachment.url || "/placeholder.svg"} alt="" className="w-full h-full object-cover" />
                ) : attachment.type === "video" ? (
                  <video src={attachment.url} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <span className="text-sm text-gray-500">PDF</span>
                  </div>
                )}
              </div>
              <p className="text-sm text-gray-500">{attachment.id}</p>
            </div>
          ))}
        </div>
      )}

      {/* Previous notes */}
      {caseData.notes.length > 0 && (
        <div className="space-y-4">
          {caseData.notes.map((note) => (
            <div key={note.id} className="space-y-4">
              <p className="text-gray-600">{note.content}</p>
              {note.attachments.length > 0 && (
                <div className="grid grid-cols-3 gap-4">
                  {note.attachments.map((attachment) => (
                    <div key={attachment.id} className="space-y-2">
                      <div className="aspect-square rounded-lg bg-gray-100 overflow-hidden">
                        {attachment.type === "image" ? (
                          <img
                            src={attachment.url || "/placeholder.svg"}
                            alt=""
                            className="w-full h-full object-cover"
                          />
                        ) : attachment.type === "video" ? (
                          <video src={attachment.url} className="w-full h-full object-cover" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <span className="text-sm text-gray-500">PDF</span>
                          </div>
                        )}
                      </div>
                      <p className="text-sm text-gray-500">{attachment.id}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </section>
      </div>
      <UploadReportDialog open={isUploading} fileName={currentUpload?.file} progress={currentUpload?.progress} onClose={() => setShowUploadDialog(false)} />
      {/* <Dialog open={showUploadDialog} onOpenChange={setShowUploadDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Upload File</DialogTitle>
          </DialogHeader>
          {currentUpload ? (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm">{currentUpload.file.name}</span>
                <span className="text-sm text-gray-500">{Math.round(currentUpload.progress)}%</span>
              </div>
              <Progress value={currentUpload.progress} />
              <div className="flex justify-end">
                <Button variant="ghost" onClick={() => setShowUploadDialog(false)}>
                  Close
                </Button>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <label className="block">
                <span className="sr-only">Choose file</span>
                <input
                  type="file"
                  className="block w-full text-sm text-gray-500
                    file:mr-4 file:py-2 file:px-4
                    file:rounded-full file:border-0
                    file:text-sm file:font-semibold
                    file:bg-violet-50 file:text-violet-700
                    hover:file:bg-violet-100
                  "
                  onChange={(e) => {
                    const file = e.target.files?.[0]
                    if (file) {
                      uploadFileMutation.mutate(file)
                    }
                  }}
                />
              </label>
            </div>
          )}
        </DialogContent>
      </Dialog> */}
    </div>
  )
}


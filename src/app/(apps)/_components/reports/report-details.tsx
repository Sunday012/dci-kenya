"use client"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Report } from "@/types/reports"
import { VideoPlayer } from "./media/video-player"
import { AudioPlayer } from "./media/audio-player"
import { PDFViewer } from "./media/pdf-viewer"


interface ReportDetailProps {
  report: Report
}

export function ReportDetail({ report }: ReportDetailProps) {
  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex flex-col items-start gap-4">
        <h1 className="text-2xl font-bold">{report.filename}</h1>
        <Button variant="ghost" className="p-2">
          <ArrowLeft className="h-4 w-4" />
          Back
        </Button>
      </div>

      <div>
        <h1 className="text-[#0A161E] font-semibold text-[20px]">Report description</h1>
        <p>Suspect #1 brandished a firearm and demanded cash and valuables. Suspect #2 acted as a lookout near the entrance. The suspects forced the victim to open the cash register and took approximately 50,000 Kenyan Shillings in cash and various items of jewelry. The suspects then fled the scene on foot heading east on Market Street.</p>
      </div>

      <div className="grid gap-6">
        <div className="space-y-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <p className="text-sm text-gray-500">Date</p>
              <p className="font-medium">{report.date}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Time</p>
              <p className="font-medium">{report.time}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Location</p>
              <p className="font-medium">{report.location}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Case ID</p>
              <p className="font-medium">{report.caseId}</p>
            </div>
          </div>
        </div>

        <div className="bg-gray-100 rounded-lg p-4">
          {report.type === "image" && (
            <div className="relative aspect-video">
              <img
                src={report.url || "/placeholder.svg"}
                alt={report.filename}
                className="rounded-lg object-contain w-full h-full"
              />
            </div>
          )}
          {report.type === "video" && <VideoPlayer src={report.url} title={report.filename} />}
          {report.type === "audio" && <AudioPlayer src={report.url} title={report.filename} />}
          {(report.type === "document") && <PDFViewer src={report.url} title={report.filename} />}
        </div>
      </div>
    </div>
  )
}


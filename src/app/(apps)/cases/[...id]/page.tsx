"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { FileText, Upload } from "lucide-react"
import { AppealCaseDialog } from "../../_components/appeal-case"
import { UploadReportDialog } from "../../_components/upload-report-dialog"
import { SuccessDialog } from "../../_components/success-dialog"

interface CaseData {
  id: string
  status: "pending" | "in_progress" | "resolved"
  summary: string
  date: string
  time: string
  location: string
  assignedPersonnel: string[]
}

export default function CasePage() {
  const [caseData, setCaseData] = useState<CaseData>({
    id: "GHb7858",
    status: "pending",
    summary:
      "On 24 January 2025 at approximately 14:00 hours, the victim, Mary Njeri, was at her shop located at 456 Market Street, Nairobi, when two male suspects entered the premises. Suspect #1 brandished a firearm and demanded cash and valuables. Suspect #2 acted as a lookout near the entrance. The suspects forced the victim to open the cash register and took approximately 50,000 Kenyan Shillings in cash and various items of jewelry. The suspects then fled the scene on foot heading east on Market Street.",
    date: "24 January 2025",
    time: "14:00",
    location: "456 Market Street, Nairobi",
    assignedPersonnel: ["John Mwangi", "Dan Joe"],
  })

  const [showAppealDialog, setShowAppealDialog] = useState(false)
  const [showUploadDialog, setShowUploadDialog] = useState(false)
  const [showSuccessDialog, setShowSuccessDialog] = useState<"accepted" | "appealed" | null>(null)

  const handleAcceptCase = () => {
    setCaseData((prev) => ({ ...prev, status: "in_progress" }))
    setShowSuccessDialog("accepted")
  }

  const handleAppealSubmit = () => {
    setShowAppealDialog(false)
    setShowSuccessDialog("appealed")
  }

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold">Case {caseData.id}</h1>
          {caseData.status === "in_progress" && (
            <div className="flex items-center gap-1 text-sm">
              <span className="h-2 w-2 rounded-full bg-yellow-400" />
              <span>In progress</span>
            </div>
          )}
        </div>

        <div className="space-y-6">
          <section>
            <h2 className="font-medium mb-2">Case Summary</h2>
            <p className="text-gray-600">{caseData.summary}</p>
          </section>

          <div className="grid grid-cols-3 gap-8">
            <section>
              <h2 className="font-medium mb-2">Date</h2>
              <p className="text-gray-600">{caseData.date}</p>
            </section>
            <section>
              <h2 className="font-medium mb-2">Time</h2>
              <p className="text-gray-600">{caseData.time}</p>
            </section>
            <section>
              <h2 className="font-medium mb-2">Location</h2>
              <p className="text-gray-600">{caseData.location}</p>
            </section>
          </div>

          <div className="grid grid-cols-2 gap-8">
            <section>
              <h2 className="font-medium mb-2">Report</h2>
              <div className="space-y-2">
                <Button variant="outline" className="w-full justify-start gap-2" onClick={() => {}}>
                  <FileText className="h-4 w-4" />
                  Video attachment
                </Button>
                {caseData.status === "in_progress" && (
                  <Button
                    variant="outline"
                    className="w-full justify-start gap-2"
                    onClick={() => setShowUploadDialog(true)}
                  >
                    <Upload className="h-4 w-4" />
                    Add new report
                  </Button>
                )}
              </div>
            </section>
            <section>
              <h2 className="font-medium mb-2">Assigned Personnel</h2>
              <div className="flex items-center gap-2">
                {caseData.assignedPersonnel.map((person, i) => (
                  <div key={i} className="h-6 w-6 rounded-full bg-gray-200 grid place-items-center text-xs">
                    {person
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </div>
                ))}
                <span className="text-sm text-gray-600">{caseData.assignedPersonnel.join(", ")}</span>
              </div>
            </section>
          </div>

          {caseData.status === "pending" && (
            <div className="flex gap-4">
              <Button onClick={handleAcceptCase}>Accept case</Button>
              <Button variant="outline" onClick={() => setShowAppealDialog(true)}>
                Appeal case
              </Button>
            </div>
          )}
        </div>
      </div>

      <AppealCaseDialog
        open={showAppealDialog}
        onClose={() => setShowAppealDialog(false)}
        onSubmit={handleAppealSubmit}
      />

      <UploadReportDialog open={showUploadDialog} onClose={() => setShowUploadDialog(false)} />

      <SuccessDialog
        open={showSuccessDialog !== null}
        onClose={() => setShowSuccessDialog(null)}
        type={showSuccessDialog}
      />
    </div>
  )
}


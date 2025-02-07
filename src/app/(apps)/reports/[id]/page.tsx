import { ReportDetail } from "../../_components/reports/report-details"

export default async function ReportDetailPage({ params }: { params: Promise<{ id: string }> }) {
  // Example with the provided audio file
  const resolvedParams = await params;
  const mockReport = {
    id: resolvedParams.id,
    filename: "techno-trance-267681.mp3",
    type: "audio" as const,
    description: "Audio evidence file",
    date: "24 January 2025",
    time: "14:00",
    location: "456 Market Street, Nairobi",
    caseId: "GHb7858",
    status: "in_progress" as const,
    url: "",
  }

  return <ReportDetail report={mockReport} />
}


"use client"
import { type Metadata } from "next"
import CasePageClient from "../_component/case-client-page"
import { useParams } from "next/navigation"

// Define proper types for the page props
type PageProps = {
  params: {
    id: string  // Now id will always be a string
  }
}

// Make the page component async
export default async function CasePage() {
  const params = useParams()
  const caseId = params.id as string
  
  // If you need to fetch data server-side, do it here
  // const initialData = await getCaseData(caseId)

  return (
    <CasePageClient caseId={caseId} />
  )
}
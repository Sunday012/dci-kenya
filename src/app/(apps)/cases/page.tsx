import React from 'react'
import { CasesTable } from '../_components/case-table'

export default function page() {
  return (
    <div className="p-8">
        <h1 className="text-2xl font-semibold mb-8">Reports</h1>
        <CasesTable />
    </div>
  )
}

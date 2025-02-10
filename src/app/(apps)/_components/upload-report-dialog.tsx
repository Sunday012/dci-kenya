"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Progress } from "@/components/ui/progress"
import { Upload } from "lucide-react"
import { Icons } from "@/app/_components/Icons"

interface UploadReportDialogProps {
  open: boolean
  onClose: () => void
  progress: number | undefined
  fileName: File | undefined
}

export function UploadReportDialog({ open, onClose, progress, fileName }: UploadReportDialogProps) {
  const [uploading, setUploading] = useState(true)

  // const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const file = e.target.files?.[0]
  //   if (!file) return

  //   setFileName(file.name)
  //   setUploading(true)

  //   // Simulate upload progress
  //   let progress = 0
  //   const interval = setInterval(() => {
  //     progress += 10
  //     setProgress(progress)
  //     if (progress >= 100) {
  //       clearInterval(interval)
  //       setTimeout(() => {
  //         setUploading(false)
  //         onClose()
  //       }, 500)
  //     }
  //   }, 500)
  // }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md bg-white">
        <DialogHeader>
          <DialogTitle></DialogTitle>
        </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="text-center space-y-2">
              <p className="text-sm font-medium">{fileName?.name}</p>
              <p className="text-sm text-gray-500">
                {(((progress ?? 0) / 100) * 33.2).toFixed(1)} mb • {progress ?? 0}% • {Math.ceil((100 - (progress ?? 0)) / 10)} sec left
              </p>
            </div>
            <Progress value={progress} className="[&>div]:bg-dci-blue h-[69px] rounded-[10px]" />
          </div>
      </DialogContent>
    </Dialog>
  )
}


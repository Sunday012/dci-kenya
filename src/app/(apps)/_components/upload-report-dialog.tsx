"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Progress } from "@/components/ui/progress"
import { Upload } from "lucide-react"

interface UploadReportDialogProps {
  open: boolean
  onClose: () => void
}

export function UploadReportDialog({ open, onClose }: UploadReportDialogProps) {
  const [uploading, setUploading] = useState(false)
  const [progress, setProgress] = useState(0)
  const [fileName, setFileName] = useState("")

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setFileName(file.name)
    setUploading(true)

    // Simulate upload progress
    let progress = 0
    const interval = setInterval(() => {
      progress += 10
      setProgress(progress)
      if (progress >= 100) {
        clearInterval(interval)
        setTimeout(() => {
          setUploading(false)
          onClose()
        }, 500)
      }
    }, 500)
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Choose file for upload</DialogTitle>
        </DialogHeader>
        {!uploading ? (
          <div className="space-y-4 py-4">
            <div className="flex justify-center">
              <input type="file" className="hidden" id="file-upload" onChange={handleFileSelect} />
              <label htmlFor="file-upload">
                <Button asChild>
                  <span className="flex items-center gap-2">
                    <Upload className="h-4 w-4" />
                    Upload file
                  </span>
                </Button>
              </label>
            </div>
          </div>
        ) : (
          <div className="space-y-4 py-4">
            <div className="text-center space-y-2">
              <p className="text-sm font-medium">{fileName}</p>
              <p className="text-sm text-gray-500">
                {((progress / 100) * 33.2).toFixed(1)} mb • {progress}% • {Math.ceil((100 - progress) / 10)} sec left
              </p>
            </div>
            <Progress value={progress} />
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}


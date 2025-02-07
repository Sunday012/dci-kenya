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
}

export function UploadReportDialog({ open, onClose }: UploadReportDialogProps) {
  const [uploading, setUploading] = useState(false)
  const [progress, setProgress] = useState(1)
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
          <DialogTitle></DialogTitle>
        </DialogHeader>
        {!uploading ? (
          <div className="space-y-4 py-4">
            <div className="w-full flex flex-col text-[#81889B] gap-2 items-center">
              <Icons.upload />
              Choose file for upload
            </div>
            <div className="flex justify-center w-full">
              <input type="file" className="hidden" id="file-upload" onChange={handleFileSelect} />
              <label htmlFor="file-upload" className="w-full">
                <Button asChild className="w-full cursor-pointer">
                  <span className="flex items-center gap-2">
                    <Icons.file className="h-4 w-4 fill-white text-white" />
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
            <Progress value={progress} className="[&>div]:bg-dci-blue h-[69px] rounded-[10px]" />
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}


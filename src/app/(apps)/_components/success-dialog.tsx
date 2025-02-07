"use client"

import { Icons } from "@/app/_components/Icons"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { CheckCircle2 } from "lucide-react"

interface SuccessDialogProps {
  open: boolean
  onClose: () => void
  type: "accepted" | "appealed" | "resolved" | null
}

export function SuccessDialog({ open, onClose, type }: SuccessDialogProps) {
  if (!type) return null

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md text-center py-12">
        <div className="flex justify-center mb-4">
          <Icons.check className="h-12 w-12" />
        </div>
        <h2 className="text-lg font-semibold mb-6">
          {type === "accepted" ? "Case accepted" : "Your case is under review!"}
        </h2>
        <Button onClick={onClose} className="min-w-[200px] bg-[#003399] h-[53px] rounded-[10px] py-[12px] px-[28px]">
          Close
        </Button>
      </DialogContent>
    </Dialog>
  )
}


"use client"

import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"

const reasons = [
  "Preset brief reason for selection...",
  "Preset brief reason for selection...",
  "Preset brief reason for selection...",
  "Preset brief reason for selection...",
  "Preset brief reason for selection...",
]

interface AppealCaseDialogProps {
  open: boolean
  onClose: () => void
  onSubmit: () => void
}

export function AppealCaseDialog({ open, onClose, onSubmit }: AppealCaseDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Appeal case</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 flex flex-col gap-[12px] py-4">
          <RadioGroup defaultValue="0">
            {reasons.map((reason, i) => (
              <div key={i} className="flex items-center space-x-2 h-[64px] border border-[#E2E2E2] rounded-[20px] p-[20px]">
                <RadioGroupItem value={i.toString()} id={`reason-${i}`} />
                <Label htmlFor={`reason-${i}`}>{reason}</Label>
              </div>
            ))}
          </RadioGroup>
        </div>
        <div className="flex gap-4">
          <Button onClick={onSubmit} className="bg-[#003399]">Appeal case</Button>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}


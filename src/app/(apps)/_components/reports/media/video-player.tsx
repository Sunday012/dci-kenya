"use client"

import { useState, useRef } from "react"
import { AlertCircle } from "lucide-react"

interface VideoPlayerProps {
  src: string
  title: string
}

export function VideoPlayer({ src, title }: VideoPlayerProps) {
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const videoRef = useRef<HTMLVideoElement>(null)

  const handleError = () => {
    setError("Failed to load video")
    setIsLoading(false)
  }

  const handleLoad = () => {
    setIsLoading(false)
  }

  const handlePlay = () => {
    if (videoRef.current) {
      videoRef.current.play()
    }
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center p-8 bg-gray-100 rounded-lg">
        <AlertCircle className="h-12 w-12 text-red-500 mb-2" />
        <p className="text-gray-500">{error}</p>
      </div>
    )
  }

  return (
    <div className="space-y-2">
      <div className="relative aspect-video bg-black rounded-lg overflow-hidden">
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-900/50">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white" />
          </div>
        )}
        <video
          ref={videoRef}
          className="w-full h-full"
          controls
          controlsList="nodownload"
          onError={handleError}
          onLoadedData={handleLoad}
        >
          <source src={src} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
      <p className="font-medium">{title}</p>
    </div>
  )
}


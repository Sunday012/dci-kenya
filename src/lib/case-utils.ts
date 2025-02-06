import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

interface Case {
  id: string
  personnel: { name: string; avatar: string }[]
  time: string
  date: string
  status: string
  crimeType: string
}

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const CRIME_TYPES = ["All", "Robbery", "Carjacking", "House Break-in", "Mob Justice", "Drug Trafficking"]

export const STATUS_TYPES = ["All", "In progress", "Resolved"]

// Mock data generator
export function generateMockCases(count: number): Case[] {
  return Array.from({ length: count }, (_, i) => ({
    id: `GHb${7858 + i}`,
    personnel: [
      {
        name: "John Jay",
        avatar: "/placeholder.svg",
      },
      {
        name: "Van Da",
        avatar: "/placeholder.svg",
      },
    ],
    time: "10:27 AM",
    date: "4 Jan, 2025",
    status: Math.random() > 0.5 ? "resolved" : "in_progress",
    crimeType: CRIME_TYPES[Math.floor(Math.random() * (CRIME_TYPES.length - 1)) + 1],
  }))
}


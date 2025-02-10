"use client"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { FileText, ChevronRight, Image, Video } from "lucide-react"
import { StatsCard } from "../_components/stat-card"
import { Icons } from "@/app/_components/Icons"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import Link from "next/link"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { generateMockCases,CRIME_TYPES, STATUS_TYPES } from "@/lib/case-utils"
import { useRouter } from "next/navigation"

const stats = [
  {
    label: "Total cases",
    value: 107,
    color: "red"
  },
  {
    label: "Pending cases",
    value: 32,
    color: "yellow"
  },
  {
    label: "Resolved cases",
    value: 75,
    color: "green"
  }
];

export default function SnapshotPage() {
  const handleCardClick = (label : string) => {
    console.log(`Clicked ${label}`);
    // You can add your own click handler logic here
  };
  const route = useRouter()
  const cases = generateMockCases(7)

  return (
    <main className="p-8">
      <h1 className="text-2xl font-semibold mb-8">Snapshot</h1>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-3 mb-8">
      {stats.map((stat) => (
        <StatsCard
          key={stat.label}
          label={stat.label}
          value={stat.value}
          color={stat.color}
          onClick={() => handleCardClick(stat.label)}
        />
      ))}
      </div>

      {/* Recent Reports and Cases */}
      <div className="grid gap-8 mb-8">
        <div className="p-[30px] rounded-[10px]">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold">Recent reports</h2>
            <Link href="/cases">
              View all
            </Link>
          </div>
          <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead></TableHead>
              <TableHead></TableHead>
              <TableHead></TableHead>
              <TableHead></TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {cases.map((case_) => (
              <TableRow key={case_.id} className="cursor-pointer">
                <TableCell>
                  <Link href={`/cases/${case_.id}`} className="hover:underline">
                    {case_.id}
                  </Link>
                </TableCell>
                <TableCell>
                  <div className="flex -space-x-2">
                    <div className="flex items-center gap-2">
                      <div className="flex -space-x-2">
                      {case_.personnel.map((person, i) => (
                        <Avatar key={i} className="border-2 border-background">
                        <AvatarImage src={person.avatar} alt={person.name} />
                        <AvatarFallback>{person.name[0]}</AvatarFallback>
                        </Avatar>
                      ))}
                      </div>
                      <span className="ml-2">
                      {case_.personnel.map((person) => person.name).join(", ").length > 20
                        ? `${case_.personnel.map((person) => person.name).join(", ").slice(0, 20)}...`
                        : case_.personnel.map((person) => person.name).join(", ")}
                      </span>
                    </div>
                  </div>
                </TableCell>
                <TableCell>{case_.time}</TableCell>
                <TableCell>{case_.date}</TableCell>
                <TableCell>
                    <Badge className={`rounded-[10px] text-black shadow-none py-[6px] px-3 ${case_.status === "resolved" ? "bg-[#EEF7EB] hover:bg-dci-lightGreen" : "bg-[#F7F4EB] hover:bg-dci-lightYellow"}`}>
                    <span className="inline-block w-2 h-2 mr-2 rounded-full" style={{ backgroundColor: case_.status === "resolved" ? "#4FCB2A" : "#F0C22D" }}></span>
                    {case_.status === "resolved" ? "Resolved" : "In progress"}
                    </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        </div>
      </div>
      </div>

      {/* Crime Map */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-semibold">Crime map</h2>
          <Button variant="link" size="sm">
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
        <Card>
          <CardContent className="p-0 aspect-[2/1] bg-gray-100" />
        </Card>
      </div>
    </main>
  )
}



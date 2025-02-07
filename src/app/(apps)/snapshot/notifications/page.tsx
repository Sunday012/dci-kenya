import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { FileText, MessageCircle, Bell, Files } from "lucide-react"
import { Timeline } from "../../_components/timeline"

const tabs = [
  {
    id: "all",
    label: "All",
    icon: Bell,
  },
  {
    id: "cases",
    label: "Cases",
    icon: Files,
  },
  {
    id: "reports",
    label: "Reports",
    icon: FileText,
  },
  {
    id: "chats",
    label: "Chats",
    icon: MessageCircle,
  },
]

// Sample data for different notification types
const caseNotifications = [
  {
    month: "January",
    notifications: [
      {
        id: "1",
        title: "New case for you!",
        description: "On 24 January 2025 at approximately 14:00 hours, the victi...",
        code: 4,
        date: "Just now",
        isNew: true,
        type: "case" as const,
      },
      {
        id: "2",
        title: "New case for you!",
        description: "Burglary at Manhattan, two men down injured in a pool of bl...",
        code: 3,
        date: "Jan 22",
        type: "case",
      },
      {
        id: "8",
        title: "Case Approved",
        description: "Your case has been approved.",
        date: "Jan 25",
        type: "case" as const,
      },
      {
        id: "9",
        title: "Case Rejected",
        description: "Your case has been rejected.",
        date: "Jan 26",
        type: "case" as const,
      },
    ],
  },
  {
    month: "February",
    notifications: [
      {
        id: "3",
        title: "New case for you!",
        description: "Burglary at Manhattan, two men down injured in a pool of bl...",
        code: 3,
        date: "Feb 22",
        type: "case",
      },
      {
        id: "10",
        title: "Case Approved",
        description: "Your case has been approved.",
        date: "Feb 23",
        type: "case" as const,
      },
      {
        id: "11",
        title: "Case Rejected",
        description: "Your case has been rejected.",
        date: "Feb 24",
        type: "case" as const,
      },
    ],
  },
]

const reportNotifications = [
  {
    month: "January",
    notifications: [
      {
        id: "4",
        title: "New Report on Case GHb7858",
        description: "A file has been added to case",
        date: "Just now",
        isNew: true,
        type: "report" as const,
      },
      {
        id: "5",
        title: "New Report on Case GHb7858",
        description: "A file has been added to case",
        date: "Jan 22",
        type: "report",
      },
    ],
  },
]

const chatNotifications = [
  {
    month: "January",
    notifications: [
      {
        id: "6",
        title: "New Chat on Case GHb7858",
        description: "Also, let's make sure we have enough evidence before we p...",
        date: "Just now",
        isNew: true,
        type: "chat" as const,
      },
      {
        id: "7",
        title: "New Chat on Case GHb7858",
        description: "Also, let's make sure we have enough evidence before we p...",
        date: "Jan 22",
        type: "chat",
      },
    ],
  },
]

// Function to merge and sort notifications by month
function mergeNotifications(notificationArrays: any[]) {
  const monthMap = new Map()

  notificationArrays.forEach((array) => {
    array.forEach((group: any) => {
      if (!monthMap.has(group.month)) {
        monthMap.set(group.month, [])
      }
      monthMap.get(group.month).push(...group.notifications)
    })
  })

  // Sort notifications within each month by date
  monthMap.forEach((notifications, month) => {
    notifications.sort((a: any, b: any) => {
      if (a.isNew && !b.isNew) return -1
      if (!a.isNew && b.isNew) return 1
      return 0
    })
  })

  // Convert map to array and sort months
  return Array.from(monthMap.entries())
    .map(([month, notifications]) => ({
      month,
      notifications,
    }))
    .sort((a, b) => {
      const months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ]
      return months.indexOf(b.month) - months.indexOf(a.month)
    })
}

export default function NotificationsPage() {
  const allNotifications = mergeNotifications([caseNotifications, reportNotifications, chatNotifications])

  return (
    <div className="p-8">
      <h1 className="text-2xl font-semibold mb-8">Notifications</h1>

      <Tabs defaultValue="all" className="space-y-6">
        <TabsList className="gap-4 p-0 h-auto bg-transparent ">
          {tabs.map((tab) => (
            <TabsTrigger
              key={tab.id}
              value={tab.id}
              className="gap-2 data-[state=active]:bg-transparent data-[state=active]:text-[#003399] shadow-none data-[state=active]:border-b-2 data-[state=active]:border-[#003399] rounded-none px-0 pb-2"
            >
              <tab.icon className="h-4 w-4 " />
              <p className="">{tab.label}</p>
            </TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value="all" className="mt-6">
          <Timeline items={allNotifications} />
        </TabsContent>

        <TabsContent value="cases" className="mt-6">
          <Timeline items={caseNotifications} />
        </TabsContent>

        <TabsContent value="reports" className="mt-6">
          <Timeline items={reportNotifications} />
        </TabsContent>

        <TabsContent value="chats" className="mt-6">
          <Timeline items={chatNotifications} />
        </TabsContent>
      </Tabs>
    </div>
  )
}


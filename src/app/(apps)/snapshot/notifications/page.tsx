import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Bell, MailWarning } from "lucide-react"
import { Timeline } from "../../_components/timeline"
import { Icons } from "@/app/_components/Icons"

const tabs = [
  {
    id: "all",
    label: "All",
    icon: Icons.bell,
  },
  {
    id: "unread",
    label: "Unread",
    icon: Icons.unread,
  },
]

// Sample data for different notification types
const allNotifications = [
  {
    month: "January",
    notifications: [
      {
        id: "1",
        title: "New Report for you!",
        description: "On 24 January 2025 at approximately 14:00 hours...",
        code: 4,
        date: "Just now",
        isNew: true,
        type: "Report" as const,
      },
      {
        id: "2",
        title: "New Report for you!",
        description: "Burglary at Manhattan, two men down injured...",
        code: 3,
        date: "Jan 22",
        type: "Report",
      },
      {
        id: "4",
        title: "New Report on Report GHb7858",
        description: "A file has been added to Report",
        date: "Jan 22",
        isNew: true,
        type: "report" as const,
      },
      {
        id: "6",
        title: "New Chat on Report GHb7858",
        description: "Also, let's make sure we have enough evidence...",
        date: "Jan 22",
        type: "chat",
      },
    ],
  },
  {
    month: "February",
    notifications: [
      {
        id: "3",
        title: "New Report for you!",
        description: "Burglary at Manhattan, two men down injured...",
        code: 3,
        date: "Feb 22",
        type: "Report",
      },
      {
        id: "5",
        title: "Report Update",
        description: "New evidence added to your Report",
        date: "Feb 23",
        isNew: true,
        type: "Report" as const,
      },
    ],
  },
]

export default function NotificationsPage() {
  // Filter unread notifications
  const unreadNotifications = allNotifications
    .map(monthGroup => ({
      ...monthGroup,
      notifications: monthGroup.notifications.filter(notification => notification.isNew)
    }))
    .filter(monthGroup => monthGroup.notifications.length > 0)

  return (
    <div className="p-8">
      <h1 className="text-2xl font-semibold mb-8">Notifications</h1>

      <Tabs defaultValue="all" className="space-y-6">
        <TabsList className="gap-4 p-0 h-auto bg-transparent">
          {tabs.map((tab) => (
            <TabsTrigger
              key={tab.id}
              value={tab.id}
              className="gap-2 data-[state=active]:bg-transparent data-[state=active]:text-[#003399] 
                shadow-none data-[state=active]:border-b-2 data-[state=active]:border-[#003399] 
                rounded-none px-0 pb-2"
            >
              <tab.icon className="h-4 w-4" />
              <p className="">{tab.label}</p>
            </TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value="all" className="mt-6">
          <Timeline items={allNotifications} />
        </TabsContent>

        <TabsContent value="unread" className="mt-6">
          <Timeline items={unreadNotifications} />
        </TabsContent>
      </Tabs>
    </div>
  )
}
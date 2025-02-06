import { ChatConversation } from "@/types/chats";


export const mockConversations: ChatConversation[] = [
  {
    id: "1",
    caseId: "GHb7858",
    participants: [
      {
        id: "1",
        name: "John Jay",
        avatar: "/placeholder.svg",
      },
      {
        id: "2",
        name: "Van Dame",
        avatar: "/placeholder.svg",
      },
    ],
    lastMessage: {
      content: "Also, let's make sure we have enough evidence before we proceed.",
      timestamp: "9:41 AM",
      unread: true,
    },
    status: "in_progress",
    messages: [
      {
        id: "1",
        content:
          "Good afternoon, Kamau. How's the investigation progressing on that robbery case at the Mombasa Road gas station?",
        timestamp: "8:23 PM",
        senderId: "1",
      },
      {
        id: "2",
        content:
          "Yes, I cross-referenced the tattoo design with our criminal records. We've found a possible match— a guy named Otieno. He's got a history of armed robbery and other petty crimes.",
        timestamp: "8:30 PM",
        senderId: "2",
      },
      {
        id: "3",
        content: "Excellent work, Kamau. We need to bring Otieno in for questioning immediately.",
        timestamp: "9:41 AM",
        senderId: "1",
      },
      {
        id: "4",
        content:
          "Also, let's make sure we have enough evidence before we proceed. Have we gathered any witness statements?",
        timestamp: "9:41 AM",
        senderId: "1",
      },
      {
        id: "5",
        content: "Understood. I'll coordinate with the forensic team and ensure every angle is covered.",
        timestamp: "9:41 AM",
        senderId: "2",
      },
    ],
  },
  {
    id: "2",
    caseId: "GHb7859",
    participants: [
      {
        id: "1",
        name: "John Jay",
        avatar: "/placeholder.svg",
      },
      {
        id: "2",
        name: "Van Dame",
        avatar: "/placeholder.svg",
      },
    ],
    lastMessage: {
      content: "The suspect has been apprehended. Case closed.",
      timestamp: "Jan 22",
      unread: false,
    },
    status: "resolved",
    messages: [
      {
        id: "1",
        content: "Update on the carjacking case: We've identified the vehicle through CCTV footage.",
        timestamp: "2:15 PM",
        senderId: "2",
      },
      {
        id: "2",
        content: "Good work. What's the status on the tracking system?",
        timestamp: "2:20 PM",
        senderId: "1",
      },
      {
        id: "3",
        content: "GPS shows the vehicle heading towards Nakuru. Local units have been notified.",
        timestamp: "2:25 PM",
        senderId: "2",
      },
      {
        id: "4",
        content: "The suspect has been apprehended. Case closed.",
        timestamp: "3:45 PM",
        senderId: "2",
      },
    ],
  },
  {
    id: "3",
    caseId: "GHb7860",
    participants: [
      {
        id: "1",
        name: "John Jay",
        avatar: "/placeholder.svg",
      },
      {
        id: "2",
        name: "Van Dame",
        avatar: "/placeholder.svg",
      },
    ],
    lastMessage: {
      content: "Hi, I think I might need assistance with the drug trafficking case.",
      timestamp: "Jan 22",
      unread: false,
    },
    status: "in_progress",
    messages: [
      {
        id: "1",
        content: "Hi, I think I might need assistance with the drug trafficking case.",
        timestamp: "10:00 AM",
        senderId: "2",
      },
    ],
  },
  {
    id: "4",
    caseId: "GHb7861",
    participants: [
      {
        id: "1",
        name: "John Jay",
        avatar: "/placeholder.svg",
      },
      {
        id: "2",
        name: "Van Dame",
        avatar: "/placeholder.svg",
      },
    ],
    lastMessage: {
      content: "All evidence has been processed and documented.",
      timestamp: "Jan 22",
      unread: false,
    },
    status: "resolved",
    messages: [
      {
        id: "1",
        content: "Need your review on the house break-in case evidence.",
        timestamp: "11:30 AM",
        senderId: "2",
      },
      {
        id: "2",
        content: "Send over the files. I'll look at them right away.",
        timestamp: "11:35 AM",
        senderId: "1",
      },
      {
        id: "3",
        content: "All evidence has been processed and documented.",
        timestamp: "12:00 PM",
        senderId: "2",
      },
    ],
  },
  {
    id: "5",
    caseId: "GHb7862",
    participants: [
      {
        id: "1",
        name: "John Jay",
        avatar: "/placeholder.svg",
      },
      {
        id: "2",
        name: "Van Dame",
        avatar: "/placeholder.svg",
      },
    ],
    lastMessage: {
      content: "Witness statements collected from all shop owners.",
      timestamp: "Jan 22",
      unread: true,
    },
    status: "in_progress",
    messages: [
      {
        id: "1",
        content: "New case: Multiple shop break-ins reported in CBD area.",
        timestamp: "9:00 AM",
        senderId: "1",
      },
      {
        id: "2",
        content: "On it. Heading to the location now.",
        timestamp: "9:05 AM",
        senderId: "2",
      },
      {
        id: "3",
        content: "Witness statements collected from all shop owners.",
        timestamp: "10:30 AM",
        senderId: "2",
      },
    ],
  },
  {
    id: "6",
    caseId: "GHb7863",
    participants: [
      {
        id: "1",
        name: "John Jay",
        avatar: "/placeholder.svg",
      },
      {
        id: "2",
        name: "Van Dame",
        avatar: "/placeholder.svg",
      },
    ],
    lastMessage: {
      content: "Final report submitted. Ready for review.",
      timestamp: "Jan 22",
      unread: false,
    },
    status: "resolved",
    messages: [
      {
        id: "1",
        content: "Status update needed on the mob justice incident.",
        timestamp: "3:00 PM",
        senderId: "1",
      },
      {
        id: "2",
        content: "Situation contained. All suspects in custody.",
        timestamp: "3:15 PM",
        senderId: "2",
      },
      {
        id: "3",
        content: "Final report submitted. Ready for review.",
        timestamp: "4:00 PM",
        senderId: "2",
      },
    ],
  },
  {
    id: "7",
    caseId: "GHb7864",
    participants: [
      {
        id: "1",
        name: "John Jay",
        avatar: "/placeholder.svg",
      },
      {
        id: "2",
        name: "Van Dame",
        avatar: "/placeholder.svg",
      },
    ],
    lastMessage: {
      content: "Requesting backup at Westlands area.",
      timestamp: "Jan 22",
      unread: true,
    },
    status: "in_progress",
    messages: [
      {
        id: "1",
        content: "Armed robbery in progress at Westlands.",
        timestamp: "7:45 PM",
        senderId: "2",
      },
      {
        id: "2",
        content: "Requesting backup at Westlands area.",
        timestamp: "7:46 PM",
        senderId: "2",
      },
    ],
  },
  {
    id: "8",
    caseId: "GHb7865",
    participants: [
      {
        id: "1",
        name: "John Jay",
        avatar: "/placeholder.svg",
      },
      {
        id: "2",
        name: "Van Dame",
        avatar: "/placeholder.svg",
      },
    ],
    lastMessage: {
      content: "Evidence suggests organized crime involvement.",
      timestamp: "Jan 22",
      unread: false,
    },
    status: "in_progress",
    messages: [
      {
        id: "1",
        content: "New development in the warehouse theft case.",
        timestamp: "1:00 PM",
        senderId: "2",
      },
      {
        id: "2",
        content: "What have you found?",
        timestamp: "1:05 PM",
        senderId: "1",
      },
      {
        id: "3",
        content: "Evidence suggests organized crime involvement.",
        timestamp: "1:10 PM",
        senderId: "2",
      },
    ],
  },
]


export interface Message {
    id: string
    content: string
    timestamp: string
    senderId: string
    status?: "sent" | "delivered" | "read"
  }
  
  export interface ChatConversation {
    id: string
    caseId: string
    participants: {
      id: string
      name: string
      avatar: string
    }[]
    lastMessage: {
      content: string
      timestamp: string
      unread?: boolean
    }
    messages: Message[]
    status: "in_progress" | "resolved"
  }
  
  export interface ChatState {
    conversations: ChatConversation[]
    activeConversationId: string | null
    filter: "all" | "in_progress" | "resolved"
    searchQuery: string
  }
  
  
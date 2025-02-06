"use client"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { cn } from "@/lib/utils"
import { ChatConversation } from "@/types/chats"

interface ChatListProps {
  conversations: ChatConversation[]
  activeConversationId: string | null
  onSelectConversation: (id: string) => void
  onSearch: (query: string) => void
}

export function ChatList({
  conversations,
  activeConversationId,
  onSelectConversation,
  onSearch,
}: ChatListProps) {
  return (
    <div className="w-80 h-screen flex flex-col">
      <div className="py-4 space-y-4 w-full">
        <Input placeholder="Search chats..." className="bg-muted w-full" onChange={(e) => onSearch(e.target.value)} />
      </div>
      <div className="flex-1 overflow-y-auto no-scrollbar p-2 bg-dci-grey rounded-[10px]">
        {conversations.map((conversation) => (
          <button
            key={conversation.id}
            onClick={() => onSelectConversation(conversation.id)}
            className={cn(
              "w-full p-4 text-left hover:bg-white rounded-[6px] transition-colors",
              activeConversationId === conversation.id && "bg-muted",
            )}
          >
            <div className="flex justify-between items-start">
              <div>
                <div className="font-medium">{conversation.caseId}</div>
                <div className="text-sm text-muted-foreground line-clamp-1">{conversation.lastMessage.content}</div>
              </div>
              <div className="flex flex-col items-end gap-1">
                <div className="text-xs text-muted-foreground">{conversation.lastMessage.timestamp}</div>
                {conversation.lastMessage.unread && <div className="w-2 h-2 rounded-full bg-red-500" />}
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}


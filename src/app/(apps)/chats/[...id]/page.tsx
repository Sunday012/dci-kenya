"use client"

import { mockConversations } from "@/lib/chat-mock-data"
import { ChatState } from "@/types/chats"
import { useState, useCallback } from "react"
import { ChatList } from "../../_components/chat/chat-list"
import { ChatMessages } from "../../_components/chat/chat-messages"


export default function ChatPage() {
  const [state, setState] = useState<ChatState>({
    conversations: mockConversations,
    activeConversationId: mockConversations[0]?.id || null,
    filter: "all",
    searchQuery: "",
  })

  const filteredConversations = state.conversations.filter((conversation) => {
    const matchesFilter = state.filter === "all" || conversation.status === state.filter
    const matchesSearch = conversation.caseId.toLowerCase().includes(state.searchQuery.toLowerCase())
    return matchesFilter && matchesSearch
  })

  const activeConversation = state.conversations.find((c) => c.id === state.activeConversationId)

  const handleSendMessage = useCallback((content: string) => {
    setState((prev) => ({
      ...prev,
      conversations: prev.conversations.map((conversation) => {
        if (conversation.id === prev.activeConversationId) {
          return {
            ...conversation,
            messages: [
              ...conversation.messages,
              {
                id: String(Date.now()),
                content,
                timestamp: new Date().toLocaleTimeString([], {
                  hour: "numeric",
                  minute: "2-digit",
                }),
                senderId: "2", // In a real app, use actual user ID
              },
            ],
          }
        }
        return conversation
      }),
    }))
  }, [])

  if (!activeConversation) {
    return <div>No conversations found</div>
  }

  return (
    <div className="p-8">
      <h1 className="text-2xl font-semibold">Chats</h1>
      <div className="flex gap-[47px]">
      <ChatList
        conversations={filteredConversations}
        activeConversationId={state.activeConversationId}
        onSelectConversation={(id) => setState((prev) => ({ ...prev, activeConversationId: id }))}
        onSearch={(query) => setState((prev) => ({ ...prev, searchQuery: query }))}
      />
      <ChatMessages 
      conversation={activeConversation} 
      onSendMessage={handleSendMessage} 
      onFilterChange={(filter) => setState((prev) => ({ ...prev, filter: filter as ChatState["filter"] }))}
      />
      </div>
    </div>
  )
}


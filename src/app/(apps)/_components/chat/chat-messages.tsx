"use client"

import { useRef, useEffect } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Send } from "lucide-react"
import cn from "classnames"
import { ChatConversation } from "@/types/chats"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Icons } from "@/app/_components/Icons"

interface ChatMessagesProps {
  conversation: ChatConversation
  onSendMessage: (content: string) => void
  onFilterChange: (filter: string) => void
}

export function ChatMessages({ conversation, onSendMessage, onFilterChange, }: ChatMessagesProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [conversation.messages, scrollToBottom])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const content = inputRef.current?.value.trim()
    if (content && content.length > 0) {
      onSendMessage(content)
      if (inputRef.current) {
        inputRef.current.value = ""
      }
    }
  }

  return (
    <div className="flex-1 flex flex-col h-screen">
      <div className="flex items-center justify-between p-4">
      <Select onValueChange={onFilterChange} defaultValue="all">
          <SelectTrigger className="w-[109px]">
            <SelectValue placeholder="Filter" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="in_progress">In progress</SelectItem>
            <SelectItem value="resolved">Resolved</SelectItem>
          </SelectContent>
        </Select>

          <div className="flex items-center gap-2">
                      <div className="flex -space-x-2">
                      {conversation.participants.map((person, i) => (
                        <Avatar key={i} className="border-2 border-background">
                        <AvatarImage src={person.avatar} alt={person.name} />
                        <AvatarFallback>{person.name[0]}</AvatarFallback>
                        </Avatar>
                      ))}
                      </div>
                      <span className="ml-2">
                      {conversation.participants.map((person) => person.name).join(", ").length > 20
                        ? `${conversation.participants.map((person) => person.name).join(", ").slice(0, 20)}...`
                        : conversation.participants.map((person) => person.name).join(", ")}
                      </span>
                    </div>
        </div>

    <div className="flex-1 overflow-y-auto no-scrollbar bg-dci-grey rounded-t-[10px] p-4 space-y-4">
      <div className="text-center text-sm text-muted-foreground">Tuesday</div>

      {conversation.messages.map((message) => {
        const isCurrentUser = message.senderId === "2" // In a real app, compare with actual user ID
        return (
        <div key={message.id} className={`flex ${isCurrentUser ? "justify-end" : "justify-start"}`}>
          <div
            className={cn(
            "max-w-[70%] rounded-t-[18px]  px-4 py-2",
            isCurrentUser ? "bg-dci-blue text-white rounded-bl-[18px] rounded-br-[2px]" : "bg-[#E9EAED] rounded-br-[18px] rounded-bl-[2px]",
            )}
          >
            <p className="text-sm">{message.content}</p>
            <div
            className={cn("text-xs mt-1", isCurrentUser ? "text-primary-foreground/80" : "text-muted-foreground")}
            >
            {message.timestamp}
            </div>
          </div>
        </div>
        )
      })}
      <div ref={messagesEndRef} />
    </div>
    <form onSubmit={handleSubmit} className="p-4 rounded-b-[10px] bg-dci-grey">
      <div className="flex gap-2">
        <Input ref={inputRef} placeholder="Type your message..." className="flex-1 bg-white border-[#E2E2E2] h-10" />
        <Button type="submit" size="icon" className="h-[40px] w-[40px] rounded-full bg-dci-blue">
        <Icons.sent className="h-4 w-4" />
        <span className="sr-only">Send message</span>
        </Button>
      </div>
    </form>

    </div>
  )
}


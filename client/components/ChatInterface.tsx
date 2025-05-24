'use client'

import { useState, useEffect, useRef } from 'react'
import MessageList from './MessageList'
import MessageInput from './MessageInput'
import { SearchInfo } from './SearchStages'
import { Search } from 'lucide-react'

export interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
  isStreaming?: boolean
  searchInfo?: SearchInfo
  searchUrls?: string[]
}

export interface SearchState {
  isSearching: boolean
  query: string
  urls: string[]
  analyzingUrls: boolean
}

export default function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [checkpointId, setCheckpointId] = useState<string | null>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const eventSourceRef = useRef<EventSource | null>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = async (content: string) => {
    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content,
      timestamp: new Date()
    }
    setMessages(prev => [...prev, userMessage])
    setIsLoading(true)

    // Create assistant message placeholder
    const assistantMessageId = (Date.now() + 1).toString()
    const assistantMessage: Message = {
      id: assistantMessageId,
      role: 'assistant',
      content: '',
      timestamp: new Date(),
      isStreaming: true,
      searchInfo: null
    }
    setMessages(prev => [...prev, assistantMessage])

    // Connect to SSE endpoint
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'
    const encodedMessage = encodeURIComponent(content)
    const url = checkpointId 
      ? `${apiUrl}/chat_stream/${encodedMessage}?checkpoint_id=${checkpointId}`
      : `${apiUrl}/chat_stream/${encodedMessage}`

    const eventSource = new EventSource(url)
    eventSourceRef.current = eventSource

    eventSource.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data)
        
        if (data.type === 'checkpoint') {
          setCheckpointId(data.checkpoint_id)
        } else if (data.type === 'content') {
          // Update the assistant message content
          setMessages(prev => prev.map(msg => 
            msg.id === assistantMessageId 
              ? { ...msg, content: msg.content + data.content }
              : msg
          ))
        } else if (data.type === 'search_start') {
          // Update message with searching stage
          setMessages(prev => prev.map(msg => 
            msg.id === assistantMessageId 
              ? { 
                  ...msg, 
                  searchInfo: {
                    stages: ['searching'],
                    query: data.query,
                    urls: []
                  }
                }
              : msg
          ))
        } else if (data.type === 'search_results') {
          // Update to reading stage
          setMessages(prev => prev.map(msg => 
            msg.id === assistantMessageId 
              ? { 
                  ...msg, 
                  searchInfo: {
                    stages: ['searching', 'reading'],
                    query: msg.searchInfo?.query || '',
                    urls: data.urls || []
                  },
                  searchUrls: data.urls
                }
              : msg
          ))
          // After a delay, move to writing stage
          setTimeout(() => {
            setMessages(prev => prev.map(msg => 
              msg.id === assistantMessageId 
                ? { 
                    ...msg, 
                    searchInfo: {
                      stages: ['searching', 'reading', 'writing'],
                      query: msg.searchInfo?.query || '',
                      urls: msg.searchInfo?.urls || []
                    }
                  }
                : msg
            ))
          }, 1500)
        } else if (data.type === 'end') {
          // Mark streaming as complete
          setMessages(prev => prev.map(msg => 
            msg.id === assistantMessageId 
              ? { ...msg, isStreaming: false }
              : msg
          ))
          setIsLoading(false)
          eventSource.close()
        }
      } catch (error) {
        console.error('Error parsing SSE data:', error)
      }
    }

    eventSource.onerror = (error) => {
      console.error('SSE error:', error)
      setIsLoading(false)
      setMessages(prev => prev.map(msg => 
        msg.id === assistantMessageId 
          ? { ...msg, isStreaming: false }
          : msg
      ))
      eventSource.close()
    }
  }

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      eventSourceRef.current?.close()
    }
  }, [])

  return (
    <div className="w-full max-w-4xl mx-auto h-screen flex flex-col bg-white dark:bg-gray-800 shadow-xl">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center space-x-2">
          <Search className="w-6 h-6 text-blue-500" />
          <h1 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
            Perplexity 2.0
          </h1>
        </div>
        {checkpointId && (
          <span className="text-xs text-gray-500 dark:text-gray-400">
            Session: {checkpointId.slice(0, 8)}...
          </span>
        )}
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto">
        <MessageList messages={messages} />
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="border-t border-gray-200 dark:border-gray-700 p-4">
        <MessageInput onSendMessage={handleSendMessage} isLoading={isLoading} />
      </div>
    </div>
  )
}
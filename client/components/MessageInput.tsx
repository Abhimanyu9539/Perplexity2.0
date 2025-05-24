'use client'

import { useState, useRef, useEffect } from 'react'
import { Send } from 'lucide-react'
import { clsx } from 'clsx'

interface MessageInputProps {
  onSendMessage: (message: string) => void
  isLoading: boolean
}

export default function MessageInput({ onSendMessage, isLoading }: MessageInputProps) {
  const [input, setInput] = useState('')
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto'
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`
    }
  }, [input])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (input.trim() && !isLoading) {
      onSendMessage(input.trim())
      setInput('')
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSubmit(e)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 items-end">
      <div className="flex-1 relative">
        <textarea
          ref={textareaRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Ask anything..."
          disabled={isLoading}
          className={clsx(
            "w-full px-4 py-2 pr-12 rounded-lg border resize-none max-h-32",
            "bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100",
            "border-gray-300 dark:border-gray-600",
            "focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent",
            "placeholder-gray-400 dark:placeholder-gray-500",
            "disabled:opacity-50 disabled:cursor-not-allowed"
          )}
          rows={1}
        />
      </div>
      <button
        type="submit"
        disabled={!input.trim() || isLoading}
        className={clsx(
          "p-2 rounded-lg transition-colors",
          "bg-blue-500 hover:bg-blue-600 text-white",
          "disabled:bg-gray-300 dark:disabled:bg-gray-600",
          "disabled:cursor-not-allowed",
          "focus:outline-none focus:ring-2 focus:ring-blue-500"
        )}
      >
        <Send className="w-5 h-5" />
      </button>
    </form>
  )
}
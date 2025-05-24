import { Message as MessageType } from './ChatInterface'
import Message from './Message'

interface MessageListProps {
  messages: MessageType[]
}

export default function MessageList({ messages }: MessageListProps) {
  if (messages.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-gray-500 dark:text-gray-400 p-8">
        <div className="text-center space-y-2">
          <p className="text-lg font-medium">Start a conversation</p>
          <p className="text-sm">Ask me anything - I can search the web for the latest information!</p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col space-y-4 p-4">
      {messages.map((message) => (
        <Message key={message.id} message={message} />
      ))}
    </div>
  )
}
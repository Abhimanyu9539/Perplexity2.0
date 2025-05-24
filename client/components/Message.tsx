import { Message as MessageType } from './ChatInterface'
import SearchStages from './SearchStages'
import { User, Bot, Link } from 'lucide-react'
import { clsx } from 'clsx'

interface MessageProps {
  message: MessageType
}

export default function Message({ message }: MessageProps) {
  const isUser = message.role === 'user'

  return (
    <div className={clsx('flex gap-3', isUser ? 'justify-end' : 'justify-start')}>
      {!isUser && (
        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center">
          <Bot className="w-5 h-5 text-white" />
        </div>
      )}
      
      <div className={clsx(
        'flex flex-col max-w-[80%] space-y-2',
        isUser ? 'items-end' : 'items-start'
      )}>
        {/* Search Stages - shown ABOVE the message for assistant */}
        {!isUser && message.searchInfo && (
          <SearchStages searchInfo={message.searchInfo} />
        )}
        
        <div className={clsx(
          'rounded-lg px-4 py-2',
          isUser 
            ? 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100' 
            : 'bg-blue-50 dark:bg-blue-900/20 text-gray-900 dark:text-gray-100'
        )}>
          <p className="whitespace-pre-wrap">
            {message.content}
            {message.isStreaming && (
              <span className="inline-block w-2 h-4 ml-1 bg-gray-400 animate-pulse" />
            )}
          </p>
        </div>

        {/* Show URLs if available and content exists */}
        {message.searchUrls && message.searchUrls.length > 0 && message.content.length > 10 && (
          <div className="flex flex-col space-y-1">
            <span className="text-xs text-gray-500 dark:text-gray-400 font-medium">Sources:</span>
            {message.searchUrls.map((url, index) => (
              <a
                key={index}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-xs text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300"
              >
                <Link className="w-3 h-3" />
                <span className="truncate max-w-xs">
                  {new URL(url).hostname}
                </span>
              </a>
            ))}
          </div>
        )}

        {/* Timestamp */}
        <span className="text-xs text-gray-400 dark:text-gray-500">
          {message.timestamp.toLocaleTimeString([], { 
            hour: '2-digit', 
            minute: '2-digit' 
          })}
        </span>
      </div>

      {isUser && (
        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gray-600 flex items-center justify-center">
          <User className="w-5 h-5 text-white" />
        </div>
      )}
    </div>
  )
}
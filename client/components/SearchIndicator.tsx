import { Search } from 'lucide-react'

interface SearchIndicatorProps {
  query: string
}

export default function SearchIndicator({ query }: SearchIndicatorProps) {
  return (
    <div className="flex items-center justify-center p-4">
      <div className="flex items-center space-x-2 text-blue-500 dark:text-blue-400">
        <Search className="w-5 h-5 animate-pulse" />
        <span className="text-sm font-medium animate-pulse">
          Searching the web for: "{query}"
        </span>
      </div>
    </div>
  )
}
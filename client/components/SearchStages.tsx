import React from 'react'
import { Search } from 'lucide-react'

export interface SearchInfo {
  stages: ('searching' | 'reading' | 'writing' | 'error')[]
  query?: string
  urls?: string[]
  error?: string
}

interface SearchStagesProps {
  searchInfo: SearchInfo | null
}

export default function SearchStages({ searchInfo }: SearchStagesProps) {
  if (!searchInfo || !searchInfo.stages || searchInfo.stages.length === 0) return null

  return (
    <div className="mb-3 mt-1 relative pl-4">
      {/* Search Process UI */}
      <div className="flex flex-col space-y-4 text-sm text-gray-700">
        {/* Searching Stage */}
        {searchInfo.stages.includes('searching') && (
          <div className="relative">
            {/* Green dot */}
            <div className="absolute -left-3 top-1 w-2.5 h-2.5 bg-teal-400 rounded-full z-10 shadow-sm"></div>

            {/* Connecting line to next item if reading exists */}
            {searchInfo.stages.includes('reading') && (
              <div className="absolute -left-[7px] top-3 w-0.5 h-[calc(100%+1rem)] bg-gradient-to-b from-teal-300 to-teal-200"></div>
            )}

            <div className="flex flex-col">
              <span className="font-medium mb-2 ml-2">Searching the web</span>

              {/* Search Query in box styling */}
              {searchInfo.query && (
                <div className="flex flex-wrap gap-2 pl-2 mt-1">
                  <div className="bg-gray-100 text-xs px-3 py-1.5 rounded border border-gray-200 inline-flex items-center">
                    <Search className="w-3 h-3 mr-1.5 text-gray-500" />
                    {searchInfo.query}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Reading Stage */}
        {searchInfo.stages.includes('reading') && (
          <div className="relative">
            {/* Green dot */}
            <div className="absolute -left-3 top-1 w-2.5 h-2.5 bg-teal-400 rounded-full z-10 shadow-sm"></div>

            {/* Connecting line to next item if writing exists */}
            {searchInfo.stages.includes('writing') && (
              <div className="absolute -left-[7px] top-3 w-0.5 h-[calc(100%+1rem)] bg-gradient-to-b from-teal-300 to-teal-200"></div>
            )}

            <div className="flex flex-col">
              <span className="font-medium mb-2 ml-2">Reading</span>

              {/* Search Results */}
              {searchInfo.urls && searchInfo.urls.length > 0 && (
                <div className="pl-2 space-y-1">
                  <div className="flex flex-wrap gap-2">
                    {searchInfo.urls.map((url, index) => {
                      try {
                        const hostname = new URL(url).hostname
                        return (
                          <div 
                            key={index} 
                            className="bg-gray-100 text-xs px-3 py-1.5 rounded border border-gray-200 truncate max-w-[200px] transition-all duration-200 hover:bg-gray-50"
                          >
                            {hostname}
                          </div>
                        )
                      } catch {
                        return (
                          <div 
                            key={index} 
                            className="bg-gray-100 text-xs px-3 py-1.5 rounded border border-gray-200 truncate max-w-[200px] transition-all duration-200 hover:bg-gray-50"
                          >
                            {url.substring(0, 30)}
                          </div>
                        )
                      }
                    })}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Writing Stage */}
        {searchInfo.stages.includes('writing') && (
          <div className="relative">
            {/* Green dot with subtle glow effect */}
            <div className="absolute -left-3 top-1 w-2.5 h-2.5 bg-teal-400 rounded-full z-10 shadow-sm"></div>
            <span className="font-medium pl-2">Writing answer</span>
          </div>
        )}

        {/* Error Message */}
        {searchInfo.stages.includes('error') && (
          <div className="relative">
            {/* Red dot */}
            <div className="absolute -left-3 top-1 w-2.5 h-2.5 bg-red-400 rounded-full z-10 shadow-sm"></div>
            <span className="font-medium">Search error</span>
            <div className="pl-4 text-xs text-red-500 mt-1">
              {searchInfo.error || "An error occurred during search."}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
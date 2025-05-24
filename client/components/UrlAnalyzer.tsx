import { Globe, CheckCircle2 } from 'lucide-react'
import { useEffect, useState } from 'react'

interface UrlAnalyzerProps {
  urls: string[]
}

export default function UrlAnalyzer({ urls }: UrlAnalyzerProps) {
  const [analyzedCount, setAnalyzedCount] = useState(0)
  
  useEffect(() => {
    if (urls.length === 0) return
    
    // Simulate analyzing URLs progressively
    const interval = setInterval(() => {
      setAnalyzedCount(prev => {
        if (prev >= urls.length) {
          clearInterval(interval)
          return prev
        }
        return prev + 1
      })
    }, 300) // Analyze one URL every 300ms
    
    return () => clearInterval(interval)
  }, [urls.length])
  
  return (
    <div className="flex flex-col space-y-3 p-4 mx-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
      <div className="flex items-center space-x-2 text-blue-600 dark:text-blue-400">
        <Globe className="w-5 h-5 animate-pulse" />
        <span className="text-sm font-medium">
          Analyzing {urls.length} source{urls.length > 1 ? 's' : ''}...
        </span>
      </div>
      
      <div className="space-y-2">
        {urls.map((url, index) => {
          const isAnalyzed = index < analyzedCount
          const hostname = new URL(url).hostname
          
          return (
            <div 
              key={index}
              className={`flex items-center space-x-2 text-xs transition-all duration-300 ${
                isAnalyzed 
                  ? 'text-gray-700 dark:text-gray-300' 
                  : 'text-gray-400 dark:text-gray-500'
              }`}
            >
              {isAnalyzed ? (
                <CheckCircle2 className="w-4 h-4 text-green-500" />
              ) : (
                <div className="w-4 h-4 border-2 border-gray-300 dark:border-gray-600 rounded-full animate-pulse" />
              )}
              <span className={`truncate max-w-xs ${isAnalyzed ? '' : 'opacity-50'}`}>
                {hostname}
              </span>
            </div>
          )
        })}
      </div>
      
      {analyzedCount === urls.length && urls.length > 0 && (
        <div className="text-xs text-gray-500 dark:text-gray-400 mt-2">
          Analysis complete • Generating response...
        </div>
      )}
    </div>
  )
}
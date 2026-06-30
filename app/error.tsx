"use client"
import { AlertTriangle, RefreshCw } from "lucide-react"

export default function Error({ error, reset }: { error: Error; reset: () => void }) {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center px-4">
      <div className="w-20 h-20 bg-red-50 rounded-full flex items-center justify-center mb-6">
        <AlertTriangle size={40} className="text-red-500" />
      </div>
      <h2 className="text-2xl font-bold text-gray-900 mb-2">Something went wrong</h2>
      <p className="text-gray-500 text-center max-w-md mb-8">{error.message || "An unexpected error occurred"}</p>
      <button onClick={reset} className="flex items-center gap-2 bg-[#198754] text-white px-8 py-3 rounded-xl font-bold hover:bg-[#157347] transition-all shadow-lg">
        <RefreshCw size={18} /> Try Again
      </button>
    </div>
  )
}

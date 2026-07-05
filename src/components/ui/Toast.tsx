'use client'

import { useEffect, useState } from 'react'

export function useToast(duration = 2500) {
  const [message, setMessage] = useState<string | null>(null)

  useEffect(() => {
    if (!message) return
    const timer = setTimeout(() => setMessage(null), duration)
    return () => clearTimeout(timer)
  }, [message, duration])

  return { toast: message, showToast: setMessage }
}

export function Toast({ message }: { message: string | null }) {
  if (!message) return null

  return (
    <div className="fixed bottom-24 md:bottom-5 left-1/2 -translate-x-1/2 z-[10050] w-[85%] max-w-xs px-4 py-2.5 rounded-xl text-[13px] font-semibold text-white text-center shadow-lg bg-[#c3272b]">
      {message}
    </div>
  )
}

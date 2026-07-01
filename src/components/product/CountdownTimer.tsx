'use client'

import { useEffect, useState } from 'react'

function getRemaining(target: number) {
  const diff = Math.max(0, target - Date.now())
  const days = Math.floor(diff / (1000 * 60 * 60 * 24))
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24)
  const minutes = Math.floor((diff / (1000 * 60)) % 60)
  const seconds = Math.floor((diff / 1000) % 60)
  return { days, hours, minutes, seconds }
}

function pad(n: number) {
  return n.toString().padStart(2, '0')
}

export default function CountdownTimer({ endDate }: { endDate: string }) {
  const target = new Date(endDate).getTime()
  const [remaining, setRemaining] = useState(() => getRemaining(target))

  useEffect(() => {
    const timer = setInterval(() => setRemaining(getRemaining(target)), 1000)
    return () => clearInterval(timer)
  }, [target])

  const groups = [
    { label: 'Days', value: remaining.days },
    { label: 'Hours', value: remaining.hours },
    { label: 'Minutes', value: remaining.minutes },
    { label: 'Seconds', value: remaining.seconds },
  ]

  return (
    <div className="relative inline-block border border-gray-200 rounded-md px-3.5 pt-5 pb-3 mt-5">
      <span className="absolute -top-2.5 left-1/2 -translate-x-1/2 bg-white px-2 text-[14px] font-medium text-gray-700 whitespace-nowrap">
        Discount Offer Ends in
      </span>
      <div className="flex justify-center gap-6">
        {groups.map((g) => (
          <div key={g.label} className="text-center">
            <div className="flex gap-1 mb-1">
              {pad(g.value)
                .split('')
                .map((digit, i) => (
                  <div
                    key={i}
                    className="w-[22px] h-7 bg-[#d92128] text-white text-sm font-bold rounded flex items-center justify-center"
                  >
                    {digit}
                  </div>
                ))}
            </div>
            <div className="text-[13px] font-medium text-gray-600">{g.label}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

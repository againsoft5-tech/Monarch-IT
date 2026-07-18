'use client'

import { useMemo, useRef, useState } from 'react'

const RED = '#bd2026'
const BAR_COUNT = 30

type Props = {
  src: string
  seed: string
}

function seededHeights(seed: string, count: number) {
  let h = 0
  for (let i = 0; i < seed.length; i++) h = seed.charCodeAt(i) + ((h << 5) - h)
  const heights: number[] = []
  for (let i = 0; i < count; i++) {
    h = (h * 9301 + 49297) % 233280
    const rand = h / 233280
    heights.push(5 + Math.round(rand * 13))
  }
  return heights
}

function formatTime(seconds: number) {
  if (!Number.isFinite(seconds)) return '0:00'
  const mm = Math.floor(seconds / 60)
  const ss = Math.floor(seconds % 60)
    .toString()
    .padStart(2, '0')
  return `${mm}:${ss}`
}

export default function VoiceMessagePlayer({ src, seed }: Props) {
  const audioRef = useRef<HTMLAudioElement>(null)
  const [playing, setPlaying] = useState(false)
  const [progress, setProgress] = useState(0)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)

  const heights = useMemo(() => seededHeights(seed, BAR_COUNT), [seed])
  const activeBars = Math.round(progress * BAR_COUNT)

  const toggle = () => {
    const audio = audioRef.current
    if (!audio) return
    if (audio.paused) {
      audio
        .play()
        .then(() => setPlaying(true))
        .catch(() => setPlaying(false))
    } else {
      audio.pause()
      setPlaying(false)
    }
  }

  const handleTimeUpdate = () => {
    const audio = audioRef.current
    if (!audio) return
    setCurrentTime(audio.currentTime)
    if (audio.duration && Number.isFinite(audio.duration)) {
      setProgress(audio.currentTime / audio.duration)
    }
  }

  const handleLoadedMetadata = () => {
    const audio = audioRef.current
    if (audio && Number.isFinite(audio.duration)) setDuration(audio.duration)
  }

  const handleEnded = () => {
    setPlaying(false)
    setProgress(0)
    setCurrentTime(0)
  }

  const seek = (fraction: number) => {
    const audio = audioRef.current
    if (!audio || !audio.duration || !Number.isFinite(audio.duration)) return
    audio.currentTime = fraction * audio.duration
    setProgress(fraction)
    setCurrentTime(audio.currentTime)
  }

  return (
    <div className="flex items-center gap-2.5 w-[240px]">
      <button
        type="button"
        onClick={toggle}
        title={playing ? 'Pause' : 'Play'}
        className="w-8 h-8 shrink-0 rounded-full flex items-center justify-center text-white transition-colors cursor-pointer"
        style={{ backgroundColor: RED }}
      >
        <span className="mi text-[16px]">{playing ? 'pause' : 'play_arrow'}</span>
      </button>

      <div
        className="flex-1 min-w-0 flex items-center gap-[2.5px] h-5 cursor-pointer"
        onClick={(e) => {
          const rect = e.currentTarget.getBoundingClientRect()
          seek(Math.min(1, Math.max(0, (e.clientX - rect.left) / rect.width)))
        }}
      >
        {heights.map((h, i) => (
          <span
            key={i}
            className="flex-1 rounded-full transition-colors"
            style={{ height: `${h}px`, backgroundColor: i < activeBars ? RED : '#d9dbe0' }}
          />
        ))}
      </div>

      <span className="text-[10.5px] text-gray-400 tabular-nums shrink-0">
        {formatTime(playing || currentTime > 0 ? currentTime : duration)}
      </span>

      <audio
        ref={audioRef}
        src={src}
        preload="metadata"
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={handleEnded}
        onError={() => setPlaying(false)}
        className="hidden"
      />
    </div>
  )
}

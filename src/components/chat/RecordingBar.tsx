'use client'

import { useEffect, useRef, useState } from 'react'
import type { RecorderState } from '@/lib/useVoiceRecorder'

type Props = {
  state: RecorderState
  seconds: number
  previewUrl: string | null
  onCancel: () => void
  onPause: () => void
  onResume: () => void
  onSend: () => void
}

function formatDuration(seconds: number) {
  const mm = String(Math.floor(seconds / 60)).padStart(2, '0')
  const ss = String(Math.floor(seconds) % 60).padStart(2, '0')
  return `${mm}:${ss}`
}

export default function RecordingBar({ state, seconds, previewUrl, onCancel, onPause, onResume, onSend }: Props) {
  const audioRef = useRef<HTMLAudioElement>(null)
  const [playing, setPlaying] = useState(false)
  const [progress, setProgress] = useState(0)
  const [playPos, setPlayPos] = useState(0)

  useEffect(() => {
    setPlaying(false)
    setProgress(0)
    setPlayPos(0)
  }, [previewUrl])

  const togglePreviewPlay = () => {
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
    if (!audio || !audio.duration || !Number.isFinite(audio.duration)) return
    setProgress(audio.currentTime / audio.duration)
    setPlayPos(audio.currentTime)
  }

  const handleEnded = () => {
    setPlaying(false)
    setProgress(0)
    setPlayPos(0)
  }

  const handleAudioError = () => {
    setPlaying(false)
  }

  return (
    <div className="flex-1 min-w-0 flex items-center gap-3">
      <button
        type="button"
        onClick={onCancel}
        title="Discard recording"
        className="w-[42px] h-[42px] shrink-0 rounded-full bg-[#f8fafc] border border-gray-200 hover:bg-[#f1f5f9] flex items-center justify-center text-gray-500 transition-colors cursor-pointer"
      >
        <span className="mi text-[20px]">delete</span>
      </button>

      {state === 'recording' ? (
        <>
          <div className="flex-1 min-w-0 flex items-center gap-2.5 bg-[#fdecec] rounded-full pl-5 pr-3 py-3">
            <span className="w-2.5 h-2.5 rounded-full bg-[#bd2026] animate-pulse shrink-0" />
            <span className="text-[14px] font-semibold text-gray-700 tabular-nums shrink-0">{formatDuration(seconds)}</span>
            <span className="flex-1 border-t-2 border-dotted border-[#eeb6ba] mx-2" />
          </div>
          <button
            type="button"
            onClick={onPause}
            title="Pause recording"
            className="w-[42px] h-[42px] shrink-0 rounded-full bg-[#f8fafc] border border-gray-200 hover:bg-[#f1f5f9] flex items-center justify-center text-gray-600 transition-colors cursor-pointer"
          >
            <span className="mi text-[20px]">pause</span>
          </button>
        </>
      ) : (
        <>
          <div className="flex-1 min-w-0 flex items-center gap-2.5 bg-[#f3f4f6] rounded-full pl-2 pr-4 py-2">
            <button
              type="button"
              onClick={togglePreviewPlay}
              title={playing ? 'Pause preview' : 'Play preview'}
              className="w-9 h-9 shrink-0 rounded-full flex items-center justify-center text-white transition-colors cursor-pointer"
              style={{ backgroundColor: '#10b981' }}
            >
              <span className="mi text-[18px]">{playing ? 'pause' : 'play_arrow'}</span>
            </button>
            <div className="flex-1 min-w-0 h-1 rounded-full bg-gray-300 relative overflow-hidden">
              <div
                className="absolute inset-y-0 left-0 rounded-full transition-[width] duration-150"
                style={{ width: `${progress * 100}%`, backgroundColor: '#10b981' }}
              />
            </div>
            <span className="text-[13px] font-medium text-gray-600 tabular-nums shrink-0">
              {formatDuration(playPos > 0 ? playPos : seconds)}
            </span>
            {previewUrl && (
              <audio
                ref={audioRef}
                src={previewUrl}
                onTimeUpdate={handleTimeUpdate}
                onEnded={handleEnded}
                onError={handleAudioError}
                className="hidden"
              />
            )}
          </div>
          <button
            type="button"
            onClick={onResume}
            title="Resume recording"
            className="w-[42px] h-[42px] shrink-0 rounded-full bg-[#f8fafc] border border-gray-200 hover:bg-[#f1f5f9] flex items-center justify-center text-gray-600 transition-colors cursor-pointer"
          >
            <span className="mi text-[20px]">mic</span>
          </button>
          <button
            type="button"
            onClick={onSend}
            title="Send recording"
            className="w-[42px] h-[42px] shrink-0 rounded-full flex items-center justify-center text-white transition-colors cursor-pointer"
            style={{ backgroundColor: '#10b981' }}
          >
            <span className="mi text-[18px]">send</span>
          </button>
        </>
      )}
    </div>
  )
}

'use client'

import { useEffect, useRef, useState } from 'react'

const MAX_DURATION_SEC = 120

export type RecorderState = 'idle' | 'recording' | 'paused'

export function useVoiceRecorder(
  onSend: (blob: Blob, mimeType: string, durationSec: number) => void,
  onError?: (message: string) => void
) {
  const [state, setState] = useState<RecorderState>('idle')
  const [seconds, setSeconds] = useState(0)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)

  const onSendRef = useRef(onSend)
  const onErrorRef = useRef(onError)
  onSendRef.current = onSend
  onErrorRef.current = onError

  const mediaRecorderRef = useRef<MediaRecorder | null>(null)
  const chunksRef = useRef<Blob[]>([])
  const streamRef = useRef<MediaStream | null>(null)
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const secondsRef = useRef(0)
  const mimeTypeRef = useRef('audio/webm')
  const previewUrlRef = useRef<string | null>(null)

  const stopTimer = () => {
    if (timerRef.current) clearInterval(timerRef.current)
    timerRef.current = null
  }

  const revokePreview = () => {
    if (previewUrlRef.current) {
      URL.revokeObjectURL(previewUrlRef.current)
      previewUrlRef.current = null
    }
    setPreviewUrl(null)
  }

  const cleanup = () => {
    stopTimer()
    streamRef.current?.getTracks().forEach((t) => t.stop())
    streamRef.current = null
    mediaRecorderRef.current = null
    chunksRef.current = []
    secondsRef.current = 0
    setSeconds(0)
    revokePreview()
    setState('idle')
  }

  useEffect(() => () => cleanup(), [])

  const pause = () => {
    const recorder = mediaRecorderRef.current
    if (!recorder || recorder.state !== 'recording') return
    recorder.pause()
    stopTimer()
    const blob = new Blob(chunksRef.current, { type: mimeTypeRef.current })
    revokePreview()
    const url = URL.createObjectURL(blob)
    previewUrlRef.current = url
    setPreviewUrl(url)
    setState('paused')
  }

  const startTimer = () => {
    stopTimer()
    timerRef.current = setInterval(() => {
      secondsRef.current += 1
      setSeconds(secondsRef.current)
      if (secondsRef.current >= MAX_DURATION_SEC) pause()
    }, 1000)
  }

  const start = async () => {
    if (typeof navigator === 'undefined' || !navigator.mediaDevices?.getUserMedia) {
      onErrorRef.current?.('Voice recording is not supported in this browser')
      return
    }
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      streamRef.current = stream
      const mimeType = typeof MediaRecorder !== 'undefined' && MediaRecorder.isTypeSupported('audio/webm') ? 'audio/webm' : ''
      mimeTypeRef.current = mimeType || 'audio/webm'
      const recorder = mimeType ? new MediaRecorder(stream, { mimeType }) : new MediaRecorder(stream)
      mediaRecorderRef.current = recorder
      chunksRef.current = []

      recorder.ondataavailable = (e) => {
        if (e.data.size > 0) chunksRef.current.push(e.data)
      }

      recorder.start(1000)
      secondsRef.current = 0
      setSeconds(0)
      setState('recording')
      startTimer()
    } catch {
      onErrorRef.current?.('Microphone access was denied')
    }
  }

  const resume = () => {
    const recorder = mediaRecorderRef.current
    if (!recorder || recorder.state !== 'paused') return
    revokePreview()
    recorder.resume()
    setState('recording')
    startTimer()
  }

  const stop = () => {
    const recorder = mediaRecorderRef.current
    if (!recorder || recorder.state === 'inactive') return
    recorder.onstop = () => {
      const blob = new Blob(chunksRef.current, { type: recorder.mimeType || mimeTypeRef.current })
      const duration = secondsRef.current
      cleanup()
      if (blob.size > 0) onSendRef.current(blob, blob.type, duration)
    }
    recorder.stop()
  }

  const cancel = () => {
    const recorder = mediaRecorderRef.current
    if (recorder) {
      recorder.onstop = null
      if (recorder.state !== 'inactive') recorder.stop()
    }
    cleanup()
  }

  return { state, seconds, previewUrl, start, pause, resume, stop, cancel }
}

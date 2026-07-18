'use client'

import { useRef, useState } from 'react'
import type { FileKind } from '@/lib/chatStore'

type Props = {
  onFile: (file: File, kind: FileKind) => void
}

export default function AttachMenu({ onFile }: Props) {
  const [open, setOpen] = useState(false)
  const docInputRef = useRef<HTMLInputElement>(null)
  const mediaInputRef = useRef<HTMLInputElement>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, fallbackKind: FileKind) => {
    const file = e.target.files?.[0]
    e.target.value = ''
    if (!file) return
    let kind: FileKind = fallbackKind
    if (file.type.startsWith('image/')) kind = 'image'
    else if (file.type.startsWith('video/')) kind = 'video'
    onFile(file, kind)
  }

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="w-[42px] h-[42px] shrink-0 rounded-full bg-[#f8fafc] border border-gray-200 hover:bg-[#f1f5f9] flex items-center justify-center text-gray-600 transition-colors cursor-pointer"
      >
        <span className="mi text-[20px]">add</span>
      </button>

      {open && (
        <>
          <div className="fixed inset-0 z-10" onClick={() => setOpen(false)} />
          <div className="absolute bottom-full left-0 mb-2 z-20 bg-white rounded-2xl shadow-xl border border-gray-100 py-1.5 w-[200px]">
            <button
              type="button"
              onClick={() => {
                setOpen(false)
                docInputRef.current?.click()
              }}
              className="w-full flex items-center gap-2.5 px-4 py-2.5 text-[13px] font-medium text-gray-700 hover:bg-gray-50 cursor-pointer"
            >
              <span className="mi text-[18px] text-[#bd2026]">description</span>
              Document
            </button>
            <button
              type="button"
              onClick={() => {
                setOpen(false)
                mediaInputRef.current?.click()
              }}
              className="w-full flex items-center gap-2.5 px-4 py-2.5 text-[13px] font-medium text-gray-700 hover:bg-gray-50 cursor-pointer"
            >
              <span className="mi text-[18px] text-[#3749bb]">perm_media</span>
              Photos & videos
            </button>
          </div>
        </>
      )}

      <input
        ref={docInputRef}
        type="file"
        className="hidden"
        accept=".pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.txt,.csv,.zip,.rar"
        onChange={(e) => handleFileChange(e, 'document')}
      />
      <input
        ref={mediaInputRef}
        type="file"
        className="hidden"
        accept="image/*,video/*"
        onChange={(e) => handleFileChange(e, 'image')}
      />
    </div>
  )
}

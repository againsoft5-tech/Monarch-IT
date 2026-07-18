import type { StoredMessage } from '@/lib/chatStore'
import { formatFileSize } from '@/lib/chatStore'
import VoiceMessagePlayer from '@/components/chat/VoiceMessagePlayer'

type Props = {
  msg: StoredMessage
  onImageClick?: () => void
}

export default function FileBubble({ msg, onImageClick }: Props) {
  if (msg.fileKind === 'image') {
    return (
      <button
        type="button"
        onClick={onImageClick ?? (() => window.open(msg.fileUrl, '_blank'))}
        className="block p-0 border-0 bg-transparent cursor-pointer"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={msg.fileUrl}
          alt={msg.fileName || 'photo'}
          className="w-[200px] h-[200px] rounded-xl object-cover bg-gray-100"
        />
      </button>
    )
  }

  if (msg.fileKind === 'video') {
    return <video src={msg.fileUrl} controls className="w-[220px] rounded-xl bg-black" />
  }

  if (msg.fileKind === 'audio') {
    return <VoiceMessagePlayer src={msg.fileUrl ?? ''} seed={msg.id} />
  }

  return (
    <a href={msg.fileUrl} download={msg.fileName} className="flex items-center gap-3 no-underline">
      <span className="w-10 h-10 shrink-0 rounded-lg bg-[#fdecec] flex items-center justify-center">
        <span className="mi text-[20px] text-[#bd2026]">description</span>
      </span>
      <span className="min-w-0">
        <span className="block text-[13px] font-semibold text-gray-800 truncate max-w-[160px]">{msg.fileName}</span>
        <span className="block text-[11px] text-gray-400">{formatFileSize(msg.fileSize)}</span>
      </span>
    </a>
  )
}

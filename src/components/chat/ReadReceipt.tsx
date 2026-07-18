export default function ReadReceipt({ read }: { read: boolean }) {
  return (
    <span className="flex items-center mt-1.5">
      <span className="w-[15px] h-[15px] rounded-full bg-white border border-gray-200 flex items-center justify-center shadow-sm">
        <span className={`mi text-[10px] leading-none ${read ? 'text-[#bd2026]' : 'text-gray-400'}`}>check</span>
      </span>
      <span className="w-[15px] h-[15px] -ml-1.5 rounded-full bg-white border border-gray-200 flex items-center justify-center shadow-sm">
        <span className={`mi text-[10px] leading-none ${read ? 'text-[#bd2026]' : 'text-gray-400'}`}>check</span>
      </span>
    </span>
  )
}

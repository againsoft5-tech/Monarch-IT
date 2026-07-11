import Image from 'next/image'

type Props = {
  icon: string
  iconSvg?: string
  accent?: boolean
  size?: 'sm' | 'lg'
}

export default function PartThumb({ icon, iconSvg, accent, size = 'lg' }: Props) {
  const box = size === 'lg' ? 'w-full aspect-square' : 'w-11 h-11 shrink-0'
  const iconSize = size === 'lg' ? 'text-[46px]' : 'text-[18px]'
  const svgSize = size === 'lg' ? 56 : 22

  return (
    <div className={`${box} rounded-[14px] bg-[#f4f5f7] flex items-center justify-center relative overflow-hidden`}>
      {accent && (
        <span
          className="absolute w-[70%] aspect-square rounded-full opacity-90"
          style={{
            background:
              'conic-gradient(from 0deg, #ff4d4d, #ffd24d, #4dff88, #4dd2ff, #a64dff, #ff4d4d)',
            filter: 'blur(2px)',
          }}
        />
      )}
      {iconSvg ? (
        <Image
          src={iconSvg}
          alt=""
          width={svgSize}
          height={svgSize}
          className={`relative z-10 object-contain ${accent ? 'bg-white/80 rounded-full p-2.5' : ''}`}
          style={{ width: svgSize, height: svgSize }}
        />
      ) : (
        <span
          className={`mi ${iconSize} relative z-10 ${accent ? 'text-gray-900 bg-white/70 rounded-full p-2' : 'text-gray-500'}`}
        >
          {icon}
        </span>
      )}
    </div>
  )
}

'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import type { ProductDetail } from '@/data/productDetail'
import CountdownTimer from './CountdownTimer'
import { useToast, Toast } from '@/components/ui/Toast'

export default function ProductInfo({
  product,
  onShowSpecs,
  onShowReviews,
}: {
  product: ProductDetail
  onShowSpecs: () => void
  onShowReviews: () => void
}) {
  const [qty, setQty] = useState(1)
  const [priceOption, setPriceOption] = useState<'full' | 'emi'>('full')
  const { toast, showToast } = useToast()

  const changeQty = (dir: number) => setQty((q) => Math.max(1, q + dir))

  return (
    <div className="px-4 py-2 md:px-6">
      <Toast message={toast} />
      <div className="flex items-center gap-3 flex-wrap text-[13px] mb-2">
        <div className="flex items-center gap-1">
          <span className="text-[#ffc107] text-[15px] leading-none tracking-tight">
            {'★'.repeat(Math.round(product.rating)) + '☆'.repeat(5 - Math.round(product.rating))}
          </span>
          <button
            type="button"
            onClick={onShowReviews}
            className="text-gray-500 hover:underline flex items-center gap-1 cursor-pointer"
          >
            (Reviews ({product.reviewCount})
            <Image src="/images/catalog/view/theme/default/image/verified.svg" alt="Verified" width={12} height={12} className="w-3 h-3" />
            )
          </button>
        </div>
        <span className="text-[#00b87a] font-semibold">In Stock</span>
        <span className="text-gray-500">
          Brand:{' '}
          <Link href="#" className="text-[#d92128] font-semibold no-underline">
            {product.brand}
          </Link>
        </span>
        <span className="text-gray-500">
          Model: <strong className="text-gray-600">{product.model}</strong>
        </span>
      </div>

      <h1 className="text-xl font-bold text-gray-900 leading-snug mb-2.5">{product.name}</h1>

      <div className="flex items-center gap-3 flex-wrap mb-4">
        <label className="cursor-pointer">
          <input
            type="radio"
            name="payment_method"
            checked={priceOption === 'full'}
            onChange={() => setPriceOption('full')}
            className="sr-only peer"
          />
          <div className="flex items-center gap-2 px-5 py-2.5 rounded-full border-[1.5px] border-gray-200 peer-checked:border-[#d92128] transition-colors">
            <span className="text-[22px] font-bold text-[#d32f2f]">৳{product.priceNew.toLocaleString()}</span>
            <del className="text-[13px] text-gray-400">৳{product.priceOld.toLocaleString()}</del>
            <span className="text-[12px] font-bold text-[#00b87a]">{product.discountPct}% OFF</span>
          </div>
        </label>

        <label className="cursor-pointer">
          <input
            type="radio"
            name="payment_method"
            checked={priceOption === 'emi'}
            onChange={() => setPriceOption('emi')}
            className="sr-only peer"
          />
          <div className="flex items-center gap-2 px-5 py-2.5 rounded-full border-[1.5px] border-gray-200 peer-checked:border-[#d92128] transition-colors">
            <span className="text-[22px] font-bold text-gray-700">৳{product.emiMonthly.toLocaleString()}/</span>
            <div className="flex flex-col leading-tight">
              <span className="flex items-center gap-1.5 text-[13px] font-semibold text-gray-700">
                month
                <span className="bg-[#00b87a] text-white text-[9px] font-bold px-1.5 py-0.5 rounded">EMI</span>
              </span>
              <span className="text-[11px] text-gray-400">0% EMI for up to {product.emiMonths} Months</span>
            </div>
          </div>
        </label>
      </div>

      <div className="mb-3.5">
        <div className="text-[14px] font-bold text-gray-700 mb-2">Key Features</div>
        <div className="text-[13px] text-gray-600 leading-[1.7] max-h-[90px] overflow-hidden">
          <ul className="list-disc pl-5 space-y-0.5">
            {product.keyFeatures.map((f) => (
              <li key={f}>{f}</li>
            ))}
          </ul>
        </div>
        <button
          type="button"
          onClick={onShowSpecs}
          className="text-[12.5px] font-semibold text-[#d92128] mt-1 hover:underline cursor-pointer"
        >
          More ›
        </button>
      </div>

      <CountdownTimer endDate={product.discountEndsAt} />

      <div className="flex items-center gap-2.5 flex-wrap mt-5">
        <div className="inline-flex items-center gap-1 bg-[#f3f4f6] rounded-full h-9 px-2">
          <button
            type="button"
            onClick={() => changeQty(-1)}
            className="w-6 font-semibold text-gray-700 hover:text-[#d92128] cursor-pointer"
          >
            −
          </button>
          <span className="w-6 text-center font-bold text-gray-800">{qty}</span>
          <button
            type="button"
            onClick={() => changeQty(1)}
            className="w-6 font-semibold text-gray-700 hover:text-[#d92128] cursor-pointer"
          >
            +
          </button>
        </div>

        <button
          type="button"
          className="bg-[#D32F2F] text-white font-bold text-[13px] h-9 px-5 rounded-full hover:bg-[#b71c1c] transition-colors whitespace-nowrap cursor-pointer"
        >
          Buy Now
        </button>

        <button
          type="button"
          className="group flex items-center gap-1.5 bg-[#f3f4f6] text-gray-800 font-semibold text-[13px] h-9 px-3.5 rounded-full hover:bg-[#c3272b] hover:text-white transition-colors cursor-pointer"
        >
          <Image
            src="/images/catalog/view/theme/default/image/message-icon.svg"
            alt="Message Icon"
            width={22}
            height={22}
            className="w-[22px] h-[22px] transition-[filter] group-hover:brightness-0 group-hover:invert"
          />
          Chat Now
        </button>

        <button
          type="button"
          title="Compare"
          onClick={() => showToast(`${product.name} added to compare list!`)}
          className="group w-9 h-9 shrink-0 bg-[#f3f4f6] rounded-full flex items-center justify-center hover:bg-[#c3272b] transition-colors cursor-pointer"
        >
          <Image
            src="/images/catalog/view/theme/default/image/compare-icon-svg.svg"
            alt="Compare Icon"
            width={22}
            height={22}
            className="w-[22px] h-[22px] transition-[filter] group-hover:brightness-0 group-hover:invert"
          />
        </button>
      </div>

      <div className="inline-flex items-center gap-5 flex-wrap mt-3.5 px-3.5 py-2.5 border-[1.5px] border-gray-100 rounded-2xl text-[12px] text-gray-600">
        <span className="flex items-center gap-1.5">
          <Image src="/images/catalog/view/theme/default/image/delivery-icon.svg" alt="Delivery" width={16} height={16} />
          Estimated delivery: <strong className="text-gray-700">Jul 1, 2026 – Jul 4, 2026</strong>
        </span>
        <a href="#" className="flex items-center gap-1.5 no-underline text-gray-600 hover:text-[#d92128]">
          <Image src="/images/catalog/view/theme/default/image/return-and-refund-policy-icon.svg" alt="Returns" width={16} height={16} />
          Returns &amp; Refunds Policy
        </a>
      </div>
    </div>
  )
}

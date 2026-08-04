import Image from 'next/image'
import Link from 'next/link'
import type { ProductDetail } from '@/data/productDetail'

export default function ProductMeta({
  product,
  onShowReviews,
}: {
  product: ProductDetail
  onShowReviews: () => void
}) {
  return (
    <div className="px-4 md:px-6 flex items-center gap-3 flex-wrap text-[13px]">
      <button
        type="button"
        onClick={onShowReviews}
        className="flex items-center gap-1 cursor-pointer hover:opacity-80 transition-opacity"
      >
        <span className="text-[#ffc107] text-base leading-none">
          {'★'.repeat(Math.round(product.rating)) + '☆'.repeat(5 - Math.round(product.rating))}
        </span>
        <span className="text-gray-600">{product.rating.toFixed(2)}</span>
        <span className="inline-flex items-center gap-0.5 text-gray-600">
          ({product.reviewCount}
          <Image src="/images/catalog/view/theme/default/image/verified.svg" alt="Verified" width={12} height={12} className="w-3 h-3" />
          )
        </span>
      </button>
      <span className="text-[#00b87a] font-semibold">In Stock</span>
      <span className="text-gray-500">
        Brand:{' '}
        <Link href="#" className="text-[#d92128] font-semibold no-underline">
          {product.brand}
        </Link>
      </span>
      {product.model && (
        <span className="text-gray-500">
          Model: <strong className="text-gray-600">{product.model}</strong>
        </span>
      )}
    </div>
  )
}

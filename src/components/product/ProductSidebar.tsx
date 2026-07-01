import Image from 'next/image'
import Link from 'next/link'
import type { RelatedProduct } from '@/data/productDetail'

export default function ProductSidebar({ product }: { product: RelatedProduct }) {
  return (
    <aside className="lg:w-[280px] shrink-0">
      <div className="bg-white rounded-[40px] p-5 text-center mt-0 lg:mt-20">
        <div className="text-[15px] font-bold text-gray-900 mb-2.5">Most Viewed</div>
        <div className="bg-white rounded-2xl overflow-hidden shadow-[0_2px_10px_rgba(0,0,0,0.07)] text-left">
          <Link href={`/${product.slug}`} className="aspect-square flex items-center justify-center">
            <Image src={product.image} alt={product.name} width={200} height={200} className="w-[78%] h-[78%] object-contain" />
          </Link>
          <div className="p-3">
            <div className="flex items-center gap-1 mb-1 flex-wrap">
              <span className="text-[#ffcb39] text-lg leading-none">
                {'★'.repeat(Math.round(product.rating)) + '☆'.repeat(5 - Math.round(product.rating))}
              </span>
              <span className="text-[12px] text-gray-600">{product.rating.toFixed(0)}</span>
              <span className="inline-flex items-center gap-0.5 text-[12px] text-gray-600">
                ({product.reviews}
                <Image src="/images/catalog/view/theme/default/image/verified.svg" alt="Verified" width={12} height={12} className="w-3 h-3" />)
              </span>
            </div>
            <div className="text-[13px] font-bold mb-2 line-clamp-2">
              <Link href={`/${product.slug}`} className="text-[#4d4d4d] no-underline hover:text-[#c3272b]">
                {product.name}
              </Link>
            </div>
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="text-base font-bold text-[#c3272b]">৳{product.priceNew.toLocaleString()}</span>
              <span className="text-[11px] text-gray-400 line-through">৳{product.priceOld.toLocaleString()}</span>
              <span className="text-[10.5px] font-bold text-[#00c68b]">{product.discountPct}% OFF</span>
            </div>
          </div>
        </div>
      </div>
    </aside>
  )
}

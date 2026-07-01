'use client'

import { useState } from 'react'
import ProductGallery from './ProductGallery'
import ProductInfo from './ProductInfo'
import ProductTabs, { type ProductTab } from './ProductTabs'
import ProductSidebar from './ProductSidebar'
import MoreToLove from './MoreToLove'
import type { ProductDetail } from '@/data/productDetail'

export default function ProductDetailPage({ product }: { product: ProductDetail }) {
  const [tab, setTab] = useState<ProductTab>('spec')

  const goToTab = (target: ProductTab) => {
    setTab(target)
    document.getElementById('tabs')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <div className="bg-[#f6f7f9]">
      <div className="bg-white min-[992px]:pl-20">
        <div className="container mx-auto px-4 py-6">
          <div className="grid grid-cols-1 md:grid-cols-[40%_60%] gap-5 items-start">
            <ProductGallery images={product.images} name={product.name} />
            <ProductInfo
              product={product}
              onShowSpecs={() => goToTab('spec')}
              onShowReviews={() => goToTab('rev')}
            />
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 min-[992px]:pl-20 py-6">
        <div className="flex flex-col lg:flex-row gap-5">
          <div className="flex-1 min-w-0">
            <ProductTabs product={product} tab={tab} onTabChange={setTab} />
          </div>
          <ProductSidebar product={product.mostViewed} /> 
        </div>
      </div>

      <div className="container mx-auto px-4 min-[992px]:pl-20 py-6">
        <div className="bg-white border-[1.5px] border-gray-100 rounded-[40px] p-5 md:p-6">
          <h2 className="text-[17px] font-bold text-gray-900 mb-2">
            What is the price of {product.name}?
          </h2>
          <p className="text-[13px] text-gray-600 leading-[1.8]">
            The latest price of {product.name} in Bangladesh is ৳{product.priceNew.toLocaleString()}. You can buy it
            at the best price from our website or visit any of our showrooms.
          </p>
        </div>
      </div>

      <MoreToLove products={product.moreToLove} />
    </div>
  )
}

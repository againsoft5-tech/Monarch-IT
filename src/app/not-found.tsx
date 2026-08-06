import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Page Not Found | Monarch IT',
  description: 'The page you are looking for does not exist.',
}

export default function NotFound() {
  return (
    <div className="cp-cat-wrap">
      <div className="container mx-auto px-4 min-[992px]:px-14 py-20">
        <div className="text-center max-w-md mx-auto">
          <span className="mi text-[72px] text-gray-300 block mb-4">error_outline</span>
          <h1 className="text-5xl font-bold text-[#d32f2f] mb-2">404</h1>
          <h2 className="text-lg font-semibold text-gray-800 mb-2">Page Not Found</h2>
          <p className="text-[14px] text-gray-500 mb-6">
            Sorry, the page you&apos;re looking for doesn&apos;t exist or may have been moved.
          </p>
          <div className="flex items-center justify-center gap-3 flex-wrap">
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 bg-[#d32f2f] text-white text-[14px] font-semibold px-5 py-2.5 rounded-full no-underline hover:bg-[#b71c1c] transition-colors"
            >
              Back to Home
            </Link>
            <Link
              href="/offers"
              className="inline-flex items-center gap-1.5 bg-white text-[#d32f2f] border-2 border-[#d32f2f] text-[14px] font-semibold px-5 py-2.5 rounded-full no-underline hover:bg-[#d32f2f] hover:text-white transition-colors"
            >
              View Offers
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

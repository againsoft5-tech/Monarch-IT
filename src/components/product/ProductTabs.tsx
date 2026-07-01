'use client'

import type { ProductDetail } from '@/data/productDetail'

export type ProductTab = 'spec' | 'desc' | 'rev' | 'qa'

type Tab = ProductTab

export default function ProductTabs({
  product,
  tab,
  onTabChange,
}: {
  product: ProductDetail
  tab: Tab
  onTabChange: (tab: Tab) => void
}) {
  const tabs: { id: Tab; label: string }[] = [
    { id: 'spec', label: 'Specifications' },
    { id: 'desc', label: 'Description' },
    { id: 'rev', label: `Reviews (${product.reviews.length})` },
    { id: 'qa', label: `Q&A (${product.qa.length})` },
  ]

  return (
    <div id="tabs" className="mt-6">
      <div className="inline-flex gap-1 bg-white rounded-full shadow-[0_2px_5px_rgba(0,0,0,0.05)] mb-5 overflow-x-auto max-w-full [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {tabs.map((t) => (
          <button
            key={t.id}
            type="button"
            onClick={() => onTabChange(t.id)}
            className={`shrink-0 px-4 py-2 rounded-full text-[13px] font-semibold whitespace-nowrap transition-colors ${
              tab === t.id ? 'bg-[#d92128] text-white' : 'text-gray-600 hover:bg-[#d92128]/10 hover:text-[#d92128]'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div className="bg-white border-[1.5px] border-gray-100 rounded-[40px] p-5 md:p-6">
        {tab === 'spec' && (
          <div>
            <h3 className="text-[17px] font-bold text-gray-900 mb-1">
              Product <strong>Specifications</strong>
            </h3>
            <span className="block text-[13px] font-bold text-[#d92128] pt-4 pb-1.5">{product.brand} Specification</span>
            <table className="w-full border-collapse">
              <tbody>
                {product.specGroups.map((group) => (
                  <tr key={group.label} className="border-b border-gray-100 last:border-none align-top">
                    <td className="w-[38%] py-2.5 pr-3 text-[13px] font-semibold text-gray-800">{group.label}</td>
                    <td className="py-2.5 text-[13px] text-gray-600">
                      {group.lines.map((line, i) => (
                        <span key={i}>
                          {line}
                          {i < group.lines.length - 1 && <br />}
                        </span>
                      ))}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {tab === 'desc' && (
          <div className="prose-sm max-w-none text-gray-700">
            <h2 className="text-lg font-bold text-gray-900 mb-2">{product.descriptionTitle}</h2>
            <p className="text-[14px] leading-[1.7] mb-4">{product.descriptionParagraph}</p>
            {product.descriptionSections.map((sec) => (
              <div key={sec.heading} className="mb-4">
                <h3 className="text-[15px] font-bold text-gray-900 mb-1.5">{sec.heading}</h3>
                <ul className="list-disc pl-5 space-y-1 text-[14px] leading-[1.6]">
                  {sec.points.map((p, i) => (
                    <li key={i}>{p}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}

        {tab === 'rev' && (
          <div>
            <div className="grid grid-cols-[180px_1fr] gap-6 mb-5 pb-5 border-b border-gray-100">
              <div className="text-center">
                <div className="text-[52px] font-black text-gray-900 leading-none">{product.rating.toFixed(0)}</div>
                <span className="block text-[22px] text-[#ffc107] my-1 tracking-tighter">
                  {'★'.repeat(Math.round(product.rating))}
                </span>
                <span className="text-[12px] text-gray-400">Reviews ({product.reviews.length})</span>
              </div>
            </div>
            {product.reviews.map((r, i) => (
              <div key={i} className="border-[1.5px] border-gray-100 rounded-2xl p-4 mb-3 last:mb-0">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-2.5">
                    <div className="w-[38px] h-[38px] rounded-full bg-[#eef1ff] text-[#d92128] font-bold flex items-center justify-center shrink-0">
                      {r.name.charAt(0)}
                    </div>
                    <div>
                      <div className="text-[13px] font-semibold text-gray-900">{r.name}</div>
                      <div className="text-[11px] text-gray-400">{r.date}</div>
                    </div>
                  </div>
                  <span className="text-[#ffc107] text-[13px] tracking-tighter">{'★'.repeat(r.rating)}</span>
                </div>
                <div className="text-[13px] text-gray-600">{r.body}</div>
              </div>
            ))}
          </div>
        )}

        {tab === 'qa' && (
          <div>
            {product.qa.map((item, i) => (
              <div key={i} className="border-b border-gray-100 last:border-none pb-4 mb-4 last:pb-0 last:mb-0">
                <div className="flex items-start gap-2.5 mb-3">
                  <span className="w-6 h-6 shrink-0 rounded-full bg-[#f3f4f6] text-gray-700 text-[12px] font-bold flex items-center justify-center">
                    Q
                  </span>
                  <div>
                    <div className="text-[13px] text-gray-800">{item.question}</div>
                    <div className="text-[11px] text-gray-400 mt-0.5">
                      Asked by {item.askedBy} · {item.askedDate}
                    </div>
                  </div>
                </div>
                <div className="flex items-start gap-2.5">
                  <span className="w-6 h-6 shrink-0 rounded-full bg-[#d92128] text-white text-[12px] font-bold flex items-center justify-center">
                    A
                  </span>
                  <div>
                    <div className="text-[13px] text-gray-800">{item.answer}</div>
                    <div className="text-[11px] text-gray-400 mt-0.5">Answered by Product Team</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

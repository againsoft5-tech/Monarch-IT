'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import Breadcrumbs from '@/components/category/Breadcrumbs'
import { useCart } from '@/context/CartContext'
import { DISTRICTS, UPAZILAS } from '@/data/bdLocations'

function LocationDropdown({
  value,
  options,
  onChange,
  wrapperClassName = '',
  textClassName = '',
}: {
  value: string
  options: string[]
  onChange: (v: string) => void
  wrapperClassName?: string
  textClassName?: string
}) {
  const [open, setOpen] = useState(false)
  const wrapRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function onClickOutside(e: MouseEvent) {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', onClickOutside)
    return () => document.removeEventListener('mousedown', onClickOutside)
  }, [])

  return (
    <div ref={wrapRef} className={`relative ${wrapperClassName}`}>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className={`block w-full truncate bg-transparent text-left outline-none cursor-pointer ${textClassName}`}
      >
        {value}
      </button>

      {open && (
        <div className="thin-scroll-red absolute left-0 top-[calc(100%+10px)] z-50 max-h-64 min-w-[170px] overflow-y-auto rounded-2xl border border-gray-100 bg-white py-1.5 shadow-[0_10px_32px_rgba(0,0,0,0.14)]">
          {options.map((opt) => (
            <button
              key={opt}
              type="button"
              onClick={() => {
                onChange(opt)
                setOpen(false)
              }}
              className={`block w-full whitespace-nowrap px-4 py-2 text-left text-[13px] transition-colors cursor-pointer ${
                opt === value ? 'bg-[#fdeceb] font-semibold text-[#d32f2f]' : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
              {opt}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

type Mode = 'guest' | 'login' | 'register'
type Payment = 'cod' | 'mobile' | 'online'

export default function CheckoutPage() {
  const { items, subtotal, discount, total: cartTotal, couponMessage, applyCoupon, updateQty } = useCart()
  const [mode, setMode] = useState<Mode>('guest')
  const [district, setDistrict] = useState('Dhaka')
  const [upazila, setUpazila] = useState(UPAZILAS['Dhaka'][0])
  const [payment, setPayment] = useState<Payment>('cod')
  const [coupon, setCoupon] = useState('')

  const handleDistrictChange = (value: string) => {
    setDistrict(value)
    setUpazila(UPAZILAS[value]?.[0] ?? '')
  }

  const shipping = district === 'Dhaka' && upazila === 'Dhaka City' ? 0 : 120
  const total = cartTotal + shipping

  const handlePlaceOrder = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
  }

  return (
    <>
      <Breadcrumbs
        items={[
          { label: 'Home', href: '/' },
          { label: 'Checkout', href: '/checkout' },
        ]}
      />

      <div className="container mx-auto px-4 min-[992px]:pl-20 py-6 md:py-8">
        {items.length === 0 ? (
          <div className="max-w-[420px] mx-auto text-center py-16">
            <p className="text-gray-500 mb-4">Your cart is empty!</p>
            <Link
              href="/"
              className="inline-block bg-[#d32f2f] text-white text-[14px] font-semibold px-6 py-2.5 rounded-full no-underline hover:bg-[#b71c1c] transition-colors"
            >
              Continue Shopping
            </Link>
          </div>
        ) : (
          <form
            onSubmit={handlePlaceOrder}
            className="bg-[#f5f5f7] rounded-[24px] md:rounded-[36px] p-3.5 md:p-7 max-w-[1320px] mx-auto grid grid-cols-1 lg:grid-cols-[1.9fr_1fr] gap-4 md:gap-6"
          >
            {/* LEFT: FORM */}
            <div className="bg-white rounded-[20px] md:rounded-[26px] p-5 md:p-8 flex flex-col gap-4">
              <div className="inline-flex self-start bg-[#f5f5f7] rounded-full p-1">
                {(['guest', 'login', 'register'] as Mode[]).map((m) => (
                  <button
                    key={m}
                    type="button"
                    onClick={() => setMode(m)}
                    className={`px-5 py-2 rounded-full text-[13px] font-semibold capitalize transition-colors cursor-pointer ${
                      mode === m
                        ? 'bg-[#d32f2f] text-white shadow-[0_4px_12px_rgba(211,47,47,0.3)]'
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    {m}
                  </button>
                ))}
              </div>

              {mode === 'login' ? (
                <div className="flex flex-col gap-3">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    <div className="flex items-center gap-1 px-5 py-2.5 rounded-full border border-gray-200 focus-within:border-gray-400 transition-colors">
                      <span className="text-[13px] font-semibold text-gray-800 shrink-0 whitespace-nowrap mr-1">Email:</span>
                      <input
                        type="email"
                        autoComplete="email"
                        className="flex-1 min-w-0 bg-transparent outline-none text-[13px] text-gray-800"
                      />
                    </div>
                    <div className="flex items-center gap-1 px-5 py-2.5 rounded-full border border-gray-200 focus-within:border-gray-400 transition-colors">
                      <span className="text-[13px] font-semibold text-gray-800 shrink-0 whitespace-nowrap mr-1">Password:</span>
                      <input
                        type="password"
                        autoComplete="current-password"
                        className="flex-1 min-w-0 bg-transparent outline-none text-[13px] text-gray-800"
                      />
                    </div>
                  </div>
                  <button
                    type="button"
                    className="self-start bg-[#d32f2f] text-white text-[14px] font-semibold px-9 py-3 rounded-full shadow-[0_6px_18px_rgba(211,47,47,0.25)] hover:bg-[#b71c1c] transition-colors cursor-pointer"
                  >
                    Login
                  </button>
                </div>
              ) : (
                <>
                  <h2 className="text-[17px] font-bold text-gray-800 m-0">Information</h2>

                  <div className="flex flex-col gap-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                      <div className="flex items-center gap-1 px-5 py-2.5 rounded-full border border-gray-200 focus-within:border-gray-400 transition-colors">
                        <span className="text-[13px] font-semibold text-gray-800 shrink-0 whitespace-nowrap mr-1">Name*:</span>
                        <input
                          name="firstname"
                          type="text"
                          autoComplete="name"
                          className="flex-1 min-w-0 bg-transparent outline-none text-[13px] text-gray-800"
                        />
                      </div>
                      <div className="flex items-center gap-1 px-5 py-2.5 rounded-full border border-gray-200 focus-within:border-gray-400 transition-colors">
                        <span className="text-[13px] font-semibold text-gray-800 shrink-0 whitespace-nowrap mr-1">Number*:</span>
                        <input
                          name="telephone"
                          type="tel"
                          className="flex-1 min-w-0 bg-transparent outline-none text-[13px] text-gray-800"
                        />
                      </div>
                    </div>

                    <div className="flex items-center gap-1 px-5 py-2.5 rounded-full border border-gray-200 focus-within:border-gray-400 transition-colors">
                      <span className="text-[13px] font-semibold text-gray-800 shrink-0 whitespace-nowrap mr-1">Email*:</span>
                      <input
                        name="email"
                        type="email"
                        className="flex-1 min-w-0 bg-transparent outline-none text-[13px] text-gray-800"
                      />
                    </div>

                    <div className="flex items-center gap-1 px-5 py-2.5 rounded-full border border-gray-200 focus-within:border-gray-400 transition-colors">
                      <span className="text-[13px] font-semibold text-gray-800 shrink-0 whitespace-nowrap mr-1">Address*:</span>
                      <input
                        name="address_1"
                        type="text"
                        className="flex-1 min-w-0 bg-transparent outline-none text-[13px] text-gray-800"
                      />
                    </div>

                    <div className="flex items-center gap-1 px-4 sm:px-5 py-2.5 rounded-full border border-gray-200">
                      <span className="text-[12px] sm:text-[13px] font-semibold text-gray-800 shrink-0 whitespace-nowrap mr-1">
                        Information:
                      </span>
                      <LocationDropdown
                        value={district}
                        options={DISTRICTS}
                        onChange={handleDistrictChange}
                        wrapperClassName="shrink-0 max-w-[34%] sm:max-w-none"
                        textClassName="text-[12px] sm:text-[13px] font-medium text-gray-500"
                      />
                      <span className="mi text-[14px] text-gray-400 shrink-0">chevron_right</span>
                      <LocationDropdown
                        value={upazila}
                        options={UPAZILAS[district] ?? []}
                        onChange={setUpazila}
                        wrapperClassName="flex-1 min-w-0"
                        textClassName="text-[12px] sm:text-[13px] font-medium text-gray-500"
                      />
                    </div>

                    {mode === 'register' && (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                        <div className="flex items-center gap-1 px-5 py-2.5 rounded-full border border-gray-200 focus-within:border-gray-400 transition-colors">
                          <span className="text-[13px] font-semibold text-gray-800 shrink-0 whitespace-nowrap mr-1">Password*:</span>
                          <input
                            type="password"
                            autoComplete="new-password"
                            className="flex-1 min-w-0 bg-transparent outline-none text-[13px] text-gray-800"
                          />
                        </div>
                        <div className="flex items-center gap-1 px-5 py-2.5 rounded-full border border-gray-200 focus-within:border-gray-400 transition-colors">
                          <span className="text-[13px] font-semibold text-gray-800 shrink-0 whitespace-nowrap mr-1">Confirm*:</span>
                          <input
                            type="password"
                            autoComplete="new-password"
                            className="flex-1 min-w-0 bg-transparent outline-none text-[13px] text-gray-800"
                          />
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="grid grid-cols-1 min-[480px]:grid-cols-3 gap-2.5 mt-1">
                    {(
                      [
                        { key: 'cod', label: 'Cash On Delivery', icon: 'fa-solid fa-money-bill-wave' },
                        { key: 'mobile', label: 'Mobile Banking', icon: 'fa-solid fa-mobile-screen-button' },
                        { key: 'online', label: 'Online Banking', icon: 'fa-solid fa-building-columns' },
                      ] as { key: Payment; label: string; icon: string }[]
                    ).map((opt) => (
                      <button
                        key={opt.key}
                        type="button"
                        onClick={() => setPayment(opt.key)}
                        className={`flex items-center gap-2 border rounded-full px-3 py-2.5 text-[12px] font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                          payment === opt.key
                            ? 'border-[1.5px] border-[#d32f2f] text-[#d32f2f]'
                            : 'border-gray-200 text-gray-700 hover:border-gray-300'
                        }`}
                      >
                        <span
                          className={`w-[18px] h-[18px] rounded-full border-[1.5px] flex items-center justify-center shrink-0 ${
                            payment === opt.key ? 'border-[#d32f2f]' : 'border-gray-300'
                          }`}
                        >
                          {payment === opt.key && <span className="w-2.5 h-2.5 rounded-full bg-[#d32f2f]" />}
                        </span>
                        <i className={`${opt.icon} shrink-0`} />
                        {opt.label}
                      </button>
                    ))}
                  </div>

                  <div className="flex items-start gap-2 text-[11.5px] text-gray-500 mt-1">
                    <i className="fa-solid fa-circle-check text-[#d32f2f] mt-0.5" />
                    <span>
                      I have read and agree to the{' '}
                      <a href="#" onClick={(e) => e.preventDefault()} className="text-[#d32f2f] font-semibold no-underline">
                        Terms &amp; Conditions
                      </a>
                      ,{' '}
                      <a href="#" onClick={(e) => e.preventDefault()} className="text-[#d32f2f] font-semibold no-underline">
                        Privacy Policy
                      </a>{' '}
                      &amp;{' '}
                      <a href="#" onClick={(e) => e.preventDefault()} className="text-[#d32f2f] font-semibold no-underline">
                        Return Policy
                      </a>
                    </span>
                  </div>

                  <button
                    type="submit"
                    className="self-start bg-[#d32f2f] text-white text-[14px] font-semibold px-9 py-3 rounded-full shadow-[0_6px_18px_rgba(211,47,47,0.25)] hover:bg-[#b71c1c] transition-colors cursor-pointer mt-1"
                  >
                    Place Order
                  </button>
                </>
              )}
            </div>

            {/* RIGHT: SUMMARY */}
            <div className="bg-white rounded-[20px] md:rounded-[26px] p-5 md:p-8 flex flex-col justify-between">
              <div>
                <div className="flex flex-col gap-4">
                  {items.map((item) => (
                    <div key={item.id} className="flex gap-3.5 items-start">
                      <div className="w-[62px] h-[62px] shrink-0 bg-gray-50 border border-gray-100 rounded-2xl flex items-center justify-center p-1">
                        <Image
                          src={item.image}
                          alt={item.name}
                          width={54}
                          height={54}
                          className="max-w-full max-h-full object-contain"
                        />
                      </div>

                      <div className="flex-1 min-w-0 flex flex-col gap-1.5">
                        <Link
                          href={`/${item.slug}`}
                          className="text-[13px] font-semibold text-gray-800 leading-snug line-clamp-2 no-underline hover:text-[#d32f2f]"
                        >
                          {item.name}
                        </Link>

                        <div className="flex items-center justify-between flex-wrap gap-2">
                          <span className="text-[13.5px] font-bold text-[#d32f2f]">
                            ৳{item.price.toLocaleString()}
                          </span>

                          <div className="flex items-center gap-2.5 bg-[#f5f5f7] rounded-full px-3 py-1 text-[12px] font-bold text-gray-600">
                            <button
                              type="button"
                              onClick={() => updateQty(item.id, item.qty - 1)}
                              className="cursor-pointer select-none px-0.5"
                            >
                              -
                            </button>
                            <span>{item.qty}</span>
                            <button
                              type="button"
                              onClick={() => updateQty(item.id, item.qty + 1)}
                              className="cursor-pointer select-none px-0.5"
                            >
                              +
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <Link
                  href="/"
                  className="inline-block bg-[#f5f5f7] text-gray-600 text-[12px] font-semibold px-5 py-2 rounded-full no-underline mt-3.5 mb-5 hover:bg-gray-200 hover:text-[#d32f2f] transition-colors"
                >
                  Buy More
                </Link>
              </div>

              <div>
                <div className="flex flex-col gap-3 text-[13.5px] font-medium text-gray-600 pt-5 border-t-2 border-gray-100">
                  <div className="flex justify-between">
                    <span>Sub-Total</span>
                    <span className="text-[#10b981] font-semibold">৳{subtotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>{shipping === 0 ? 'Inside Dhaka City' : `Delivery to ${upazila}, ${district}`}</span>
                    <span className="text-[#10b981] font-semibold">
                      {shipping === 0 ? '৳0' : `৳${shipping.toLocaleString()}`}
                    </span>
                  </div>
                  {discount > 0 && (
                    <div className="flex justify-between">
                      <span>Discount</span>
                      <span className="text-green-600 font-semibold">-৳{discount.toLocaleString()}</span>
                    </div>
                  )}
                  <hr className="border-t border-dashed border-gray-200 my-1" />
                  <div className="flex justify-between text-[15px] font-bold text-gray-800">
                    <span>Total</span>
                    <span className="text-[#d32f2f]">৳{total.toLocaleString()}</span>
                  </div>
                </div>

                <div className="flex flex-col gap-2 mt-5">
                  <p className="text-[13px] font-semibold text-gray-600 m-0">
                    Coupon/<span className="text-[#d32f2f]">Promo Code</span>
                  </p>
                  <div className="flex bg-[#f5f5f7] rounded-full">
                    <input
                      type="text"
                      value={coupon}
                      onChange={(e) => setCoupon(e.target.value)}
                      placeholder="Promo / Coupon Code"
                      className="flex-1 bg-transparent px-4 py-2.5 outline-none text-[12.5px] text-gray-800 min-w-0"
                    />
                    <button
                      type="button"
                      onClick={() => applyCoupon(coupon)}
                      className="shrink-0 bg-[#d32f2f] text-white text-[12.5px] font-semibold px-6 rounded-full hover:bg-[#b71c1c] transition-colors cursor-pointer"
                    >
                      Apply
                    </button>
                  </div>
                  {couponMessage && (
                    <p
                      className={`text-[11px] m-0 ${
                        couponMessage.type === 'success' ? 'text-green-600' : 'text-[#d32f2f]'
                      }`}
                    >
                      {couponMessage.text}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </form>
        )}
      </div>
    </>
  )
}

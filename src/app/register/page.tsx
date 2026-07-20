'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import Breadcrumbs from '@/components/category/Breadcrumbs'
import { useAuth } from '@/context/AuthContext'

const IMG_BASE = '/images'

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const [gender, setGender] = useState<'male' | 'female'>('male')
  const { login } = useAuth()
  const router = useRouter()

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const fd = new FormData(e.currentTarget)
    const email = String(fd.get('email') || '').trim()
    login(email)
    router.push('/account')
  }

  return (
    <>
      <Breadcrumbs
        items={[
          { label: 'Home', href: '/' },
          { label: 'Account', href: '/register' },
          { label: 'Register', href: '/register' },
        ]}
      />

      <div className="container mx-auto px-4 min-[992px]:px-14 py-10 md:py-16">
        <div className="flex flex-col md:flex-row items-center md:items-start justify-center gap-10 md:gap-24 max-w-[1100px] mx-auto">
          <Image
            src={`${IMG_BASE}/catalog/view/theme/default/image/login-page-image.png`}
            alt="Register"
            width={520}
            height={520}
            className="w-[220px] md:w-[480px] h-auto object-contain shrink-0 md:mt-10"
          />

          <div className="w-full max-w-[460px] border-[10px] md:border-[14px] border-[#f5f5f7] rounded-[30px] md:rounded-[40px] p-6">
            <div className="text-center mb-5">
              <h1 className="text-2xl font-bold text-gray-900 m-0">
                Join the <span className="text-[#d32f2f]">Kingdom</span>
              </h1>
              <p className="text-[13px] text-gray-500 mt-1">All your tech, in one place</p>
            </div>

            <a
              href="#"
              className="flex items-center justify-center gap-2.5 w-full h-[42px] border border-gray-200 rounded-full bg-white text-[14px] font-medium text-gray-700 no-underline hover:bg-gray-50 hover:border-gray-300 transition-colors"
            >
              <Image
                src={`${IMG_BASE}/catalog/view/theme/default/image/google-icon.svg`}
                alt="Google"
                width={18}
                height={18}
                className="w-[18px] h-[18px]"
              />
              Continue with Google
            </a>

            <div className="flex items-center gap-3 my-5">
              <div className="flex-1 h-px bg-gray-200" />
              <span className="text-[13px] text-gray-400 whitespace-nowrap">or create an account</span>
              <div className="flex-1 h-px bg-gray-200" />
            </div>

            <form onSubmit={handleSubmit} className="space-y-3.5">
              <div className="flex flex-col sm:flex-row gap-3.5">
                <div className="flex-1">
                  <label htmlFor="reg-firstname" className="block text-[13px] font-semibold text-gray-700 mb-1.5">
                    First Name
                  </label>
                  <input
                    id="reg-firstname"
                    type="text"
                    placeholder="First Name"
                    className="w-full h-[42px] px-4 rounded-[20px] border border-gray-200 outline-none text-[14px] text-gray-800 focus:border-gray-400 transition-colors"
                  />
                </div>
                <div className="flex-1">
                  <label htmlFor="reg-lastname" className="block text-[13px] font-semibold text-gray-700 mb-1.5">
                    Last Name
                  </label>
                  <input
                    id="reg-lastname"
                    type="text"
                    placeholder="Last Name"
                    className="w-full h-[42px] px-4 rounded-[20px] border border-gray-200 outline-none text-[14px] text-gray-800 focus:border-gray-400 transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[13px] font-semibold text-gray-700 mb-1.5">Gender</label>
                <div className="flex gap-6">
                  <label className="flex items-center gap-2 cursor-pointer select-none">
                    <input
                      type="radio"
                      name="gender"
                      checked={gender === 'male'}
                      onChange={() => setGender('male')}
                      className="hidden"
                    />
                    <span
                      className={`w-7 h-7 rounded-full border-2 flex items-center justify-center transition-colors ${
                        gender === 'male' ? 'border-gray-500 text-gray-600' : 'border-gray-300 text-gray-400'
                      }`}
                    >
                      <i className="fa-solid fa-mars text-[13px]" />
                    </span>
                    <span className={`text-[14px] ${gender === 'male' ? 'text-gray-700 font-medium' : 'text-gray-500'}`}>
                      Male
                    </span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer select-none">
                    <input
                      type="radio"
                      name="gender"
                      checked={gender === 'female'}
                      onChange={() => setGender('female')}
                      className="hidden"
                    />
                    <span
                      className={`w-7 h-7 rounded-full border-2 flex items-center justify-center transition-colors ${
                        gender === 'female' ? 'border-gray-500 text-gray-600' : 'border-gray-300 text-gray-400'
                      }`}
                    >
                      <i className="fa-solid fa-venus text-[13px]" />
                    </span>
                    <span className={`text-[14px] ${gender === 'female' ? 'text-gray-700 font-medium' : 'text-gray-500'}`}>
                      Female
                    </span>
                  </label>
                </div>
              </div>

              <div>
                <label htmlFor="reg-email" className="block text-[13px] font-semibold text-gray-700 mb-1.5">
                  Email
                </label>
                <input
                  id="reg-email"
                  name="email"
                  type="email"
                  required
                  placeholder="Email Address"
                  autoComplete="email"
                  className="w-full h-[42px] px-4 rounded-[20px] border border-gray-200 outline-none text-[14px] text-gray-800 focus:border-gray-400 transition-colors"
                />
              </div>

              <div>
                <label htmlFor="reg-phone" className="block text-[13px] font-semibold text-gray-700 mb-1.5">
                  Number
                </label>
                <input
                  id="reg-phone"
                  type="tel"
                  placeholder="+880"
                  className="w-full h-[42px] px-4 rounded-[20px] border border-gray-200 outline-none text-[14px] text-gray-800 focus:border-gray-400 transition-colors"
                />
              </div>

              <div className="relative">
                <label htmlFor="reg-password" className="block text-[13px] font-semibold text-gray-700 mb-1.5">
                  Password
                </label>
                <input
                  id="reg-password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Password"
                  autoComplete="new-password"
                  className="w-full h-[42px] px-4 pr-11 rounded-[20px] border border-gray-200 outline-none text-[14px] text-gray-800 focus:border-gray-400 transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                  className="absolute right-3.5 top-[34px] text-gray-400 hover:text-gray-600"
                >
                  <span className="mi text-[19px]">{showPassword ? 'visibility_off' : 'visibility'}</span>
                </button>
              </div>

              <div className="relative">
                <label htmlFor="reg-confirm" className="block text-[13px] font-semibold text-gray-700 mb-1.5">
                  Password Confirm
                </label>
                <input
                  id="reg-confirm"
                  type={showConfirm ? 'text' : 'password'}
                  placeholder="Reenter Password"
                  autoComplete="new-password"
                  className="w-full h-[42px] px-4 pr-11 rounded-[20px] border border-gray-200 outline-none text-[14px] text-gray-800 focus:border-gray-400 transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirm((v) => !v)}
                  aria-label={showConfirm ? 'Hide password' : 'Show password'}
                  className="absolute right-3.5 top-[34px] text-gray-400 hover:text-gray-600"
                >
                  <span className="mi text-[19px]">{showConfirm ? 'visibility_off' : 'visibility'}</span>
                </button>
              </div>

              <label className="flex items-start gap-2 text-[12.5px] text-gray-600 cursor-pointer select-none pt-1">
                <input type="checkbox" className="w-3.5 h-3.5 mt-0.5 accent-[#d32f2f]" />
                <span>
                  I agree to the{' '}
                  <Link href="/privacy-policy" className="text-[#d32f2f] font-semibold no-underline hover:underline">
                    Privacy Policy
                  </Link>
                </span>
              </label>

              <button
                type="submit"
                className="w-full h-[42px] bg-[#d32f2f] text-white text-[14px] font-semibold rounded-full hover:bg-[#b71c1c] transition-colors"
              >
                Continue
              </button>
            </form>

            <p className="text-center text-[13px] text-gray-600 mt-4">
              Already have an account?{' '}
              <Link href="/login" className="text-[#d32f2f] font-medium no-underline hover:underline">
                login page
              </Link>
              .
            </p>
          </div>
        </div>
      </div>
    </>
  )
}

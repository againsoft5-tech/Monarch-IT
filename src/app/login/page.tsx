'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import Breadcrumbs from '@/components/category/Breadcrumbs'
import { useAuth } from '@/context/AuthContext'

const IMG_BASE = '/images'

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false)
  const { login } = useAuth()
  const router = useRouter()

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    login()
    router.push('/')
  }

  return (
    <>
      <Breadcrumbs
        items={[
          { label: 'Home', href: '/' },
          { label: 'Account', href: '/login' },
          { label: 'Login', href: '/login' },
        ]}
      />

      <div className="container mx-auto px-4 min-[992px]:px-14 py-10 md:py-16">
        <div className="flex flex-col md:flex-row items-center justify-center gap-10 md:gap-24 max-w-[1100px] mx-auto">
          <Image
            src={`${IMG_BASE}/catalog/view/theme/default/image/login-page-image.png`}
            alt="Login"
            width={520}
            height={520}
            className="w-[220px] md:w-[480px] h-auto object-contain shrink-0"
          />

          <div className="w-full max-w-[400px] border-[10px] md:border-[14px] border-[#f5f5f7] rounded-[30px] md:rounded-[40px] p-6">
            <div className="text-center mb-5">
              <h1 className="text-2xl font-bold text-gray-900 m-0">
                Enter the <span className="text-[#d32f2f]">Kingdom</span>
              </h1>
              <p className="text-[13px] text-gray-500 mt-1">Your complete tech hub</p>
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
              <span className="text-[13px] text-gray-400 whitespace-nowrap">or continue with</span>
              <div className="flex-1 h-px bg-gray-200" />
            </div>

            <form onSubmit={handleSubmit} className="space-y-3.5">
              <div>
                <label htmlFor="login-email" className="block text-[13px] text-gray-700 mb-1.5">
                  Email
                </label>
                <input
                  id="login-email"
                  type="text"
                  placeholder="Email"
                  autoComplete="email"
                  className="w-full h-[42px] px-4 rounded-[20px] border border-gray-200 outline-none text-[14px] text-gray-800 focus:border-gray-400 transition-colors"
                />
              </div>

              <div className="relative">
                <label htmlFor="login-password" className="block text-[13px] text-gray-700 mb-1.5">
                  Password
                </label>
                <input
                  id="login-password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Password"
                  autoComplete="current-password"
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

              <div className="flex items-center justify-between pt-1">
                <label className="flex items-center gap-1.5 text-[12px] text-gray-500 cursor-pointer select-none">
                  <input type="checkbox" className="w-3.5 h-3.5 accent-[#d32f2f]" />
                  Remember me
                </label>
                <Link href="/forgotten-password" className="text-[12px] text-[#d32f2f] no-underline hover:underline">
                  Forgotten Password?
                </Link>
              </div>

              <button
                type="submit"
                className="w-full h-[42px] bg-[#d32f2f] text-white text-[14px] font-semibold rounded-full hover:bg-[#b71c1c] transition-colors"
              >
                Login
              </button>
            </form>

            <Link
              href="/register"
              className="block text-center text-[13px] text-gray-600 no-underline mt-4 pt-4 border-t border-gray-100"
            >
              Now Here? <span className="text-[#d32f2f] font-medium hover:underline">Create an Account</span>
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}

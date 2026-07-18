'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { useAdminAuth, ADMIN_EMAIL, ADMIN_PASSWORD } from '@/context/AdminAuthContext'

export default function AdminLoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const { loginAdmin } = useAdminAuth()
  const router = useRouter()

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const ok = loginAdmin(email, password)
    if (ok) {
      router.push('/admin')
    } else {
      setError('Invalid credentials. Please try again.')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f5f5f7] px-4">
      <div className="w-full max-w-[400px] bg-white rounded-[32px] shadow-xl p-8">
        <div className="flex justify-center mb-6">
          <Image
            src="/images/image/catalog/website/logo/monarch-it-logo.png"
            alt="Monarch IT"
            width={160}
            height={44}
            className="h-10 w-auto object-contain"
          />
        </div>

        <h1 className="text-xl font-bold text-gray-900 text-center m-0 mb-1">Admin Panel</h1>
        <p className="text-[13px] text-gray-500 text-center mb-6">Login to manage customer conversations</p>

        <form onSubmit={handleSubmit} className="space-y-3.5">
          <div>
            <label htmlFor="admin-email" className="block text-[13px] font-semibold text-gray-700 mb-1.5">
              Email
            </label>
            <input
              id="admin-email"
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@monarchit.com"
              className="w-full h-[42px] px-4 rounded-[20px] border border-gray-200 outline-none text-[14px] text-gray-800 focus:border-gray-400 transition-colors"
            />
          </div>

          <div>
            <label htmlFor="admin-password" className="block text-[13px] font-semibold text-gray-700 mb-1.5">
              Password
            </label>
            <input
              id="admin-password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="w-full h-[42px] px-4 rounded-[20px] border border-gray-200 outline-none text-[14px] text-gray-800 focus:border-gray-400 transition-colors"
            />
          </div>

          {error && <p className="text-[12.5px] text-[#bd2026] m-0">{error}</p>}

          <button
            type="submit"
            className="w-full h-[42px] bg-[#bd2026] text-white text-[14px] font-semibold rounded-full hover:bg-[#a5121c] transition-colors cursor-pointer"
          >
            Login to Admin Panel
          </button>
        </form>

        <p className="text-center text-[11.5px] text-gray-400 mt-5">
          Demo credentials: {ADMIN_EMAIL} / {ADMIN_PASSWORD}
        </p>
      </div>
    </div>
  )
}

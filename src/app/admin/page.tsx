'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAdminAuth } from '@/context/AdminAuthContext'
import AdminDashboard from '@/components/admin/AdminDashboard'

export default function AdminPage() {
  const { isAdminLoggedIn, adminChecked } = useAdminAuth()
  const router = useRouter()

  useEffect(() => {
    if (adminChecked && !isAdminLoggedIn) {
      router.replace('/admin/login')
    }
  }, [adminChecked, isAdminLoggedIn, router])

  if (!adminChecked || !isAdminLoggedIn) {
    return <div className="min-h-screen flex items-center justify-center bg-[#eef0f3] text-gray-400 text-[14px]">Loading...</div>
  }

  return <AdminDashboard />
}

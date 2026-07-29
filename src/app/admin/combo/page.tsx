'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useAdminAuth } from '@/context/AdminAuthContext'
import { useComboStore, createCampaign, deleteCampaign, duplicateCampaign, setCampaignStatus } from '@/lib/comboStore'

const RED = '#bd2026'

export default function AdminComboListPage() {
  const { isAdminLoggedIn, adminChecked } = useAdminAuth()
  const router = useRouter()
  const db = useComboStore()
  const [newName, setNewName] = useState('')
  const [showNewForm, setShowNewForm] = useState(false)

  useEffect(() => {
    if (adminChecked && !isAdminLoggedIn) router.replace('/admin/login')
  }, [adminChecked, isAdminLoggedIn, router])

  if (!adminChecked || !isAdminLoggedIn) {
    return <div className="min-h-screen flex items-center justify-center bg-[#eef0f3] text-gray-400 text-[14px]">Loading...</div>
  }

  const campaigns = Object.values(db).sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())

  const handleCreate = () => {
    const name = newName.trim()
    if (!name) return
    const campaign = createCampaign(name)
    setNewName('')
    setShowNewForm(false)
    router.push(`/admin/combo/${campaign.id}`)
  }

  const handleDelete = (id: string, name: string) => {
    if (window.confirm(`Delete campaign "${name}"? This cannot be undone.`)) deleteCampaign(id)
  }

  return (
    <div className="min-h-screen bg-[#eef0f3] px-4 py-8 lg:px-10">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div>
            <Link href="/admin" className="text-[13px] text-gray-500 hover:text-gray-700 inline-flex items-center gap-1 mb-1">
              <span className="mi text-[16px]">arrow_back</span> Dashboard
            </Link>
            <h1 className="text-xl font-bold text-gray-900 m-0">Combo Campaigns</h1>
          </div>
          <button
            type="button"
            onClick={() => setShowNewForm((v) => !v)}
            className="h-10 px-5 rounded-full text-white text-[13px] font-semibold cursor-pointer"
            style={{ backgroundColor: RED }}
          >
            + New Campaign
          </button>
        </div>

        {showNewForm && (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 mb-6 flex items-center gap-3">
            <input
              autoFocus
              type="text"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleCreate()}
              placeholder="Campaign name, e.g. Laptop Combo"
              className="flex-1 h-10 px-4 rounded-full border border-gray-200 outline-none text-[13px] focus:border-gray-400"
            />
            <button
              type="button"
              onClick={handleCreate}
              className="h-10 px-5 rounded-full text-white text-[13px] font-semibold cursor-pointer"
              style={{ backgroundColor: RED }}
            >
              Create
            </button>
          </div>
        )}

        {campaigns.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-10 text-center text-gray-400 text-[14px]">
            No combo campaigns yet. Create one to get started.
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2">
            {campaigns.map((c) => {
              const productCount = c.groups.reduce((n, g) => n + g.products.length, 0)
              return (
                <div key={c.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0">
                      <h2 className="text-[15px] font-bold text-gray-900 m-0 truncate">{c.name}</h2>
                      <p className="text-[12px] text-gray-400 m-0 mt-0.5">/combo/{c.id}</p>
                    </div>
                    <span
                      className={`shrink-0 text-[11px] font-semibold px-2.5 py-1 rounded-full ${
                        c.active ? 'bg-[#ecfdf5] text-[#10b981]' : 'bg-gray-100 text-gray-500'
                      }`}
                    >
                      {c.active ? 'Active' : 'Inactive'}
                    </span>
                  </div>

                  <p className="text-[12.5px] text-gray-500 mt-3 mb-4">
                    {c.groups.length} group{c.groups.length !== 1 ? 's' : ''} &middot; {productCount} product
                    {productCount !== 1 ? 's' : ''}
                  </p>

                  <div className="flex items-center gap-2 flex-wrap">
                    <Link
                      href={`/admin/combo/${c.id}`}
                      className="h-8 px-4 rounded-full border border-gray-200 text-[12.5px] font-semibold text-gray-700 hover:bg-gray-50 flex items-center no-underline"
                    >
                      Edit
                    </Link>
                    <button
                      type="button"
                      onClick={() => setCampaignStatus(c.id, !c.active)}
                      className="h-8 px-4 rounded-full border border-gray-200 text-[12.5px] font-semibold text-gray-700 hover:bg-gray-50 cursor-pointer"
                    >
                      {c.active ? 'Deactivate' : 'Activate'}
                    </button>
                    <button
                      type="button"
                      onClick={() => duplicateCampaign(c.id)}
                      className="h-8 px-4 rounded-full border border-gray-200 text-[12.5px] font-semibold text-gray-700 hover:bg-gray-50 cursor-pointer"
                    >
                      Duplicate
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDelete(c.id, c.name)}
                      className="h-8 px-4 rounded-full border border-gray-200 text-[12.5px] font-semibold text-[#bd2026] hover:bg-red-50 cursor-pointer"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}

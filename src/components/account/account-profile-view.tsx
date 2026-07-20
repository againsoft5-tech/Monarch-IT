'use client'

import { useRef, useState, type ReactNode } from 'react'
import { useAuth } from '@/context/AuthContext'

const DISTRICTS = [
  'Dhaka',
  'Chattogram',
  'Sylhet',
  'Rajshahi',
  'Khulna',
  'Barishal',
  'Rangpur',
  'Mymensingh',
  'Gazipur',
  'Narayanganj',
]

const ACCENT = '#d32f2f'
const inputCls =
  'w-full h-[42px] rounded-xl border border-gray-200 px-3.5 text-[13px] text-gray-900 outline-none transition-colors focus:border-[#d32f2f] bg-white'

export default function AccountProfileView() {
  const { customer, updateProfile } = useAuth()
  const fileRef = useRef<HTMLInputElement>(null)
  const [photoPreview, setPhotoPreview] = useState<string | null>(null)
  const [saved, setSaved] = useState(false)
  const [form, setForm] = useState({
    name: customer?.name || '',
    phone: customer?.phone || '',
    emergencyNumber: '',
    district: 'Dhaka',
    city: 'Dhaka',
    address: '',
  })

  if (!customer) return null

  const setField = (key: keyof typeof form, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }))
    setSaved(false)
  }

  const onPickPhoto = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    setPhotoPreview(URL.createObjectURL(file))
    setSaved(false)
  }

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    updateProfile({ name: form.name, phone: form.phone })
    setSaved(true)
  }

  const initial = (form.name || customer.identifier || 'C').trim().charAt(0).toUpperCase()

  return (
    <div className="mx-auto max-w-[640px]">
      <div className="mb-3">
        <h1 className="m-0 text-[17px] font-bold text-gray-900">Profile</h1>
        <p className="m-0 mt-0.5 text-[12px] text-gray-500">Update your photo and delivery details.</p>
      </div>

      <form
        onSubmit={onSubmit}
        className="rounded-2xl border border-gray-100 bg-white p-4 shadow-[0_8px_28px_rgba(0,0,0,0.03)] md:p-6"
      >
        <div className="mb-6 flex flex-wrap items-center gap-4 border-b border-gray-100 pb-5">
          <div
            className="flex h-20 w-20 shrink-0 items-center justify-center overflow-hidden rounded-full text-[28px] font-bold text-white"
            style={{ background: ACCENT }}
          >
            {photoPreview ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={photoPreview} alt="" className="h-full w-full object-cover" />
            ) : (
              initial
            )}
          </div>
          <div className="flex flex-wrap gap-2">
            <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={onPickPhoto} />
            <button
              type="button"
              onClick={() => fileRef.current?.click()}
              className="inline-flex cursor-pointer items-center gap-1.5 rounded-xl border border-gray-200 bg-white px-3.5 py-2 text-[12px] font-semibold text-gray-700 hover:border-[#d32f2f] hover:text-[#d32f2f]"
            >
              <span className="mi text-[16px] leading-none">photo_camera</span>
              Change Photo
            </button>
          </div>
        </div>

        <div className="mb-4 rounded-xl bg-[#f6f7f9] px-3 py-2 text-[12px] text-gray-600">
          Login: <span className="font-semibold text-gray-900">{customer.identifier}</span>
        </div>

        <div className="space-y-3.5">
          <Field label="Name" htmlFor="profile-name">
            <input
              id="profile-name"
              value={form.name}
              onChange={(e) => setField('name', e.target.value)}
              className={inputCls}
              autoComplete="name"
            />
          </Field>
          <Field label="Phone" htmlFor="profile-phone">
            <input
              id="profile-phone"
              type="tel"
              value={form.phone}
              onChange={(e) => setField('phone', e.target.value)}
              placeholder="01XXXXXXXXX"
              className={inputCls}
              autoComplete="tel"
            />
          </Field>
          <Field label="Emergency Number" htmlFor="profile-emergency">
            <input
              id="profile-emergency"
              type="tel"
              value={form.emergencyNumber}
              onChange={(e) => setField('emergencyNumber', e.target.value)}
              placeholder="01XXXXXXXXX"
              className={inputCls}
              autoComplete="tel"
            />
          </Field>
          <Field label="District" htmlFor="profile-district">
            <select
              id="profile-district"
              value={form.district}
              onChange={(e) => {
                setField('district', e.target.value)
                setField('city', e.target.value)
              }}
              className={`${inputCls} appearance-none bg-[length:12px] bg-[right_12px_center] bg-no-repeat pr-9`}
              style={{
                backgroundImage:
                  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath fill='%236b7280' d='M1 1l5 5 5-5'/%3E%3C/svg%3E\")",
              }}
            >
              {DISTRICTS.map((d) => (
                <option key={d} value={d}>
                  {d}
                </option>
              ))}
            </select>
          </Field>
          <Field label="City" htmlFor="profile-city">
            <input
              id="profile-city"
              value={form.city}
              onChange={(e) => setField('city', e.target.value)}
              className={inputCls}
            />
          </Field>
          <Field label="Address" htmlFor="profile-address">
            <textarea
              id="profile-address"
              value={form.address}
              onChange={(e) => setField('address', e.target.value)}
              rows={3}
              placeholder="House, road, area…"
              className="w-full min-h-[88px] resize-y rounded-xl border border-gray-200 px-3.5 py-2.5 text-[13px] text-gray-900 outline-none transition-colors focus:border-[#d32f2f] bg-white"
            />
          </Field>
        </div>

        {saved ? (
          <p className="mt-4 mb-0 rounded-xl bg-emerald-50 px-3 py-2 text-[12px] font-semibold text-emerald-700">
            Profile updated.
          </p>
        ) : null}

        <button
          type="submit"
          className="mt-5 h-11 w-full cursor-pointer rounded-xl border-0 bg-[#d32f2f] text-[14px] font-semibold text-white hover:bg-[#b71c1c] md:w-auto md:min-w-[160px] md:px-8"
        >
          Update
        </button>
      </form>
    </div>
  )
}

function Field({ label, htmlFor, children }: { label: string; htmlFor: string; children: ReactNode }) {
  return (
    <div>
      <label htmlFor={htmlFor} className="mb-1.5 block text-[12px] font-semibold text-gray-700">
        {label}
      </label>
      {children}
    </div>
  )
}

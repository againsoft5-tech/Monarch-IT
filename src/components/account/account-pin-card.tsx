'use client'

import { useState } from 'react'
import { PIN_LENGTH, useAuth } from '@/context/AuthContext'

const inputCls =
  'w-full h-[42px] rounded-xl border border-gray-200 px-3.5 text-[13px] text-gray-900 outline-none transition-colors focus:border-[#d32f2f] bg-white tracking-[0.3em]'

export default function AccountPinCard() {
  const { identifier, hasPin, setPin, clearPin } = useAuth()
  const [editing, setEditing] = useState(false)
  const [pin, setPinValue] = useState('')
  const [confirm, setConfirm] = useState('')
  const [error, setError] = useState('')
  const [saved, setSaved] = useState(false)

  const startEdit = () => {
    setEditing(true)
    setPinValue('')
    setConfirm('')
    setError('')
    setSaved(false)
  }

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault()
    if (!new RegExp(`^\\d{${PIN_LENGTH}}$`).test(pin)) {
      setError(`PIN must be exactly ${PIN_LENGTH} digits`)
      return
    }
    if (pin !== confirm) {
      setError('PINs do not match')
      return
    }
    setPin(pin)
    setSaved(true)
    setEditing(false)
    setPinValue('')
    setConfirm('')
  }

  return (
    <div className="rounded-2xl border border-gray-100 bg-white p-4 shadow-[0_8px_28px_rgba(0,0,0,0.03)]">
      <div className="flex items-center justify-between gap-2">
        <h3 className="m-0 text-[13px] font-bold text-gray-900">Login PIN</h3>
        {hasPin ? (
          <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-bold text-emerald-700">
            <span className="mi text-[12px] leading-none">verified</span>
            Set
          </span>
        ) : (
          <span className="inline-flex items-center rounded-full bg-amber-50 px-2 py-0.5 text-[10px] font-bold text-amber-700">
            Not set
          </span>
        )}
      </div>
      <p className="m-0 mt-1.5 text-[12px] leading-relaxed text-gray-500">
        {hasPin
          ? 'Login faster with your 4-digit PIN.'
          : `Your ${identifier || 'account'} is verified — set a 4-digit PIN to login faster.`}
      </p>

      {saved ? (
        <p className="m-0 mt-2 rounded-xl bg-emerald-50 px-3 py-2 text-[12px] font-semibold text-emerald-700">
          PIN saved. Use it next time you login.
        </p>
      ) : null}

      {editing ? (
        <form onSubmit={handleSave} className="mt-3 space-y-2.5">
          <div>
            <label htmlFor="pin-new" className="mb-1 block text-[12px] font-semibold text-gray-700">
              New PIN
            </label>
            <input
              id="pin-new"
              type="password"
              inputMode="numeric"
              maxLength={PIN_LENGTH}
              value={pin}
              onChange={(e) => {
                setPinValue(e.target.value.replace(/\D/g, ''))
                setError('')
              }}
              placeholder="••••"
              className={inputCls}
              autoFocus
            />
          </div>
          <div>
            <label htmlFor="pin-confirm" className="mb-1 block text-[12px] font-semibold text-gray-700">
              Confirm PIN
            </label>
            <input
              id="pin-confirm"
              type="password"
              inputMode="numeric"
              maxLength={PIN_LENGTH}
              value={confirm}
              onChange={(e) => {
                setConfirm(e.target.value.replace(/\D/g, ''))
                setError('')
              }}
              placeholder="••••"
              className={inputCls}
            />
          </div>
          {error ? <p className="m-0 text-[12px] font-medium text-[#d32f2f]">{error}</p> : null}
          <div className="flex gap-1.5 pt-0.5">
            <button
              type="submit"
              className="inline-flex flex-1 cursor-pointer items-center justify-center rounded-xl border-0 bg-[#d32f2f] px-3 py-2 text-[12px] font-semibold text-white hover:bg-[#b71c1c]"
            >
              Save PIN
            </button>
            <button
              type="button"
              onClick={() => {
                setEditing(false)
                setError('')
              }}
              className="inline-flex cursor-pointer items-center justify-center rounded-xl border border-gray-200 bg-white px-3 py-2 text-[12px] font-semibold text-gray-700 hover:border-[#d32f2f] hover:text-[#d32f2f]"
            >
              Cancel
            </button>
          </div>
        </form>
      ) : (
        <div className="mt-3 flex gap-1.5">
          <button
            type="button"
            onClick={startEdit}
            className="inline-flex flex-1 cursor-pointer items-center justify-center gap-1 rounded-xl border-0 bg-[#d32f2f] px-3 py-2 text-[12px] font-semibold text-white hover:bg-[#b71c1c]"
          >
            <span className="mi text-[14px] leading-none">pin</span>
            {hasPin ? 'Change PIN' : 'Set PIN'}
          </button>
          {hasPin ? (
            <button
              type="button"
              onClick={() => {
                clearPin()
                setSaved(false)
              }}
              className="inline-flex cursor-pointer items-center justify-center rounded-xl border border-gray-200 bg-white px-3 py-2 text-[12px] font-semibold text-gray-700 hover:border-[#d32f2f] hover:text-[#d32f2f]"
            >
              Remove
            </button>
          ) : null}
        </div>
      )}
    </div>
  )
}

'use client'
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Save, Loader2, CheckCircle, Clock } from 'lucide-react'

interface OpeningHour {
  id: string
  day: string
  openTime: string
  closeTime: string
  isOpen: boolean
  order: number
}

export default function AdminSettingsPage() {
  const [hours, setHours] = useState<OpeningHour[]>([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    fetch('/api/hours')
      .then(r => r.json())
      .then((data: OpeningHour[]) => { setHours(data); setLoading(false) })
  }, [])

  const updateHour = (id: string, field: keyof OpeningHour, value: string | boolean) => {
    setHours(prev => prev.map(h => h.id === id ? { ...h, [field]: value } : h))
  }

  const saveHour = async (hour: OpeningHour) => {
    setSaving(true)
    setSaved(false)
    await fetch('/api/hours', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(hour),
    })
    setSaved(true)
    setSaving(false)
  }

  if (loading) return <div className="glass rounded-2xl h-96 animate-pulse" />

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
      <div className="mb-6">
        <h1 className="text-2xl font-display font-bold text-white">Settings</h1>
        <p className="text-white/40 text-sm">Manage opening hours and website settings</p>
      </div>

      <div className="glass rounded-2xl p-6 mb-6">
        <div className="flex items-center gap-3 mb-6">
          <Clock size={20} className="text-brand-400" />
          <h2 className="text-white font-semibold">Opening Hours</h2>
        </div>
        <div className="space-y-3">
          {hours.map((hour) => (
            <div key={hour.id} className="flex flex-col sm:flex-row sm:items-center gap-3 p-4 rounded-xl bg-white/5">
              <div className="flex items-center gap-3 sm:w-32">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={hour.isOpen}
                    onChange={e => updateHour(hour.id, 'isOpen', e.target.checked)}
                    className="rounded border-white/20 bg-white/5 text-brand-600"
                  />
                  <span className="text-white text-sm font-medium">{hour.day}</span>
                </label>
              </div>
              <div className="flex items-center gap-3 flex-1">
                <input
                  type="text"
                  value={hour.openTime}
                  onChange={e => updateHour(hour.id, 'openTime', e.target.value)}
                  disabled={!hour.isOpen}
                  className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm focus:border-brand-500 focus:outline-none disabled:opacity-30"
                  placeholder="Open time"
                />
                <span className="text-white/30">to</span>
                <input
                  type="text"
                  value={hour.closeTime}
                  onChange={e => updateHour(hour.id, 'closeTime', e.target.value)}
                  disabled={!hour.isOpen}
                  className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm focus:border-brand-500 focus:outline-none disabled:opacity-30"
                  placeholder="Close time"
                />
                <button
                  onClick={() => saveHour(hour)}
                  className="shrink-0 p-2.5 bg-brand-600/20 hover:bg-brand-600/30 text-brand-400 rounded-xl transition-colors"
                  title="Save"
                >
                  <Save size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="glass rounded-2xl p-6">
        <h2 className="text-white font-semibold mb-4">Website Information</h2>
        <div className="space-y-3 text-sm text-white/50">
          <p>This admin panel is powered by Next.js, Prisma, and NextAuth.</p>
          <p>Default admin credentials:</p>
          <ul className="list-disc list-inside space-y-1 ml-2">
            <li>Email: <span className="text-white/70">admin@barmubiti.com</span></li>
            <li>Password: <span className="text-white/70">admin123</span></li>
          </ul>
          <p className="text-white/30 text-xs mt-4">Change these credentials immediately after first login for security.</p>
        </div>
      </div>
    </motion.div>
  )
}

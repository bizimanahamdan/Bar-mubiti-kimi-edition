'use client'
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Save, Loader2, CheckCircle } from 'lucide-react'

interface Biz {
  id: string
  name: string
  tagline: string
  description: string
  address: string
  phone: string
  email: string
  whatsapp: string
  priceRange: string
  rating: number
  reviewCount: number
  facebook: string
  instagram: string
  twitter: string
  tiktok: string
}

export default function AdminBusinessPage() {
  const [biz, setBiz] = useState<Partial<Biz>>({})
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    fetch('/api/business')
      .then(r => r.json())
      .then((data: Biz) => { setBiz(data); setLoading(false) })
  }, [])

  const handleSave = async () => {
    setSaving(true)
    setSaved(false)
    const res = await fetch('/api/business', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(biz),
    })
    if (res.ok) setSaved(true)
    setSaving(false)
  }

  const field = (label: string, key: keyof Biz, type = 'text', placeholder = '') => (
    <div>
      <label className="block text-white/60 text-xs uppercase tracking-wider mb-1.5">{label}</label>
      {type === 'textarea' ? (
        <textarea
          value={biz[key] as string || ''}
          onChange={(e) => setBiz({ ...biz, [key]: e.target.value })}
          rows={3}
          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:border-brand-500 focus:outline-none transition-colors resize-none"
          placeholder={placeholder}
        />
      ) : (
        <input
          type={type}
          value={biz[key] as string || ''}
          onChange={(e) => setBiz({ ...biz, [key]: type === 'number' ? Number(e.target.value) : e.target.value })}
          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:border-brand-500 focus:outline-none transition-colors"
          placeholder={placeholder}
        />
      )}
    </div>
  )

  if (loading) return <div className="glass rounded-2xl h-96 animate-pulse" />

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-display font-bold text-white">Business Information</h1>
          <p className="text-white/40 text-sm">Update your public business details</p>
        </div>
        <button
          onClick={handleSave}
          disabled={saving}
          className="flex items-center gap-2 bg-brand-600 hover:bg-brand-500 disabled:bg-brand-600/50 text-white px-5 py-2.5 rounded-xl font-medium text-sm transition-colors"
        >
          {saving ? <Loader2 size={16} className="animate-spin" /> : saved ? <CheckCircle size={16} /> : <Save size={16} />}
          {saving ? 'Saving...' : saved ? 'Saved' : 'Save Changes'}
        </button>
      </div>

      <div className="glass rounded-2xl p-6 space-y-5">
        <div className="grid sm:grid-cols-2 gap-5">
          {field('Business Name', 'name', 'text', 'Bar Mubiti')}
          {field('Tagline', 'tagline', 'text', 'A Taste of Kigali's Grill Scene')}
        </div>
        {field('Description', 'description', 'textarea', 'Describe your business...')}
        <div className="grid sm:grid-cols-2 gap-5">
          {field('Address', 'address', 'text', '2332+M8F, Kigali')}
          {field('Phone', 'phone', 'text', '0788 582 914')}
        </div>
        <div className="grid sm:grid-cols-2 gap-5">
          {field('Email', 'email', 'email', 'info@barmubiti.com')}
          {field('WhatsApp Number', 'whatsapp', 'text', '0788582914')}
        </div>
        <div className="grid sm:grid-cols-3 gap-5">
          {field('Price Range', 'priceRange', 'text', 'RF 1 – 15,000')}
          {field('Rating', 'rating', 'number')}
          {field('Review Count', 'reviewCount', 'number')}
        </div>
        <div className="border-t border-white/5 pt-5">
          <h3 className="text-white font-semibold text-sm mb-4">Social Media Links</h3>
          <div className="grid sm:grid-cols-2 gap-5">
            {field('Facebook URL', 'facebook')}
            {field('Instagram URL', 'instagram')}
            {field('Twitter URL', 'twitter')}
            {field('TikTok URL', 'tiktok')}
          </div>
        </div>
      </div>
    </motion.div>
  )
}

'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import {
  LayoutDashboard, UtensilsCrossed, ImageIcon, Star, CalendarDays,
  MessageSquare, TrendingUp, Users
} from 'lucide-react'

interface Stats {
  menuItems: number
  galleryImages: number
  reviews: number
  reservations: number
  messages: number
}

export default function AdminDashboardPage() {
  const [stats, setStats] = useState<Stats>({ menuItems: 0, galleryImages: 0, reviews: 0, reservations: 0, messages: 0 })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    Promise.all([
      fetch('/api/menu/item').then(r => r.json()),
      fetch('/api/gallery').then(r => r.json()),
      fetch('/api/reviews').then(r => r.json()),
      fetch('/api/reservations').then(r => r.json()),
      fetch('/api/contact').then(r => r.json()),
    ]).then(([items, gallery, reviews, reservations, messages]) => {
      setStats({
        menuItems: Array.isArray(items) ? items.length : 0,
        galleryImages: Array.isArray(gallery) ? gallery.length : 0,
        reviews: Array.isArray(reviews) ? reviews.length : 0,
        reservations: Array.isArray(reservations) ? reservations.length : 0,
        messages: Array.isArray(messages) ? messages.length : 0,
      })
      setLoading(false)
    })
  }, [])

  const cards = [
    { label: 'Menu Items', value: stats.menuItems, icon: UtensilsCrossed, href: '/admin/menu', color: 'bg-blue-500/10 text-blue-400' },
    { label: 'Gallery Images', value: stats.galleryImages, icon: ImageIcon, href: '/admin/gallery', color: 'bg-purple-500/10 text-purple-400' },
    { label: 'Reviews', value: stats.reviews, icon: Star, href: '/admin/reviews', color: 'bg-yellow-500/10 text-yellow-400' },
    { label: 'Reservations', value: stats.reservations, icon: CalendarDays, href: '/admin/reservations', color: 'bg-green-500/10 text-green-400' },
    { label: 'Messages', value: stats.messages, icon: MessageSquare, href: '/admin/reservations', color: 'bg-pink-500/10 text-pink-400' },
  ]

  return (
    <div>
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-2xl font-display font-bold text-white mb-1">Dashboard</h1>
        <p className="text-white/40 text-sm mb-8">Overview of your Bar Mubiti website</p>
      </motion.div>

      <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 mb-8">
        {cards.map((card, i) => (
          <motion.div
            key={card.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
          >
            <Link href={card.href} className="glass rounded-2xl p-5 block hover:bg-white/10 transition-colors">
              <div className={`w-10 h-10 rounded-xl ${card.color} flex items-center justify-center mb-3`}>
                <card.icon size={20} />
              </div>
              <p className="text-white/40 text-xs uppercase tracking-wider">{card.label}</p>
              <p className="text-2xl font-bold text-white mt-1">{loading ? '—' : card.value}</p>
            </Link>
          </motion.div>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <motion.div
          className="glass rounded-2xl p-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <h3 className="text-white font-semibold mb-4">Quick Actions</h3>
          <div className="space-y-2">
            {[
              { label: 'Update Business Info', href: '/admin/business', desc: 'Phone, address, social links' },
              { label: 'Manage Menu', href: '/admin/menu', desc: 'Add or edit menu items' },
              { label: 'View Reservations', href: '/admin/reservations', desc: 'Check booking requests' },
              { label: 'Upload Gallery Images', href: '/admin/gallery', desc: 'Showcase your venue' },
            ].map((action) => (
              <Link
                key={action.href}
                href={action.href}
                className="flex items-center justify-between p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-colors"
              >
                <div>
                  <p className="text-white text-sm font-medium">{action.label}</p>
                  <p className="text-white/30 text-xs">{action.desc}</p>
                </div>
                <TrendingUp size={16} className="text-white/20" />
              </Link>
            ))}
          </div>
        </motion.div>

        <motion.div
          className="glass rounded-2xl p-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <h3 className="text-white font-semibold mb-4">Getting Started</h3>
          <div className="space-y-3 text-sm text-white/50">
            <p>1. Update your <Link href="/admin/business" className="text-brand-400 hover:underline">business information</Link> with real details.</p>
            <p>2. Add your <Link href="/admin/menu" className="text-brand-400 hover:underline">menu items</Link> with prices and descriptions.</p>
            <p>3. Upload <Link href="/admin/gallery" className="text-brand-400 hover:underline">gallery images</Link> to showcase your venue.</p>
            <p>4. Manage <Link href="/admin/reservations" className="text-brand-400 hover:underline">reservations</Link> and customer messages.</p>
            <p>5. Update <Link href="/admin/settings" className="text-brand-400 hover:underline">opening hours</Link> and social links.</p>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

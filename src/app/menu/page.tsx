'use client'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Flame, AlertCircle } from 'lucide-react'
import { formatPrice } from '@/lib/utils'

interface MenuCategory {
  id: string
  name: string
  slug: string
  items: MenuItem[]
}

interface MenuItem {
  id: string
  name: string
  description: string | null
  price: number
  image: string | null
  isAvailable: boolean
  isSpecial: boolean
}

export default function MenuPage() {
  const [categories, setCategories] = useState<MenuCategory[]>([])
  const [activeCat, setActiveCat] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/menu/category')
      .then(r => r.json())
      .then((data: MenuCategory[]) => {
        setCategories(data)
        if (data.length > 0) setActiveCat(data[0].slug)
        setLoading(false)
      })
  }, [])

  const activeItems = categories.find(c => c.slug === activeCat)?.items || []

  return (
    <div className="min-h-screen pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <span className="text-brand-400 text-sm font-medium uppercase tracking-widest">Our Menu</span>
          <h1 className="text-4xl sm:text-5xl font-display font-bold text-white mt-3 mb-4">
            Flavors of Kigali
          </h1>
          <p className="text-white/50 max-w-xl mx-auto">
            From flame-grilled specialties to refreshing drinks, every item is crafted with care and local pride.
          </p>
        </motion.div>

        {/* Category tabs */}
        <div className="flex overflow-x-auto gap-2 mb-10 pb-2 scrollbar-hide">
          {categories.map((cat) => (
            <button
              key={cat.slug}
              onClick={() => setActiveCat(cat.slug)}
              className={`px-5 py-2.5 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                activeCat === cat.slug
                  ? 'bg-brand-600 text-white'
                  : 'bg-white/5 text-white/60 hover:bg-white/10 hover:text-white'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="glass rounded-2xl h-48 animate-pulse" />
            ))}
          </div>
        ) : (
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCat}
              className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              {activeItems.map((item, i) => (
                <motion.div
                  key={item.id}
                  className={`glass rounded-2xl overflow-hidden group ${!item.isAvailable ? 'opacity-60' : ''}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: item.isAvailable ? 1 : 0.6, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <div className="aspect-[16/10] bg-gradient-to-br from-brand-900/20 to-dark-900 relative">
                    {item.isSpecial && (
                      <span className="absolute top-3 left-3 bg-brand-600 text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full flex items-center gap-1">
                        <Flame size={10} /> Special
                      </span>
                    )}
                    {!item.isAvailable && (
                      <span className="absolute top-3 right-3 bg-red-500/80 text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full flex items-center gap-1">
                        <AlertCircle size={10} /> Unavailable
                      </span>
                    )}
                  </div>
                  <div className="p-5">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="text-white font-medium">{item.name}</h3>
                      <span className="text-brand-400 font-bold">{formatPrice(item.price)}</span>
                    </div>
                    {item.description && (
                      <p className="text-white/40 text-sm">{item.description}</p>
                    )}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        )}
      </div>
    </div>
  )
}

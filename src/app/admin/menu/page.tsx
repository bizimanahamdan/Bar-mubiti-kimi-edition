'use client'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, Pencil, Trash2, X, Check, Flame, AlertCircle, Loader2 } from 'lucide-react'
import { formatPrice } from '@/lib/utils'

interface Category {
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
  isAvailable: boolean
  isSpecial: boolean
  categoryId: string
}

export default function AdminMenuPage() {
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)
  const [showItemModal, setShowItemModal] = useState(false)
  const [showCatModal, setShowCatModal] = useState(false)
  const [editingItem, setEditingItem] = useState<Partial<MenuItem> | null>(null)
  const [editingCat, setEditingCat] = useState<Partial<Category> | null>(null)
  const [activeCat, setActiveCat] = useState('')

  const fetchData = () => {
    fetch('/api/menu/category')
      .then(r => r.json())
      .then((data: Category[]) => {
        setCategories(data)
        if (data.length > 0 && !activeCat) setActiveCat(data[0].slug)
        setLoading(false)
      })
  }

  useEffect(() => { fetchData() }, [])

  const saveItem = async () => {
    if (!editingItem?.name || !editingItem?.price) return
    const method = editingItem.id ? 'PUT' : 'POST'
    await fetch('/api/menu/item', {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(editingItem),
    })
    setShowItemModal(false)
    setEditingItem(null)
    fetchData()
  }

  const deleteItem = async (id: string) => {
    if (!confirm('Delete this item?')) return
    await fetch(`/api/menu/item?id=${id}`, { method: 'DELETE' })
    fetchData()
  }

  const saveCategory = async () => {
    if (!editingCat?.name) return
    const method = editingCat.id ? 'PUT' : 'POST'
    await fetch('/api/menu/category', {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...editingCat, slug: editingCat.slug || editingCat.name.toLowerCase().replace(/\s+/g, '-') }),
    })
    setShowCatModal(false)
    setEditingCat(null)
    fetchData()
  }

  const deleteCategory = async (id: string) => {
    if (!confirm('Delete this category and all its items?')) return
    await fetch(`/api/menu/category?id=${id}`, { method: 'DELETE' })
    fetchData()
  }

  const activeItems = categories.find(c => c.slug === activeCat)?.items || []

  if (loading) return <div className="glass rounded-2xl h-96 animate-pulse" />

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-display font-bold text-white">Menu Management</h1>
          <p className="text-white/40 text-sm">Manage categories and menu items</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => { setEditingCat({}); setShowCatModal(true) }}
            className="flex items-center gap-2 bg-white/5 hover:bg-white/10 text-white px-4 py-2.5 rounded-xl font-medium text-sm transition-colors"
          >
            <Plus size={16} /> Category
          </button>
          <button
            onClick={() => { setEditingItem({ categoryId: categories.find(c => c.slug === activeCat)?.id || '' }); setShowItemModal(true) }}
            className="flex items-center gap-2 bg-brand-600 hover:bg-brand-500 text-white px-4 py-2.5 rounded-xl font-medium text-sm transition-colors"
          >
            <Plus size={16} /> Item
          </button>
        </div>
      </div>

      <div className="flex overflow-x-auto gap-2 mb-6 pb-2">
        {categories.map((cat) => (
          <div key={cat.slug} className="flex items-center gap-1">
            <button
              onClick={() => setActiveCat(cat.slug)}
              className={`px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-all ${
                activeCat === cat.slug ? 'bg-brand-600 text-white' : 'bg-white/5 text-white/60 hover:bg-white/10'
              }`}
            >
              {cat.name}
            </button>
            <button onClick={() => { setEditingCat(cat); setShowCatModal(true) }} className="text-white/30 hover:text-white/60 p-1">
              <Pencil size={12} />
            </button>
            <button onClick={() => deleteCategory(cat.id)} className="text-white/30 hover:text-red-400 p-1">
              <Trash2 size={12} />
            </button>
          </div>
        ))}
      </div>

      <div className="space-y-3">
        {activeItems.map((item) => (
          <motion.div
            key={item.id}
            className="glass rounded-xl p-4 flex items-center justify-between"
            layout
          >
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-lg bg-brand-600/10 flex items-center justify-center">
                <Flame size={16} className="text-brand-400" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-white font-medium text-sm">{item.name}</span>
                  {item.isSpecial && <span className="text-[10px] bg-brand-600/20 text-brand-400 px-2 py-0.5 rounded-full">Special</span>}
                  {!item.isAvailable && <span className="text-[10px] bg-red-500/20 text-red-400 px-2 py-0.5 rounded-full">Unavailable</span>}
                </div>
                {item.description && <p className="text-white/40 text-xs mt-0.5">{item.description}</p>}
              </div>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-brand-400 font-bold text-sm">{formatPrice(item.price)}</span>
              <div className="flex items-center gap-1">
                <button onClick={() => { setEditingItem(item); setShowItemModal(true) }} className="p-2 text-white/40 hover:text-white rounded-lg hover:bg-white/5 transition-colors">
                  <Pencil size={14} />
                </button>
                <button onClick={() => deleteItem(item.id)} className="p-2 text-white/40 hover:text-red-400 rounded-lg hover:bg-red-500/10 transition-colors">
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
          </motion.div>
        ))}
        {activeItems.length === 0 && (
          <div className="glass rounded-xl p-8 text-center">
            <p className="text-white/30 text-sm">No items in this category yet.</p>
          </div>
        )}
      </div>

      {/* Item Modal */}
      <AnimatePresence>
        {showItemModal && (
          <motion.div
            className="fixed inset-0 z-[60] bg-black/70 flex items-center justify-center p-4"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          >
            <motion.div className="glass rounded-2xl p-6 w-full max-w-md" initial={{ scale: 0.9 }} animate={{ scale: 1 }} exit={{ scale: 0.9 }}>
              <div className="flex items-center justify-between mb-5">
                <h3 className="text-white font-semibold">{editingItem?.id ? 'Edit Item' : 'Add Item'}</h3>
                <button onClick={() => setShowItemModal(false)} className="text-white/40 hover:text-white"><X size={18} /></button>
              </div>
              <div className="space-y-4">
                <input value={editingItem?.name || ''} onChange={e => setEditingItem({ ...editingItem, name: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:border-brand-500 focus:outline-none" placeholder="Item name" />
                <textarea value={editingItem?.description || ''} onChange={e => setEditingItem({ ...editingItem, description: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:border-brand-500 focus:outline-none resize-none" rows={2} placeholder="Description" />
                <div className="grid grid-cols-2 gap-4">
                  <input type="number" value={editingItem?.price || ''} onChange={e => setEditingItem({ ...editingItem, price: Number(e.target.value) })}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:border-brand-500 focus:outline-none" placeholder="Price (RF)" />
                  <select value={editingItem?.categoryId || ''} onChange={e => setEditingItem({ ...editingItem, categoryId: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:border-brand-500 focus:outline-none">
                    {categories.map(c => <option key={c.id} value={c.id} className="bg-dark-900">{c.name}</option>)}
                  </select>
                </div>
                <div className="flex gap-4">
                  <label className="flex items-center gap-2 text-white/60 text-sm cursor-pointer">
                    <input type="checkbox" checked={editingItem?.isAvailable || false} onChange={e => setEditingItem({ ...editingItem, isAvailable: e.target.checked })}
                      className="rounded border-white/20 bg-white/5 text-brand-600" /> Available
                  </label>
                  <label className="flex items-center gap-2 text-white/60 text-sm cursor-pointer">
                    <input type="checkbox" checked={editingItem?.isSpecial || false} onChange={e => setEditingItem({ ...editingItem, isSpecial: e.target.checked })}
                      className="rounded border-white/20 bg-white/5 text-brand-600" /> Special
                  </label>
                </div>
                <button onClick={saveItem} className="w-full bg-brand-600 hover:bg-brand-500 text-white py-3 rounded-xl font-medium transition-colors">
                  {editingItem?.id ? 'Update Item' : 'Add Item'}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Category Modal */}
      <AnimatePresence>
        {showCatModal && (
          <motion.div
            className="fixed inset-0 z-[60] bg-black/70 flex items-center justify-center p-4"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          >
            <motion.div className="glass rounded-2xl p-6 w-full max-w-sm" initial={{ scale: 0.9 }} animate={{ scale: 1 }} exit={{ scale: 0.9 }}>
              <div className="flex items-center justify-between mb-5">
                <h3 className="text-white font-semibold">{editingCat?.id ? 'Edit Category' : 'Add Category'}</h3>
                <button onClick={() => setShowCatModal(false)} className="text-white/40 hover:text-white"><X size={18} /></button>
              </div>
              <div className="space-y-4">
                <input value={editingCat?.name || ''} onChange={e => setEditingCat({ ...editingCat, name: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:border-brand-500 focus:outline-none" placeholder="Category name" />
                <button onClick={saveCategory} className="w-full bg-brand-600 hover:bg-brand-500 text-white py-3 rounded-xl font-medium transition-colors">
                  {editingCat?.id ? 'Update' : 'Add'} Category
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

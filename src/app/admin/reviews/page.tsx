'use client'
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Star, Trash2, Eye, EyeOff, Plus, X } from 'lucide-react'

interface Review {
  id: string
  name: string
  rating: number
  text: string
  date: string
  isVisible: boolean
  source: string
}

export default function AdminReviewsPage() {
  const [reviews, setReviews] = useState<Review[]>([])
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [form, setForm] = useState({ name: '', rating: 5, text: '' })

  const fetchReviews = () => {
    fetch('/api/reviews')
      .then(r => r.json())
      .then((data: Review[]) => { setReviews(data); setLoading(false) })
  }

  useEffect(() => { fetchReviews() }, [])

  const toggleVisibility = async (review: Review) => {
    await fetch('/api/reviews', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...review, isVisible: !review.isVisible }),
    })
    fetchReviews()
  }

  const deleteReview = async (id: string) => {
    if (!confirm('Delete this review?')) return
    await fetch(`/api/reviews?id=${id}`, { method: 'DELETE' })
    fetchReviews()
  }

  const addReview = async () => {
    await fetch('/api/reviews', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...form, isVisible: true, source: 'website' }),
    })
    setShowModal(false)
    setForm({ name: '', rating: 5, text: '' })
    fetchReviews()
  }

  if (loading) return <div className="glass rounded-2xl h-96 animate-pulse" />

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-display font-bold text-white">Reviews</h1>
          <p className="text-white/40 text-sm">Manage customer testimonials</p>
        </div>
        <button onClick={() => setShowModal(true)} className="flex items-center gap-2 bg-brand-600 hover:bg-brand-500 text-white px-4 py-2.5 rounded-xl font-medium text-sm transition-colors">
          <Plus size={16} /> Add Review
        </button>
      </div>

      <div className="space-y-3">
        {reviews.map((review) => (
          <motion.div
            key={review.id}
            className="glass rounded-xl p-4 flex items-start justify-between gap-4"
            layout
          >
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-white font-medium text-sm">{review.name}</span>
                <div className="flex items-center gap-0.5">
                  {[1,2,3,4,5].map(s => (
                    <Star key={s} size={12} className={s <= review.rating ? 'text-yellow-500 fill-yellow-500' : 'text-white/20'} />
                  ))}
                </div>
                <span className="text-white/20 text-xs">{new Date(review.date).toLocaleDateString()}</span>
              </div>
              <p className="text-white/50 text-sm truncate">"{review.text}"</p>
            </div>
            <div className="flex items-center gap-1 shrink-0">
              <button onClick={() => toggleVisibility(review)} className="p-2 text-white/40 hover:text-white rounded-lg hover:bg-white/5 transition-colors" title={review.isVisible ? 'Hide' : 'Show'}>
                {review.isVisible ? <Eye size={14} /> : <EyeOff size={14} />}
              </button>
              <button onClick={() => deleteReview(review.id)} className="p-2 text-white/40 hover:text-red-400 rounded-lg hover:bg-red-500/10 transition-colors">
                <Trash2 size={14} />
              </button>
            </div>
          </motion.div>
        ))}
        {reviews.length === 0 && (
          <div className="glass rounded-xl p-8 text-center">
            <p className="text-white/30 text-sm">No reviews yet.</p>
          </div>
        )}
      </div>

      {showModal && (
        <div className="fixed inset-0 z-[60] bg-black/70 flex items-center justify-center p-4">
          <motion.div className="glass rounded-2xl p-6 w-full max-w-md" initial={{ scale: 0.9 }} animate={{ scale: 1 }}>
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-white font-semibold">Add Review</h3>
              <button onClick={() => setShowModal(false)} className="text-white/40 hover:text-white"><X size={18} /></button>
            </div>
            <div className="space-y-4">
              <input value={form.name} onChange={e => setForm({ ...form, name: e.target.value })}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:border-brand-500 focus:outline-none" placeholder="Reviewer name" />
              <div>
                <label className="block text-white/60 text-xs uppercase tracking-wider mb-1.5">Rating</label>
                <div className="flex gap-1">
                  {[1,2,3,4,5].map(s => (
                    <button key={s} onClick={() => setForm({ ...form, rating: s })} className="p-1">
                      <Star size={20} className={s <= form.rating ? 'text-yellow-500 fill-yellow-500' : 'text-white/20'} />
                    </button>
                  ))}
                </div>
              </div>
              <textarea value={form.text} onChange={e => setForm({ ...form, text: e.target.value })}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:border-brand-500 focus:outline-none resize-none" rows={3} placeholder="Review text" />
              <button onClick={addReview} className="w-full bg-brand-600 hover:bg-brand-500 text-white py-3 rounded-xl font-medium transition-colors">Add Review</button>
            </div>
          </motion.div>
        </div>
      )}
    </motion.div>
  )
}

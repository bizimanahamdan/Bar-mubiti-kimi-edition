'use client'
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Star, Quote } from 'lucide-react'

interface Review {
  id: string
  name: string
  rating: number
  text: string
  date: string
  source: string
}

export default function ReviewsPage() {
  const [reviews, setReviews] = useState<Review[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/reviews')
      .then(r => r.json())
      .then((data: Review[]) => {
        setReviews(data)
        setLoading(false)
      })
  }, [])

  const avgRating = reviews.length > 0
    ? (reviews.reduce((s, r) => s + r.rating, 0) / reviews.length).toFixed(1)
    : '0.0'

  return (
    <div className="min-h-screen pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <span className="text-brand-400 text-sm font-medium uppercase tracking-widest">Testimonials</span>
          <h1 className="text-4xl sm:text-5xl font-display font-bold text-white mt-3 mb-4">
            What People Say
          </h1>
          <p className="text-white/50 max-w-xl mx-auto">
            Real reviews from real guests. See why Bar Mubiti is a favorite in Kigali.
          </p>
        </motion.div>

        {/* Rating summary */}
        <motion.div
          className="glass rounded-2xl p-8 mb-12 text-center max-w-md mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="text-5xl font-display font-bold text-white mb-2">{avgRating}</div>
          <div className="flex items-center justify-center gap-1 mb-2">
            {[1,2,3,4,5].map((s) => (
              <Star key={s} size={20} className={s <= Math.round(Number(avgRating)) ? 'text-yellow-500 fill-yellow-500' : 'text-white/20'} />
            ))}
          </div>
          <p className="text-white/40 text-sm">Based on {reviews.length} Google reviews</p>
        </motion.div>

        {loading ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="glass rounded-2xl h-48 animate-pulse" />
            ))}
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {reviews.map((review, i) => (
              <motion.div
                key={review.id}
                className="glass rounded-2xl p-6 relative"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
              >
                <Quote size={24} className="text-brand-500/20 absolute top-4 right-4" />
                <div className="flex items-center gap-1 mb-3">
                  {[1,2,3,4,5].map((s) => (
                    <Star key={s} size={14} className={s <= review.rating ? 'text-yellow-500 fill-yellow-500' : 'text-white/20'} />
                  ))}
                </div>
                <p className="text-white/70 text-sm leading-relaxed mb-4">"{review.text}"</p>
                <div className="flex items-center justify-between">
                  <span className="text-white font-medium text-sm">{review.name}</span>
                  <span className="text-white/30 text-xs">{new Date(review.date).toLocaleDateString()}</span>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

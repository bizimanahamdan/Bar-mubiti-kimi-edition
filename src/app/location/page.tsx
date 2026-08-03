'use client'
import { motion } from 'framer-motion'
import { MapPin, Phone, Clock, Navigation } from 'lucide-react'

export default function LocationPage() {
  return (
    <div className="min-h-screen pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <span className="text-brand-400 text-sm font-medium uppercase tracking-widest">Find Us</span>
          <h1 className="text-4xl sm:text-5xl font-display font-bold text-white mt-3 mb-4">
            Visit Bar Mubiti
          </h1>
          <p className="text-white/50 max-w-xl mx-auto">
            We're located in the heart of Kigali, easy to find and always welcoming.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-10">
          {/* Map placeholder */}
          <motion.div
            className="rounded-2xl overflow-hidden border border-white/5 bg-dark-900 aspect-[4/3] lg:aspect-auto lg:h-full min-h-[300px] flex items-center justify-center relative"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="text-center">
              <MapPin size={48} className="text-brand-500/30 mx-auto mb-3" />
              <p className="text-white/30 text-sm mb-1">2332+M8F, Kigali</p>
              <p className="text-white/20 text-xs">Embed Google Maps here</p>
            </div>
            <a
              href="https://www.google.com/maps/search/?api=1&query=2332%2BM8F+Kigali"
              target="_blank"
              rel="noopener noreferrer"
              className="absolute bottom-4 left-4 right-4 bg-brand-600 hover:bg-brand-500 text-white py-3 rounded-xl font-medium text-center transition-colors flex items-center justify-center gap-2"
            >
              <Navigation size={16} /> Open in Google Maps
            </a>
          </motion.div>

          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="glass rounded-2xl p-6">
              <h3 className="text-lg font-semibold text-white mb-4">Address</h3>
              <div className="flex items-start gap-3 text-white/60">
                <MapPin size={18} className="text-brand-400 mt-0.5 shrink-0" />
                <div>
                  <p>2332+M8F, Kigali</p>
                  <p className="text-white/40 text-sm mt-1">Rwanda</p>
                </div>
              </div>
            </div>

            <div className="glass rounded-2xl p-6">
              <h3 className="text-lg font-semibold text-white mb-4">Contact</h3>
              <div className="space-y-3">
                <a href="tel:0788582914" className="flex items-center gap-3 text-white/60 hover:text-brand-400 transition-colors">
                  <Phone size={18} className="text-brand-400 shrink-0" />
                  <span>0788 582 914</span>
                </a>
                <a href="mailto:info@barmubiti.com" className="flex items-center gap-3 text-white/60 hover:text-brand-400 transition-colors">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-brand-400 shrink-0"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                  <span>info@barmubiti.com</span>
                </a>
              </div>
            </div>

            <div className="glass rounded-2xl p-6">
              <h3 className="text-lg font-semibold text-white mb-4">Opening Hours</h3>
              <div className="space-y-2 text-sm">
                {[
                  { day: 'Monday – Thursday', hours: '11:00 AM – 12:00 AM' },
                  { day: 'Friday – Saturday', hours: '11:00 AM – 2:00 AM' },
                  { day: 'Sunday', hours: '12:00 PM – 11:00 PM' },
                ].map((h) => (
                  <div key={h.day} className="flex justify-between text-white/60">
                    <span>{h.day}</span>
                    <span className="text-white/80">{h.hours}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="glass rounded-2xl p-6">
              <h3 className="text-lg font-semibold text-white mb-4">Get Directions</h3>
              <p className="text-white/50 text-sm mb-4">
                Bar Mubiti is approximately 3 minutes from central Kigali. We're open now and ready to welcome you.
              </p>
              <a
                href="https://www.google.com/maps/dir/?api=1&destination=2332%2BM8F+Kigali"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-brand-600 hover:bg-brand-500 text-white py-3 rounded-xl font-medium text-center transition-colors block"
              >
                Get Directions
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

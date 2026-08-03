'use client'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { Phone, Mail, MapPin, Clock, Send, CheckCircle, Loader2 } from 'lucide-react'

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', subject: '', message: '' })
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (res.ok) {
        setStatus('success')
        setForm({ name: '', email: '', phone: '', subject: '', message: '' })
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  return (
    <div className="min-h-screen pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <span className="text-brand-400 text-sm font-medium uppercase tracking-widest">Get in Touch</span>
          <h1 className="text-4xl sm:text-5xl font-display font-bold text-white mt-3 mb-4">
            Contact Us
          </h1>
          <p className="text-white/50 max-w-xl mx-auto">
            Have a question or want to make a reservation? We'd love to hear from you.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-10">
          {/* Contact Info */}
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="glass rounded-2xl p-6">
              <h3 className="text-lg font-semibold text-white mb-4">Contact Information</h3>
              <div className="space-y-4">
                <a href="tel:0788582914" className="flex items-center gap-3 text-white/60 hover:text-brand-400 transition-colors">
                  <Phone size={18} className="text-brand-400 shrink-0" />
                  <span>0788 582 914</span>
                </a>
                <a href="https://wa.me/250788582914" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-white/60 hover:text-brand-400 transition-colors">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" className="text-brand-400 shrink-0"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                  <span>WhatsApp: 0788 582 914</span>
                </a>
                <a href="mailto:info@barmubiti.com" className="flex items-center gap-3 text-white/60 hover:text-brand-400 transition-colors">
                  <Mail size={18} className="text-brand-400 shrink-0" />
                  <span>info@barmubiti.com</span>
                </a>
                <div className="flex items-start gap-3 text-white/60">
                  <MapPin size={18} className="text-brand-400 mt-0.5 shrink-0" />
                  <span>2332+M8F, Kigali, Rwanda</span>
                </div>
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
                    <span className="flex items-center gap-2"><Clock size={14} className="text-brand-400" /> {h.day}</span>
                    <span className="text-white/80">{h.hours}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="glass rounded-2xl p-6 sm:p-8">
              <h3 className="text-lg font-semibold text-white mb-6">Send a Message</h3>
              {status === 'success' ? (
                <motion.div
                  className="text-center py-12"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                >
                  <CheckCircle size={48} className="text-green-500 mx-auto mb-4" />
                  <h4 className="text-white font-semibold text-lg mb-2">Message Sent!</h4>
                  <p className="text-white/50 text-sm mb-4">We'll get back to you as soon as possible.</p>
                  <button
                    onClick={() => setStatus('idle')}
                    className="text-brand-400 hover:text-brand-300 text-sm font-medium"
                  >
                    Send another message
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-white/60 text-xs uppercase tracking-wider mb-1.5">Name</label>
                      <input
                        type="text"
                        required
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:border-brand-500 focus:outline-none transition-colors"
                        placeholder="Your name"
                      />
                    </div>
                    <div>
                      <label className="block text-white/60 text-xs uppercase tracking-wider mb-1.5">Email</label>
                      <input
                        type="email"
                        required
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:border-brand-500 focus:outline-none transition-colors"
                        placeholder="your@email.com"
                      />
                    </div>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-white/60 text-xs uppercase tracking-wider mb-1.5">Phone</label>
                      <input
                        type="tel"
                        value={form.phone}
                        onChange={(e) => setForm({ ...form, phone: e.target.value })}
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:border-brand-500 focus:outline-none transition-colors"
                        placeholder="07XX XXX XXX"
                      />
                    </div>
                    <div>
                      <label className="block text-white/60 text-xs uppercase tracking-wider mb-1.5">Subject</label>
                      <select
                        required
                        value={form.subject}
                        onChange={(e) => setForm({ ...form, subject: e.target.value })}
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:border-brand-500 focus:outline-none transition-colors"
                      >
                        <option value="" className="bg-dark-900">Select subject</option>
                        <option value="reservation" className="bg-dark-900">Reservation</option>
                        <option value="inquiry" className="bg-dark-900">General Inquiry</option>
                        <option value="feedback" className="bg-dark-900">Feedback</option>
                        <option value="event" className="bg-dark-900">Private Event</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="block text-white/60 text-xs uppercase tracking-wider mb-1.5">Message</label>
                    <textarea
                      required
                      rows={4}
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:border-brand-500 focus:outline-none transition-colors resize-none"
                      placeholder="How can we help you?"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={status === 'loading'}
                    className="w-full bg-brand-600 hover:bg-brand-500 disabled:bg-brand-600/50 text-white py-3.5 rounded-xl font-medium transition-colors flex items-center justify-center gap-2"
                  >
                    {status === 'loading' ? <Loader2 size={18} className="animate-spin" /> : <Send size={18} />}
                    {status === 'loading' ? 'Sending...' : 'Send Message'}
                  </button>
                  {status === 'error' && (
                    <p className="text-red-400 text-sm text-center">Something went wrong. Please try again.</p>
                  )}
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

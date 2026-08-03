'use client'
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { CheckCircle, XCircle, Trash2, Clock, Mail, Phone, Users, Calendar } from 'lucide-react'
import { formatDate } from '@/lib/utils'

interface Reservation {
  id: string
  name: string
  email: string
  phone: string
  date: string
  time: string
  guests: number
  message: string | null
  status: string
  createdAt: string
}

interface ContactMessage {
  id: string
  name: string
  email: string
  phone: string | null
  subject: string
  message: string
  status: string
  createdAt: string
}

export default function AdminReservationsPage() {
  const [reservations, setReservations] = useState<Reservation[]>([])
  const [messages, setMessages] = useState<ContactMessage[]>([])
  const [tab, setTab] = useState<'reservations' | 'messages'>('reservations')
  const [loading, setLoading] = useState(true)

  const fetchData = () => {
    Promise.all([
      fetch('/api/reservations').then(r => r.json()),
      fetch('/api/contact').then(r => r.json()),
    ]).then(([res, msgs]) => {
      setReservations(Array.isArray(res) ? res : [])
      setMessages(Array.isArray(msgs) ? msgs : [])
      setLoading(false)
    })
  }

  useEffect(() => { fetchData() }, [])

  const updateReservation = async (id: string, status: string) => {
    await fetch('/api/reservations', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, status }),
    })
    fetchData()
  }

  const deleteReservation = async (id: string) => {
    if (!confirm('Delete this reservation?')) return
    await fetch(`/api/reservations?id=${id}`, { method: 'DELETE' })
    fetchData()
  }

  const updateMessageStatus = async (id: string, status: string) => {
    await fetch('/api/contact', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, status }),
    })
    fetchData()
  }

  const deleteMessage = async (id: string) => {
    if (!confirm('Delete this message?')) return
    await fetch(`/api/contact?id=${id}`, { method: 'DELETE' })
    fetchData()
  }

  const statusBadge = (status: string) => {
    const map: Record<string, string> = {
      pending: 'bg-yellow-500/10 text-yellow-400',
      confirmed: 'bg-green-500/10 text-green-400',
      cancelled: 'bg-red-500/10 text-red-400',
      unread: 'bg-yellow-500/10 text-yellow-400',
      read: 'bg-blue-500/10 text-blue-400',
    }
    return <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-full ${map[status] || 'bg-white/5 text-white/40'}`}>{status}</span>
  }

  if (loading) return <div className="glass rounded-2xl h-96 animate-pulse" />

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-display font-bold text-white">Inbox</h1>
          <p className="text-white/40 text-sm">Reservations and contact messages</p>
        </div>
        <div className="flex bg-white/5 rounded-xl p-1">
          <button onClick={() => setTab('reservations')} className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${tab === 'reservations' ? 'bg-brand-600 text-white' : 'text-white/50 hover:text-white'}`}>
            Reservations ({reservations.length})
          </button>
          <button onClick={() => setTab('messages')} className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${tab === 'messages' ? 'bg-brand-600 text-white' : 'text-white/50 hover:text-white'}`}>
            Messages ({messages.length})
          </button>
        </div>
      </div>

      {tab === 'reservations' ? (
        <div className="space-y-3">
          {reservations.map((res) => (
            <motion.div key={res.id} className="glass rounded-xl p-5" layout>
              <div className="flex items-start justify-between gap-4 mb-3">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-white font-medium">{res.name}</span>
                    {statusBadge(res.status)}
                  </div>
                  <div className="flex flex-wrap gap-3 text-white/40 text-xs">
                    <span className="flex items-center gap-1"><Calendar size={12} /> {res.date}</span>
                    <span className="flex items-center gap-1"><Clock size={12} /> {res.time}</span>
                    <span className="flex items-center gap-1"><Users size={12} /> {res.guests} guests</span>
                    <span className="flex items-center gap-1"><Phone size={12} /> {res.phone}</span>
                    <span className="flex items-center gap-1"><Mail size={12} /> {res.email}</span>
                  </div>
                </div>
                <div className="flex items-center gap-1 shrink-0">
                  {res.status === 'pending' && (
                    <button onClick={() => updateReservation(res.id, 'confirmed')} className="p-2 text-green-400 hover:bg-green-500/10 rounded-lg transition-colors" title="Confirm">
                      <CheckCircle size={16} />
                    </button>
                  )}
                  {res.status !== 'cancelled' && (
                    <button onClick={() => updateReservation(res.id, 'cancelled')} className="p-2 text-red-400 hover:bg-red-500/10 rounded-lg transition-colors" title="Cancel">
                      <XCircle size={16} />
                    </button>
                  )}
                  <button onClick={() => deleteReservation(res.id)} className="p-2 text-white/40 hover:text-red-400 rounded-lg hover:bg-red-500/10 transition-colors">
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
              {res.message && <p className="text-white/30 text-xs bg-white/5 rounded-lg p-3">{res.message}</p>}
            </motion.div>
          ))}
          {reservations.length === 0 && (
            <div className="glass rounded-xl p-8 text-center">
              <p className="text-white/30 text-sm">No reservations yet.</p>
            </div>
          )}
        </div>
      ) : (
        <div className="space-y-3">
          {messages.map((msg) => (
            <motion.div key={msg.id} className="glass rounded-xl p-5" layout>
              <div className="flex items-start justify-between gap-4 mb-2">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-white font-medium text-sm">{msg.name}</span>
                    {statusBadge(msg.status)}
                    <span className="text-white/20 text-xs">{msg.subject}</span>
                  </div>
                  <div className="flex gap-3 text-white/40 text-xs mb-2">
                    <span>{msg.email}</span>
                    {msg.phone && <span>{msg.phone}</span>}
                    <span>{formatDate(msg.createdAt)}</span>
                  </div>
                  <p className="text-white/50 text-sm">{msg.message}</p>
                </div>
                <div className="flex items-center gap-1 shrink-0">
                  {msg.status === 'unread' && (
                    <button onClick={() => updateMessageStatus(msg.id, 'read')} className="p-2 text-blue-400 hover:bg-blue-500/10 rounded-lg transition-colors" title="Mark read">
                      <CheckCircle size={16} />
                    </button>
                  )}
                  <button onClick={() => deleteMessage(msg.id)} className="p-2 text-white/40 hover:text-red-400 rounded-lg hover:bg-red-500/10 transition-colors">
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
          {messages.length === 0 && (
            <div className="glass rounded-xl p-8 text-center">
              <p className="text-white/30 text-sm">No messages yet.</p>
            </div>
          )}
        </div>
      )}
    </motion.div>
  )
}

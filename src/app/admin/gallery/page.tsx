'use client'
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Plus, Trash2, ImageIcon, Loader2 } from 'lucide-react'

interface GalleryImage {
  id: string
  src: string
  alt: string
  category: string
}

export default function AdminGalleryPage() {
  const [images, setImages] = useState<GalleryImage[]>([])
  const [loading, setLoading] = useState(true)
  const [uploading, setUploading] = useState(false)
  const [alt, setAlt] = useState('')

  const fetchImages = () => {
    fetch('/api/gallery')
      .then(r => r.json())
      .then((data: GalleryImage[]) => { setImages(data); setLoading(false) })
  }

  useEffect(() => { fetchImages() }, [])

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    setUploading(true)
    const formData = new FormData()
    formData.append('file', file)
    const uploadRes = await fetch('/api/upload', { method: 'POST', body: formData })
    const uploadData = await uploadRes.json()
    if (uploadData.url) {
      await fetch('/api/gallery', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ src: uploadData.url, alt: alt || file.name, category: 'general', order: images.length }),
      })
      setAlt('')
      fetchImages()
    }
    setUploading(false)
  }

  const deleteImage = async (id: string) => {
    if (!confirm('Delete this image?')) return
    await fetch(`/api/gallery?id=${id}`, { method: 'DELETE' })
    fetchImages()
  }

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-display font-bold text-white">Gallery</h1>
          <p className="text-white/40 text-sm">Manage website gallery images</p>
        </div>
        <label className="flex items-center gap-2 bg-brand-600 hover:bg-brand-500 text-white px-4 py-2.5 rounded-xl font-medium text-sm transition-colors cursor-pointer">
          {uploading ? <Loader2 size={16} className="animate-spin" /> : <Plus size={16} />}
          {uploading ? 'Uploading...' : 'Upload Image'}
          <input type="file" accept="image/*" className="hidden" onChange={handleUpload} />
        </label>
      </div>

      <div className="mb-4">
        <input
          value={alt}
          onChange={e => setAlt(e.target.value)}
          className="w-full sm:w-80 bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm focus:border-brand-500 focus:outline-none"
          placeholder="Image description (optional)"
        />
      </div>

      {loading ? (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[...Array(8)].map((_, i) => <div key={i} className="aspect-square glass rounded-xl animate-pulse" />)}
        </div>
      ) : images.length === 0 ? (
        <div className="glass rounded-2xl p-12 text-center">
          <ImageIcon size={48} className="text-white/10 mx-auto mb-4" />
          <p className="text-white/30 text-sm">No images yet. Upload your first gallery image.</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {images.map((img, i) => (
            <motion.div
              key={img.id}
              className="group relative aspect-square rounded-xl overflow-hidden border border-white/5 bg-dark-900"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.03 }}
            >
              {img.src ? (
                <img src={img.src} alt={img.alt} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <span className="text-white/20 text-xs">{img.alt}</span>
                </div>
              )}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                <button onClick={() => deleteImage(img.id)} className="p-2 bg-red-500/80 rounded-lg text-white hover:bg-red-500 transition-colors">
                  <Trash2 size={16} />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </motion.div>
  )
}

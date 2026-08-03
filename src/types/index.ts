export interface BusinessInfo {
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

export interface OpeningHour {
  id: string
  day: string
  openTime: string
  closeTime: string
  isOpen: boolean
  order: number
}

export interface MenuCategory {
  id: string
  name: string
  slug: string
  order: number
  items: MenuItem[]
}

export interface MenuItem {
  id: string
  name: string
  description: string | null
  price: number
  image: string | null
  isAvailable: boolean
  isSpecial: boolean
  categoryId: string
}

export interface GalleryImage {
  id: string
  src: string
  alt: string
  category: string
  order: number
}

export interface Review {
  id: string
  name: string
  rating: number
  text: string
  date: string
  isVisible: boolean
  source: string
}

export interface Reservation {
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

export interface ContactMessage {
  id: string
  name: string
  email: string
  phone: string | null
  subject: string
  message: string
  status: string
  createdAt: string
}

export interface SpecialOffer {
  id: string
  title: string
  description: string
  discount: string | null
  validFrom: string | null
  validUntil: string | null
  isActive: boolean
  image: string | null
}

import Link from 'next/link'
import { Phone, MapPin, Mail, Clock, Instagram, Facebook, Twitter } from 'lucide-react'

export function Footer() {
  return (
    <footer className="bg-dark-950 border-t border-white/5 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          <div>
            <h3 className="text-2xl font-display font-bold text-brand-400 mb-4">Bar Mubiti</h3>
            <p className="text-white/60 text-sm leading-relaxed mb-4">
              A Taste of Kigali's Grill Scene. Authentic Rwandan flavors, grilled to perfection, in a vibrant atmosphere.
            </p>
            <div className="flex gap-3">
              <a href="#" className="w-9 h-9 rounded-full bg-white/5 flex items-center justify-center text-white/60 hover:bg-brand-600 hover:text-white transition-all">
                <Instagram size={16} />
              </a>
              <a href="#" className="w-9 h-9 rounded-full bg-white/5 flex items-center justify-center text-white/60 hover:bg-brand-600 hover:text-white transition-all">
                <Facebook size={16} />
              </a>
              <a href="#" className="w-9 h-9 rounded-full bg-white/5 flex items-center justify-center text-white/60 hover:bg-brand-600 hover:text-white transition-all">
                <Twitter size={16} />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-white mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {['Home','About','Menu','Gallery','Contact'].map((item) => (
                <li key={item}>
                  <Link href={`/${item.toLowerCase() === 'home' ? '' : item.toLowerCase()}`} className="text-white/60 hover:text-brand-400 text-sm transition-colors">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-white mb-4">Contact</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-3 text-white/60 text-sm">
                <MapPin size={16} className="mt-0.5 text-brand-400 shrink-0" />
                <span>2332+M8F, Kigali, Rwanda</span>
              </li>
              <li className="flex items-center gap-3 text-white/60 text-sm">
                <Phone size={16} className="text-brand-400 shrink-0" />
                <a href="tel:0788582914" className="hover:text-brand-400 transition-colors">0788 582 914</a>
              </li>
              <li className="flex items-center gap-3 text-white/60 text-sm">
                <Mail size={16} className="text-brand-400 shrink-0" />
                <a href="mailto:info@barmubiti.com" className="hover:text-brand-400 transition-colors">info@barmubiti.com</a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-white mb-4">Hours</h4>
            <ul className="space-y-2 text-white/60 text-sm">
              <li className="flex justify-between"><span>Mon – Thu</span><span>11am – 12am</span></li>
              <li className="flex justify-between"><span>Fri – Sat</span><span>11am – 2am</span></li>
              <li className="flex justify-between"><span>Sunday</span><span>12pm – 11pm</span></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/5 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-white/40 text-xs">&copy; {new Date().getFullYear()} Bar Mubiti. All rights reserved.</p>
          <a href="/admin/login" className="text-white/30 text-xs hover:text-white/60 transition-colors">Admin</a>
        </div>
      </div>
    </footer>
  )
}

'use client'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { Phone, MapPin, Clock, Star, ChevronRight, Flame, UtensilsCrossed, Wine } from 'lucide-react'

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* HERO */}
      <section className="relative min-h-[100dvh] flex items-center justify-center overflow-hidden">
        {/* Animated background layers */}
        <div className="absolute inset-0 bg-dark-950">
          <div className="absolute inset-0 bg-gradient-to-b from-brand-950/30 via-dark-950 to-dark-950" />
          <div className="absolute top-0 left-0 right-0 h-[60vh] bg-gradient-to-b from-brand-900/20 to-transparent" />
          {/* Animated ember particles */}
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 rounded-full bg-brand-400"
              style={{
                left: `${Math.random() * 100}%`,
                bottom: `${Math.random() * 40}%`,
              }}
              animate={{
                y: [0, -200 - Math.random() * 300],
                opacity: [0, 1, 0],
                scale: [0.5, 1.5, 0],
              }}
              transition={{
                duration: 3 + Math.random() * 4,
                repeat: Infinity,
                delay: Math.random() * 5,
                ease: 'easeOut',
              }}
            />
          ))}
          {/* Glowing orbs */}
          <motion.div
            className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-brand-600/10 blur-[120px]"
            animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
            transition={{ duration: 8, repeat: Infinity }}
          />
          <motion.div
            className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-orange-600/10 blur-[100px]"
            animate={{ scale: [1.2, 1, 1.2], opacity: [0.2, 0.4, 0.2] }}
            transition={{ duration: 10, repeat: Infinity }}
          />
        </div>

        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 bg-brand-600/20 border border-brand-500/30 rounded-full px-4 py-1.5 mb-6">
              <Flame size={14} className="text-brand-400" />
              <span className="text-brand-300 text-xs font-medium uppercase tracking-widest">Kigali's Grill Scene</span>
            </div>
          </motion.div>

          <motion.h1
            className="text-5xl sm:text-7xl md:text-8xl font-display font-bold text-white mb-6 leading-[1.1]"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Bar <span className="text-gradient">Mubiti</span>
          </motion.h1>

          <motion.p
            className="text-lg sm:text-xl text-white/60 mb-4 font-light max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            A Taste of Kigali's Grill Scene
          </motion.p>

          <motion.p
            className="text-sm text-white/40 mb-10 max-w-lg mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            Authentic Rwandan flavors, grilled to perfection. Where good vibes, soft lights, and even better company come together.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
          >
            <Link
              href="/menu"
              className="w-full sm:w-auto bg-brand-600 hover:bg-brand-500 text-white px-8 py-4 rounded-full font-medium transition-all hover:scale-105 text-center"
            >
              View Menu
            </Link>
            <a
              href="tel:0788582914"
              className="w-full sm:w-auto flex items-center justify-center gap-2 border border-white/20 hover:border-brand-400 text-white px-8 py-4 rounded-full font-medium transition-all hover:bg-white/5 text-center"
            >
              <Phone size={18} /> Call to Reserve
            </a>
          </motion.div>

          <motion.div
            className="mt-12 flex items-center justify-center gap-6 text-white/40 text-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
          >
            <span className="flex items-center gap-1.5"><Star size={14} className="text-yellow-500" /> 3.7 (111 reviews)</span>
            <span className="w-1 h-1 rounded-full bg-white/20" />
            <span>RF 1 – 15,000</span>
            <span className="w-1 h-1 rounded-full bg-white/20" />
            <span className="flex items-center gap-1.5 text-green-400"><span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" /> Open Now</span>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="w-6 h-10 rounded-full border-2 border-white/20 flex items-start justify-center p-1.5">
            <div className="w-1 h-2 rounded-full bg-white/40" />
          </div>
        </motion.div>
      </section>

      {/* QUICK INFO STRIP */}
      <section className="py-8 border-y border-white/5 bg-dark-950/80 backdrop-blur">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              { icon: MapPin, label: 'Location', value: '2332+M8F, Kigali' },
              { icon: Phone, label: 'Phone', value: '0788 582 914' },
              { icon: Clock, label: 'Hours', value: 'Open until 12am' },
            ].map((item) => (
              <div key={item.label} className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-brand-600/10 flex items-center justify-center">
                  <item.icon size={20} className="text-brand-400" />
                </div>
                <div>
                  <p className="text-white/40 text-xs uppercase tracking-wider">{item.label}</p>
                  <p className="text-white font-medium">{item.value}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ABOUT PREVIEW */}
      <section className="py-20 sm:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <span className="text-brand-400 text-sm font-medium uppercase tracking-widest">Our Story</span>
              <h2 className="text-3xl sm:text-4xl font-display font-bold text-white mt-3 mb-6">
                The Heart of Kigali's Nightlife
              </h2>
              <p className="text-white/60 leading-relaxed mb-6">
                Nestled in the vibrant city of Kigali, Bar Mubiti is a must-visit destination for those seeking a unique blend of local flavors and lively atmosphere. From sizzling grills to crafted cocktails, every visit promises an unforgettable experience.
              </p>
              <p className="text-white/60 leading-relaxed mb-8">
                Whether you're gathering with friends for a weekend feast or enjoying a quiet evening of grilled specialties, Bar Mubiti delivers warmth, flavor, and the unmistakable energy of Kigali.
              </p>
              <Link href="/about" className="inline-flex items-center gap-2 text-brand-400 hover:text-brand-300 font-medium transition-colors">
                Discover More <ChevronRight size={18} />
              </Link>
            </motion.div>
            <motion.div
              className="relative"
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              <div className="aspect-[4/3] rounded-2xl bg-gradient-to-br from-brand-900/40 to-dark-900 border border-white/5 overflow-hidden relative">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <Flame size={64} className="text-brand-500/30 mx-auto mb-4" />
                    <p className="text-white/20 text-sm">Grill & Bar Experience</p>
                  </div>
                </div>
                <div className="absolute bottom-4 left-4 right-4 glass rounded-xl p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-white font-medium text-sm">Grill Specials</p>
                      <p className="text-white/40 text-xs">Served fresh daily</p>
                    </div>
                    <span className="text-brand-400 font-bold">RF 8,000+</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* HIGHLIGHTS */}
      <section className="py-20 bg-dark-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-14">
            <span className="text-brand-400 text-sm font-medium uppercase tracking-widest">Why Visit</span>
            <h2 className="text-3xl sm:text-4xl font-display font-bold text-white mt-3">The Mubiti Experience</h2>
          </div>
          <div className="grid sm:grid-cols-3 gap-8">
            {[
              { icon: Flame, title: 'Grilled to Perfection', desc: 'Premium meats and fresh ingredients, flame-grilled with Rwandan spice blends.' },
              { icon: Wine, title: 'Crafted Drinks', desc: 'Signature cocktails, local beers, and refreshing juices to complement your meal.' },
              { icon: UtensilsCrossed, title: 'Vibrant Atmosphere', desc: 'Lively evenings, great music, and the best company in Kigali.' },
            ].map((item, i) => (
              <motion.div
                key={item.title}
                className="glass rounded-2xl p-8 text-center hover:bg-white/10 transition-all duration-300"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
              >
                <div className="w-16 h-16 rounded-2xl bg-brand-600/10 flex items-center justify-center mx-auto mb-5">
                  <item.icon size={28} className="text-brand-400" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-3">{item.title}</h3>
                <p className="text-white/50 text-sm leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* MENU PREVIEW */}
      <section className="py-20 sm:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between mb-12 gap-4">
            <div>
              <span className="text-brand-400 text-sm font-medium uppercase tracking-widest">Our Menu</span>
              <h2 className="text-3xl sm:text-4xl font-display font-bold text-white mt-3">Signature Dishes</h2>
            </div>
            <Link href="/menu" className="text-brand-400 hover:text-brand-300 font-medium text-sm flex items-center gap-1 transition-colors">
              Full Menu <ChevronRight size={16} />
            </Link>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { name: 'Mixed Grill Platter', price: 'RF 15,000', tag: 'Chef Special', desc: 'Beef, chicken & lamb selection' },
              { name: 'Grilled Tilapia', price: 'RF 12,000', tag: 'Popular', desc: 'Fresh lake fish with lemon butter' },
              { name: 'BBQ Chicken Wings', price: 'RF 6,000', tag: '', desc: 'House BBQ glaze, crispy finish' },
              { name: 'House Cocktail', price: 'RF 5,000', tag: 'Signature', desc: 'Local spirits & fresh fruit' },
            ].map((item, i) => (
              <motion.div
                key={item.name}
                className="glass rounded-2xl overflow-hidden group hover:border-brand-500/30 transition-all duration-300"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <div className="aspect-[4/3] bg-gradient-to-br from-brand-900/30 to-dark-900 relative">
                  {item.tag && (
                    <span className="absolute top-3 left-3 bg-brand-600 text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full">
                      {item.tag}
                    </span>
                  )}
                </div>
                <div className="p-5">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="text-white font-medium">{item.name}</h3>
                    <span className="text-brand-400 font-bold text-sm">{item.price}</span>
                  </div>
                  <p className="text-white/40 text-xs">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div
            className="relative rounded-3xl overflow-hidden"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-brand-900 to-dark-900" />
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMSIgY3k9IjEiIHI9IjEiIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsMC4wMykiLz48L3N2Zz4=')] opacity-30" />
            <div className="relative px-8 py-16 sm:px-16 sm:py-20 text-center">
              <h2 className="text-3xl sm:text-4xl font-display font-bold text-white mb-4">
                Ready to Experience Bar Mubiti?
              </h2>
              <p className="text-white/60 max-w-xl mx-auto mb-8">
                Reserve your table today and discover why we're one of Kigali's favorite spots for grilled specialties and great evenings.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link href="/contact" className="w-full sm:w-auto bg-white text-dark-950 hover:bg-white/90 px-8 py-4 rounded-full font-medium transition-all hover:scale-105 text-center">
                  Make a Reservation
                </Link>
                <a
                  href="https://wa.me/250788582914"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto border border-white/20 hover:border-brand-400 text-white px-8 py-4 rounded-full font-medium transition-all hover:bg-white/5 text-center"
                >
                  Message on WhatsApp
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

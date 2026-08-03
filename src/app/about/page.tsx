'use client'
import { motion } from 'framer-motion'
import { Flame, Users, Award, Music } from 'lucide-react'

export default function AboutPage() {
  return (
    <div className="min-h-screen pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <span className="text-brand-400 text-sm font-medium uppercase tracking-widest">About Us</span>
          <h1 className="text-4xl sm:text-5xl font-display font-bold text-white mt-3 mb-4">
            The Bar Mubiti Story
          </h1>
          <p className="text-white/50 max-w-2xl mx-auto">
            Where authentic Rwandan grill culture meets modern hospitality in the heart of Kigali.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl sm:text-3xl font-display font-bold text-white mb-6">
              A Destination for Flavor & Atmosphere
            </h2>
            <p className="text-white/60 leading-relaxed mb-4">
              Bar Mubiti was born from a passion for bringing people together over great food and even better vibes. Located in the vibrant heart of Kigali, we've built a space where locals and visitors alike can experience the true essence of Rwandan grill culture.
            </p>
            <p className="text-white/60 leading-relaxed mb-4">
              Our menu celebrates the rich flavors of East Africa — from flame-kissed beef skewers marinated in traditional spices, to fresh lake tilapia prepared with local herbs. Every dish tells a story of Rwandan culinary heritage.
            </p>
            <p className="text-white/60 leading-relaxed">
              But Bar Mubiti is more than just a grill. It's where friends gather, where music fills the air, and where every evening feels like a celebration of life in Kigali.
            </p>
          </motion.div>
          <motion.div
            className="aspect-[4/3] rounded-2xl bg-gradient-to-br from-brand-900/30 to-dark-900 border border-white/5 flex items-center justify-center"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="text-center">
              <Flame size={80} className="text-brand-500/20 mx-auto mb-4" />
              <p className="text-white/20 text-sm">Bar & Grill Atmosphere</p>
            </div>
          </motion.div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {[
            { icon: Flame, title: 'Authentic Grill', desc: 'Traditional Rwandan grilling techniques with modern presentation.' },
            { icon: Users, title: 'Community First', desc: 'A gathering place for friends, families, and visitors.' },
            { icon: Music, title: 'Live Energy', desc: 'Curated music and lively atmosphere every evening.' },
            { icon: Award, title: 'Quality Ingredients', desc: 'Fresh, locally sourced produce and premium meats.' },
          ].map((item, i) => (
            <motion.div
              key={item.title}
              className="glass rounded-2xl p-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <item.icon size={24} className="text-brand-400 mb-4" />
              <h3 className="text-white font-semibold mb-2">{item.title}</h3>
              <p className="text-white/50 text-sm">{item.desc}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="glass rounded-2xl p-8 sm:p-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-2xl sm:text-3xl font-display font-bold text-white mb-4">
            Visit Us Tonight
          </h2>
          <p className="text-white/50 max-w-xl mx-auto mb-6">
            Whether it's your first time or your fiftieth, Bar Mubiti welcomes you with open arms, sizzling grills, and the warm hospitality that Rwanda is known for.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a href="tel:0788582914" className="bg-brand-600 hover:bg-brand-500 text-white px-8 py-3 rounded-full font-medium transition-colors">
              Call 0788 582 914
            </a>
            <a href="/contact" className="border border-white/20 hover:border-brand-400 text-white px-8 py-3 rounded-full font-medium transition-colors">
              Make a Reservation
            </a>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

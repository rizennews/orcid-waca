'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

type Ambassador = {
  name: string
  role: string
  country: string
  image: string
  shortBio: string
  fullBio: string
}

const INITIAL_COUNT = 6
const BATCH_SIZE = 6

function getInitials(name: string) {
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
}

function getColor(name: string) {
  const colors = [
    'from-primary to-primary-dark',
    'from-secondary to-secondary-dark',
    'from-blue-500 to-blue-700',
    'from-emerald-500 to-emerald-700',
    'from-violet-500 to-violet-700',
    'from-amber-500 to-amber-700',
    'from-rose-500 to-rose-700',
    'from-cyan-500 to-cyan-700',
    'from-orange-500 to-orange-700',
    'from-teal-500 to-teal-700',
    'from-indigo-500 to-indigo-700',
    'from-pink-500 to-pink-700',
    'from-lime-500 to-lime-700',
    'from-fuchsia-500 to-fuchsia-700',
    'from-sky-500 to-sky-700',
  ]
  let hash = 0
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash)
  }
  return colors[Math.abs(hash) % colors.length]
}

export default function AmbassadorGrid({ ambassadors }: { ambassadors: Ambassador[] }) {
  const [visibleCount, setVisibleCount] = useState(INITIAL_COUNT)
  const [selected, setSelected] = useState<Ambassador | null>(null)

  const visible = ambassadors.slice(0, visibleCount)
  const hasMore = visibleCount < ambassadors.length

  return (
    <>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {visible.map((amb, i) => (
          <motion.div
            key={amb.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: (i % INITIAL_COUNT) * 0.05 }}
            className="rounded-xl border bg-white p-6 md:p-8 hover:shadow-lg transition-shadow flex flex-col"
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="w-14 h-14 rounded-full bg-gradient-to-br overflow-hidden shrink-0">
                <img
                  src={`/images/ambassadors/${amb.image}`}
                  alt={amb.name}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    const target = e.currentTarget
                    target.style.display = 'none'
                    const parent = target.parentElement!
                    parent.className = `w-14 h-14 rounded-full bg-gradient-to-br ${getColor(amb.name)} flex items-center justify-center text-white text-lg font-bold shrink-0`
                    parent.textContent = getInitials(amb.name)
                  }}
                />
              </div>
              <div className="min-w-0">
                <h3 className="text-base font-bold text-zinc-900 truncate">
                  {amb.name}
                </h3>
                <p className="text-xs text-secondary font-medium truncate">
                  {amb.role}
                </p>
                <p className="text-xs text-zinc-400 truncate">
                  {amb.country}
                </p>
              </div>
            </div>
            <p className="text-sm text-zinc-500 leading-relaxed flex-1">
              {amb.shortBio}
            </p>
            <button
              onClick={() => setSelected(amb)}
              className="mt-4 self-start text-sm font-semibold text-secondary hover:text-secondary-dark transition-colors"
            >
              Read More →
            </button>
          </motion.div>
        ))}
      </div>

      <div className="flex justify-center mt-10 gap-4">
        {hasMore && (
          <button
            onClick={() => setVisibleCount((c) => Math.min(c + BATCH_SIZE, ambassadors.length))}
            className="h-11 rounded-full bg-primary px-8 text-sm font-semibold text-white hover:bg-primary-dark transition-colors"
          >
            Load More ({ambassadors.length - visibleCount} remaining)
          </button>
        )}
        {visibleCount > INITIAL_COUNT && (
          <button
            onClick={() => setVisibleCount(INITIAL_COUNT)}
            className="h-11 rounded-full border border-primary/20 bg-white px-8 text-sm font-semibold text-zinc-600 hover:bg-zinc-50 transition-colors"
          >
            Show Less
          </button>
        )}
      </div>

      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50"
            onClick={() => setSelected(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-2xl max-w-lg w-full max-h-[85vh] overflow-y-auto p-8 shadow-2xl"
            >
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br overflow-hidden shrink-0">
                    <img
                      src={`/images/ambassadors/${selected.image}`}
                      alt={selected.name}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        const target = e.currentTarget
                        target.style.display = 'none'
                        const parent = target.parentElement!
                        parent.className = `w-16 h-16 rounded-full bg-gradient-to-br ${getColor(selected.name)} flex items-center justify-center text-white text-xl font-bold shrink-0`
                        parent.textContent = getInitials(selected.name)
                      }}
                    />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-zinc-900">
                      {selected.name}
                    </h3>
                    <p className="text-sm text-secondary font-medium">
                      {selected.role}
                    </p>
                    <p className="text-sm text-zinc-400">
                      {selected.country}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setSelected(null)}
                  className="w-8 h-8 rounded-full bg-zinc-100 hover:bg-zinc-200 flex items-center justify-center text-zinc-500 transition-colors shrink-0"
                >
                  <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                </button>
              </div>
              <p className="text-sm text-zinc-500 leading-relaxed whitespace-pre-line">
                {selected.fullBio}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

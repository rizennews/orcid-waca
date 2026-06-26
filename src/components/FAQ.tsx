'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

type FAQItem = {
  q: string
  a: string
}

export default function FAQ({ items }: { items: FAQItem[] }) {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <div className="mx-auto grid grid-cols-1 md:grid-cols-3 gap-4">
      {items.map((item, i) => (
        <div
          key={i}
          className="rounded-xl border bg-white overflow-hidden self-start"
        >
          <button
            onClick={() => setOpen(open === i ? null : i)}
            className="flex w-full items-center justify-between gap-3 px-5 py-5 text-left text-base font-semibold text-zinc-900 hover:bg-zinc-50 transition-colors"
          >
            <span>{item.q}</span>
            <motion.svg
              animate={{ rotate: open === i ? 180 : 0 }}
              transition={{ duration: 0.2 }}
              viewBox="0 0 24 24"
              className="h-5 w-5 shrink-0 text-primary"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="6 9 12 15 18 9" />
            </motion.svg>
          </button>

          <AnimatePresence initial={false}>
            {open === i && (
              <motion.div
                key="content"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.25, ease: 'easeInOut' }}
              >
                <div
                  className="px-5 pb-5 text-sm text-zinc-500 leading-relaxed [&_a]:text-primary [&_a]:underline [&_a]:hover:text-primary-dark"
                  dangerouslySetInnerHTML={{ __html: item.a.replace(/\n/g, '<br>') }}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  )
}

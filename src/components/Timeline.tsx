'use client'

import { motion, type Variants } from 'framer-motion'

type TimelineEntry = {
  period: string
  title: string
}

const container: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.25 },
  },
}

const item: Variants = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
}

export default function Timeline({
  title,
  entries,
}: {
  title: string
  entries: TimelineEntry[]
}) {
  return (
    <section className="bg-zinc-50 py-16 md:py-20">
      <div className="mx-auto max-w-5xl px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-zinc-900 text-center mb-16">
          {title}
        </h2>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-80px' }}
          className="relative"
        >
          {/* Animated straight line */}
          <motion.div
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: 'easeOut', delay: 0.2 }}
            className="hidden md:block absolute left-1/2 top-4 z-0 h-[calc(100%-16px)] w-0.5 -translate-x-1/2 origin-top bg-primary/60"
          />

          {entries.map((entry, i) => (
            <motion.div
              key={i}
              variants={item}
              className="relative flex flex-col items-center md:grid md:grid-cols-[1fr_auto_1fr] md:items-start gap-1 md:gap-4 pb-10 md:pb-12 last:pb-0"
            >
              {/* period */}
              <div className="md:justify-self-end md:text-right md:pt-1">
                <span className="inline-block rounded-full bg-primary/10 px-3 py-1 md:px-3.5 text-[11px] md:text-xs font-semibold tracking-wider text-primary">
                  {entry.period}
                </span>
              </div>

              {/* dot */}
              <div className="relative z-10 mt-0 md:mt-1.5 h-3.5 w-3.5 md:h-4 md:w-4 shrink-0 rounded-full border-[3px] md:border-4 border-primary bg-white" />

              {/* title */}
              <div className="text-center md:text-left md:pt-0.5">
                <h3 className="text-sm md:text-lg font-semibold text-zinc-900">
                  {entry.title}
                </h3>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

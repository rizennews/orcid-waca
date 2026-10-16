'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'

interface CountryData {
  country: string
  code: string
  engaged: number
  percentOfTotal: string
  barWidthPercent: number
}

const countries: CountryData[] = [
  { country: 'Nigeria', code: 'ng', engaged: 1012, percentOfTotal: '76.1%', barWidthPercent: 100 },
  { country: 'Ghana', code: 'gh', engaged: 143, percentOfTotal: '10.8%', barWidthPercent: 14.1 },
  { country: 'Togo', code: 'tg', engaged: 65, percentOfTotal: '4.9%', barWidthPercent: 6.4 },
  { country: "Côte d'Ivoire", code: 'ci', engaged: 44, percentOfTotal: '3.3%', barWidthPercent: 4.3 },
  { country: 'Benin', code: 'bj', engaged: 33, percentOfTotal: '2.5%', barWidthPercent: 3.3 },
  { country: 'Mali', code: 'ml', engaged: 27, percentOfTotal: '2.0%', barWidthPercent: 2.7 },
  { country: 'Burkina Faso', code: 'bf', engaged: 6, percentOfTotal: '0.5%', barWidthPercent: 1.5 },
]

export default function CountryGraph() {
  return (
    <div className="rounded-xl border border-primary/20 bg-white p-6 md:p-8 hover:shadow-lg transition-shadow">
      <div className="flex items-center justify-between pb-4 mb-6 border-b border-zinc-100">
        <div>
          <h3 className="text-lg font-bold text-zinc-900">
            People engaged, by country
          </h3>
          <p className="text-xs text-zinc-500 mt-0.5">
            Breakdown across 7 participating nations
          </p>
        </div>
        <div className="text-right">
          <span className="text-xs font-semibold text-zinc-400 block uppercase tracking-wider">
            Total Engaged
          </span>
          <span className="text-xl font-bold text-primary">
            1,330
          </span>
        </div>
      </div>

      <div className="space-y-4">
        {countries.map((c, i) => (
          <div key={c.country} className="space-y-1.5">
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-2.5">
                <Image
                  src={`https://flagcdn.com/24x18/${c.code}.png`}
                  alt={c.country}
                  width={20}
                  height={15}
                  className="rounded-sm shadow-xs flex-shrink-0"
                  unoptimized
                />
                <span className="font-semibold text-zinc-800">
                  {c.country}
                </span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-xs text-zinc-400 font-medium hidden sm:inline">
                  {c.percentOfTotal}
                </span>
                <span className="font-bold text-zinc-900 w-12 text-right">
                  {c.engaged.toLocaleString()}
                </span>
              </div>
            </div>

            {/* Ease-in Animated Bar */}
            <div className="w-full bg-zinc-100 h-2.5 rounded-full overflow-hidden p-0.5">
              <motion.div
                initial={{ width: '0%' }}
                whileInView={{ width: `${c.barWidthPercent}%` }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.9,
                  ease: [0.25, 0.1, 0.25, 1],
                  delay: i * 0.08,
                }}
                className={`h-full rounded-full ${
                  i === 0
                    ? 'bg-gradient-to-r from-primary to-[#005a96]'
                    : i === 1
                    ? 'bg-gradient-to-r from-primary to-secondary'
                    : 'bg-secondary'
                }`}
              />
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 pt-4 border-t border-zinc-100 flex items-center justify-between text-xs text-zinc-500">
        <span>7 Countries in West & Central Africa</span>
        <span className="font-semibold text-primary">Total: 1,330 participants</span>
      </div>
    </div>
  )
}

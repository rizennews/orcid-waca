'use client'

import { useState } from 'react'
import Image from 'next/image'

interface Post {
  title: string
  date: string
  image: string
  slug: string
}

interface NewsGridProps {
  years: string[]
  posts: Record<string, Post[]>
  readMore: string
}

export default function NewsGrid({ years, posts, readMore }: NewsGridProps) {
  const [activeYear, setActiveYear] = useState(years[0])

  return (
    <section className="py-16 md:py-20 bg-white">
      <div className="mx-auto max-w-7xl px-4">
        <div className="flex flex-wrap gap-3 mb-12">
          {years.map(year => (
            <button
              key={year}
              onClick={() => setActiveYear(year)}
              className={`h-10 px-5 rounded-full text-sm font-semibold border transition-colors ${
                activeYear === year
                  ? 'bg-primary text-white border-primary'
                  : 'bg-white text-zinc-600 border-primary/20 hover:border-primary hover:text-primary'
              }`}
            >
              {year}
            </button>
          ))}
        </div>

        <div className="space-y-8">
          {years.map(year => (
            <div key={year} className={year === activeYear ? '' : 'hidden'}>
              <div className="grid grid-cols-1 gap-6">
                {(posts[year] || []).map((post, i) => (
                  <article
                    key={i}
                    className="group rounded-xl overflow-hidden border bg-white hover:shadow-lg transition-shadow flex flex-col md:flex-row"
                  >
                    <div className="relative w-full md:w-56 h-52 md:h-auto shrink-0 overflow-hidden bg-zinc-100">
                      <Image
                        src={post.image}
                        alt={post.title}
                        fill
                        unoptimized
                        loading="eager"
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                        onError={e => { (e.target as HTMLImageElement).style.display = 'none' }}
                      />
                    </div>
                    <div className="p-6 flex flex-col justify-center flex-1">
                      <time className="text-sm text-zinc-400 mb-2 block">
                        {post.date}
                      </time>
                      <h3 className="text-lg font-bold text-zinc-900 mb-4 leading-snug">
                        {post.title}
                      </h3>
                      <a
                        href={`/updates/${post.slug}`}
                        className="inline-flex items-center gap-1.5 text-primary font-semibold text-sm hover:text-primary-dark transition-colors"
                      >
                        {readMore}
                        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M5 12h14" />
                          <path d="m12 5 7 7-7 7" />
                        </svg>
                      </a>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

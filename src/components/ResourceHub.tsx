'use client'

import { useState, useMemo, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import VideoPlayer from './VideoPlayer'

/* ─── Types ─── */
type HubLabels = {
  searchPlaceholder: string
  filterAll: string
  filterVideos: string
  filterPhotos: string
  filterInfographics: string
  filterDocuments: string
  quickActions: {
    download: { title: string; desc: string }
    ambassadors: { title: string; desc: string }
    community: { title: string; desc: string }
  }
  sections: {
    videos: { title: string; desc: string }
    photos: { title: string; desc: string }
    infographics: { title: string; desc: string }
    documents: { title: string; desc: string }
  }
  loadMore: string
  emptyTitle: string
  emptyDesc: string
  download: string
  categoryLabel: string
  languageLabel: string
}

type ResourceItem = {
  type?: string
  title: string
  desc?: string
  pages?: string
  lang?: string
  tags: string[]
  link?: string
  image?: string
  url?: string
}

/* ─── Data ─── */
const datasetVideos: ResourceItem[] = [
  { title: 'LIBSENSE Connect II - Abuja 2024', tags: ['videos'], image: '/images/resources/videos/video-1.jpg', url: 'https://video.wacren.net/media/LIBSENSE-Connect+II+-+Abuja+2024_video+highlight/0_npcsnamn' },
  { title: 'How to Set Up an ORCID iD', tags: ['videos'], image: '/images/resources/videos/video-2.jpg', url: 'https://www.youtube.com/watch?v=ZUfmVtQ53_g' },
  { title: 'WACREN 2026 Recap Video', tags: ['videos'], image: '/images/resources/videos/video-3.jpg', url: 'https://video.wacren.net/media/WACREN+2026+Recap+Video/0_t0xhvw6l/597270' },
  { title: 'WACREN 2026 Promo Video 2', tags: ['videos'], image: '/images/resources/videos/video-4.jpg', url: 'https://video.wacren.net/media/WACREN+2026+promo+video+2/0_2o7gy912/597270' },
  { title: 'ORCID Workflows for Peer Review Validation', tags: ['videos'], image: '/images/resources/videos/video-5.jpg', url: 'https://www.youtube.com/watch?v=MOJngTySFv8' },
  { title: 'ORCID Integration in Open Journal Systems (OJS)', tags: ['videos'], image: '/images/resources/videos/video-6.jpg', url: 'https://www.youtube.com/watch?v=gxeQldk9m-8' },
  { title: 'LIBSENSE OS Gambia Reel', tags: ['videos'], image: '/images/resources/videos/video-7.jpg', url: 'https://video.wacren.net/media/LIBSENSE+OS+Gambia_reel/0_ab6brimc/597270' },
  { title: 'WACREN 2026 Promo Video 1', tags: ['videos'], image: '/images/resources/videos/video-8.jpg', url: 'https://video.wacren.net/media/WACREN+2026+promo+video+1/0_ujlpdl4p/597270' },
]

const datasetPhotos: ResourceItem[] = [
  { title: 'WACREN 2024 Annual Conference', tags: ['photos'], image: '/images/resources/photos/photo-1.jpg' },
  { title: 'ORCID Ambassador Workshop', tags: ['photos'], image: '/images/resources/photos/photo-2.jpg' },
  { title: 'Community of Practice Meetup', tags: ['photos'], image: '/images/resources/photos/photo-3.jpg' },
  { title: 'PIDs Training Session', tags: ['photos'], image: '/images/resources/photos/photo-4.jpg' },
  { title: 'Regional Research Forum', tags: ['photos'], image: '/images/resources/photos/photo-5.jpg' },
  { title: 'ORCID Integration Workshop', tags: ['photos'], image: '/images/resources/photos/photo-6.jpg' },
]

const datasetInfographics: ResourceItem[] = [
  { type: 'Infographic', title: 'Benefits of ORCID for African Researchers', desc: 'Visual guide highlighting the key benefits of ORCID for researchers in West and Central Africa.', pages: 'PNG/PDF', lang: 'Bilingual', tags: ['infographics'], link: 'https://baobab.wacren.net/records/kvexm-92c15', image: '/images/resources/infographics/info-1.jpg' },
  { type: 'Infographic', title: 'ORCID Data Exchange Cycle', desc: 'Visual flowchart showing how publisher and funder metadata syncs back to your profile.', pages: 'PDF', lang: 'English', tags: ['infographics'], image: '/images/resources/infographics/info-2.jpg' },
  { type: 'Infographic', title: 'The PID Ecosystem Landscape', desc: 'Quick reference graphic explaining DOIs, ORCID iDs, and ROR identifiers.', pages: 'PNG', lang: 'French', tags: ['infographics'], image: '/images/resources/infographics/info-3.jpg' },
  { type: 'Infographic', title: 'Ambassador Engagement Metrics', desc: 'A visualization of key ambassador goals and outreach impact markers.', pages: 'PDF/PNG', lang: 'English', tags: ['infographics'], image: '/images/resources/infographics/info-4.jpg' },
  { type: 'Infographic', title: 'ORCID and Peer Review Cycles', desc: 'Infographic detailing data flow in peer review verification systems.', pages: 'PNG', lang: 'Bilingual', tags: ['infographics'], image: '/images/resources/infographics/info-5.jpg' },
  { type: 'Infographic', title: 'African Research Visibility Factors', desc: 'Poster illustrating the impact of unique persistent IDs on citation scores.', pages: 'PDF', lang: 'English', tags: ['infographics'], image: '/images/resources/infographics/info-6.jpg' },
]

const datasetDocuments: ResourceItem[] = [
  { type: 'PDF Guide', title: 'ORCID Quick Start Guide', desc: '5-minute guide to creating and optimizing your profile. Available in English and French.', pages: '12 pages', lang: 'English & French', tags: ['documents'] },
  { type: 'Step-by-Step', title: 'How to Link Your Publications', desc: 'Three easy methods to populate your ORCID record with your research outputs.', pages: '8 pages', lang: '10 min read', tags: ['documents'] },
  { type: 'PDF Guide', title: 'ORCID ID for Grant Applications', desc: 'Instructions on linking your ORCID ID with major regional funding proposals.', pages: '6 pages', lang: 'English & French', tags: ['documents'] },
  { type: 'Step-by-Step', title: 'Trusted Organization Settings', desc: 'How to grant permissions to external research platforms securely.', pages: '4 pages', lang: '5 min read', tags: ['documents'] },
  { type: 'Guide', title: 'Outreach & Workshop Guide', desc: 'Comprehensive guide for planning, organizing, and delivering successful ORCID workshops.', pages: '15 pages', lang: 'Full Guide', tags: ['documents'] },
  { type: 'Checklist', title: 'Institutional Launch Plan', desc: 'Step-by-Step rollout schedule for establishing ORCID integrations locally.', pages: '4 pages', lang: 'Excel/PDF', tags: ['documents'] },
]

type TabKey = 'all' | 'videos' | 'photos' | 'infographics' | 'documents'

/* ─── SVG Icons ─── */
const SearchIcon = () => (
  <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
  </svg>
)
const ListIcon = () => (
  <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="8" y1="6" x2="21" y2="6" /><line x1="8" y1="12" x2="21" y2="12" /><line x1="8" y1="18" x2="21" y2="18" /><line x1="3" y1="6" x2="3.01" y2="6" /><line x1="3" y1="12" x2="3.01" y2="12" /><line x1="3" y1="18" x2="3.01" y2="18" />
  </svg>
)
const VideoIcon = () => (
  <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="23 7 16 12 23 17 23 7" /><rect x="1" y="5" width="15" height="14" rx="2" ry="2" />
  </svg>
)
const ImageIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className || "h-4 w-4"} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="18" height="18" rx="2" ry="2" /><circle cx="8.5" cy="8.5" r="1.5" /><polyline points="21 15 16 10 5 21" />
  </svg>
)
const InfoIcon = () => (
  <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" /><line x1="12" y1="16" x2="12" y2="12" /><line x1="12" y1="8" x2="12.01" y2="8" />
  </svg>
)
const FileIcon = () => (
  <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /><line x1="16" y1="13" x2="8" y2="13" /><line x1="16" y1="17" x2="8" y2="17" /><polyline points="10 9 9 9 8 9" />
  </svg>
)
const CloudDownloadIcon = () => (
  <svg viewBox="0 0 24 24" className="h-10 w-10" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" y1="15" x2="12" y2="3" />
  </svg>
)
const GraduationIcon = () => (
  <svg viewBox="0 0 24 24" className="h-10 w-10" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 10v6M2 10l10-5 10 5-10 5z" /><path d="M6 12v5c3 3 9 3 12 0v-5" />
  </svg>
)
const UsersIcon = () => (
  <svg viewBox="0 0 24 24" className="h-10 w-10" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
)
const PlayIcon = () => (
  <svg viewBox="0 0 48 48" className="h-12 w-12 sm:h-14 sm:w-14 drop-shadow-lg">
    <circle cx="24" cy="24" r="22" fill="#0072BC" />
    <polygon points="20 16 32 24 20 32 20 16" fill="#fff" />
  </svg>
)

/* ─── Section key config ─── */
const sections: { key: TabKey; labelKey: keyof HubLabels['sections']; gridId: string }[] = [
  { key: 'videos', labelKey: 'videos', gridId: 'grid-videos' },
  { key: 'photos', labelKey: 'photos', gridId: 'grid-photos' },
  { key: 'infographics', labelKey: 'infographics', gridId: 'grid-infographics' },
  { key: 'documents', labelKey: 'documents', gridId: 'grid-documents' },
]

const initialViewLimit = 3

/* ─── Component ─── */
export default function ResourceHub({ labels }: { labels: HubLabels }) {
  const [search, setSearch] = useState('')
  const [activeTab, setActiveTab] = useState<TabKey>('all')
  const [selectedVideo, setSelectedVideo] = useState<ResourceItem | null>(null)
  const [viewLimits, setViewLimits] = useState<Record<string, number>>({
    videos: initialViewLimit,
    photos: initialViewLimit,
    infographics: initialViewLimit,
    documents: initialViewLimit,
  })

  const allData = useMemo(() => ({
    videos: datasetVideos,
    photos: datasetPhotos,
    infographics: datasetInfographics,
    documents: datasetDocuments,
  }), [])

  const filtered = useMemo(() => {
    const q = search.toLowerCase().trim()
    return {
      videos: allData.videos.filter(i => matches(i, q, activeTab)),
      photos: allData.photos.filter(i => matches(i, q, activeTab)),
      infographics: allData.infographics.filter(i => matches(i, q, activeTab)),
      documents: allData.documents.filter(i => matches(i, q, activeTab)),
    }
  }, [search, activeTab, allData])

  const totalVisible = filtered.videos.length + filtered.photos.length + filtered.infographics.length + filtered.documents.length

  const handleTabChange = (tab: TabKey) => {
    setActiveTab(tab)
    setViewLimits({
      videos: initialViewLimit,
      photos: initialViewLimit,
      infographics: initialViewLimit,
      documents: initialViewLimit,
    })
  }

  const loadMore = (key: string) => {
    setViewLimits(prev => ({ ...prev, [key]: prev[key] + 3 }))
  }

  useEffect(() => {
    if (!selectedVideo) return
    const handleKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setSelectedVideo(null) }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [selectedVideo])

  useEffect(() => {
    const handler = (e: PromiseRejectionEvent) => {
      if (e.reason instanceof DOMException && e.reason.name === 'AbortError') {
        e.preventDefault()
      }
    }
    window.addEventListener('unhandledrejection', handler)
    return () => window.removeEventListener('unhandledrejection', handler)
  }, [])

  return (
    <section className="bg-zinc-50 py-16 md:py-20">
      <div className="mx-auto max-w-7xl px-4">

        {/* ─── Quick Actions ─── */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {[
            { href: 'https://baobab.wacren.net/communities/orcid-waca/records?q=&l=list&p=1&s=10&sort=newest', icon: <CloudDownloadIcon />, title: labels.quickActions.download.title, desc: labels.quickActions.download.desc },
            { href: 'https://wacren.net/en/orcid-waca/ambassadors', icon: <GraduationIcon />, title: labels.quickActions.ambassadors.title, desc: labels.quickActions.ambassadors.desc },
            { href: 'https://groups.google.com/a/ren.africa/g/orcid-waca', icon: <UsersIcon />, title: labels.quickActions.community.title, desc: labels.quickActions.community.desc },
          ].map((action, i) => (
            <motion.a
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1, duration: 0.4 }}
              href={action.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative rounded-xl border bg-white p-6 md:p-8 text-center hover:shadow-lg hover:border-primary/30 transition-all duration-300"
            >
              <div className="mb-4 flex justify-center text-secondary group-hover:scale-110 transition-transform duration-300">
                {action.icon}
              </div>
              <h3 className="text-lg font-bold text-zinc-900 mb-2">
                {action.title}
              </h3>
              <p className="text-sm text-zinc-500 leading-relaxed">
                {action.desc}
              </p>
            </motion.a>
          ))}
        </div>

        {/* ─── Search & Filter ─── */}
        <div className="flex flex-col items-center gap-5 mb-12">
          <div className="relative w-full max-w-lg">
            <span className="absolute left-5 top-1/2 -translate-y-1/2 text-primary pointer-events-none">
              <SearchIcon />
            </span>
            <input
              type="text"
              value={search}
              onChange={e => { setSearch(e.target.value); setViewLimits({ videos: 3, photos: 3, infographics: 3, documents: 3 }) }}
              placeholder={labels.searchPlaceholder}
              className="w-full rounded-full border border-zinc-200 bg-white py-3.5 pl-14 pr-6 text-sm outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all"
            />
          </div>

          <div className="flex w-full max-w-2xl overflow-x-auto gap-2 rounded-xl border border-zinc-200 bg-white/80 p-1.5 scrollbar-none md:rounded-full md:flex-wrap md:justify-center md:overflow-visible">
            {([
              { key: 'all' as TabKey, icon: <ListIcon />, label: labels.filterAll },
              { key: 'videos' as TabKey, icon: <VideoIcon />, label: labels.filterVideos },
              { key: 'photos' as TabKey, icon: <ImageIcon />, label: labels.filterPhotos },
              { key: 'infographics' as TabKey, icon: <InfoIcon />, label: labels.filterInfographics },
              { key: 'documents' as TabKey, icon: <FileIcon />, label: labels.filterDocuments },
            ]).map(btn => (
              <button
                key={btn.key}
                onClick={() => handleTabChange(btn.key)}
                className={`inline-flex shrink-0 items-center gap-2 rounded-full px-3.5 py-2 text-xs sm:text-sm font-semibold transition-all whitespace-nowrap ${
                  activeTab === btn.key
                    ? 'bg-primary text-white shadow-sm'
                    : 'text-zinc-500 hover:text-zinc-800 hover:bg-zinc-100'
                }`}
              >
                <span className="hidden sm:inline">{btn.icon}</span>
                {btn.label}
              </button>
            ))}
          </div>
        </div>

        {/* ─── Resource Sections ─── */}
        <AnimatePresence mode="wait">
          {totalVisible === 0 ? (
            <motion.div
              key="empty"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="rounded-xl border border-dashed border-zinc-300 bg-white py-16 px-6 text-center"
            >
              <p className="text-lg font-semibold text-zinc-900 mb-2">{labels.emptyTitle}</p>
              <p className="text-sm text-zinc-500 max-w-sm mx-auto">{labels.emptyDesc}</p>
            </motion.div>
          ) : (
            <motion.div
              key="results"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {/* Videos */}
              {renderSection('videos', filtered.videos, viewLimits.videos, loadMore, labels, false, setSelectedVideo)}
              {/* Photos */}
              {renderSection('photos', filtered.photos, viewLimits.photos, loadMore, labels, false)}
              {/* Infographics */}
              {renderSection('infographics', filtered.infographics, viewLimits.infographics, loadMore, labels, true)}
              {/* Documents */}
              {renderSection('documents', filtered.documents, viewLimits.documents, loadMore, labels, true)}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* ─── Video Modal ─── */}
      <AnimatePresence>
        {selectedVideo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-2 sm:p-4"
            onClick={() => setSelectedVideo(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="relative w-full max-w-5xl bg-black rounded-xl overflow-hidden shadow-2xl mx-auto"
              onClick={e => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedVideo(null)}
                className="absolute top-2 right-2 sm:top-3 sm:right-3 z-10 flex h-7 w-7 sm:h-8 sm:w-8 items-center justify-center rounded-full bg-black/60 text-white hover:bg-white/40 transition-colors"
              >
                <svg viewBox="0 0 24 24" className="h-4 w-4 sm:h-5 sm:w-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
              <div className="w-full" style={{ aspectRatio: '16 / 9' }}>
                <VideoPlayer url={selectedVideo.url || ''} title={selectedVideo.title} />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}

/* ─── Filter Helper ─── */
function matches(item: ResourceItem, query: string, activeTab: TabKey): boolean {
  const tabMatch = activeTab === 'all' || item.tags.includes(activeTab)
  const textMatch = !query ||
    item.title.toLowerCase().includes(query) ||
    (item.desc || '').toLowerCase().includes(query) ||
    (item.type || '').toLowerCase().includes(query)
  return tabMatch && textMatch
}

/* ─── Section Renderer ─── */
function renderSection(
  key: string,
  items: ResourceItem[],
  limit: number,
  loadMore: (k: string) => void,
  labels: HubLabels,
  showDetails: boolean,
  onPlayVideo?: (item: ResourceItem) => void,
) {
  const sectionKey = key as keyof HubLabels['sections']
  const isVisible = items.length > 0

  if (!isVisible) return null

  const paginated = items.slice(0, limit)

  return (
    <div key={key} className="mb-14 last:mb-0">
      <div className="border-l-4 border-secondary pl-4 mb-6">
        <h2 className="text-xl md:text-2xl font-bold text-zinc-900">{labels.sections[sectionKey].title}</h2>
        <p className="text-sm text-zinc-500 mt-0.5">{labels.sections[sectionKey].desc}</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        {paginated.map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05, duration: 0.3 }}
          >
            {showDetails ? (
              /* Document / Infographic card */
              <div className="group rounded-xl border bg-white p-6 hover:shadow-lg hover:border-secondary/40 transition-all duration-300 flex flex-col h-full">
                {item.type && (
                  <span className="inline-block self-start rounded-full bg-primary/10 px-3 py-1 text-[0.7rem] font-bold uppercase tracking-wider text-primary mb-4">
                    {item.type}
                  </span>
                )}
                <div className={item.image ? 'mb-4 overflow-hidden rounded-lg' : ''}>
                  {item.image ? (
                    <div className="relative aspect-video w-full overflow-hidden rounded-lg bg-zinc-100">
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        unoptimized
                        loading="eager"
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                        onError={e => { (e.target as HTMLImageElement).style.display = 'none'; (e.target as HTMLImageElement).parentElement!.classList.add('bg-gradient-to-br', 'from-primary/10', 'to-secondary/10') }}
                      />
                    </div>
                  ) : null}
                </div>
                <h3 className="text-base font-bold text-zinc-900 mb-2 leading-snug">{item.title}</h3>
                {item.desc && <p className="text-sm text-zinc-500 leading-relaxed mb-4 flex-1">{item.desc}</p>}
                <div className="border-t border-zinc-100 pt-3 mt-auto space-y-1 text-[0.75rem] text-zinc-400 mb-4">
                  {item.pages && <div>{labels.categoryLabel}: {item.pages}</div>}
                  {item.lang && <div>{labels.languageLabel}: {item.lang}</div>}
                </div>
                <a
                  href={item.link || '#'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex w-full items-center justify-center rounded-lg bg-primary px-4 py-2.5 text-sm font-bold text-white hover:bg-primary-dark transition-colors"
                >
                  {labels.download}
                </a>
              </div>
            ) : (
              /* Video / Photo card */
              <div
                className={`group rounded-xl border bg-white overflow-hidden hover:shadow-lg hover:border-secondary/40 transition-all duration-300 ${key === 'videos' ? 'cursor-pointer' : ''}`}
                onClick={() => {
                  if (key !== 'videos' || !item.url) return
                  if (item.url.includes('video.wacren.net')) {
                    window.open(item.url, '_blank', 'noopener')
                  } else if (onPlayVideo) {
                    onPlayVideo(item)
                  }
                }}
              >
                <div className="relative aspect-video flex items-center justify-center overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-zinc-800 to-zinc-900 flex items-center justify-center">
                    <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[length:16px_16px] pointer-events-none" />
                  </div>
                  {item.image && (
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      unoptimized
                      loading="eager"
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                      onError={e => { (e.target as HTMLImageElement).style.display = 'none' }}
                    />
                  )}
                  {(key === 'photos')
                    ? <ImageIcon className="relative z-10 h-16 w-16 opacity-70 text-white" />
                    : <div className="relative z-10"><PlayIcon /></div>}
                </div>
                <div className="p-5">
                  <h3 className="text-sm font-bold text-zinc-900 leading-snug">{item.title}</h3>
                </div>
              </div>
            )}
          </motion.div>
        ))}
      </div>

      {items.length > limit && (
        <div className="mt-8 text-center">
          <button
            onClick={() => loadMore(key)}
            className="inline-flex h-11 items-center justify-center rounded-full border-2 border-primary bg-white px-7 text-sm font-bold text-primary hover:bg-primary hover:text-white transition-all"
          >
            {labels.loadMore} {labels.sections[sectionKey].title}
          </button>
        </div>
      )}
    </div>
  )
}

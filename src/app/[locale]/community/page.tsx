import { getTranslations } from 'next-intl/server'
import type { Metadata } from 'next'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { routing } from '@/i18n/routing'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale })
  const site = await getTranslations({ locale, namespace: 'site' })
  const siteUrl = 'https://orcid.wacren.net'

  return {
    title: t('community.page.title'),
    description: t('community.page.subtitle'),
    alternates: {
      canonical: `${siteUrl}/${locale}/community`,
      languages: Object.fromEntries(
        routing.locales.map(l => [l, `${siteUrl}/${l}/community`])
      ),
    },
    openGraph: {
      title: t('community.page.title'),
      description: t('community.page.subtitle'),
      url: `${siteUrl}/${locale}/community`,
      siteName: site('title'),
      locale: locale === 'fr' ? 'fr_FR' : locale === 'pt' ? 'pt_PT' : 'en_US',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: t('community.page.title'),
      description: t('community.page.subtitle'),
    },
    robots: { index: true, follow: true },
    keywords: ['ORCID community', 'Community of Practice', 'WACREN', 'ORCID-WACA', 'researcher community', 'West Africa'],
  }
}

export default async function CommunityPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const t = await getTranslations({ locale })

  return (
    <div className="flex flex-col flex-1">
      <Header />

      <main className="flex-1">
        {/* ─── Hero ─── */}
        <section className="relative overflow-hidden bg-gradient-to-br from-primary to-primary-dark text-white">
          <div className="mx-auto max-w-4xl px-4 py-20 md:py-36 text-center">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
              {t('community.page.title')}
            </h1>
            <p className="text-base md:text-lg text-white/75 max-w-3xl mx-auto leading-relaxed">
              {t('community.page.subtitle')}
            </p>
          </div>
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-white/5" />
            <div className="absolute -bottom-32 -left-32 w-[32rem] h-[32rem] rounded-full bg-white/5" />
          </div>
        </section>

        {/* ─── Forum + Pillars ─── */}
        <section className="py-16 md:py-20 bg-white">
          <div className="mx-auto max-w-7xl px-4">
            <div className="grid sm:grid-cols-2 gap-12 md:gap-16 items-start">

              {/* Left: Forum */}
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-zinc-900 mb-6">
                  {t('community.page.forumTitle')}
                </h2>
                <div
                  className="text-zinc-600 leading-relaxed whitespace-pre-line mb-8"
                  dangerouslySetInnerHTML={{ __html: t.raw('community.page.forumBody') }}
                />
                <a
                  href="https://groups.google.com/a/ren.africa/g/orcid-waca"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-11 items-center justify-center rounded-full bg-secondary px-6 text-sm font-semibold text-white hover:bg-secondary-dark transition-colors"
                >
                  {t('community.page.forumButton')}
                </a>
              </div>

              {/* Right: Pillars */}
              <div className="md:border-l md:border-zinc-200 md:pl-12 lg:pl-16">
                <h3 className="text-xl md:text-2xl font-bold text-zinc-900 mb-8">
                  {t('community.page.pillarsTitle')}
                </h3>
                <div className="space-y-6">
                  {(t.raw('community.page.pillars') as { title: string; desc: string }[]).map((pillar, i) => (
                    <div key={i} className="flex gap-4">
                      <span className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-secondary text-sm font-bold">
                        {i + 1}
                      </span>
                      <div>
                        <h4 className="text-base font-bold text-zinc-900 mb-1">
                          {pillar.title}
                        </h4>
                        <p className="text-sm text-zinc-500 leading-relaxed">
                          {pillar.desc}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ─── Community Members ─── */}
        <section className="bg-zinc-50 py-16 md:py-20">
          <div className="mx-auto max-w-7xl px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-zinc-900 text-center mb-12">
              {t('community.page.membersTitle')}
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  icon: (
                    <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                      <circle cx="12" cy="7" r="4" />
                    </svg>
                  ),
                },
                {
                  icon: (
                    <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
                      <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
                    </svg>
                  ),
                },
                {
                  icon: (
                    <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z" />
                    </svg>
                  ),
                },
                {
                  icon: (
                    <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="10" />
                      <line x1="2" y1="12" x2="22" y2="12" />
                      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                    </svg>
                  ),
                },
              ].map((meta, i) => {
                const member = (t.raw('community.page.members') as { title: string; desc: string }[])[i]
                return (
                  <div
                    key={i}
                    className="rounded-xl border bg-white p-6 md:p-8 hover:shadow-lg transition-shadow flex flex-col items-center text-center"
                  >
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-secondary mb-5">
                      {meta.icon}
                    </div>
                    <h3 className="text-lg font-bold text-zinc-900 mb-3">
                      {member.title}
                    </h3>
                    <p className="text-sm text-zinc-500 leading-relaxed">
                      {member.desc}
                    </p>
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        {/* ─── Activities ─── */}
        <section className="py-16 md:py-20 bg-white">
          <div className="mx-auto max-w-7xl px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-zinc-900 text-center mb-12">
              {t('community.page.activitiesTitle')}
            </h2>
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
              {(t.raw('community.page.activities') as { month: string; title: string; desc: string }[]).map((call, i) => (
                <div
                  key={i}
                  className="rounded-xl overflow-hidden border bg-white hover:shadow-lg transition-shadow"
                >
                  <div className={`px-6 py-5 ${i % 2 === 0 ? 'bg-primary' : 'bg-secondary'} text-white text-center`}>
                    <p className="text-2xl font-bold leading-tight">{call.month}</p>
                    <p className="text-sm font-medium uppercase tracking-wider opacity-80 mt-1">2026</p>
                  </div>
                  <div className="p-6 md:p-8">
                    <h3 className="text-xl font-bold text-zinc-900 mb-3">
                      {call.title}
                    </h3>
                    <p className="text-base text-zinc-500 leading-relaxed">
                      {call.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}

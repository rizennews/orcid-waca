import { getTranslations } from 'next-intl/server'
import type { Metadata } from 'next'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import AmbassadorGrid from '@/components/AmbassadorGrid'
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
    title: t('ambassadors.page.title'),
    description: t('ambassadors.page.subtitle'),
    alternates: {
      canonical: `${siteUrl}/${locale}/ambassadors`,
      languages: Object.fromEntries(
        routing.locales.map(l => [l, `${siteUrl}/${l}/ambassadors`])
      ),
    },
    openGraph: {
      title: t('ambassadors.page.title'),
      description: t('ambassadors.page.subtitle'),
      url: `${siteUrl}/${locale}/ambassadors`,
      siteName: site('title'),
      locale: locale === 'fr' ? 'fr_FR' : locale === 'pt' ? 'pt_PT' : 'en_US',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: t('ambassadors.page.title'),
      description: t('ambassadors.page.subtitle'),
    },
    robots: { index: true, follow: true },
    keywords: ['ORCID ambassadors', 'PID ambassadors', 'WACREN', 'ORCID-WACA', 'West Africa', 'Central Africa', 'researcher advocacy'],
  }
}

export default async function AmbassadorsPage({
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
          <div className="mx-auto max-w-4xl px-4 py-12 md:py-20 text-center">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
              {t('ambassadors.page.title')}
            </h1>
            <p className="text-base md:text-lg text-white/75 max-w-3xl mx-auto leading-relaxed">
              {t('ambassadors.page.subtitle')}
            </p>
          </div>
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-white/5" />
            <div className="absolute -bottom-32 -left-32 w-[32rem] h-[32rem] rounded-full bg-white/5" />
          </div>
        </section>

        {/* ─── What is the Programme ─── */}
        <section className="py-16 md:py-20 bg-white">
          <div className="mx-auto max-w-6xl px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-zinc-900 text-center mb-12">
              {t('ambassadors.page.whatTitle')}
            </h2>
            <div
              className="text-zinc-600 leading-relaxed whitespace-pre-line"
              dangerouslySetInnerHTML={{ __html: t.raw('ambassadors.page.intro') }}
            />
          </div>
        </section>

        {/* ─── What will Ambassadors do ─── */}
        <section className="bg-zinc-50 py-16 md:py-20">
          <div className="mx-auto max-w-7xl px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-zinc-900 text-center mb-12">
              {t('ambassadors.page.doTitle')}
            </h2>
            <div className="grid sm:grid-cols-2 gap-6">
              {[
                {
                  icon: (
                    <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="3" y="3" width="18" height="14" rx="2" ry="2" />
                      <line x1="8" y1="21" x2="16" y2="21" />
                      <line x1="12" y1="17" x2="12" y2="21" />
                    </svg>
                  ),
                },
                {
                  icon: (
                    <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                      <polyline points="9 22 9 12 15 12 15 22" />
                    </svg>
                  ),
                },
                {
                  icon: (
                    <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                      <circle cx="9" cy="7" r="4" />
                      <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                    </svg>
                  ),
                },
                {
                  icon: (
                    <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                      <line x1="12" y1="8" x2="12" y2="14" />
                      <line x1="9" y1="11" x2="15" y2="11" />
                    </svg>
                  ),
                },
              ].map((meta, i) => {
                const item = (t.raw('ambassadors.page.doItems') as { title: string; desc: string }[])[i]
                return (
                  <div
                    key={i}
                    className="rounded-xl border bg-white p-6 md:p-8 hover:shadow-lg transition-shadow"
                  >
                    <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center text-secondary mb-5">
                      {meta.icon}
                    </div>
                    <h3 className="text-lg font-bold text-zinc-900 mb-3">
                      {item.title}
                    </h3>
                    <p className="text-sm text-zinc-500 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        {/* ─── Expected Outcomes ─── */}
        <section className="py-16 md:py-20 bg-white">
          <div className="mx-auto max-w-7xl px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-zinc-900 text-center mb-12">
              {t('ambassadors.page.outcomesTitle')}
            </h2>
            <div className="grid sm:grid-cols-2 gap-6">
              {[
                {
                  icon: (
                    <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="10" />
                      <circle cx="12" cy="12" r="6" />
                      <circle cx="12" cy="12" r="2" />
                    </svg>
                  ),
                },
                {
                  icon: (
                    <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                    </svg>
                  ),
                },
                {
                  icon: (
                    <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                      <circle cx="9" cy="7" r="4" />
                      <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
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
                const item = (t.raw('ambassadors.page.outcomesItems') as { title: string; desc: string }[])[i]
                return (
                  <div
                    key={i}
                    className="rounded-xl border bg-white p-6 md:p-8 hover:shadow-lg transition-shadow"
                  >
                    <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center text-secondary mb-5">
                      {meta.icon}
                    </div>
                    <h3 className="text-lg font-bold text-zinc-900 mb-3">
                      {item.title}
                    </h3>
                    <p className="text-sm text-zinc-500 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        {/* ─── Ambassador Cards ─── */}
        <section className="bg-zinc-50 py-16 md:py-20">
          <div className="mx-auto max-w-7xl px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-zinc-900 text-center mb-12">
              {t('ambassadors.page.ambassadorListTitle')}
            </h2>
            <AmbassadorGrid ambassadors={t.raw('ambassadors.page.ambassadorList')} />
          </div>
        </section>

        {/* ─── CTA ─── */}
        <section className="bg-gradient-to-br from-primary to-primary-dark text-white py-16 md:py-20">
          <div className="mx-auto max-w-3xl px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              {t('home.cta.title')}
            </h2>
            <p className="text-white/75 text-lg mb-8">
              {t('home.cta.subtitle')}
            </p>
            <a
              href="https://groups.google.com/a/ren.africa/g/orcid-waca"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-11 items-center justify-center rounded-full bg-secondary px-6 text-sm font-semibold text-white hover:bg-secondary-dark transition-colors"
            >
              {t('home.cta.button')}
            </a>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}

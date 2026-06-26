import { getTranslations } from 'next-intl/server'
import type { Metadata } from 'next'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Timeline from '@/components/Timeline'
import FAQ from '@/components/FAQ'
import FadeIn from '@/components/FadeIn'
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
    title: t('home.hero.title'),
    description: t('home.hero.subtitle'),
    alternates: {
      canonical: `${siteUrl}/${locale}`,
      languages: Object.fromEntries(
        routing.locales.map(l => [l, `${siteUrl}/${l}`])
      ),
    },
    openGraph: {
      title: t('home.hero.title'),
      description: t('home.hero.subtitle'),
      url: `${siteUrl}/${locale}`,
      siteName: site('title'),
      locale: locale === 'fr' ? 'fr_FR' : locale === 'pt' ? 'pt_PT' : 'en_US',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: t('home.hero.title'),
      description: t('home.hero.subtitle'),
    },
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 },
    },
    keywords: ['ORCID', 'WACREN', 'West Africa', 'Central Africa', 'researcher identity', 'persistent identifiers', 'ORCID-WACA'],
  }
}

export default async function HomePage({
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
            <FadeIn delay={0.1}>
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
                {t('home.hero.title')}
              </h1>
            </FadeIn>
            <FadeIn delay={0.2}>
              <p className="text-base md:text-lg text-white/75 max-w-2xl mx-auto mb-10 leading-relaxed">
                {t('home.hero.subtitle')}
              </p>
            </FadeIn>
            <FadeIn delay={0.3}>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <a
                  href="https://groups.google.com/a/ren.africa/g/orcid-waca"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-12 items-center justify-center rounded-full bg-secondary px-8 text-sm font-semibold text-white hover:bg-secondary-dark transition-colors"
              >
                {t('nav.joinCop')}
              </a>
              <a
                href="https://orcid.org/register"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-12 items-center justify-center rounded-full border-2 border-white px-8 text-sm font-semibold text-white hover:bg-white/10 transition-colors"
              >
                {t('nav.createOrcid')}
              </a>
            </div>
            </FadeIn>
          </div>
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-white/5" />
            <div className="absolute -bottom-32 -left-32 w-[32rem] h-[32rem] rounded-full bg-white/5" />
          </div>
        </section>

        {/* ─── Stats ─── */}
        <section className="bg-white py-16">
          <div className="mx-auto max-w-6xl px-4 text-center">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-10">
              {[
                { value: '15', key: 'ambassadors' },
                { value: '300+', key: 'members' },
                { value: '30+', key: 'engagements' },
                { value: '1000+', key: 'researchers' },
              ].map((stat) => (
                <div
                  key={stat.key}
                  className="rounded-xl border border-primary/20 border-primary/20 bg-white p-6 md:p-8 hover:shadow-lg transition-shadow"
                >
                  <p className="text-4xl font-bold text-primary mb-2">
                    {stat.value}
                  </p>
                  <p className="text-sm text-zinc-500 leading-tight">
                    {t(`home.stats.${stat.key}`)}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── About ─── */}
        <section className="py-10 md:py-14 bg-white">
          <FadeIn className="mx-auto max-w-6xl px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-zinc-900 text-center mb-12">
              {t('home.about.title')}
            </h2>
            <div
              className="text-zinc-600 leading-relaxed whitespace-pre-line"
              dangerouslySetInnerHTML={{ __html: t.raw('home.about.body') }}
            />
            <a
              href={`/${locale}/about`}
              className="mt-8 inline-flex h-11 items-center justify-center rounded-full bg-secondary px-6 text-sm font-semibold text-white hover:bg-secondary-dark transition-colors"
            >
              {t('home.about.readMore')}
            </a>
          </FadeIn>
        </section>

        {/* ─── Our Initiatives ─── */}
        <section className="py-16 md:py-20 bg-zinc-50">
          <div className="mx-auto max-w-7xl px-4 text-center">
            <FadeIn>
              <h2 className="text-3xl md:text-4xl font-bold text-zinc-900 mb-12">
                {t('home.features.title')}
              </h2>
            </FadeIn>
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8">
              {[
                {
                  key: 'ambassadors',
                  href: `/${locale}/ambassadors`,
                  target: undefined,
                  icon: (
                    <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
                      <path d="M6 12v5c3 3 9 3 12 0v-5" />
                    </svg>
                  ),
                },
                {
                  key: 'community',
                  href: 'https://groups.google.com/a/ren.africa/g/orcid-waca',
                  target: '_blank',
                  icon: (
                    <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                      <circle cx="9" cy="7" r="4" />
                      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                    </svg>
                  ),
                },
                {
                  key: 'workshops',
                  href: '#',
                  target: undefined,
                  icon: (
                    <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                      <line x1="16" y1="2" x2="16" y2="6" />
                      <line x1="8" y1="2" x2="8" y2="6" />
                      <line x1="3" y1="10" x2="21" y2="10" />
                    </svg>
                  ),
                },
              ].map((card, idx) => (
                <FadeIn key={card.key} delay={0.1 * idx}>
                  <div
                    className="rounded-xl border border-primary/20 border-primary/20 bg-white p-6 md:p-8 text-left flex flex-col hover:shadow-lg transition-shadow h-full"
                  >
                  <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center text-secondary mb-5">
                    {card.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-zinc-900 mb-3">
                    {t(`home.features.${card.key}.title`)}
                  </h3>
                  <p className="text-sm text-zinc-500 leading-relaxed flex-1 mb-6">
                    {t(`home.features.${card.key}.desc`)}
                  </p>
                  <a
                    href={card.href}
                    target={card.target}
                    rel={card.target === '_blank' ? 'noopener noreferrer' : undefined}
                    className="inline-flex self-start h-10 items-center justify-center rounded-full bg-secondary px-5 text-sm font-semibold text-white hover:bg-secondary-dark transition-colors"
                  >
                    {t(`home.features.${card.key}.cta`)}
                  </a>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>

        {/* ─── Benefits ─── */}
        <section className="py-16 md:py-20 bg-white">
          <div className="mx-auto max-w-7xl px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-zinc-900 text-center mb-12">
              {t('home.benefits.title')}
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  key: 'ambiguity',
                  icon: (
                    <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="10" />
                      <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
                      <line x1="12" y1="17" x2="12.01" y2="17" />
                    </svg>
                  ),
                },
                {
                  key: 'time',
                  icon: (
                    <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="10" />
                      <polyline points="12 6 12 12 16 14" />
                    </svg>
                  ),
                },
                {
                  key: 'visibility',
                  icon: (
                    <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                      <circle cx="12" cy="12" r="3" />
                    </svg>
                  ),
                },
                {
                  key: 'connect',
                  icon: (
                    <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
                      <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
                    </svg>
                  ),
                },
                {
                  key: 'career',
                  icon: (
                    <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                    </svg>
                  ),
                },
                {
                  key: 'privacy',
                  icon: (
                    <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                    </svg>
                  ),
                },
              ].map((item) => (
                <div
                  key={item.key}
                  className="rounded-xl border border-primary/20 border-primary/20 bg-white p-6 hover:shadow-lg transition-shadow"
                >
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-secondary mb-4">
                    {item.icon}
                  </div>
                  <h3 className="text-lg font-semibold text-zinc-900 mb-2">
                    {t(`home.benefits.${item.key}.title`)}
                  </h3>
                  <p className="text-sm text-zinc-500 leading-relaxed">
                    {t(`home.benefits.${item.key}.desc`)}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <Timeline
          title={t('home.timeline.title')}
          entries={t.raw('home.timeline.entries')}
        />

        {/* ─── FAQ ─── */}
        <section className="bg-white py-16 md:py-20">
          <div className="mx-auto max-w-7xl px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-zinc-900 text-center mb-12">
              {t('home.faq.title')}
            </h2>
            <FAQ items={t.raw('home.faq.items')} />
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}

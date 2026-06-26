import { getTranslations } from 'next-intl/server'
import type { Metadata } from 'next'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
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
    title: t('about.page.title'),
    description: t('about.page.subtitle'),
    alternates: {
      canonical: `${siteUrl}/${locale}/about`,
      languages: Object.fromEntries(
        routing.locales.map(l => [l, `${siteUrl}/${l}/about`])
      ),
    },
    openGraph: {
      title: t('about.page.title'),
      description: t('about.page.subtitle'),
      url: `${siteUrl}/${locale}/about`,
      siteName: site('title'),
      locale: locale === 'fr' ? 'fr_FR' : locale === 'pt' ? 'pt_PT' : 'en_US',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: t('about.page.title'),
      description: t('about.page.subtitle'),
    },
    robots: { index: true, follow: true },
    keywords: ['ORCID-WACA', 'about', 'WACREN', 'West Africa', 'Central Africa', 'persistent identifiers', 'research infrastructure'],
  }
}

export default async function AboutPage({
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
                {t('about.page.title')}
              </h1>
            </FadeIn>
            <FadeIn delay={0.2}>
              <p className="text-base md:text-lg text-white/75 max-w-2xl mx-auto leading-relaxed">
                {t('about.page.subtitle')}
              </p>
            </FadeIn>
          </div>
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-white/5" />
            <div className="absolute -bottom-32 -left-32 w-[32rem] h-[32rem] rounded-full bg-white/5" />
          </div>
        </section>

        {/* ─── What is ORCID-WACA ─── */}
        <section className="py-16 md:py-20 bg-white">
          <div className="mx-auto max-w-6xl px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-zinc-900 text-center mb-12">
              {t('home.about.title')}
            </h2>
            <div
              className="text-zinc-600 leading-relaxed whitespace-pre-line"
              dangerouslySetInnerHTML={{ __html: t.raw('home.about.body') }}
            />
          </div>
        </section>

        {/* ─── Why ORCID-WACA Matters ─── */}
        <section className="py-16 md:py-20 bg-zinc-50">
          <div className="mx-auto max-w-7xl px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-zinc-900 text-center mb-12">
              {t('about.page.matters.title')}
            </h2>
            <div className="grid sm:grid-cols-2 gap-8">
              {/* Challenge */}
              <div className="rounded-xl border border-primary/20 bg-white p-8 md:p-10 hover:shadow-lg transition-shadow">
                <div className="w-11 h-11 rounded-xl bg-red-100 flex items-center justify-center text-red-600 mb-6">
                  <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10" />
                    <line x1="12" y1="8" x2="12" y2="12" />
                    <line x1="12" y1="16" x2="12.01" y2="16" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-zinc-900 mb-4">
                  {t('about.page.matters.challenge.title')}
                </h3>
                <p className="text-sm text-zinc-500 mb-6 leading-relaxed">
                  {t('about.page.matters.challenge.intro')}
                </p>
                <ul className="space-y-4">
                  {(t.raw('about.page.matters.challenge.items') as string[]).map((item: string, i: number) => (
                    <li key={i} className="flex gap-3 text-sm text-zinc-600 leading-relaxed">
                      <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-red-400" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Approach */}
              <div className="rounded-xl border border-primary/20 bg-white p-8 md:p-10 hover:shadow-lg transition-shadow">
                <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center text-secondary mb-6">
                  <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                    <polyline points="22 4 12 14.01 9 11.01" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-zinc-900 mb-4">
                  {t('about.page.matters.approach.title')}
                </h3>
                <p className="text-sm text-zinc-500 mb-6 leading-relaxed">
                  {t('about.page.matters.approach.intro')}
                </p>
                <ul className="space-y-4">
                  {(t.raw('about.page.matters.approach.items') as string[]).map((item: string, i: number) => (
                    <li key={i} className="flex gap-3 text-sm text-zinc-600 leading-relaxed">
                      <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-primary" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
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

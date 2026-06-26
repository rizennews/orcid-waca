import { getTranslations } from 'next-intl/server'
import type { Metadata } from 'next'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import NewsGrid from '@/components/NewsGrid'
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
    title: t('updates.page.title'),
    description: t('updates.page.subtitle'),
    alternates: {
      canonical: `${siteUrl}/${locale}/updates`,
      languages: Object.fromEntries(
        routing.locales.map(l => [l, `${siteUrl}/${l}/updates`])
      ),
    },
    openGraph: {
      title: t('updates.page.title'),
      description: t('updates.page.subtitle'),
      url: `${siteUrl}/${locale}/updates`,
      siteName: site('title'),
      locale: locale === 'fr' ? 'fr_FR' : locale === 'pt' ? 'pt_PT' : 'en_US',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: t('updates.page.title'),
      description: t('updates.page.subtitle'),
    },
    robots: { index: true, follow: true },
    keywords: ['ORCID news', 'WACREN updates', 'ORCID-WACA news', 'West Africa', 'Central Africa', 'PID news'],
  }
}

export default async function UpdatesPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const t = await getTranslations({ locale })

  const years = t.raw('updates.years') as string[]
  const posts = t.raw('updates.posts') as Record<string, { title: string; date: string; image: string; slug: string }[]>
  const readMore = t('updates.readMore')

  return (
    <div className="flex flex-col flex-1">
      <Header />

      <main className="flex-1">
        <section className="relative overflow-hidden bg-gradient-to-br from-primary to-primary-dark text-white">
          <div className="mx-auto max-w-4xl px-4 py-12 md:py-20 text-center">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
              {t('updates.page.title')}
            </h1>
            <p className="text-base md:text-lg text-white/75 max-w-3xl mx-auto leading-relaxed">
              {t('updates.page.subtitle')}
            </p>
          </div>
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-white/5" />
            <div className="absolute -bottom-32 -left-32 w-[32rem] h-[32rem] rounded-full bg-white/5" />
          </div>
        </section>

        <NewsGrid years={years} posts={posts} readMore={readMore} />
      </main>

      <Footer />
    </div>
  )
}

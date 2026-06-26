import { getTranslations } from 'next-intl/server'
import type { Metadata } from 'next'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import ResourceHub from '@/components/ResourceHub'
import { routing } from '@/i18n/routing'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale })
  const site = await getTranslations({ locale, namespace: 'site' })
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://orcid.wacren.net'

  return {
    title: t('resources.page.title'),
    description: t('resources.page.subtitle'),
    alternates: {
      canonical: `${siteUrl}/${locale}/resources`,
      languages: Object.fromEntries(
        routing.locales.map(l => [l, `${siteUrl}/${l}/resources`])
      ),
    },
    openGraph: {
      title: t('resources.page.title'),
      description: t('resources.page.subtitle'),
      url: `${siteUrl}/${locale}/resources`,
      siteName: site('title'),
      locale: locale === 'fr' ? 'fr_FR' : locale === 'pt' ? 'pt_PT' : 'en_US',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: t('resources.page.title'),
      description: t('resources.page.subtitle'),
    },
    robots: { index: true, follow: true },
    keywords: ['ORCID resources', 'WACREN', 'ORCID-WACA', 'research tools', 'persistent identifiers', 'training materials'],
  }
}

export default async function ResourcesPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const t = await getTranslations({ locale })
  const hubLabels = t.raw('resources.hub') as Parameters<typeof ResourceHub>[0]['labels']

  return (
    <div className="flex flex-col flex-1">
      <Header />

      <main className="flex-1">
        <section className="relative overflow-hidden bg-gradient-to-br from-primary to-primary-dark text-white">
          <div className="mx-auto max-w-4xl px-4 py-20 md:py-36 text-center">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
              {t('resources.page.title')}
            </h1>
            <p className="text-base md:text-lg text-white/75 max-w-2xl mx-auto leading-relaxed">
              {t('resources.page.subtitle')}
            </p>
          </div>
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-white/5" />
            <div className="absolute -bottom-32 -left-32 w-[32rem] h-[32rem] rounded-full bg-white/5" />
          </div>
        </section>

        <ResourceHub labels={hubLabels} />
      </main>

      <Footer />
    </div>
  )
}

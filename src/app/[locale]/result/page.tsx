import type { Metadata } from 'next'
import Image from 'next/image'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import CountryGraph from '@/components/CountryGraph'
import { routing } from '@/i18n/routing'
import { getTranslations } from 'next-intl/server'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale })
  const siteUrl = 'https://orcid.wacren.net'

  const title = t('result.page.title')
  const description = t('result.page.subtitle')

  return {
    title: `${title} | ORCID-WACA`,
    description,
    alternates: {
      canonical: `${siteUrl}/${locale}/result`,
      languages: Object.fromEntries(
        routing.locales.map((l) => [l, `${siteUrl}/${l}/result`])
      ),
    },
    openGraph: {
      title,
      description,
      url: `${siteUrl}/${locale}/result`,
      siteName: 'ORCID-WACA',
      locale: locale === 'fr' ? 'fr_FR' : locale === 'pt' ? 'pt_PT' : 'en_US',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
    robots: { index: true, follow: true },
    keywords: [
      'ORCID-WACA results',
      'African research visibility',
      'ORCID adoption metrics',
      'WACREN impact',
      'persistent identifiers Africa',
      'training results',
    ],
  }
}

export default async function ResultPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const t = await getTranslations({ locale })

  const stats = t.raw('result.page.stats') as {
    value: string
    label: string
    sub: string
  }[]

  const objectives = t.raw('result.page.objectives') as {
    num: string
    title: string
    detail: string
    status: string
  }[]

  const recordMetrics = t.raw('result.page.recordMetrics') as {
    value: string
    label: string
    sub: string
  }[]

  const priorities = t.raw('result.page.copCard.priorities') as {
    label: string
    percent: number
  }[]

  const testimonials = t.raw('result.page.testimonials') as {
    quote: string
    role: string
    country: string
    code: string
  }[]

  const milestones = t.raw('result.page.milestones') as {
    period: string
    title: string
    desc: string
  }[]

  const anglophoneCountries = (t.raw('result.page.ambassadorsCard.anglophoneCountries') as {
    name: string
    code: string
  }[]) || [
    { name: 'Nigeria', code: 'ng' },
    { name: 'Ghana', code: 'gh' },
    { name: 'Cameroon', code: 'cm' },
    { name: 'The Gambia', code: 'gm' },
  ]

  const francophoneCountries = (t.raw('result.page.ambassadorsCard.francophoneCountries') as {
    name: string
    code: string
  }[]) || [
    { name: 'Benin', code: 'bj' },
    { name: 'Burkina Faso', code: 'bf' },
    { name: "Côte d'Ivoire", code: 'ci' },
    { name: 'Mali', code: 'ml' },
    { name: 'Senegal', code: 'sn' },
    { name: 'Togo', code: 'tg' },
  ]

  return (
    <div className="flex flex-col flex-1">
      <Header />

      <main className="flex-1">
        {/* ─── Hero ─── */}
        <section className="relative overflow-hidden bg-gradient-to-br from-primary to-primary-dark text-white">
          <div className="mx-auto max-w-4xl px-4 py-12 md:py-20 text-center">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-4">
              {t('result.page.title')}
            </h1>
            <p className="text-base md:text-lg text-white/75 max-w-3xl mx-auto leading-relaxed mb-6">
              {t('result.page.subtitle')}
            </p>

            {/* Pure Typography Metric (No card / No box) */}
            <div className="mt-8 pt-6 border-t border-white/15 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-5 text-white">
              <span className="text-4xl sm:text-5xl font-extrabold text-secondary tracking-tight">
                {t('result.page.featuredStat.value')}
              </span>
              <div className="hidden sm:block w-px h-10 bg-white/20" />
              <div className="text-center sm:text-left">
                <p className="text-base sm:text-lg font-semibold text-white leading-tight">
                  {t('result.page.featuredStat.label')}
                </p>
                <p className="text-xs sm:text-sm text-white/75 mt-1">
                  {t('result.page.featuredStat.target')}
                </p>
              </div>
            </div>
          </div>
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-white/5" />
            <div className="absolute -bottom-32 -left-32 w-[32rem] h-[32rem] rounded-full bg-white/5" />
          </div>
        </section>

        {/* ─── Stats ─── */}
        <section className="bg-white py-16">
          <div className="mx-auto max-w-6xl px-4 text-center">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {stats.map((stat, i) => (
                <div
                  key={i}
                  className="rounded-xl border border-primary/20 bg-white p-6 md:p-8 hover:shadow-lg transition-shadow"
                >
                  <p className="text-4xl font-bold text-primary mb-2">
                    {stat.value}
                  </p>
                  <p className="text-sm text-zinc-500 leading-tight">
                    {stat.label}
                  </p>
                  <p className="text-xs text-zinc-400 mt-1">
                    {stat.sub}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── What we set out to do ─── */}
        <section className="bg-zinc-50 py-16 md:py-20">
          <div className="mx-auto max-w-4xl px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-zinc-900 text-center mb-12">
              {t('result.page.objectivesTitle')}
            </h2>
            <div className="divide-y divide-zinc-200">
              {objectives.map((item) => (
                <div
                  key={item.num}
                  className="py-6 first:pt-0 last:pb-0 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                >
                  <div className="flex items-start sm:items-center gap-5">
                    <span className="text-2xl sm:text-3xl font-bold text-primary shrink-0">
                      {item.num}
                    </span>
                    <div>
                      <h3 className="text-base sm:text-lg font-bold text-zinc-900">
                        {item.title}
                      </h3>
                      <p className="text-sm text-zinc-500 mt-0.5">
                        {item.detail}
                      </p>
                    </div>
                  </div>
                  <span
                    className={`self-start sm:self-center shrink-0 inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${
                      item.status === 'In progress' || item.status === 'En cours' || item.status === 'Em curso'
                        ? 'bg-primary/10 text-primary'
                        : 'bg-secondary/15 text-secondary-dark'
                    }`}
                  >
                    {item.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── Participants left with a working ORCID record ─── */}
        <section className="bg-white py-16 md:py-20">
          <div className="mx-auto max-w-6xl px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-zinc-900 text-center mb-4">
              {t('result.page.participantsTitle')}
            </h2>
            <p className="text-base text-zinc-500 text-center max-w-2xl mx-auto mb-12">
              {t('result.page.participantsSubtitle')}
            </p>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Summary Cards */}
              <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-1 gap-6">
                {recordMetrics.map((metric, i) => (
                  <div
                    key={i}
                    className="rounded-xl border border-primary/20 bg-white p-6 md:p-8 hover:shadow-lg transition-shadow"
                  >
                    <p
                      className={`text-4xl md:text-5xl font-bold mb-2 ${
                        i === 0
                          ? 'text-primary'
                          : i === 1
                          ? 'text-secondary'
                          : 'text-zinc-900'
                      }`}
                    >
                      {metric.value}
                    </p>
                    <p className="text-base font-semibold text-zinc-900 leading-snug mb-1">
                      {metric.label}
                    </p>
                    <p className="text-sm text-zinc-500">
                      {metric.sub}
                    </p>
                  </div>
                ))}
              </div>

              {/* Country Breakdown Graph */}
              <div className="lg:col-span-7">
                <CountryGraph />
              </div>
            </div>
          </div>
        </section>

        {/* ─── A bilingual network of champions and practitioners ─── */}
        <section className="bg-zinc-50 py-16 md:py-20">
          <div className="mx-auto max-w-7xl px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-zinc-900 text-center mb-12">
              {t('result.page.networkTitle')}
            </h2>

            <div className="grid md:grid-cols-2 gap-8">
              {/* Ambassadors Card */}
              <div className="rounded-xl border border-primary/20 bg-white p-8 md:p-10 hover:shadow-lg transition-shadow flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-2xl font-bold text-zinc-900">
                      {t('result.page.ambassadorsCard.title')}
                    </h3>
                    <span className="text-xs font-semibold px-3 py-1 rounded-full bg-primary/10 text-primary">
                      {t('result.page.ambassadorsCard.badge')}
                    </span>
                  </div>

                  {/* Top numbers row */}
                  <div className="grid grid-cols-2 gap-4 mb-8">
                    <div>
                      <p className="text-3xl sm:text-4xl font-bold text-primary mb-1">
                        {t('result.page.ambassadorsCard.appsValue')}
                      </p>
                      <p className="text-xs sm:text-sm text-zinc-500">
                        {t('result.page.ambassadorsCard.appsLabel')}
                      </p>
                    </div>
                    <div>
                      <p className="text-3xl sm:text-4xl font-bold text-secondary mb-1">
                        {t('result.page.ambassadorsCard.selectedCount')}
                      </p>
                      <p className="text-xs sm:text-sm text-zinc-500">
                        {t('result.page.ambassadorsCard.selectedLabel')}
                      </p>
                    </div>
                  </div>

                  {/* Bilingual split bar matching screenshot reference */}
                  <div className="mb-8">
                    <div className="w-full flex h-11 rounded-lg overflow-hidden border border-zinc-900/10 shadow-xs">
                      <div className="w-[53.33%] bg-[#006bb6] flex items-center justify-center text-white font-bold text-sm sm:text-base px-3 border-r border-zinc-800">
                        {t('result.page.ambassadorsCard.anglophoneLabel')}
                      </div>
                      <div className="w-[46.67%] bg-[#9bc53d] flex items-center justify-center text-zinc-900 font-semibold text-sm sm:text-base px-3">
                        {t('result.page.ambassadorsCard.francophoneLabel')}
                      </div>
                    </div>
                  </div>

                  {/* Represented Countries - Placed directly under each bar segment */}
                  <div>
                    <p className="text-xs font-bold text-zinc-400 uppercase tracking-wider mb-4">
                      {t('result.page.ambassadorsCard.representedTitle')}
                    </p>
                    <div className="grid grid-cols-2 gap-6 sm:gap-8">
                      {/* Under 8 Anglophone */}
                      <div className="space-y-3">
                        {anglophoneCountries.map((c) => (
                          <div key={c.name} className="flex items-center gap-2.5 text-sm font-medium text-zinc-700">
                            <Image
                              src={`https://flagcdn.com/24x18/${c.code}.png`}
                              alt={c.name}
                              width={18}
                              height={13}
                              className="rounded-xs shadow-xs flex-shrink-0"
                              unoptimized
                            />
                            <span>{c.name}</span>
                          </div>
                        ))}
                      </div>

                      {/* Under 7 Francophone */}
                      <div className="space-y-3">
                        {francophoneCountries.map((c) => (
                          <div key={c.name} className="flex items-center gap-2.5 text-sm font-medium text-zinc-700">
                            <Image
                              src={`https://flagcdn.com/24x18/${c.code}.png`}
                              alt={c.name}
                              width={18}
                              height={13}
                              className="rounded-xs shadow-xs flex-shrink-0"
                              unoptimized
                            />
                            <span>{c.name}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Community of Practice Card */}
              <div className="rounded-xl border border-primary/20 bg-white p-8 md:p-10 hover:shadow-lg transition-shadow flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-2xl font-bold text-zinc-900">
                      {t('result.page.copCard.title')}
                    </h3>
                    <span className="text-xs font-semibold px-3 py-1 rounded-full bg-secondary/15 text-secondary-dark">
                      {t('result.page.copCard.badge')}
                    </span>
                  </div>

                  {/* Top numbers row */}
                  <div className="grid grid-cols-3 gap-4 pb-6 mb-6 border-b border-zinc-100">
                    <div>
                      <p className="text-3xl sm:text-4xl font-bold text-primary mb-1">
                        {t('result.page.copCard.membersValue')}
                      </p>
                      <p className="text-xs sm:text-sm text-zinc-500">
                        {t('result.page.copCard.membersLabel')}
                      </p>
                    </div>
                    <div>
                      <p className="text-3xl sm:text-4xl font-bold text-primary mb-1">
                        {t('result.page.copCard.countriesValue')}
                      </p>
                      <p className="text-xs sm:text-sm text-zinc-500">
                        {t('result.page.copCard.countriesLabel')}
                      </p>
                    </div>
                    <div>
                      <p className="text-3xl sm:text-4xl font-bold text-secondary mb-1">
                        {t('result.page.copCard.regionValue')}
                      </p>
                      <p className="text-xs sm:text-sm text-zinc-500 leading-tight">
                        {t('result.page.copCard.regionLabel')}
                      </p>
                    </div>
                  </div>

                  {/* Members' top priorities */}
                  <div>
                    <p className="text-xs font-bold text-zinc-400 uppercase tracking-wider mb-4">
                      {t('result.page.copCard.prioritiesTitle')}
                    </p>
                    <div className="space-y-4">
                      {priorities.map((priority) => (
                        <div key={priority.label} className="space-y-1.5">
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-zinc-700 font-medium leading-snug">
                              {priority.label}
                            </span>
                            <span className="font-bold text-primary shrink-0 ml-3">
                              {priority.percent}%
                            </span>
                          </div>
                          <div className="w-full bg-zinc-100 h-2 rounded-full overflow-hidden">
                            <div
                              className="h-full rounded-full bg-gradient-to-r from-primary to-secondary"
                              style={{ width: `${priority.percent}%` }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ─── Testimonials ─── */}
        <section className="bg-white py-16 md:py-20">
          <div className="mx-auto max-w-5xl px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-zinc-900 text-center mb-12">
              {t('result.page.testimonialsTitle')}
            </h2>

            <div className="grid md:grid-cols-2 gap-8">
              {testimonials.map((item, i) => (
                <div
                  key={i}
                  className="rounded-xl border border-primary/20 bg-white p-8 md:p-10 hover:shadow-lg transition-shadow flex flex-col justify-between relative"
                >
                  <div>
                    <svg
                      className={`w-8 h-8 mb-4 fill-current ${
                        i === 0 ? 'text-primary/20' : 'text-secondary/30'
                      }`}
                      viewBox="0 0 24 24"
                    >
                      <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                    </svg>
                    <p className="text-xl md:text-2xl font-bold text-zinc-900 leading-snug mb-6">
                      {item.quote}
                    </p>
                  </div>
                  <div className="flex items-center gap-3 pt-4 border-t border-zinc-100">
                    <Image
                      src={`https://flagcdn.com/24x18/${item.code}.png`}
                      alt={item.country}
                      width={20}
                      height={15}
                      className="rounded-xs shadow-xs flex-shrink-0"
                      unoptimized
                    />
                    <div>
                      <p className="text-sm font-semibold text-zinc-900">
                        {item.role}
                      </p>
                      <p className="text-xs text-zinc-500">
                        {item.country}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── From individual iDs to institutional integration ─── */}
        <section className="bg-zinc-50 py-16 md:py-20">
          <div className="mx-auto max-w-6xl px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-zinc-900 text-center mb-12">
              {t('result.page.integrationTitle')}
            </h2>

            <div className="grid md:grid-cols-3 gap-6">
              {milestones.map((item, i) => (
                <div
                  key={i}
                  className="rounded-xl border border-primary/20 bg-white p-6 md:p-8 hover:shadow-lg transition-shadow flex flex-col justify-between"
                >
                  <div>
                    <span className="inline-block rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold tracking-wider text-primary mb-4">
                      {item.period}
                    </span>
                    <h3 className="text-xl font-bold text-zinc-900 mb-2">
                      {item.title}
                    </h3>
                  </div>
                  <p className="text-sm text-zinc-500 leading-relaxed mt-2">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── CTA ─── */}
        <section className="bg-gradient-to-br from-primary to-primary-dark text-white py-16 md:py-20">
          <div className="mx-auto max-w-3xl px-4 text-center">
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-6">
              <a
                href="https://groups.google.com/g/orcid-waca-cop"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-12 items-center justify-center rounded-full bg-secondary px-8 text-sm font-semibold text-white hover:bg-secondary-dark transition-colors"
              >
                {t('result.page.cta.joinButton')}
              </a>
              <a
                href="https://orcid.org/register"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-12 items-center justify-center rounded-full border-2 border-white px-8 text-sm font-semibold text-white hover:bg-white/10 transition-colors"
              >
                {t('result.page.cta.createButton')}
              </a>
            </div>
            <p className="text-xs text-white/70">
              {t('result.page.cta.footnote')}
            </p>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}

import type { Metadata } from 'next'
import Image from 'next/image'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import CountryGraph from '@/components/CountryGraph'
import { routing } from '@/i18n/routing'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const siteUrl = 'https://orcid.wacren.net'

  const title = 'Making African research visible, one ORCID iD at a time'
  const description = 'Ambassadors, a regional community and hands-on training across West and Central Africa.'

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
      locale: 'en_US',
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

export default async function ResultPage() {
  const stats = [
    {
      value: '15',
      label: 'ORCID-WACA Ambassadors',
      sub: 'in 10 countries',
    },
    {
      value: '217',
      label: 'Community of Practice members',
      sub: 'from 24 countries',
    },
    {
      value: '24',
      label: 'training events',
      sub: 'in 7 countries',
    },
    {
      value: '613',
      label: 'ORCID records created or updated',
      sub: 'during hands-on sessions',
    },
  ]

  return (
    <div className="flex flex-col flex-1">
      <Header />

      <main className="flex-1">
        {/* ─── Hero ─── */}
        <section className="relative overflow-hidden bg-gradient-to-br from-primary to-primary-dark text-white">
          <div className="mx-auto max-w-4xl px-4 py-12 md:py-20 text-center">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
              Making African research visible, one ORCID iD at a time
            </h1>
            <p className="text-base md:text-lg text-white/75 max-w-3xl mx-auto leading-relaxed">
              Ambassadors, a regional community and hands-on training across West and Central Africa.
            </p>
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
              What we set out to do
            </h2>
            <div className="divide-y divide-zinc-200">
              {[
                {
                  num: '01',
                  title: 'Train 15 regional Ambassadors',
                  detail: '15 trained, 10 countries',
                  status: 'Achieved',
                },
                {
                  num: '02',
                  title: 'Build a regional Community of Practice',
                  detail: '217 members, 24 countries',
                  status: 'Achieved',
                },
                {
                  num: '03',
                  title: 'Engage 1,000+ people on ORCID',
                  detail: '1,330 engaged',
                  status: 'Exceeded',
                },
                {
                  num: '04',
                  title: 'Lay foundations for a shared ORCID Integration Hub',
                  detail: 'Nigeria ORCID Hub under way',
                  status: 'In progress',
                },
              ].map((item) => (
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
                      item.status === 'In progress'
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
              Participants left with a working ORCID record
            </h2>
            <p className="text-base text-zinc-500 text-center max-w-2xl mx-auto mb-12">
              People engaged, by country and direct outcomes during hands-on sessions.
            </p>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Summary Cards */}
              <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-1 gap-6">
                <div className="rounded-xl border border-primary/20 bg-white p-6 md:p-8 hover:shadow-lg transition-shadow">
                  <p className="text-4xl md:text-5xl font-bold text-primary mb-2">
                    355
                  </p>
                  <p className="text-base font-semibold text-zinc-900 leading-snug mb-1">
                    new ORCID iDs created
                  </p>
                  <p className="text-sm text-zinc-500">
                    during hands-on sessions
                  </p>
                </div>

                <div className="rounded-xl border border-primary/20 bg-white p-6 md:p-8 hover:shadow-lg transition-shadow">
                  <p className="text-4xl md:text-5xl font-bold text-secondary mb-2">
                    258
                  </p>
                  <p className="text-base font-semibold text-zinc-900 leading-snug mb-1">
                    existing ORCID records updated
                  </p>
                  <p className="text-sm text-zinc-500">
                    during hands-on sessions
                  </p>
                </div>

                <div className="rounded-xl border border-primary/20 bg-white p-6 md:p-8 hover:shadow-lg transition-shadow">
                  <p className="text-4xl md:text-5xl font-bold text-zinc-900 mb-2">
                    7
                  </p>
                  <p className="text-base font-semibold text-zinc-900 leading-snug mb-1">
                    countries
                  </p>
                  <p className="text-sm text-zinc-500">
                    Nigeria, Ghana, Togo, Côte d&apos;Ivoire, Benin, Mali, Burkina Faso
                  </p>
                </div>
              </div>

              {/* Country Breakdown Graph */}
              <div className="lg:col-span-7">
                <CountryGraph />
              </div>
            </div>
          </div>
        </section>

        {/* ─── CTA ─── */}
        <section className="bg-gradient-to-br from-primary to-primary-dark text-white py-16 md:py-20">
          <div className="mx-auto max-w-3xl px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Join the Movement
            </h2>
            <p className="text-white/75 text-lg mb-8">
              Be part of the ORCID-WACA community and help drive persistent identifier adoption across West and Central Africa.
            </p>
            <a
              href="https://groups.google.com/g/orcid-waca-cop"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-11 items-center justify-center rounded-full bg-secondary px-6 text-sm font-semibold text-white hover:bg-secondary-dark transition-colors"
            >
              Join the Community of Practice
            </a>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}

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

        {/* ─── A bilingual network of champions and practitioners ─── */}
        <section className="bg-zinc-50 py-16 md:py-20">
          <div className="mx-auto max-w-7xl px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-zinc-900 text-center mb-12">
              A bilingual network of champions and practitioners
            </h2>

            <div className="grid md:grid-cols-2 gap-8">
              {/* Ambassadors Card */}
              <div className="rounded-xl border border-primary/20 bg-white p-8 md:p-10 hover:shadow-lg transition-shadow flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-2xl font-bold text-zinc-900">
                      Ambassadors
                    </h3>
                    <span className="text-xs font-semibold px-3 py-1 rounded-full bg-primary/10 text-primary">
                      10 Countries
                    </span>
                  </div>

                  {/* Top numbers row */}
                  <div className="grid grid-cols-2 gap-4 pb-6 mb-6 border-b border-zinc-100">
                    <div>
                      <p className="text-3xl sm:text-4xl font-bold text-primary mb-1">
                        102
                      </p>
                      <p className="text-xs sm:text-sm text-zinc-500">
                        applications, 20 countries
                      </p>
                    </div>
                    <div>
                      <p className="text-3xl sm:text-4xl font-bold text-secondary mb-1">
                        15
                      </p>
                      <p className="text-xs sm:text-sm text-zinc-500">
                        selected champions
                      </p>
                    </div>
                  </div>

                  {/* Bilingual split */}
                  <div className="flex items-center gap-3 mb-6">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                      8 Anglophone
                    </span>
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-secondary/15 text-secondary-dark text-xs font-semibold">
                      <span className="w-1.5 h-1.5 rounded-full bg-secondary" />
                      7 Francophone
                    </span>
                  </div>

                  {/* Country List */}
                  <div>
                    <p className="text-xs font-bold text-zinc-400 uppercase tracking-wider mb-3">
                      Represented Countries
                    </p>
                    <div className="grid grid-cols-2 gap-2.5">
                      {[
                        { name: 'Nigeria', code: 'ng' },
                        { name: 'Ghana', code: 'gh' },
                        { name: 'Benin', code: 'bj' },
                        { name: 'Burkina Faso', code: 'bf' },
                        { name: 'Cameroon', code: 'cm' },
                        { name: "Côte d'Ivoire", code: 'ci' },
                        { name: 'The Gambia', code: 'gm' },
                        { name: 'Mali', code: 'ml' },
                        { name: 'Senegal', code: 'sn' },
                        { name: 'Togo', code: 'tg' },
                      ].map((c) => (
                        <div key={c.name} className="flex items-center gap-2 text-sm text-zinc-700">
                          <Image
                            src={`https://flagcdn.com/24x18/${c.code}.png`}
                            alt={c.name}
                            width={18}
                            height={13}
                            className="rounded-xs shadow-xs"
                            unoptimized
                          />
                          <span>{c.name}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Community of Practice Card */}
              <div className="rounded-xl border border-primary/20 bg-white p-8 md:p-10 hover:shadow-lg transition-shadow flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-2xl font-bold text-zinc-900">
                      Community of Practice
                    </h3>
                    <span className="text-xs font-semibold px-3 py-1 rounded-full bg-secondary/15 text-secondary-dark">
                      Regional CoP
                    </span>
                  </div>

                  {/* Top numbers row */}
                  <div className="grid grid-cols-3 gap-4 pb-6 mb-6 border-b border-zinc-100">
                    <div>
                      <p className="text-3xl sm:text-4xl font-bold text-primary mb-1">
                        217
                      </p>
                      <p className="text-xs sm:text-sm text-zinc-500">
                        members
                      </p>
                    </div>
                    <div>
                      <p className="text-3xl sm:text-4xl font-bold text-primary mb-1">
                        24
                      </p>
                      <p className="text-xs sm:text-sm text-zinc-500">
                        countries
                      </p>
                    </div>
                    <div>
                      <p className="text-3xl sm:text-4xl font-bold text-secondary mb-1">
                        91%
                      </p>
                      <p className="text-xs sm:text-sm text-zinc-500 leading-tight">
                        from West & Central Africa
                      </p>
                    </div>
                  </div>

                  {/* Members' top priorities */}
                  <div>
                    <p className="text-xs font-bold text-zinc-400 uppercase tracking-wider mb-4">
                      Members&apos; top priorities
                    </p>
                    <div className="space-y-4">
                      {[
                        {
                          label: 'Mapping ORCID and PID adoption in the region',
                          percent: 79,
                        },
                        {
                          label: 'Expert-led special-topic sessions',
                          percent: 73,
                        },
                        {
                          label: 'Learning on research identity and PIDs',
                          percent: 72,
                        },
                      ].map((priority) => (
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
              Voices from the Region
            </h2>

            <div className="grid md:grid-cols-2 gap-8">
              {/* Quote 1 */}
              <div className="rounded-xl border border-primary/20 bg-white p-8 md:p-10 hover:shadow-lg transition-shadow flex flex-col justify-between relative">
                <div>
                  <svg className="w-8 h-8 text-primary/20 mb-4 fill-current" viewBox="0 0 24 24">
                    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                  </svg>
                  <p className="text-xl md:text-2xl font-bold text-zinc-900 leading-snug mb-6">
                    &ldquo;Practical learning, not just talk.&rdquo;
                  </p>
                </div>
                <div className="flex items-center gap-3 pt-4 border-t border-zinc-100">
                  <Image
                    src="https://flagcdn.com/24x18/gh.png"
                    alt="Ghana"
                    width={20}
                    height={15}
                    className="rounded-xs shadow-xs flex-shrink-0"
                    unoptimized
                  />
                  <div>
                    <p className="text-sm font-semibold text-zinc-900">
                      Research support staff
                    </p>
                    <p className="text-xs text-zinc-500">
                      Ghana
                    </p>
                  </div>
                </div>
              </div>

              {/* Quote 2 */}
              <div className="rounded-xl border border-primary/20 bg-white p-8 md:p-10 hover:shadow-lg transition-shadow flex flex-col justify-between relative">
                <div>
                  <svg className="w-8 h-8 text-secondary/30 mb-4 fill-current" viewBox="0 0 24 24">
                    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                  </svg>
                  <p className="text-xl md:text-2xl font-bold text-zinc-900 leading-snug mb-6">
                    &ldquo;I would be glad to be part of the bridge between francophone and anglophone.&rdquo;
                  </p>
                </div>
                <div className="flex items-center gap-3 pt-4 border-t border-zinc-100">
                  <Image
                    src="https://flagcdn.com/24x18/ci.png"
                    alt="Côte d'Ivoire"
                    width={20}
                    height={15}
                    className="rounded-xs shadow-xs flex-shrink-0"
                    unoptimized
                  />
                  <div>
                    <p className="text-sm font-semibold text-zinc-900">
                      Assistant Professor
                    </p>
                    <p className="text-xs text-zinc-500">
                      Côte d&apos;Ivoire
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ─── From individual iDs to institutional integration ─── */}
        <section className="bg-zinc-50 py-16 md:py-20">
          <div className="mx-auto max-w-6xl px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-zinc-900 text-center mb-12">
              From individual iDs to institutional integration
            </h2>

            <div className="grid md:grid-cols-3 gap-6">
              {[
                {
                  period: 'Q4 2026',
                  title: 'Nigeria ORCID Hub',
                  desc: 'Shared integration service led by Eko-Konnect. Covenant University is the first pilot.',
                },
                {
                  period: 'OCTOBER 2026',
                  title: 'Open training resources',
                  desc: 'English/French toolkit released on BAOBAB.',
                },
                {
                  period: 'Q4 2026',
                  title: 'ORCID-WACA White Paper',
                  desc: 'Open access, in English and French.',
                },
              ].map((item, i) => (
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
                Join the Community of Practice
              </a>
              <a
                href="https://orcid.org/register"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-12 items-center justify-center rounded-full border-2 border-white px-8 text-sm font-semibold text-white hover:bg-white/10 transition-colors"
              >
                Create your ORCID iD
              </a>
            </div>
            <p className="text-xs text-white/70">
              Figures as at 30 September 2026. &ldquo;Engaged&rdquo; counts event attendances.
            </p>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}

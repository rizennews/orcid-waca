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
  const site = await getTranslations({ locale, namespace: 'site' })
  const t = await getTranslations({ locale, namespace: 'contact' })
  const siteUrl = 'https://orcid.wacren.net'

  return {
    title: t('page.title'),
    description: t('page.subtitle'),
    alternates: {
      canonical: `${siteUrl}/${locale}/contact`,
      languages: Object.fromEntries(
        routing.locales.map(l => [l, `${siteUrl}/${l}/contact`])
      ),
    },
    openGraph: {
      title: t('page.title'),
      description: t('page.subtitle'),
      url: `${siteUrl}/${locale}/contact`,
      siteName: site('title'),
      locale: locale === 'fr' ? 'fr_FR' : locale === 'pt' ? 'pt_PT' : 'en_US',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: t('page.title'),
      description: t('page.subtitle'),
    },
    robots: { index: true, follow: true },
    keywords: ['Contact ORCID-WACA', 'ORCID support', 'WACREN contact', 'West Africa', 'Central Africa', 'researcher support', 'technical support'],
  }
}

const africanCountryCodes = [
  "DZ", "AO", "BJ", "BW", "BF", "BI", "CV", "CM", "CF", "TD", "KM", "CD", "CG", "DJ", "EG", "GQ", "ER", "SZ", "ET", "GA", "GM", "GH", "GN", "GW", "CI", "KE", "LS", "LR", "LY", "MG", "MW", "ML", "MR", "MU", "MA", "MZ", "NA", "NE", "NG", "RW", "ST", "SN", "SC", "SL", "SO", "ZA", "SS", "SD", "TZ", "TG", "TN", "UG", "ZM", "ZW"
];

const subjectKeys = [
  "general",
  "cop",
  "ambassador",
  "support",
  "training",
  "partnership",
  "technical"
] as const;

const socials = [
  {
    label: 'Twitter / X',
    href: 'https://twitter.com/wacren',
    svg: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/company/west-and-central-african-research-and-education-network/',
    svg: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    label: 'Facebook',
    href: 'https://www.facebook.com/WACRENinfo',
    svg: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
      </svg>
    ),
  },
  {
    label: 'Mastodon',
    href: 'https://mastodon.social/@WACREN',
    svg: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
        <path d="M23.268 5.313c0-3.491-2.273-4.508-2.273-4.508C19.74.319 17.084 0 12.035 0h-.07c-5.049 0-7.705.319-8.96.805 0 0-2.273 1.017-2.273 4.508 0 1.033-.02 2.273-.012 3.512.04 5.991.296 11.898 3.752 13.717 1.454.777 2.703 1.118 4.643 1.19 1.98.078 2.91-.135 4.597-.813 1.032-.384 1.193-1.1 1.193-2.436v-1.17s-2.106.46-3.97.404c-2.08-.062-2.203-1.836-2.203-2.293 0-.458.004-2.196.004-2.196s6.29.775 7.116-1.046c.212-.467.364-1.315.43-2.463.069-1.195.072-2.332.074-3.258z" />
      </svg>
    ),
  },
  {
    label: 'Bluesky',
    href: 'https://bsky.app/profile/wacren.bsky.social',
    svg: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
        <path d="M12 10.8c-1.087-2.114-4.046-6.053-6.798-7.995C2.566.944 1.561 1.25.361 1.574.058 1.655 0 1.856 0 2.1c0 .82.258 4.515.37 5.206.475 2.928 2.2 3.594 3.742 3.326.026-.004.052-.01.078-.016.24-.058.475-.117.684-.152-.597.324-1.465.725-2.316 1.11-1.587.717-2.433 1.73-2.558 3.456-.12 1.636.64 3.144 1.308 3.8.668.655 1.885.917 3.116.676 1.066-.208 2.247-.85 3.396-1.65.256-.179.517-.37.78-.566 0 1.312.112 2.522.59 3.473.478.95 1.232 1.537 2.197 1.78.964.244 2.223.008 3.433-.794.932-.615 1.786-1.565 2.797-2.797 1.082-1.317 2.81-2.206 4.546-2.81 1.737-.603 2.87-1.388 2.87-2.81 0-.728-.423-1.4-1.026-1.88-.603-.48-1.447-.852-2.597-1.18-.436-.125-.9-.234-1.367-.338-.314-.069-.628-.14-.93-.221.09-.024.185-.05.283-.077 1.529-.416 3.208-1.12 3.742-3.326.112-.69.37-4.382.37-5.206 0-.244-.057-.445-.361-.526-1.2-.324-2.205-.63-4.841 1.231C16.046 4.747 13.087 8.686 12 10.8z" />
      </svg>
    ),
  },
]

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'contact' })
  
  const regionNames = new Intl.DisplayNames([locale], { type: 'region' })
  const translatedCountries = africanCountryCodes.map(code => ({
    code,
    name: regionNames.of(code) || code
  })).sort((a, b) => a.name.localeCompare(b.name))
  
  return (
    <div className="flex flex-col flex-1">
      <Header />

      <main className="flex-1 bg-zinc-50">
        {/* ─── Hero ─── */}
        <section className="relative overflow-hidden bg-gradient-to-br from-primary to-primary-dark text-white">
          <div className="mx-auto max-w-4xl px-4 py-12 md:py-20 text-center">
            <FadeIn delay={0.1}>
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
                {t('hero.title')}
              </h1>
            </FadeIn>
            <FadeIn delay={0.2}>
              <p className="text-base md:text-lg text-white/75 max-w-2xl mx-auto leading-relaxed">
                {t('hero.subtitle')}
              </p>
            </FadeIn>
          </div>
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-white/5" />
            <div className="absolute -bottom-32 -left-32 w-[32rem] h-[32rem] rounded-full bg-white/5" />
          </div>
        </section>

        {/* ─── Connect ─── */}
        <section className="py-16 md:py-24">
          <div className="mx-auto max-w-7xl px-4">
            <div className="grid md:grid-cols-3 gap-8">
              {/* Email Us */}
              <FadeIn delay={0.1}>
              <div className="rounded-xl border border-primary/20 bg-white p-8 md:p-10 hover:shadow-lg transition-shadow text-center h-full">
                <div className="w-14 h-14 mx-auto rounded-full bg-primary/10 flex items-center justify-center text-primary mb-6">
                  <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                    <polyline points="22,6 12,13 2,6" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-zinc-900 mb-4">{t('connect.emailUs.title')}</h3>
                <p className="text-sm text-zinc-500 mb-6 leading-relaxed">
                  {t('connect.emailUs.desc')}
                </p>
                <a href="mailto:orcid@wacren.net" className="text-primary font-semibold hover:underline">
                  orcid@wacren.net
                </a>
              </div>
              </FadeIn>

              {/* Visit WACREN */}
              <FadeIn delay={0.2}>
              <div className="rounded-xl border border-primary/20 bg-white p-8 md:p-10 hover:shadow-lg transition-shadow text-center h-full">
                <div className="w-14 h-14 mx-auto rounded-full bg-secondary/10 flex items-center justify-center text-secondary mb-6">
                  <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10" />
                    <line x1="2" y1="12" x2="22" y2="12" />
                    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-zinc-900 mb-4">{t('connect.visit.title')}</h3>
                <p className="text-sm text-zinc-500 mb-6 leading-relaxed">
                  {t('connect.visit.desc')}
                </p>
                <a href="https://wacren.net" target="_blank" rel="noopener noreferrer" className="text-secondary font-semibold hover:underline">
                  wacren.net
                </a>
              </div>
              </FadeIn>

              {/* Follow Us */}
              <FadeIn delay={0.3}>
              <div className="rounded-xl border border-primary/20 bg-white p-8 md:p-10 hover:shadow-lg transition-shadow text-center h-full">
                <div className="w-14 h-14 mx-auto rounded-full bg-zinc-100 flex items-center justify-center text-zinc-600 mb-6">
                  <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="18" cy="5" r="3" />
                    <circle cx="6" cy="12" r="3" />
                    <circle cx="18" cy="19" r="3" />
                    <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
                    <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-zinc-900 mb-4">{t('connect.follow.title')}</h3>
                <p className="text-sm text-zinc-500 mb-6 leading-relaxed">
                  {t('connect.follow.desc')}
                </p>
                <div className="flex flex-wrap items-center justify-center gap-3">
                  {socials.map((s) => (
                    <a
                      key={s.label}
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center w-10 h-10 rounded-full bg-zinc-100 text-zinc-600 hover:bg-primary hover:text-white transition-all"
                      title={s.label}
                    >
                      {s.svg}
                    </a>
                  ))}
                </div>
              </div>
              </FadeIn>
            </div>
          </div>
        </section>

        {/* ─── Contact Form ─── */}
        <section className="py-16 md:py-24 bg-white">
          <div className="mx-auto max-w-4xl px-4">
            <FadeIn delay={0.2} direction="up" className="rounded-2xl border border-primary/20 bg-white shadow-sm p-6 md:p-10">
              <div className="text-center mb-10">
                <h2 className="text-2xl md:text-3xl font-bold text-zinc-900 mb-4">
                  {t('form.title')}
                </h2>
                <p className="text-zinc-500">
                  {t('form.subtitle')}
                </p>
              </div>

              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* First Name */}
                  <div className="space-y-2">
                    <label htmlFor="firstName" className="block text-sm font-medium text-zinc-700">{t('form.firstName')}<span className="text-red-500">*</span></label>
                    <input type="text" id="firstName" name="firstName" required className="w-full rounded-lg border-primary/20 px-4 py-2.5 text-zinc-900 focus:border-primary focus:ring-primary transition-colors border outline-none" />
                  </div>
                  {/* Last Name */}
                  <div className="space-y-2">
                    <label htmlFor="lastName" className="block text-sm font-medium text-zinc-700">{t('form.lastName')}<span className="text-red-500">*</span></label>
                    <input type="text" id="lastName" name="lastName" required className="w-full rounded-lg border-primary/20 px-4 py-2.5 text-zinc-900 focus:border-primary focus:ring-primary transition-colors border outline-none" />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Email */}
                  <div className="space-y-2">
                    <label htmlFor="email" className="block text-sm font-medium text-zinc-700">{t('form.email')}<span className="text-red-500">*</span></label>
                    <input type="email" id="email" name="email" required className="w-full rounded-lg border-primary/20 px-4 py-2.5 text-zinc-900 focus:border-primary focus:ring-primary transition-colors border outline-none" />
                  </div>
                  {/* Institution */}
                  <div className="space-y-2">
                    <label htmlFor="institution" className="block text-sm font-medium text-zinc-700">{t('form.institution')}</label>
                    <input type="text" id="institution" name="institution" className="w-full rounded-lg border-primary/20 px-4 py-2.5 text-zinc-900 focus:border-primary focus:ring-primary transition-colors border outline-none" />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Country */}
                  <div className="space-y-2">
                    <label htmlFor="country" className="block text-sm font-medium text-zinc-700">{t('form.country')}<span className="text-red-500">*</span></label>
                    <select id="country" name="country" defaultValue="" required className="w-full rounded-lg border-primary/20 px-4 py-2.5 text-zinc-900 focus:border-primary focus:ring-primary transition-colors border border-primary/20 outline-none bg-white">
                      <option value="" disabled>{t('form.countryPlaceholder')}</option>
                      {translatedCountries.map(c => <option key={c.code} value={c.name}>{c.name}</option>)}
                    </select>
                  </div>
                  {/* Subject */}
                  <div className="space-y-2">
                    <label htmlFor="subject" className="block text-sm font-medium text-zinc-700">{t('form.subject')}<span className="text-red-500">*</span></label>
                    <select id="subject" name="subject" defaultValue="" required className="w-full rounded-lg border-primary/20 px-4 py-2.5 text-zinc-900 focus:border-primary focus:ring-primary transition-colors border border-primary/20 outline-none bg-white">
                      <option value="" disabled>{t('form.subjectPlaceholder')}</option>
                      {subjectKeys.map(key => <option key={key} value={t(`form.subjects.${key}`)}>{t(`form.subjects.${key}`)}</option>)}
                    </select>
                  </div>
                </div>

                {/* Message */}
                <div className="space-y-2">
                  <label htmlFor="message" className="block text-sm font-medium text-zinc-700">{t('form.message')}<span className="text-red-500">*</span></label>
                  <textarea id="message" name="message" rows={5} required className="w-full rounded-lg border-primary/20 px-4 py-3 text-zinc-900 focus:border-primary focus:ring-primary transition-colors border outline-none resize-y"></textarea>
                </div>

                <div className="pt-4">
                  <button type="submit" className="w-full sm:w-auto px-8 py-3 bg-secondary hover:bg-secondary-dark text-white rounded-full font-semibold transition-colors flex justify-center items-center gap-2">
                    {t('form.submit')}
                  </button>
                </div>
              </form>
            </FadeIn>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}

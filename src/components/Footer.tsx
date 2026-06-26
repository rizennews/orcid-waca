'use client'

import { useTranslations } from 'next-intl'
import { useLocale } from 'next-intl'
import Image from 'next/image'
import Link from 'next/link'

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
  {
    label: 'Email',
    href: 'mailto:orcid@wacren.net',
    svg: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
        <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
      </svg>
    ),
  },
]

export default function Footer() {
  const t = useTranslations()
  const locale = useLocale()

  const quickLinks = [
    { label: t('footer.about'), href: `/${locale}/about` },
    { label: t('footer.ambassadorProgramme'), href: `/${locale}/ambassadors` },
    { label: t('footer.communityPractice'), href: `/${locale}/community` },
    { label: t('footer.resources'), href: `/${locale}/resources` },
  ]

  const resourceLinks = [
    { label: t('footer.gettingStarted'), href: `/${locale}/resources/getting-started` },
    { label: t('footer.benefitsInfographic'), href: `/${locale}/resources/infographic` },
    { label: t('footer.workshopMaterials'), href: `/${locale}/resources/workshops` },
    { label: t('footer.faq'), href: `/${locale}/resources/faq` },
    { label: t('footer.contact'), href: `/${locale}/contact` },
  ]

  return (
    <footer className="bg-zinc-100 text-zinc-500">
      <div className="mx-auto max-w-7xl px-6 md:px-8 py-20 md:py-24">
        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-8 sm:gap-12 md:gap-16">
          {/* Brand */}
          <div className="md:col-span-2">
            <Image
              src="/orcid-waca.png"
              alt="ORCID-WACA"
              width={160}
              height={50}
              className="h-11 w-auto mb-5"
            />
            <p className="text-sm md:text-base text-zinc-600 max-w-md leading-relaxed mb-8">
              {t('footer.tagline')}
            </p>

            <div className="flex flex-wrap items-center gap-3 mb-3">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center w-11 h-11 rounded-full bg-zinc-300 text-zinc-600 hover:bg-primary hover:text-white transition-all"
                  title={s.label}
                >
                  {s.svg}
                </a>
              ))}
            </div>

          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-zinc-900 mb-5">
              {t('footer.quickLinks')}
            </h4>
            <ul className="space-y-3 text-sm md:text-base">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="hover:text-secondary transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="font-semibold text-zinc-900 mb-5">
              {t('footer.resources')}
            </h4>
            <ul className="space-y-3 text-sm md:text-base">
              {resourceLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="hover:text-secondary transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-16 pt-8 border-t border-zinc-300 text-center text-xs md:text-sm text-zinc-500">
          <p>{t('footer.copyright', { year: new Date().getFullYear() })}</p>
        </div>
      </div>
    </footer>
  )
}

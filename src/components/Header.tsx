'use client'

import { useState } from 'react'
import { useTranslations } from 'next-intl'
import { useLocale } from 'next-intl'
import { usePathname, useRouter } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { routing } from '@/i18n/routing'

const flags: Record<string, string> = {
  en: 'gb',
  fr: 'fr',
  pt: 'pt',
}

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const t = useTranslations()
  const locale = useLocale()
  const pathname = usePathname()
  const router = useRouter()

  function switchLocale(next: string) {
    const newPath = pathname.replace(`/${locale}`, `/${next}`)
    router.replace(newPath)
    setMenuOpen(false)
  }

  const links = [
    { key: 'about', href: `/${locale}/about` },
    { key: 'ambassadors', href: `/${locale}/ambassadors` },
    { key: 'community', href: `/${locale}/community` },
    { key: 'resources', href: `/${locale}/resources` },
    { key: 'updates', href: `/${locale}/updates` },
    { key: 'contact', href: `/${locale}/contact` },
  ]

  return (
    <header className="sticky top-0 z-50 w-full border-b border-primary/20 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80">
      <div className="mx-auto max-w-7xl flex items-center justify-between px-4 py-3">
        <Link href={`/${locale}`} className="flex-shrink-0">
          <Image
            src="/orcid-waca.png"
            alt="ORCID-WACA"
            width={160}
            height={50}
            className="h-11 w-auto"
            priority
          />
        </Link>

        <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-zinc-700">
          {links.map((link) => (
            <Link
              key={link.key}
              href={link.href}
              className="hover:text-secondary transition-colors"
            >
              {t(`nav.${link.key}`)}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <div className="hidden sm:flex items-center gap-1 border border-primary/20 rounded-lg px-2 py-1">
            {routing.locales.map((l) => (
              <button
                key={l}
                onClick={() => switchLocale(l)}
                className={`flex items-center px-0.5 rounded transition-opacity ${
                  l === locale ? 'opacity-100' : 'opacity-40 hover:opacity-70'
                }`}
                title={t(`common.${l === 'en' ? 'english' : l === 'fr' ? 'french' : 'portuguese'}`)}
              >
                <Image
                  src={`https://flagcdn.com/24x18/${flags[l]}.png`}
                  alt={l}
                  width={24}
                  height={18}
                  className="rounded-sm"
                  unoptimized
                />
              </button>
            ))}
          </div>

          <a
            href="https://groups.google.com/a/ren.africa/g/orcid-waca"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex items-center justify-center rounded-full bg-secondary px-5 py-2 text-sm font-semibold text-white hover:bg-secondary-dark transition-colors"
          >
            {t('nav.join')}
          </a>

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="lg:hidden flex flex-col gap-1.5 p-2 -mr-2"
            aria-label="Toggle menu"
          >
            <span className={`block h-0.5 w-5 bg-zinc-700 transition-all ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
            <span className={`block h-0.5 w-5 bg-zinc-700 transition-all ${menuOpen ? 'opacity-0' : ''}`} />
            <span className={`block h-0.5 w-5 bg-zinc-700 transition-all ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="lg:hidden border-t border-primary/20 bg-white">
          <nav className="mx-auto max-w-7xl px-4 py-4 flex flex-col gap-3 text-sm font-medium text-zinc-700">
            {links.map((link) => (
              <Link
                key={link.key}
                href={link.href}
                className="hover:text-primary transition-colors py-2"
                onClick={() => setMenuOpen(false)}
              >
                {t(`nav.${link.key}`)}
              </Link>
            ))}
            <hr className="my-2" />
            <div className="flex items-center gap-2">
              <span className="text-xs text-zinc-400">{t('common.language')}:</span>
              {routing.locales.map((l) => (
                <button
                  key={l}
                  onClick={() => switchLocale(l)}
                  className={`flex items-center gap-1.5 px-2 py-1 rounded text-xs transition-opacity ${
                    l === locale ? 'bg-zinc-100 font-semibold' : 'opacity-60'
                  }`}
                >
                  <Image
                    src={`https://flagcdn.com/24x18/${flags[l]}.png`}
                    alt={l}
                    width={18}
                    height={14}
                    className="rounded-sm"
                    unoptimized
                  />
                  {t(`common.${l === 'en' ? 'english' : l === 'fr' ? 'french' : 'portuguese'}`)}
                </button>
              ))}
            </div>
            <a
              href="https://groups.google.com/a/ren.africa/g/orcid-waca"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 inline-flex items-center justify-center rounded-full bg-secondary px-5 py-2.5 text-sm font-semibold text-white"
              onClick={() => setMenuOpen(false)}
            >
              {t('nav.join')}
            </a>
          </nav>
        </div>
      )}
    </header>
  )
}

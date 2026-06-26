import { routing } from '@/i18n/routing'

export default function sitemap() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://orcid.wacren.net'
  const lastModified = new Date()

  const staticPages = ['', 'about', 'ambassadors', 'community', 'resources', 'updates']

  return routing.locales.flatMap((locale) =>
    staticPages.map((page) => ({
      url: `${baseUrl}/${locale}${page ? `/${page}` : ''}`,
      lastModified,
      changeFrequency: page === '' ? 'weekly' as const : 'monthly' as const,
      priority: page === '' ? 1 : 0.8,
    }))
  )
}

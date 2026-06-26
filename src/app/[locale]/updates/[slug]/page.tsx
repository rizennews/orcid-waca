import { notFound } from 'next/navigation'
import { getTranslations } from 'next-intl/server'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import ShareButtons from '@/components/ShareButtons'
import PostImage from '@/components/PostImage'
import { routing } from '@/i18n/routing'
import type { Metadata } from 'next'

interface Post {
  title: string
  date: string
  image: string
  slug: string
  body: string[]
}

const linkPattern = /(https?:\/\/[^\s]+|[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,})/gi

function getBackToListLabel(locale: string) {
  if (locale === 'fr') return 'Retour aux actualites et mises a jour'
  if (locale === 'pt') return 'Voltar as noticias e actualizacoes'
  return 'Back to News & Updates'
}

function renderTextWithLinks(text: string) {
  if (text.includes('<a ')) {
    return (
      <span dangerouslySetInnerHTML={{ __html: text }} />
    )
  }

  const parts = text.split(linkPattern)

  return parts.map((part, index) => {
    if (!part) return null

    const isUrl = /^https?:\/\//i.test(part)
    const isEmail = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(part)

    if (!isUrl && !isEmail) return part

    const href = isUrl ? part : `mailto:${part}`

    return (
      <a
        key={`${part}-${index}`}
        href={href}
        target={isUrl ? '_blank' : undefined}
        rel={isUrl ? 'noopener noreferrer' : undefined}
        className="break-words text-primary underline underline-offset-2 hover:text-primary-dark"
      >
        {part}
      </a>
    )
  })
}

export default async function PostPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>
}) {
  const { locale, slug } = await params
  const t = await getTranslations({ locale })
  const site = await getTranslations({ locale, namespace: 'site' })
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://orcid.wacren.net'

  const posts = t.raw('updates.posts') as Record<string, Post[]>
  const allPosts = Object.values(posts).flat()
  const post = allPosts.find(p => p.slug === slug)
  const backToListLabel = getBackToListLabel(locale)

  if (!post) notFound()

  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.body?.[0]?.slice(0, 160) ?? '',
    image: `${siteUrl}${post.image}`,
    datePublished: post.date,
    author: {
      '@type': 'Organization',
      name: 'WACREN',
      url: 'https://wacren.net',
    },
    publisher: {
      '@type': 'Organization',
      name: site('title'),
      logo: {
        '@type': 'ImageObject',
        url: `${siteUrl}/orcid-waca.png`,
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${siteUrl}/${locale}/updates/${post.slug}`,
    },
  }

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: site('title'), item: `${siteUrl}/${locale}` },
      { '@type': 'ListItem', position: 2, name: t('updates.page.title'), item: `${siteUrl}/${locale}/updates` },
      { '@type': 'ListItem', position: 3, name: post.title },
    ],
  }

  return (
    <div className="flex flex-col flex-1">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <Header />

      <main className="flex-1">
        {/* Back link */}
        <section className="bg-zinc-50 border-b border-zinc-200">
          <div className="mx-auto max-w-4xl px-4 py-4">
            <a
              href={`/${locale}/updates`}
              className="inline-flex items-center gap-1.5 text-sm text-zinc-500 hover:text-primary transition-colors"
            >
              <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="m15 18-6-6 6-6" />
              </svg>
              {backToListLabel}
            </a>
          </div>
        </section>

        {/* Article Content */}
        <article className="mx-auto max-w-4xl px-4 py-12 md:py-16">
          {/* Featured Image */}
          <div className="mb-10">
            <PostImage src={post.image} alt={post.title} />
          </div>

          <header className="mb-10">
            <time className="text-sm text-zinc-400 mb-4 block">
              {post.date}
            </time>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-zinc-900 leading-tight">
              {post.title}
            </h1>
          </header>

          <div className="prose prose-zinc prose-lg max-w-none">
            {(post.body || []).map((paragraph, i) => {
              const isLaunchPost = post.slug === 'wacren-launches-orcid-waca'
              const isAmbassadorCta = isLaunchPost && i === post.body.length - 2
              const isCopCta = isLaunchPost && i === post.body.length - 1
              if (isAmbassadorCta) {
                return (
                  <p key={i} className="mb-4">
                    <a
                      href={`/${locale}/ambassadors`}
                      className="inline-flex items-center gap-2 h-11 rounded-full bg-secondary px-6 text-sm font-semibold text-white hover:bg-secondary-dark transition-colors"
                    >
                      {paragraph}
                      <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M5 12h14" /><path d="m12 5 7 7-7 7" />
                      </svg>
                    </a>
                  </p>
                )
              }
              if (isCopCta) {
                return (
                  <p key={i} className="mb-4">
                    <a
                      href="https://groups.google.com/a/ren.africa/g/orcid-waca"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 h-11 rounded-full bg-primary px-6 text-sm font-semibold text-white hover:bg-primary-dark transition-colors"
                    >
                      {paragraph}
                      <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" /><polyline points="15 3 21 3 21 9" /><line x1="10" y1="14" x2="21" y2="3" />
                      </svg>
                    </a>
                  </p>
                )
              }
              return (
                <p key={i} className="text-base md:text-lg text-zinc-600 leading-relaxed mb-6">
                  {renderTextWithLinks(paragraph)}
                </p>
              )
            })}
          </div>

          <ShareButtons title={post.title} />
        </article>
      </main>

      <Footer />
    </div>
  )
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>
}): Promise<Metadata> {
  const { locale, slug } = await params
  const t = await getTranslations({ locale })
  const site = await getTranslations({ locale, namespace: 'site' })
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://orcid.wacren.net'

  const posts = t.raw('updates.posts') as Record<string, Post[]>
  const allPosts = Object.values(posts).flat()
  const post = allPosts.find(p => p.slug === slug)

  if (!post) return {}

  return {
    title: post.title,
    description: post.body?.[0]?.slice(0, 160) ?? '',
    alternates: {
      canonical: `${siteUrl}/${locale}/updates/${post.slug}`,
      languages: Object.fromEntries(
        routing.locales.map(l => [l, `${siteUrl}/${l}/updates/${post.slug}`])
      ),
    },
    openGraph: {
      title: post.title,
      description: post.body?.[0]?.slice(0, 160) ?? '',
      url: `${siteUrl}/${locale}/updates/${post.slug}`,
      siteName: site('title'),
      locale: locale === 'fr' ? 'fr_FR' : locale === 'pt' ? 'pt_PT' : 'en_US',
      type: 'article',
      publishedTime: post.date,
      images: post.image ? [{ url: `${siteUrl}${post.image}`, width: 1200, height: 675 }] : [],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.body?.[0]?.slice(0, 160) ?? '',
      images: post.image ? [`${siteUrl}${post.image}`] : [],
    },
    robots: { index: true, follow: true },
    keywords: ['ORCID', 'WACREN', 'ORCID-WACA', 'ambassadors', 'West Africa', 'Central Africa', 'persistent identifiers'],
  }
}

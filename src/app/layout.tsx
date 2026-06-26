import { Outfit, Geist_Mono } from 'next/font/google'
import './globals.css'

const outfit = Outfit({
  variable: '--font-outfit',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'ORCID-WACA',
  url: 'https://orcid.wacren.net',
  logo: `${'https://orcid.wacren.net'}/orcid-waca.png`,
  description: 'ORCID in West and Central Africa — connecting researchers to their unique identifier.',
  sameAs: [
    'https://twitter.com/wacren',
    'https://www.linkedin.com/company/wacren',
    'https://www.facebook.com/WACREN',
  ],
}

const websiteJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'ORCID-WACA',
  url: 'https://orcid.wacren.net',
  description: 'ORCID in West and Central Africa — connecting researchers to their unique identifier.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      className={`${outfit.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
      </head>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  )
}

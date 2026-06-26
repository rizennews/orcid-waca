import Link from 'next/link'
import Image from 'next/image'

export const metadata = {
  title: '404 — Page Not Found | ORCID-WACA',
  description: 'The page you are looking for could not be found.',
  robots: { index: false, follow: false },
}

export default function NotFound() {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col items-center justify-center bg-zinc-50 px-4 font-sans antialiased">

        {/* Logo */}
        <Link href="/en" className="mb-10 flex-shrink-0">
          <Image
            src="/orcid-waca.png"
            alt="ORCID-WACA"
            width={140}
            height={40}
            priority
          />
        </Link>

        {/* Big 404 */}
        <p className="text-[7rem] md:text-[10rem] font-extrabold leading-none tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-[#0072BC] to-[#A6CE39] select-none">
          404
        </p>

        {/* Message */}
        <h1 className="mt-4 text-2xl md:text-3xl font-bold text-zinc-900 text-center">
          Page not found
        </h1>
        <p className="mt-3 text-base text-zinc-500 text-center max-w-sm leading-relaxed">
          The page you&rsquo;re looking for doesn&rsquo;t exist or has been moved.
        </p>

        {/* Divider */}
        <div className="mt-8 w-12 h-px bg-zinc-200" />

        {/* Actions */}
        <div className="mt-8 flex flex-col sm:flex-row gap-3">
          <Link
            href="/en"
            className="inline-flex h-11 items-center justify-center rounded-full bg-[#0072BC] px-8 text-sm font-semibold text-white hover:opacity-90 transition-opacity"
          >
            Go home
          </Link>
          <Link
            href="/en/contact"
            className="inline-flex h-11 items-center justify-center rounded-full border-2 border-[#0072BC] px-8 text-sm font-semibold text-[#0072BC] hover:bg-[#0072BC]/5 transition-colors"
          >
            Contact us
          </Link>
        </div>

      </body>
    </html>
  )
}

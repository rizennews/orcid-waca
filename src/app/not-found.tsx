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
      <body style={{
        margin: 0,
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#f9fafb',
        fontFamily: 'system-ui, -apple-system, sans-serif',
        padding: '2rem',
        textAlign: 'center',
      }}>

        {/* Logo */}
        <Link href="/en" style={{ marginBottom: '2.5rem', display: 'inline-block' }}>
          <Image src="/orcid-waca.png" alt="ORCID-WACA" width={140} height={40} priority />
        </Link>

        {/* Big 404 */}
        <p style={{
          fontSize: 'clamp(6rem, 20vw, 10rem)',
          fontWeight: 800,
          lineHeight: 1,
          margin: 0,
          letterSpacing: '-0.04em',
          background: 'linear-gradient(135deg, #0072BC 0%, #A6CE39 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          userSelect: 'none',
        }}>
          404
        </p>

        {/* Heading */}
        <h1 style={{
          marginTop: '1rem',
          fontSize: '1.75rem',
          fontWeight: 700,
          color: '#111827',
          letterSpacing: '-0.01em',
        }}>
          Page not found
        </h1>

        {/* Description */}
        <p style={{
          marginTop: '0.75rem',
          fontSize: '1rem',
          color: '#6b7280',
          maxWidth: '360px',
          lineHeight: '1.6',
        }}>
          The page you&rsquo;re looking for doesn&rsquo;t exist or has been moved.
        </p>

        {/* Divider */}
        <div style={{ marginTop: '2rem', width: '3rem', height: '1px', background: '#e5e7eb' }} />

        {/* Actions */}
        <div style={{ marginTop: '2rem', display: 'flex', gap: '0.75rem', flexWrap: 'wrap', justifyContent: 'center' }}>
          <Link href="/en" style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: '2.75rem',
            borderRadius: '9999px',
            backgroundColor: '#0072BC',
            padding: '0 2rem',
            fontSize: '0.875rem',
            fontWeight: 600,
            color: '#fff',
            textDecoration: 'none',
          }}>
            Go home
          </Link>
          <Link href="/en/contact" style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: '2.75rem',
            borderRadius: '9999px',
            border: '2px solid #0072BC',
            padding: '0 2rem',
            fontSize: '0.875rem',
            fontWeight: 600,
            color: '#0072BC',
            textDecoration: 'none',
            backgroundColor: 'transparent',
          }}>
            Contact us
          </Link>
        </div>

      </body>
    </html>
  )
}

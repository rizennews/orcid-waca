import { defineRouting } from 'next-intl/routing'

export const routing = defineRouting({
  locales: ['en', 'fr', 'pt'],
  defaultLocale: 'en',
  localePrefix: 'always',
  localeDetection: true,
  alternateLinks: true,
})

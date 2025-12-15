import type { Metadata } from 'next'
import './globals.css'
import ReCaptchaProvider from '../components/providers/ReCaptchaProvider'
import { GoogleAnalytics, GoogleTagManager, MicrosoftClarity } from '../components/analytics'

export const metadata: Metadata = {
  title: 'Patty | Your AI Co-founder for Execution',
  description: 'Your AI Co-founder for Execution',
  icons: {
    icon: [
      { url: '/favicon-96x96.png', sizes: '96x96', type: 'image/png' },
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/favicon.ico' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
    shortcut: ['/favicon.ico'],
  },
  manifest: '/site.webmanifest',
  appleWebApp: {
    title: 'Patty',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <body className="bg-black min-h-screen selection:bg-white/20 selection:text-white flex flex-col">
        <GoogleTagManager />
        <GoogleAnalytics />
        <MicrosoftClarity />
        <ReCaptchaProvider>
          {children}
        </ReCaptchaProvider>
      </body>
    </html>
  )
}


import type { Metadata } from 'next'
import './globals.css'
import Script from 'next/script'

export const metadata: Metadata = {
  title: 'Patty | Your AI Co-founder for Execution',
  description: 'Your AI Co-founder for Execution',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <body className="bg-black min-h-screen selection:bg-white/20 selection:text-white flex flex-col">
        <Script
          src="https://www.google.com/recaptcha/api.js?render=6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI"
          strategy="lazyOnload"
        />
        {children}
      </body>
    </html>
  )
}


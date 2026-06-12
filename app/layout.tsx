import type { Metadata } from 'next'
import './globals.css'
import Frame from '@/components/Frame'
import { ActiveSectionProvider } from '@/components/ActiveSectionContext'
import { IntroProvider } from '@/context/IntroContext'

export const metadata: Metadata = {
  title: 'YN | Cinematic Noir Portfolio',
  description: 'Cinematic Noir Portfolio built with Next.js',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400&family=EB+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400&family=Space+Mono:ital,wght@0,400;0,700;1,400;1,700&family=DM+Mono:ital,wght@0,400;0,500;1,400&family=Unica+One&family=Inter:wght@400;500&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,300,0,0&display=swap" rel="stylesheet" />
      </head>
      <body className="bg-background text-on-surface antialiased selection:bg-primary selection:text-background relative">
        <IntroProvider>
          <ActiveSectionProvider>
            <div className="film-grain"></div>
            <Frame />
            <main className="w-full">
              {children}
            </main>
          </ActiveSectionProvider>
        </IntroProvider>
      </body>
    </html>
  )
}

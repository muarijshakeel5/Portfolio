import type { Metadata } from 'next'
import { Cormorant_Garamond, Space_Mono, Unica_One, Inter } from 'next/font/google'
import './globals.css'
import Frame from '@/components/Frame'
import { ActiveSectionProvider } from '@/components/ActiveSectionContext'
import SectionObserver from '@/components/SectionObserver'
import { IntroProvider } from '@/context/IntroContext'

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  style: ['normal', 'italic'],
  variable: '--font-cormorant',
  display: 'swap',
});



const spaceMono = Space_Mono({
  subsets: ['latin'],
  weight: ['400', '700'],
  style: ['normal', 'italic'],
  variable: '--font-space-mono',
  display: 'swap',
});



const unicaOne = Unica_One({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-unica-one',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Muarij Shakeel | Full-Stack Developer & Business Development Lead',
  description: 'Cinematic portfolio of Muarij Shakeel — Full-Stack Developer and Business Development Lead specializing in brutalist aesthetics and hyper-performant engineering.',
  openGraph: {
    title: 'Muarij Shakeel | Full-Stack Developer',
    description: 'Cinematic portfolio of Muarij Shakeel',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,300,0,0&display=swap" rel="stylesheet" />
      </head>
      <body className={`${cormorant.variable} ${spaceMono.variable} ${unicaOne.variable} ${inter.variable} bg-background text-on-surface antialiased selection:bg-primary selection:text-background relative`}>
        <a href="#hero" className="sr-only focus:not-sr-only focus:absolute focus:z-[9999] focus:bg-primary focus:text-background focus:p-4">Skip to content</a>
        <IntroProvider>
          <ActiveSectionProvider>
            <SectionObserver />
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

import { Syne, Archivo } from 'next/font/google'
import './globals.css'
import LenisProvider from '@/components/LenisProvider'
import { ThemeProvider } from '@/components/ThemeProvider'

const syne = Syne({
  subsets: ['latin'],
  variable: '--font-syne',
  display: 'swap',
})

const archivo = Archivo({
  subsets: ['latin'],
  variable: '--font-archivo',
  display: 'swap',
})

export const metadata = {
  metadataBase: new URL('https://www.accemberg.com'),
  title: {
    default: 'Accemberg — Empowering Innovation for Enterprise IT',
    template: '%s | Accemberg',
  },
  description:
    'Accemberg Products & Services is a hybrid venture studio delivering enterprise software, SaaS products, and full-stack engineering services for ambitious organisations.',
  keywords: [
    'enterprise software',
    'SaaS development',
    'IT consulting',
    'full-stack development',
    'system architecture',
    'cloud infrastructure',
    'Accemberg',
  ],
  authors: [{ name: 'Accemberg Products & Services' }],
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/logo-transparent-new.png',
  },
  openGraph: {
    title: 'Accemberg — Empowering Innovation for Enterprise IT',
    description:
      'A hybrid venture studio building scalable products and delivering world-class engineering services simultaneously.',
    url: 'https://www.accemberg.com',
    siteName: 'Accemberg',
    type: 'website',
    locale: 'en_US',
    images: [
      {
        url: '/hero-bg.png',
        width: 1024,
        height: 1024,
        alt: 'Accemberg — Engineering-first Venture Studio',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Accemberg — Empowering Innovation for Enterprise IT',
    description:
      'A hybrid venture studio building scalable products and delivering world-class engineering services simultaneously.',
    images: ['/hero-bg.png'],
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${syne.variable} ${archivo.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  document.documentElement.classList.add('js-enabled');
                  var theme = localStorage.getItem('theme') || 'light';
                  document.documentElement.setAttribute('data-theme', theme);
                  // Always show preloader now
                } catch (e) {}
              })();
            `,
          }}
        />
      </head>
      <body>
        <ThemeProvider>
          <LenisProvider>
            {children}
          </LenisProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}

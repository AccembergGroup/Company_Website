import { Space_Grotesk, Inter } from 'next/font/google'
import './globals.css'
import LenisProvider from '@/components/LenisProvider'
import CustomCursor from '@/components/CustomCursor'
import { ThemeProvider } from '@/components/ThemeProvider'

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
  display: 'swap',
})

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata = {
  title: 'Accemberg — Empowering Innovation for Enterprise IT',
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
  openGraph: {
    title: 'Accemberg — Empowering Innovation for Enterprise IT',
    description:
      'A hybrid venture studio building scalable products and delivering world-class engineering services simultaneously.',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Accemberg — Empowering Innovation for Enterprise IT',
    description:
      'A hybrid venture studio building scalable products and delivering world-class engineering services simultaneously.',
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
      className={`${spaceGrotesk.variable} ${inter.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  document.documentElement.classList.add('js-enabled');
                  var theme = localStorage.getItem('theme') || 'dark';
                  document.documentElement.setAttribute('data-theme', theme);
                  if (sessionStorage.getItem('acc_intro_seen_v3')) {
                    document.documentElement.classList.add('preloader-skipped');
                  }
                } catch (e) {}
              })();
            `,
          }}
        />
      </head>
      <body>
        <ThemeProvider>
          <CustomCursor />
          <LenisProvider>
            {children}
          </LenisProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}

import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import { Toaster } from '@/components/ui/sonner';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://officialtarun.in'),
  title: {
    default: 'Official Tarun | WhatsApp & Email Marketing Services',
    template: '%s | Official Tarun',
  },
  description:
    'Boost your business with professional WhatsApp and Email Marketing services. Bulk email campaigns, WhatsApp automation, lead generation, customer engagement, and marketing solutions.',

  keywords: [
    'WhatsApp Marketing',
    'Email Marketing',
    'Bulk Email Service',
    'Marketing Automation',
    'Lead Generation',
    'Email Campaigns',
    'WhatsApp Automation',
    'Digital Marketing',
    'Business Promotion',
    'Official Tarun',
  ],

  authors: [
    {
      name: 'Tarun Kumar',
      url: 'https://officialtarun.in',
    },
  ],

  creator: 'Tarun Kumar',
  publisher: 'Official Tarun',

  openGraph: {
    title: 'Official Tarun | WhatsApp & Email Marketing Services',
    description: 'Grow your business with bulk email campaigns and WhatsApp marketing automation.',
    url: 'https://officialtarun.in',
    siteName: 'Official Tarun',
    type: 'website',
    locale: 'en_IN',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Official Tarun - WhatsApp & Email Marketing',
      },
    ],
  },

  twitter: {
    card: 'summary_large_image',
    title: 'Official Tarun | WhatsApp & Email Marketing Services',
    description: 'Professional WhatsApp and Email Marketing solutions for businesses.',
    images: ['/og-image.jpg'],
  },

  robots: {
    index: true,
    follow: true,
  },

  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },

  category: 'Marketing',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
      <body className="min-h-screen bg-background text-foreground">
        {children}
        <Toaster richColors position="top-right" />
      </body>
    </html>
  );
}

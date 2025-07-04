import type {Metadata} from 'next';
import './globals.css';
import { cn } from '@/lib/utils';
import Header from '@/components/header';
import Footer from '@/components/footer';
import { Toaster } from '@/components/ui/toaster';
import Script from 'next/script';

export const metadata: Metadata = {
  title: 'CineLink Hub',
  description: 'Download the latest movies and web series.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&family=PT+Sans:wght@400;700&family=Source+Code+Pro&display=swap" rel="stylesheet" />
      </head>
      <body className={cn('font-body antialiased min-h-screen bg-background flex flex-col')}>
        <Header />
        <main className="flex-grow">{children}</main>
        <Footer />
        <Toaster />
        <Script id="ad-script-d51fae" type="text/javascript" src="//unhealthyirreparable.com/d5/1f/ae/d51fae18f343c883880c3ae7f62b9cdb.js" strategy="lazyOnload" />
        <Script id="ad-script-1235aa" type="text/javascript" src="//unhealthyirreparable.com/12/35/aa/1235aa99934d768925bb4f2f03375fe4.js" strategy="lazyOnload" />
      </body>
    </html>
  );
}

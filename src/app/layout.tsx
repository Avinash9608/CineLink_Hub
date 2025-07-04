import type {Metadata} from 'next';
import './globals.css';
import { cn } from '@/lib/utils';
import { Toaster } from '@/components/ui/toaster';
import ConditionalHeader from '@/components/conditional-header';
import ConditionalFooter from '@/components/conditional-footer';
import ConditionalAdScripts from '@/components/conditional-ad-scripts';
import { ThemeProvider } from '@/components/theme-provider';

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
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&family=PT+Sans:wght@400;700&family=Source+Code+Pro&display=swap" rel="stylesheet" />
        <meta name="google-site-verification" content="UdoUs0WK09Zw685atDnmJbS6ALuBn6BioaCO1qwu0s8" />
      </head>
      <body className={cn('font-body antialiased min-h-screen bg-background flex flex-col')}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <ConditionalHeader />
          <main className="flex-grow">{children}</main>
          <ConditionalFooter />
          <Toaster />
          <ConditionalAdScripts />
        </ThemeProvider>
      </body>
    </html>
  );
}

import Link from 'next/link';
import { Film } from 'lucide-react';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen bg-muted/40">
      <header className="bg-card border-b sticky top-0 z-40">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center gap-2">
              <Film className="h-8 w-8 text-primary" />
              <span className="font-headline text-2xl font-bold text-foreground">
                CineLink Hub - Admin
              </span>
            </Link>
          </div>
        </div>
      </header>
      <main className="flex-grow">{children}</main>
      <footer className="bg-card border-t mt-auto">
         <div className="container mx-auto px-4 py-6 text-center">
            <p className="text-sm text-muted-foreground">Admin Panel</p>
         </div>
      </footer>
    </div>
  );
}

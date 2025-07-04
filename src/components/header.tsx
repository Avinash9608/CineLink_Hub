import { Suspense } from "react";
import Link from 'next/link';
import { Film } from 'lucide-react';
import SearchBar from './search-bar';
import { ThemeToggle } from './theme-toggle';

export default function Header() {
  return (
    <header className="bg-card/80 backdrop-blur-lg border-b sticky top-0 z-40">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2">
            <Film className="h-8 w-8 text-primary" />
            <span className="font-headline text-2xl font-bold text-foreground">
              CineLink Hub
            </span>
          </Link>
          <div className="hidden md:flex flex-1 justify-center px-8">
            <Suspense fallback={null}>
              <SearchBar />
            </Suspense>
          </div>
          <div className="flex items-center gap-4">
            <ThemeToggle />
          </div>
        </div>
        <div className="md:hidden pb-4">
          <Suspense fallback={null}>
            <SearchBar />
          </Suspense>
        </div>
      </div>
    </header>
  );
}

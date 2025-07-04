import Link from 'next/link';
import { Film } from 'lucide-react';
import SearchBar from './search-bar';
import { AdScript } from './ad-script';

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
            <SearchBar />
          </div>
          <div className="flex items-center gap-4">
            {/* Future: Theme Toggle, Login */}
          </div>
        </div>
        <div className="md:hidden pb-4">
          <SearchBar />
        </div>
      </div>
      <div className="border-t flex justify-center py-2">
        <AdScript adKey="49f98c66c11f5b62fe748dba3eb85f7a" format="iframe" height={90} width={728} />
      </div>
    </header>
  );
}

import Link from 'next/link';
import { Film } from 'lucide-react';
import { AdPlaceholder } from './ad-placeholder';

export default function Footer() {
  return (
    <footer className="bg-card border-t mt-auto">
      <div className="py-6">
        <AdPlaceholder text="Footer Banner Ad (728x90)" className="h-24"/>
      </div>
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center gap-2 mb-4 md:mb-0">
            <Film className="h-6 w-6 text-primary" />
            <span className="font-headline text-lg font-bold">CineLink Hub</span>
          </div>
          <p className="text-sm text-muted-foreground text-center md:text-left">
            Disclaimer: This site does not store any files on its server. All contents are provided by non-affiliated third parties.
          </p>
          <p className="text-sm text-muted-foreground mt-4 md:mt-0">
            © {new Date().getFullYear()} CineLink Hub. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

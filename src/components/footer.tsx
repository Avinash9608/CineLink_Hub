import Link from 'next/link';
import { Film } from 'lucide-react';
import { AdScript } from './ad-script';

export default function Footer() {
  return (
    <footer className="bg-card border-t mt-auto">
      <div className="py-2 flex justify-center">
        <AdScript adKey="49f98c66c11f5b62fe748dba3eb85f7a" format="iframe" height={90} width={728} />
      </div>
      <div className="container mx-auto px-4 pt-10 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <Film className="h-8 w-8 text-primary" />
              <span className="font-headline text-2xl font-bold">CineLink Hub</span>
            </Link>
            <p className="text-muted-foreground text-sm max-w-xs">
              Your ultimate destination for the latest movies and web series.
            </p>
          </div>
          
          <div className="flex flex-col items-center text-center">
            <h3 className="font-headline text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-muted-foreground hover:text-primary transition-colors">Homepage</Link>
              </li>
              <li>
                <Link href="/how-to-download" className="text-muted-foreground hover:text-primary transition-colors">How to Download</Link>
              </li>
            </ul>
          </div>

          <div className="flex flex-col items-center md:items-end text-center md:text-right">
             <h3 className="font-headline text-lg font-semibold mb-4">Disclaimer</h3>
             <p className="text-muted-foreground text-sm max-w-xs">
                This site does not store any files on its server. All contents are provided by non-affiliated third parties.
             </p>
          </div>
        </div>
      </div>

      <div className="border-t">
        <div className="container mx-auto px-4 py-4">
          <p className="text-center text-sm text-muted-foreground">
             © {new Date().getFullYear()} CineLink Hub. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

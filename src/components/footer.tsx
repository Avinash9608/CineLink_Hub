import Link from 'next/link';
import { Film } from 'lucide-react';
import { AdScript } from './ad-script';

export default function Footer() {
  return (
    <footer className="bg-card border-t mt-auto">
      <div className="py-2 flex justify-center">
        <AdScript adKey="49f98c66c11f5b62fe748dba3eb85f7a" format="iframe" height={90} width={728} />
      </div>
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2">
            <Film className="h-6 w-6 text-primary" />
            <span className="font-headline text-lg font-bold">CineLink Hub</span>
          </div>
          <div className="flex flex-col sm:flex-row items-center gap-x-6 gap-y-2 text-sm text-muted-foreground text-center">
            <p className="max-w-md">
              Disclaimer: This site does not store any files on its server. All contents are provided by non-affiliated third parties.
            </p>
            <Link href="/how-to-download" className="hover:text-primary transition-colors whitespace-nowrap font-medium">How to Download</Link>
          </div>
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} CineLink Hub. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

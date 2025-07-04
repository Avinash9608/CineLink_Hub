import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Download, ShieldCheck, Timer, ExternalLink } from 'lucide-react';
import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'How to Download - CineLink Hub',
  description: 'A step-by-step guide on how to download movies from CineLink Hub.',
};

export default function HowToDownloadPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="font-headline text-4xl md:text-5xl font-bold">How to Download</h1>
        <p className="text-muted-foreground mt-4 text-lg max-w-2xl mx-auto">
          Follow these simple steps to securely download your favorite movies and shows from our platform.
        </p>
      </div>

      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <div className="flex items-center gap-4">
              <div className="bg-primary/10 text-primary p-3 rounded-full">
                <Download className="w-6 h-6" />
              </div>
              <div>
                <CardTitle className="text-xl font-headline">Step 1: Start Download</CardTitle>
                <p className="text-muted-foreground">Click the "Download Now" button on any movie page.</p>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="aspect-video bg-muted rounded-md flex items-center justify-center">
              <Button size="lg"><Download className="mr-2" /> Download Now</Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center gap-4">
              <div className="bg-primary/10 text-primary p-3 rounded-full">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div>
                <CardTitle className="text-xl font-headline">Step 2: Verification</CardTitle>
                <p className="text-muted-foreground">You'll be redirected to a download page. Please complete the quick verification step.</p>
              </div>
            </div>
          </CardHeader>
          <CardContent>
             <div className="aspect-video bg-muted rounded-md flex items-center justify-center p-4">
                <p className="text-muted-foreground text-center">Follow on-screen instructions and click "Continue".</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center gap-4">
              <div className="bg-primary/10 text-primary p-3 rounded-full">
                <Timer className="w-6 h-6" />
              </div>
              <div>
                <CardTitle className="text-xl font-headline">Step 3: Generate Link</CardTitle>
                <p className="text-muted-foreground">Please wait for a short countdown while we prepare your secure download link.</p>
              </div>
            </div>
          </CardHeader>
           <CardContent>
             <div className="aspect-video bg-muted rounded-md flex items-center justify-center p-4">
                <Button disabled size="lg"><Timer className="mr-2 animate-spin" /> Please wait... 10s</Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center gap-4">
              <div className="bg-primary/10 text-primary p-3 rounded-full">
                <ExternalLink className="w-6 h-6" />
              </div>
              <div>
                <CardTitle className="text-xl font-headline">Step 4: Get Your File</CardTitle>
                <p className="text-muted-foreground">Choose your preferred download method: Telegram or a Direct Link.</p>
              </div>
            </div>
          </CardHeader>
          <CardContent>
             <div className="aspect-video bg-muted rounded-md flex items-center justify-center p-4 gap-4">
                <Button variant="secondary">Open Telegram</Button>
                <Button>Direct Link</Button>
            </div>
          </CardContent>
        </Card>
      </div>

       <div className="text-center mt-16">
        <h2 className="text-2xl font-bold font-headline">Ready to start?</h2>
        <p className="text-muted-foreground mt-2">Browse our latest collection of movies.</p>
        <Button asChild size="lg" className="mt-6">
          <Link href="/">Go to Homepage</Link>
        </Button>
      </div>
    </div>
  );
}

import { getMovieBySlug } from "@/lib/data";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { AdPlaceholder } from "@/components/ad-placeholder";
import Link from "next/link";
import { Download, Send } from "lucide-react";

export default function DownloadFinalPage({ params }: { params: { slug: string } }) {
  const movie = getMovieBySlug(params.slug);
  if (!movie) {
    notFound();
  }

  return (
    <div>
      <h2 className="text-xl font-semibold mb-2 font-headline">Step 3 of 3: Download Your File</h2>
      <p className="text-muted-foreground mb-6">Your download link for <span className="font-bold text-primary">{movie.title}</span> is ready!</p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto mb-6">
        <Card>
            <CardHeader>
                <Send className="w-8 h-8 text-accent mx-auto mb-2"/>
                <CardTitle>Download via Telegram</CardTitle>
                <CardDescription>Fastest and most reliable option.</CardDescription>
            </CardHeader>
            <CardContent>
                <Button asChild className="w-full" size="lg">
                    <a href={movie.telegramLink} target="_blank" rel="noopener noreferrer">
                        <Send className="mr-2 h-5 w-5"/> Open Telegram
                    </a>
                </Button>
            </CardContent>
        </Card>
        
        {movie.directLink ? (
             <Card>
                <CardHeader>
                    <Download className="w-8 h-8 text-accent mx-auto mb-2"/>
                    <CardTitle>Direct Link</CardTitle>
                    <CardDescription>May contain additional ads.</CardDescription>
                </CardHeader>
                <CardContent>
                    <Button asChild variant="secondary" className="w-full" size="lg">
                        <a href={movie.directLink} target="_blank" rel="noopener noreferrer">
                           <Download className="mr-2 h-5 w-5"/> Use Direct Link
                        </a>
                    </Button>
                </CardContent>
            </Card>
        ) : (
             <Card className="flex flex-col justify-center items-center bg-muted/50">
                 <CardHeader className="text-center">
                    <Download className="w-8 h-8 text-muted-foreground mx-auto mb-2"/>
                    <CardTitle className="text-muted-foreground">Direct Link</CardTitle>
                    <CardDescription>Not available for this file.</CardDescription>
                </CardHeader>
            </Card>
        )}
      </div>

      <AdPlaceholder text="Ad on final download page" className="h-48" />
    </div>
  );
}

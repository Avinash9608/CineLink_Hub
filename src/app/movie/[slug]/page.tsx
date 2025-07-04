import { getMovieBySlug } from '@/lib/data';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import type { Metadata } from 'next';
import { generateSeoMetadata } from '@/ai/flows/seo-metadata-generator';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { AdPlaceholder } from '@/components/ad-placeholder';
import { Calendar, Clapperboard, Download, Languages, Tag, Users } from 'lucide-react';

type Props = {
  params: { slug: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const movie = await getMovieBySlug(params.slug);

  if (!movie) {
    return {
      title: 'Movie Not Found',
    };
  }

  const seoInput = {
    title: movie.title,
    description: movie.description,
    genre: movie.genre.join(', '),
    year: movie.year.toString(),
    language: movie.language,
    quality: movie.quality,
    format: movie.format,
    tags: movie.tags,
  };

  try {
    const seoData = await generateSeoMetadata(seoInput);
    return {
      title: seoData.metaTitle,
      description: seoData.metaDescription,
      keywords: seoData.metaTags,
    };
  } catch (error) {
    console.error('AI SEO Metadata generation failed:', error);
    return {
      title: `${movie.title} (${movie.year}) - CineLink Hub`,
      description: movie.description,
    };
  }
}

export default async function MoviePage({ params }: Props) {
  const movie = await getMovieBySlug(params.slug);

  if (!movie) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-8 animate-in fade-in duration-500">
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
        <div className="md:col-span-1 lg:col-span-1">
          <Card className="overflow-hidden sticky top-24">
            <div className="aspect-[2/3] w-full relative">
              <Image
                src={movie.thumbnail}
                alt={movie.title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 33vw"
                data-ai-hint="movie poster"
              />
            </div>
          </Card>
        </div>

        <div className="md:col-span-2 lg:col-span-3">
          <h1 className="font-headline text-4xl lg:text-5xl font-bold">{movie.title}</h1>
          <div className="flex items-center gap-2 text-muted-foreground mt-2 mb-4">
            <Calendar className="w-4 h-4" />
            <span>{movie.year}</span>
          </div>

          <div className="flex flex-wrap gap-2 mb-6">
            {movie.genre.map((g) => (
              <Badge key={g} variant="secondary">{g}</Badge>
            ))}
          </div>
          
          <p className="text-lg leading-relaxed mb-8">{movie.description}</p>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 mb-8 text-sm">
            <div className="flex items-center gap-2"><Languages className="w-5 h-5 text-primary" /> <strong>Language:</strong> {movie.language}</div>
            <div className="flex items-center gap-2"><Clapperboard className="w-5 h-5 text-primary" /> <strong>Quality:</strong> {movie.quality}</div>
            <div className="flex items-center gap-2"><Tag className="w-5 h-5 text-primary" /> <strong>Format:</strong> {movie.format}</div>
          </div>
          
          <div className="mb-8">
            <h3 className="font-headline text-xl font-semibold mb-2 flex items-center gap-2"><Users className="w-5 h-5 text-primary"/> Cast</h3>
            <p className="text-muted-foreground">{movie.cast.join(', ')}</p>
          </div>

           <Button asChild size="lg" className="w-full sm:w-auto font-bold text-lg">
             <Link href={`/download/${movie.slug}/step-1`}>
               <Download className="mr-2 h-5 w-5" /> Download Now
             </Link>
           </Button>

          <div className="my-8">
            <AdPlaceholder text="Ad below download button" />
          </div>

          {movie.trailer && (
            <div className="mt-12">
              <h2 className="font-headline text-2xl font-bold mb-4">Watch Trailer</h2>
              <div className="aspect-video w-full rounded-lg overflow-hidden border">
                <iframe
                  width="100%"
                  height="100%"
                  src={`https://www.youtube.com/embed/${movie.trailer}`}
                  title="YouTube video player"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

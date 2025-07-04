'use client';

import { useState } from 'react';
import type { Movie } from '@/types';
import { Heart, Share2, Bookmark, PlayCircle, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import Link from 'next/link';

export default function MovieDetailView({ movie }: { movie: Movie }) {
  const [isTrailerOpen, setIsTrailerOpen] = useState(false);

  return (
    <div className="container mx-auto py-8 md:py-16 animate-in fade-in duration-500">
      <div
        className="relative w-full max-w-6xl mx-auto rounded-lg shadow-2xl overflow-hidden bg-cover bg-center"
        style={{ backgroundImage: `url(${movie.thumbnail})`, minHeight: '550px' }}
        data-ai-hint="movie background"
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent md:bg-gradient-to-r md:from-black md:via-black/80 md:to-transparent" />
        
        <div className="relative z-10 flex flex-col justify-end md:justify-center h-full">
          <div className="md:w-3/5 lg:w-1/2 p-8 text-white">
            <div className="flex gap-4 mb-4">
              <button className="text-white/70 hover:text-white transition-opacity"><Heart size={20} /></button>
              <button className="text-white/70 hover:text-white transition-opacity"><Share2 size={20} /></button>
              <button className="text-white/70 hover:text-white transition-opacity"><Bookmark size={20} /></button>
            </div>
            
            <h1 className="font-headline text-4xl lg:text-6xl font-bold text-white mb-2">{movie.title}</h1>
            <h4 className="font-body uppercase tracking-widest text-sm text-accent font-semibold mb-6">
              {movie.year} &bull; {movie.genre.join(', ')} &bull; {movie.language}
            </h4>
            <p className="text-white/80 font-body text-base leading-relaxed mb-8 line-clamp-3 font-light">{movie.description}</p>
            
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <Dialog open={isTrailerOpen} onOpenChange={setIsTrailerOpen}>
                <DialogTrigger asChild>
                  <Button
                    variant="outline"
                    className="bg-transparent border-2 border-white text-white hover:bg-accent hover:border-accent hover:text-accent-foreground font-bold text-lg py-6 px-8 self-start w-full sm:w-auto"
                  >
                    <PlayCircle className="mr-2" />
                    Watch Trailer
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-4xl p-0 bg-black border-0">
                  <div className="aspect-video">
                     <iframe
                        width="100%"
                        height="100%"
                        src={`https://www.youtube.com/embed/${movie.trailer}?autoplay=1`}
                        title="YouTube video player"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      ></iframe>
                  </div>
                </DialogContent>
              </Dialog>

              <Button asChild size="lg" className="font-bold text-lg py-6 px-8 w-full sm:w-auto">
                <Link href={`/download/${movie.slug}/step-1`}>
                  <Download className="mr-2 h-5 w-5" /> Download Now
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

import Link from 'next/link';
import Image from 'next/image';
import type { Movie } from '@/types';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar, Languages, Hdmi, Tag } from 'lucide-react';

interface MovieCardProps {
  movie: Movie;
}

export default function MovieCard({ movie }: MovieCardProps) {
  return (
    <Link href={`/movie/${movie.slug}`} className="group">
      <Card className="h-full overflow-hidden transition-all duration-300 hover:shadow-lg hover:border-primary/50 hover:-translate-y-1 flex flex-col">
        <CardHeader className="p-0 relative">
          <div className="aspect-[2/3] w-full relative">
            <Image
              src={movie.thumbnail}
              alt={movie.title}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
              data-ai-hint="movie poster"
            />
             <div className="absolute top-2 right-2">
                <Badge>{movie.quality}</Badge>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-4 flex flex-col flex-grow">
            <CardTitle className="font-headline text-lg leading-tight mb-2 group-hover:text-primary transition-colors">
              {movie.title}
            </CardTitle>
            <div className="text-sm text-muted-foreground flex items-center gap-4 mt-auto pt-2">
               <div className="flex items-center gap-1">
                 <Calendar className="w-4 h-4"/> 
                 <span>{movie.year}</span>
               </div>
               <div className="flex items-center gap-1">
                 <Languages className="w-4 h-4"/> 
                 <span>{movie.language}</span>
               </div>
            </div>
        </CardContent>
      </Card>
    </Link>
  );
}

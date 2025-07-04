import { AdScript } from '@/components/ad-script';
import MovieCard from '@/components/movie-card';
import { getMovies } from '@/lib/data';
import { Button } from '@/components/ui/button';
import { Shield, ArrowDown } from 'lucide-react';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

export default async function Home({ searchParams }: { searchParams: { [key: string]: string | string[] | undefined } }) {
  const movies = await getMovies();
  const trendingMovies = [...movies].sort(() => 0.5 - Math.random()).slice(0, 8);
  const latestMovies = [...movies].sort((a, b) => new Date(b.createdAt!).getTime() - new Date(a.createdAt!).getTime()).slice(0, 8);
  
  const secret = searchParams.secret as string | undefined;
  const showAdminLink = secret === process.env.ADMIN_SECRET;

  return (
    <>
      <section className="relative bg-card py-20 md:py-32">
        <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent z-10"></div>
        <div className="container mx-auto px-4 text-center relative z-20">
          <h1 className="font-headline text-4xl md:text-6xl font-extrabold tracking-tight text-foreground">
            Your Ultimate Movie Destination
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-lg md:text-xl text-muted-foreground">
            Discover, stream, and download the latest movies and web series in high definition. Your next favorite film is just a click away.
          </p>
          <div className="mt-8 flex justify-center gap-4">
            <Button size="lg" asChild>
              <a href="#latest-releases">
                Browse Latest <ArrowDown className="ml-2" />
              </a>
            </Button>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-8">
        {showAdminLink && (
          <div className="flex justify-end mb-4">
              <Button asChild>
                  <Link href={`/admin?secret=${secret}`}>
                      <Shield className="mr-2 h-4 w-4" /> Go to Admin Dashboard
                  </Link>
              </Button>
          </div>
        )}
        <section className="mb-12 animate-in fade-in duration-500">
          <h2 className="font-headline text-3xl font-bold mb-6 border-l-4 border-primary pl-4">
            Trending Movies
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {trendingMovies.map((movie) => (
               <MovieCard key={movie.slug} movie={movie} />
            ))}
            {trendingMovies.length > 3 && (
              <div
                key="trending-ad"
                className="lg:col-span-4 sm:col-span-2 col-span-1 py-4 flex justify-center"
              >
                <AdScript adKey="49f98c66c11f5b62fe748dba3eb85f7a" format="iframe" height={90} width={728} />
              </div>
            )}
          </div>
        </section>

        <section id="latest-releases" className="animate-in fade-in duration-700 scroll-mt-20">
          <h2 className="font-headline text-3xl font-bold mb-6 border-l-4 border-primary pl-4">
            Latest Releases
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {latestMovies.map((movie) => (
              <MovieCard key={movie.slug} movie={movie} />
            ))}
          </div>
        </section>
      </div>
    </>
  );
}

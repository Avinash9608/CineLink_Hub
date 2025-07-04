import { AdScript } from '@/components/ad-script';
import MovieCard from '@/components/movie-card';
import { getMovies } from '@/lib/data';
import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';
import AddMovieForm from '@/app/admin/add/add-movie-form';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';

export default async function Home({ searchParams }: { searchParams: { [key: string]: string | string[] | undefined } }) {
  const movies = await getMovies();
  const trendingMovies = [...movies].sort(() => 0.5 - Math.random()).slice(0, 8);
  const latestMovies = [...movies].sort((a, b) => new Date(b.createdAt!).getTime() - new Date(a.createdAt!).getTime()).slice(0, 8);
  
  const secret = searchParams.secret as string | undefined;
  const showAdminLink = secret === process.env.ADMIN_SECRET;

  return (
    <div className="container mx-auto px-4 py-8">
      {showAdminLink && (
        <Dialog>
          <div className="flex justify-end mb-4">
              <DialogTrigger asChild>
                  <Button>
                      <PlusCircle className="mr-2 h-4 w-4" /> Add New Movie
                  </Button>
              </DialogTrigger>
          </div>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
             <AddMovieForm secret={secret} />
          </DialogContent>
        </Dialog>
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

      <section className="animate-in fade-in duration-700">
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
  );
}

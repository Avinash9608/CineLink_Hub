import { AdPlaceholder } from '@/components/ad-placeholder';
import MovieCard from '@/components/movie-card';
import { getMovies } from '@/lib/data';

export default function Home() {
  const movies = getMovies();
  const trendingMovies = [...movies].sort(() => 0.5 - Math.random()).slice(0, 8);
  const latestMovies = [...movies].sort((a, b) => b.year - a.year).slice(0, 8);

  return (
    <div className="container mx-auto px-4 py-8">
      <section className="mb-12 animate-in fade-in duration-500">
        <h2 className="font-headline text-3xl font-bold mb-6 border-l-4 border-primary pl-4">
          Trending Movies
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {trendingMovies.flatMap((movie, index) => {
            const elements = [<MovieCard key={movie.slug} movie={movie} />];
            if (index === 3) {
              elements.push(
                <div
                  key="trending-ad"
                  className="lg:col-span-4 sm:col-span-2 col-span-1 py-4"
                >
                  <AdPlaceholder />
                </div>
              );
            }
            return elements;
          })}
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
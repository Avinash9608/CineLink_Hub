import MovieCard from "@/components/movie-card";
import SearchBar from "@/components/search-bar";
import { searchMovies } from "@/lib/data";
import { Suspense } from "react";

function SearchResults({ query }: { query: string }) {
  const results = searchMovies(query);

  return (
    <>
      <h1 className="font-headline text-3xl font-bold mb-6 border-l-4 border-primary pl-4">
        Search Results for &quot;{query}&quot;
      </h1>
      {results.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {results.map((movie) => (
            <MovieCard key={movie.slug} movie={movie} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <p className="text-xl text-muted-foreground">No movies found matching your search.</p>
          <p className="text-muted-foreground mt-2">Try searching for a different title, genre, or year.</p>
        </div>
      )}
    </>
  );
}


export default function SearchPage({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  const query = typeof searchParams?.q === 'string' ? searchParams.q : '';

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <SearchBar />
      </div>
      <Suspense fallback={<div>Loading...</div>}>
        <SearchResults query={query} />
      </Suspense>
    </div>
  );
}

export const dynamic = 'force-dynamic';

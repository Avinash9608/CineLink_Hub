export default function NotFoundPage() {
  return (
    <div className="container mx-auto px-4 py-16 text-center">
      <h1 className="text-4xl font-bold mb-4">404 - Page Not Found</h1>
      <p className="text-lg text-muted-foreground mb-8">
        Sorry, the page you are looking for does not exist.
      </p>
      <div className="max-w-xl mx-auto">
        <form action="/search" method="get" className="relative w-full max-w-xl mx-auto">
          <input
            type="text"
            name="q"
            placeholder="Search by title, genre, year, language..."
            className="h-11 pr-12 rounded-full shadow-sm w-full border px-4 mb-4"
          />
          <button
            type="submit"
            className="h-11 px-6 rounded-full bg-primary text-white font-semibold"
            aria-label="Search"
          >
            Search
          </button>
        </form>
      </div>
    </div>
  );
} 
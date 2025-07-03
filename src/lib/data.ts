import type { Movie } from '@/types';

const movies: Movie[] = [
  {
    slug: 'the-action-hero-2024',
    title: 'The Action Hero',
    year: 2024,
    thumbnail: 'https://placehold.co/500x750.png',
    language: 'Hindi',
    quality: '1080p',
    format: 'x265',
    tags: ['Action', 'Thriller', 'Bollywood'],
    description: 'An elite soldier comes out of retirement to stop a global terrorist plot. With high-octane chases and explosive action, this is a must-watch for adrenaline junkies.',
    cast: ['Rohan Kumar', 'Priya Singh', 'Vikram Rathod'],
    genre: ['Action', 'Thriller'],
    trailer: 'dQw4w9WgXcQ',
    telegramLink: 'https://t.me/examplechannel/123',
    directLink: 'https://example.com/download/action-hero',
  },
  {
    slug: 'cyber-dream-2023',
    title: 'Cyber Dream',
    year: 2023,
    thumbnail: 'https://placehold.co/500x750.png',
    language: 'English',
    quality: '720p',
    format: 'x264',
    tags: ['Sci-Fi', 'Mystery', 'Hollywood'],
    description: 'In a neon-lit future, a detective investigates a series of virtual reality crimes that threaten to blur the line between the digital and real worlds.',
    cast: ['Jane Doe', 'John Smith', 'Alex Ray'],
    genre: ['Sci-Fi', 'Mystery'],
    trailer: 'dQw4w9WgXcQ',
    telegramLink: 'https://t.me/examplechannel/124',
  },
  {
    slug: 'love-in-paris-2024',
    title: 'Love in Paris',
    year: 2024,
    thumbnail: 'https://placehold.co/500x750.png',
    language: 'English',
    quality: '1080p',
    format: 'x265',
    tags: ['Romance', 'Comedy'],
    description: 'Two strangers on vacation in Paris accidentally swap suitcases, leading to a series of hilarious and romantic encounters across the city of love.',
    cast: ['Emily White', 'Chris Green'],
    genre: ['Romance', 'Comedy'],
    trailer: 'dQw4w9WgXcQ',
    telegramLink: 'https://t.me/examplechannel/125',
    directLink: 'https://example.com/download/love-in-paris',
  },
  {
    slug: 'chronicles-of-the-lost-kingdom-2022',
    title: 'Chronicles of the Lost Kingdom',
    year: 2022,
    thumbnail: 'https://placehold.co/500x750.png',
    language: 'English',
    quality: '4K',
    format: 'x265',
    tags: ['Fantasy', 'Adventure'],
    description: 'A young queen must unite warring tribes and seek a mythical artifact to save her kingdom from an ancient evil that has awakened.',
    cast: ['Anya Silverwood', 'Kaelen Stonehand'],
    genre: ['Fantasy', 'Adventure'],
    trailer: 'dQw4w9WgXcQ',
    telegramLink: 'https://t.me/examplechannel/126',
  },
  {
    slug: 'mumbai-undercover-2023',
    title: 'Mumbai Undercover',
    year: 2023,
    thumbnail: 'https://placehold.co/500x750.png',
    language: 'Hindi',
    quality: '1080p',
    format: 'x264',
    tags: ['Crime', 'Drama', 'Hindi Dubbed'],
    description: 'An honest cop goes undercover to dismantle Mumbai\'s most dangerous criminal syndicate, but finds himself in a moral dilemma.',
    cast: ['Arjun Verma', 'Meera Desai'],
    genre: ['Crime', 'Drama'],
    trailer: 'dQw4w9WgXcQ',
    telegramLink: 'https://t.me/examplechannel/127',
  },
  {
    slug: 'the-last-voyage-2024',
    title: 'The Last Voyage',
    year: 2024,
    thumbnail: 'https://placehold.co/500x750.png',
    language: 'English',
    quality: '720p',
    format: 'x265',
    tags: ['Horror', 'Thriller'],
    description: 'The crew of a deep-space cargo ship awakens to find their vessel derelict and a malevolent presence hunting them one by one.',
    cast: ['Sarah Connor', 'Kyle Reese'],
    genre: ['Horror', 'Thriller'],
    trailer: 'dQw4w9WgXcQ',
    telegramLink: 'https://t.me/examplechannel/128',
    directLink: 'https://example.com/download/last-voyage',
  },
  {
    slug: 'galactic-frontiers-2025',
    title: 'Galactic Frontiers',
    year: 2025,
    thumbnail: 'https://placehold.co/500x750.png',
    language: 'English',
    quality: '1080p',
    format: 'IMAX',
    tags: ['Sci-Fi', 'Adventure'],
    description: 'A team of explorers travels through a newly discovered wormhole to find a new home for humanity, but they encounter civilizations beyond their imagination.',
    cast: ['Captain Eva Rostova', 'Dr. Aris Thorne'],
    genre: ['Sci-Fi', 'Adventure'],
    trailer: 'dQw4w9WgXcQ',
    telegramLink: 'https://t.me/examplechannel/129',
  },
  {
    slug: 'the-comedians-laugh-2023',
    title: 'The Comedian\'s Laugh',
    year: 2023,
    thumbnail: 'https://placehold.co/500x750.png',
    language: 'English',
    quality: '1080p',
    format: 'x264',
    tags: ['Comedy', 'Drama'],
    description: 'A stand-up comedian on the brink of stardom has a public meltdown, forcing him to confront his past and rediscover the true meaning of happiness.',
    cast: ['Lenny Bruce', 'Midge Maisel'],
    genre: ['Comedy', 'Drama'],
    trailer: 'dQw4w9WgXcQ',
    telegramLink: 'https://t.me/examplechannel/130',
  },
];

export function getMovies(): Movie[] {
  return movies;
}

export function getMovieBySlug(slug: string): Movie | undefined {
  return movies.find((movie) => movie.slug === slug);
}

export function searchMovies(query: string): Movie[] {
  const lowerCaseQuery = query.toLowerCase();
  return movies.filter(movie =>
    movie.title.toLowerCase().includes(lowerCaseQuery) ||
    movie.genre.some(g => g.toLowerCase().includes(lowerCaseQuery)) ||
    movie.tags.some(t => t.toLowerCase().includes(lowerCaseQuery)) ||
    movie.year.toString().includes(lowerCaseQuery) ||
    movie.language.toLowerCase().includes(lowerCaseQuery)
  );
}

export interface Movie {
  slug: string;
  title: string;
  year: number;
  thumbnail: string;
  language: string;
  quality: string;
  format: string;
  tags: string[];
  description: string;
  cast: string[];
  genre: string[];
  trailer: string; // YouTube video ID
  telegramLink: string;
  directLink?: string;
}

import { getMovieBySlug } from '@/lib/data';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { generateSeoMetadata } from '@/ai/flows/seo-metadata-generator';
import MovieDetailView from '@/components/movie-detail-view';

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
    console.error('AI SEO Metadata generation failed. This might be due to a missing API key. Full error:', error);
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

  return <MovieDetailView movie={movie} />;
}

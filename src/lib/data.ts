import dbConnect from './mongodb';
import MovieModel from '@/models/Movie';
import type { Movie } from '@/types';
import { unstable_noStore as noStore } from 'next/cache';
import slugify from 'slugify';

export async function getMovies(): Promise<Movie[]> {
  noStore();
  await dbConnect();
  const movies = await MovieModel.find({}).sort({ createdAt: -1 }).lean();
  return JSON.parse(JSON.stringify(movies));
}

export async function getMovieBySlug(slug: string): Promise<Movie | null> {
  noStore();
  await dbConnect();
  const movie = await MovieModel.findOne({ slug }).lean();
  if (!movie) {
    return null;
  }
  return JSON.parse(JSON.stringify(movie));
}

export async function searchMovies(query: string): Promise<Movie[]> {
  noStore();
  await dbConnect();
  const lowerCaseQuery = query.toLowerCase();

  const searchConditions: any[] = [
    { title: { $regex: lowerCaseQuery, $options: 'i' } },
    { genre: { $in: [new RegExp(lowerCaseQuery, 'i')] } },
    { tags: { $in: [new RegExp(lowerCaseQuery, 'i')] } },
    { language: { $regex: lowerCaseQuery, $options: 'i' } },
  ];

  const yearQuery = parseInt(query, 10);
  if (!isNaN(yearQuery) && query.length === 4) {
    searchConditions.push({ year: yearQuery });
  }

  const movies = await MovieModel.find({ $or: searchConditions }).lean();
  return JSON.parse(JSON.stringify(movies));
}


export async function addMovie(movieData: Omit<Movie, 'slug' | '_id' | 'createdAt' | 'updatedAt'>): Promise<Movie> {
    await dbConnect();
    
    const newSlug = slugify(movieData.title, { lower: true, strict: true, trim: true });
    
    const existingMovie = await MovieModel.findOne({ slug: newSlug });
    if (existingMovie) {
        throw new Error(`A movie with a similar title (and slug "${newSlug}") already exists.`);
    }

    const movie = new MovieModel({
      ...movieData,
      slug: newSlug
    });
    
    const savedMovie = await movie.save();
    return JSON.parse(JSON.stringify(savedMovie));
}

export async function updateMovie(slug: string, movieData: Omit<Movie, 'slug' | '_id' | 'createdAt' | 'updatedAt'>): Promise<Movie> {
    await dbConnect();
    
    const newSlug = slugify(movieData.title, { lower: true, strict: true, trim: true });
    
    const updatedMovie = await MovieModel.findOneAndUpdate(
        { slug },
        { ...movieData, slug: newSlug },
        { new: true, runValidators: true }
    ).lean();
    
    if (!updatedMovie) {
        throw new Error('Movie not found for update.');
    }
    
    return JSON.parse(JSON.stringify(updatedMovie));
}

export async function deleteMovie(slug: string): Promise<{ deletedCount?: number }> {
    await dbConnect();
    
    const result = await MovieModel.deleteOne({ slug });

    if (result.deletedCount === 0) {
        throw new Error('Could not find movie to delete.');
    }
    
    return result;
}

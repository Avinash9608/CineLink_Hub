'use server';

import { z } from 'zod';
import { addMovie } from '@/lib/data';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export const movieSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  year: z.coerce.number().min(1900, 'Invalid year').max(new Date().getFullYear() + 5, 'Invalid year'),
  thumbnail: z.string().url('Must be a valid URL'),
  language: z.string().min(1, 'Language is required'),
  quality: z.string().min(1, 'Quality is required'),
  format: z.string().min(1, 'Format is required'),
  tags: z.string().min(1, 'Tags are required (comma separated)'),
  description: z.string().min(1, 'Description is required'),
  cast: z.string().min(1, 'Cast is required (comma separated)'),
  genre: z.string().min(1, 'Genre is required (comma separated)'),
  trailer: z.string().min(1, 'Trailer ID is required'),
  telegramLink: z.string().url('Must be a valid URL'),
  directLink: z.string().url('Must be a valid URL').optional().or(z.literal('')),
});

export type FormState = {
    message: string;
    errors?: {
        [key: string]: string[] | undefined;
    };
    success: boolean;
};

export async function createMovieAction(prevState: FormState, formData: FormData): Promise<FormState> {
  
  const validatedFields = movieSchema.safeParse(Object.fromEntries(formData.entries()));

  if (!validatedFields.success) {
    return {
      message: 'Failed to create movie. Please check the fields.',
      errors: validatedFields.error.flatten().fieldErrors,
      success: false,
    };
  }

  const data = validatedFields.data;

  const movieData = {
    ...data,
    tags: data.tags.split(',').map(tag => tag.trim()),
    cast: data.cast.split(',').map(name => name.trim()),
    genre: data.genre.split(',').map(g => g.trim()),
  };

  try {
    await addMovie(movieData as any);
  } catch (error: any) {
    return {
      message: error.message || 'Database Error: Failed to create movie.',
      success: false,
    };
  }

  revalidatePath('/');
  revalidatePath('/movie');
  redirect('/');
}

'use server';

import { addMovie } from '@/lib/data';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { movieSchema, type FormState } from './schema';

export async function createMovieAction(prevState: FormState, formData: FormData): Promise<FormState> {
  const secret = formData.get('secret');
  if (secret !== process.env.ADMIN_SECRET) {
      return {
          message: 'Error: Unauthorized action.',
          success: false,
      };
  }
  
  const validatedFields = movieSchema.safeParse(Object.fromEntries(formData.entries()));

  if (!validatedFields.success) {
    return {
      message: 'Failed to create movie. Please check the fields.',
      errors: validatedFields.error.flatten().fieldErrors,
      success: false,
    };
  }

  // Get the Cloudinary URL string from the form data
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

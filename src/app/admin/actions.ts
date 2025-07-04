'use server';

import { deleteMovie, updateMovie } from '@/lib/data';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { movieSchema } from './add/schema';
import slugify from 'slugify';

export async function deleteMovieAction(slug: string, secret: string): Promise<{ success: boolean, message: string }> {
    if (secret !== process.env.ADMIN_SECRET) {
        return { success: false, message: 'Unauthorized action.' };
    }
    try {
        await deleteMovie(slug);
        revalidatePath('/');
        revalidatePath('/admin');
        revalidatePath(`/movie/${slug}`);
        return { success: true, message: 'Movie deleted successfully.' };
    } catch (error: any) {
        return { success: false, message: error.message || 'Database Error: Failed to delete movie.' };
    }
}

export type UpdateFormState = {
    message: string;
    errors?: {
        [key: string]: string[] | undefined;
    };
    success: boolean;
};

export async function updateMovieAction(slug: string, prevState: UpdateFormState, formData: FormData): Promise<UpdateFormState> {
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
            message: 'Failed to update movie. Please check the fields.',
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
        await updateMovie(slug, movieData as any);
    } catch (error: any) {
        return {
            message: error.message || 'Database Error: Failed to update movie.',
            success: false,
        };
    }
    
    const newSlug = slugify(data.title, { lower: true, strict: true, trim: true });
    revalidatePath('/');
    revalidatePath('/admin');
    revalidatePath(`/movie/${slug}`);
    if (slug !== newSlug) {
        revalidatePath(`/movie/${newSlug}`);
    }
    redirect('/admin?secret=' + secret);
}

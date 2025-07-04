import { z } from 'zod';

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

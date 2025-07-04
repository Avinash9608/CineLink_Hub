'use client';

import { useActionState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { updateMovieAction } from '@/app/admin/actions';
import { movieSchema } from '@/app/admin/add/schema';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import type { z } from 'zod';
import type { Movie } from '@/types';

export default function EditMovieForm({ secret, movie }: { secret: string, movie: Movie }) {
    const initialState = { message: '', errors: {}, success: false };
    const updateMovieWithSlug = updateMovieAction.bind(null, movie.slug);
    const [state, dispatch] = useActionState(updateMovieWithSlug, initialState);
    
    const form = useForm<z.infer<typeof movieSchema>>({
        resolver: zodResolver(movieSchema),
        defaultValues: {
            title: movie.title || '',
            year: movie.year || new Date().getFullYear(),
            thumbnail: movie.thumbnail || '',
            language: movie.language || '',
            quality: movie.quality || '',
            format: movie.format || '',
            tags: movie.tags?.join(', ') || '',
            description: movie.description || '',
            cast: movie.cast?.join(', ') || '',
            genre: movie.genre?.join(', ') || '',
            trailer: movie.trailer || '',
            telegramLink: movie.telegramLink || '',
            directLink: movie.directLink || '',
        },
    });

    useEffect(() => {
        if (state.errors) {
            for (const [key, value] of Object.entries(state.errors)) {
                if (value) {
                    form.setError(key as keyof z.infer<typeof movieSchema>, { type: 'server', message: value.join(', ') });
                }
            }
        }
    }, [state, form]);
    
    return (
        <Card className="max-w-4xl mx-auto w-full border-0 shadow-none">
            <CardHeader>
                <CardTitle>Edit Movie: {movie.title}</CardTitle>
                <CardDescription>Update the movie details below.</CardDescription>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form action={dispatch} className="space-y-6">
                        <input type="hidden" name="secret" value={secret} />
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <FormField control={form.control} name="title" render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Title</FormLabel>
                                    <FormControl><Input {...field} /></FormControl>
                                    <FormMessage />
                                </FormItem>
                            )} />
                            <FormField control={form.control} name="year" render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Year</FormLabel>
                                    <FormControl><Input type="number" {...field} /></FormControl>
                                    <FormMessage />
                                </FormItem>
                            )} />
                        </div>

                        <FormField control={form.control} name="thumbnail" render={({ field }) => (
                            <FormItem>
                                <FormLabel>Thumbnail URL</FormLabel>
                                <FormControl><Input {...field} /></FormControl>
                                <FormMessage />
                            </FormItem>
                        )} />
                         <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <FormField control={form.control} name="language" render={({ field }) => (
                                <FormItem><FormLabel>Language</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                            )} />
                            <FormField control={form.control} name="quality" render={({ field }) => (
                                <FormItem><FormLabel>Quality</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                            )} />
                            <FormField control={form.control} name="format" render={({ field }) => (
                                <FormItem><FormLabel>Format</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                            )} />
                        </div>

                        <FormField control={form.control} name="description" render={({ field }) => (
                            <FormItem><FormLabel>Description</FormLabel><FormControl><Textarea {...field} rows={4} /></FormControl><FormMessage /></FormItem>
                        )} />
                        
                        <FormField control={form.control} name="genre" render={({ field }) => (
                            <FormItem><FormLabel>Genre (comma separated)</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                        )} />
                        <FormField control={form.control} name="cast" render={({ field }) => (
                            <FormItem><FormLabel>Cast (comma separated)</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                        )} />
                         <FormField control={form.control} name="tags" render={({ field }) => (
                            <FormItem><FormLabel>Tags (comma separated)</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                        )} />
                         <FormField control={form.control} name="trailer" render={({ field }) => (
                            <FormItem><FormLabel>Trailer ID</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                        )} />

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <FormField control={form.control} name="telegramLink" render={({ field }) => (
                                <FormItem><FormLabel>Telegram Link</FormLabel><FormControl><Input type="url" {...field} /></FormControl><FormMessage /></FormItem>
                            )} />
                            <FormField control={form.control} name="directLink" render={({ field }) => (
                                <FormItem><FormLabel>Direct Download Link (Optional)</FormLabel><FormControl><Input type="url" {...field} /></FormControl><FormMessage /></FormItem>
                            )} />
                        </div>

                        {state.message && !state.success && <p className="text-sm font-medium text-destructive">{state.message}</p>}
                        {state.message && state.success && <p className="text-sm font-medium text-primary">{state.message}</p>}


                        <Button type="submit" size="lg" className="w-full">Update Movie</Button>
                    </form>
                </Form>
            </CardContent>
        </Card>
    );
}

'use client';

import { useActionState, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { createMovieAction } from './actions';
import { movieSchema } from './schema';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import type { z } from 'zod';

export default function AddMovieForm({ secret }: { secret?: string }) {
    const initialState = { message: '', errors: {}, success: false };
    const [state, dispatch] = useActionState(createMovieAction, initialState);
    const [uploading, setUploading] = useState(false);
    
    const form = useForm<z.infer<typeof movieSchema>>({
        resolver: zodResolver(movieSchema),
        defaultValues: {
            title: '',
            year: new Date().getFullYear(),
            thumbnail: '',
            language: '',
            quality: '',
            format: '',
            tags: '',
            description: '',
            cast: '',
            genre: '',
            trailer: '',
            telegramLink: '',
            directLink: '',
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
        if(state.success) {
            form.reset();
        }
    }, [state, form]);
    
    return (
        <Card className="max-w-4xl mx-auto w-full border-0 shadow-none">
            <CardHeader>
                <CardTitle>Add a New Movie</CardTitle>
                <CardDescription>Fill out the form below to add a new movie to the database.</CardDescription>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form action={dispatch} className="space-y-6">
                        {secret && <input type="hidden" name="secret" value={secret} />}
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
                                <FormLabel>Thumbnail</FormLabel>
                                <FormControl>
                                    <div>
                                        <Input type="file" accept="image/*" onChange={async e => {
                                            const file = e.target.files?.[0];
                                            if (!file) return;
                                            setUploading(true);
                                            const formData = new FormData();
                                            formData.append('file', file);
                                            formData.append('upload_preset', 'ml_default');
                                            formData.append('api_key', '759566998672355');
                                            const res = await fetch('https://api.cloudinary.com/v1_1/dfdtdqumn/image/upload', {
                                                method: 'POST',
                                                body: formData,
                                            });
                                            const data = await res.json();
                                            if (data.secure_url) {
                                                field.onChange(data.secure_url);
                                            }
                                            setUploading(false);
                                        }} />
                                        {uploading && <div className="text-xs text-muted-foreground mt-2">Uploading...</div>}
                                        {field.value && <img src={field.value} alt="Thumbnail preview" className="mt-2 rounded w-32 h-48 object-cover border" />}
                                    </div>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )} />
                         <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <FormField control={form.control} name="language" render={({ field }) => (
                                <FormItem><FormLabel>Language</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                            )} />
                            <FormField control={form.control} name="quality" render={({ field }) => (
                                <FormItem><FormLabel>Quality</FormLabel><FormControl><Input {...field} placeholder="e.g. 1080p" /></FormControl><FormMessage /></FormItem>
                            )} />
                            <FormField control={form.control} name="format" render={({ field }) => (
                                <FormItem><FormLabel>Format</FormLabel><FormControl><Input {...field} placeholder="e.g. x265" /></FormControl><FormMessage /></FormItem>
                            )} />
                        </div>

                        <FormField control={form.control} name="description" render={({ field }) => (
                            <FormItem><FormLabel>Description</FormLabel><FormControl><Textarea {...field} rows={4} /></FormControl><FormMessage /></FormItem>
                        )} />
                        
                        <FormField control={form.control} name="genre" render={({ field }) => (
                            <FormItem><FormLabel>Genre (comma separated)</FormLabel><FormControl><Input {...field} placeholder="e.g. Action, Thriller" /></FormControl><FormMessage /></FormItem>
                        )} />
                        <FormField control={form.control} name="cast" render={({ field }) => (
                            <FormItem><FormLabel>Cast (comma separated)</FormLabel><FormControl><Input {...field} placeholder="e.g. Actor One, Actor Two" /></FormControl><FormMessage /></FormItem>
                        )} />
                         <FormField control={form.control} name="tags" render={({ field }) => (
                            <FormItem><FormLabel>Tags (comma separated)</FormLabel><FormControl><Input {...field} placeholder="e.g. Bollywood, Hollywood" /></FormControl><FormMessage /></FormItem>
                        )} />
                         <FormField control={form.control} name="trailer" render={({ field }) => (
                            <FormItem><FormLabel>Trailer ID</FormLabel><FormControl><Input {...field} placeholder="YouTube Video ID only, e.g. dQw4w9WgXcQ" /></FormControl><FormMessage /></FormItem>
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

                        <Button type="submit" size="lg" className="w-full">Add Movie</Button>
                    </form>
                </Form>
            </CardContent>
        </Card>
    );
}

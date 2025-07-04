import { getMovieBySlug } from '@/lib/data';
import { notFound } from 'next/navigation';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import EditMovieForm from './edit-movie-form';

export default async function EditMoviePage({ params, searchParams }: { params: { slug: string }, searchParams: { [key: string]: string | string[] | undefined } }) {
    const secret = searchParams.secret as string;

    if (secret !== process.env.ADMIN_SECRET) {
        return (
            <div className="container mx-auto px-4 py-8 text-center">
                <Card className="max-w-md mx-auto">
                    <CardHeader>
                        <CardTitle>Access Denied</CardTitle>
                        <CardDescription>You are not authorized to view this page.</CardDescription>
                    </CardHeader>
                </Card>
            </div>
        );
    }

    const movie = await getMovieBySlug(params.slug);
    if (!movie) {
        notFound();
    }
    
    return (
        <div className="container mx-auto px-4 py-8">
            <EditMovieForm secret={secret} movie={movie} />
        </div>
    );
}

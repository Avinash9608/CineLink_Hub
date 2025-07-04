import AddMovieForm from './add-movie-form';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

export default function AddMoviePage({ searchParams }: { searchParams: { [key: string]: string | string[] | undefined } }) {
    const secret = searchParams.secret;

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
    
    return <AddMovieForm />;
}

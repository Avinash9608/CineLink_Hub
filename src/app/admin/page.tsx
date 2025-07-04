import { getMovies } from "@/lib/data";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { PlusCircle, Edit } from 'lucide-react';
import DeleteMovieButton from "./delete-movie-button";
import Image from "next/image";

export default async function AdminDashboardPage({ searchParams }: { searchParams: { [key: string]: string | string[] | undefined } }) {
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
    
    const movies = await getMovies();

    return (
        <div className="container mx-auto px-4 py-8">
            <Card>
                <CardHeader>
                    <div className="flex justify-between items-center">
                        <div>
                            <CardTitle>Movie Dashboard</CardTitle>
                            <CardDescription>Manage your movie collection. Total: {movies.length} movies.</CardDescription>
                        </div>
                        <Button asChild>
                            <Link href={`/admin/add?secret=${secret}`}>
                                <PlusCircle className="mr-2 h-4 w-4" /> Add New Movie
                            </Link>
                        </Button>
                    </div>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-[80px]">Thumbnail</TableHead>
                                <TableHead>Title</TableHead>
                                <TableHead>Year</TableHead>
                                <TableHead>Language</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {movies.map((movie) => (
                                <TableRow key={movie.slug}>
                                    <TableCell>
                                        <Image src={movie.thumbnail} alt={movie.title} width={60} height={90} className="object-cover rounded-md" />
                                    </TableCell>
                                    <TableCell className="font-medium">{movie.title}</TableCell>
                                    <TableCell>{movie.year}</TableCell>
                                    <TableCell>{movie.language}</TableCell>
                                    <TableCell className="text-right">
                                        <div className="flex gap-2 justify-end">
                                            <Button asChild variant="outline" size="icon">
                                                <Link href={`/admin/edit/${movie.slug}?secret=${secret}`}>
                                                    <Edit className="h-4 w-4" />
                                                </Link>
                                            </Button>
                                            <DeleteMovieButton slug={movie.slug} secret={secret} />
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    );
}

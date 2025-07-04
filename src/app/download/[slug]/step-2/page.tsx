import { getMovieBySlug } from "@/lib/data";
import { notFound } from "next/navigation";
import { AdScript } from "@/components/ad-script";
import CountdownButton from "./countdown-button";

export default async function DownloadStep2Page({ params }: { params: { slug: string } }) {
  const movie = await getMovieBySlug(params.slug);
  if (!movie) {
    notFound();
  }

  return (
    <div>
      <h2 className="text-xl font-semibold mb-2 font-headline">Step 2 of 3: Generating Link</h2>
      <p className="text-muted-foreground mb-6">Your link is being prepared. Please wait for the countdown.</p>
      <AdScript adKey="f6e5fdd76b39946e6af9ecb89dda9d90" format="iframe" height={250} width={300} className="mb-6 mx-auto" />
      <CountdownButton slug={params.slug} />
    </div>
  );
}

import { getMovieBySlug } from "@/lib/data";
import { notFound } from "next/navigation";
import { AdPlaceholder } from "@/components/ad-placeholder";
import CountdownButton from "./countdown-button";

export default function DownloadStep2Page({ params }: { params: { slug: string } }) {
  const movie = getMovieBySlug(params.slug);
  if (!movie) {
    notFound();
  }

  return (
    <div>
      <h2 className="text-xl font-semibold mb-2 font-headline">Step 2 of 3: Generating Link</h2>
      <p className="text-muted-foreground mb-6">Your link is being prepared. Please wait for the countdown.</p>
      <AdPlaceholder text="Another Ad / Countdown" className="h-64 mb-6" />
      <CountdownButton slug={params.slug} />
    </div>
  );
}

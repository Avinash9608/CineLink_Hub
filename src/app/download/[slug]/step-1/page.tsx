import { getMovieBySlug } from "@/lib/data";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import { AdPlaceholder } from "@/components/ad-placeholder";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function DownloadStep1Page({ params }: { params: { slug: string } }) {
  const movie = getMovieBySlug(params.slug);
  if (!movie) {
    notFound();
  }

  return (
    <div>
      <h2 className="text-xl font-semibold mb-2 font-headline">Step 1 of 3: Verification</h2>
      <p className="text-muted-foreground mb-6">Please complete the steps to unlock your download link.</p>
      <AdPlaceholder text="Interstitial Ad / Banner Ad" className="h-64 mb-6" />
      <Button asChild size="lg">
        <Link href={`/download/${params.slug}/step-2`}>
          Continue <ArrowRight className="ml-2 h-5 w-5" />
        </Link>
      </Button>
    </div>
  );
}

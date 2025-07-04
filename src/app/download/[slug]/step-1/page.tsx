import { getMovieBySlug } from "@/lib/data";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import { AdScript } from "@/components/ad-script";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default async function DownloadStep1Page({ params }: { params: { slug: string } }) {
  const movie = await getMovieBySlug(params.slug);
  if (!movie) {
    notFound();
  }

  return (
    <div>
      <h2 className="text-xl font-semibold mb-2 font-headline">Step 1 of 3: Verification</h2>
      <p className="text-muted-foreground mb-6">Please complete the steps to unlock your download link.</p>
      <AdScript adKey="f6e5fdd76b39946e6af9ecb89dda9d90" format="iframe" height={250} width={300} className="mb-6 mx-auto" />
      <Button asChild size="lg">
        <Link href={`/download/${params.slug}/step-2`}>
          Continue <ArrowRight className="ml-2 h-5 w-5" />
        </Link>
      </Button>
    </div>
  );
}

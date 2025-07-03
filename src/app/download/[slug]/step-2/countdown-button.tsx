"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Loader2, ArrowRight } from "lucide-react";

export default function CountdownButton({ slug }: { slug: string }) {
  const [countdown, setCountdown] = useState(10);

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown((prev) => prev - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);

  if (countdown > 0) {
    return (
      <Button disabled size="lg">
        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
        Please wait... {countdown}s
      </Button>
    );
  }

  return (
    <Button asChild size="lg" className="animate-in fade-in">
      <Link href={`/download/${slug}/final`}>
        Proceed to Download <ArrowRight className="ml-2 h-5 w-5" />
      </Link>
    </Button>
  );
}

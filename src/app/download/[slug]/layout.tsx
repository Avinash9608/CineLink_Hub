import { AdPlaceholder } from "@/components/ad-placeholder";
import { Film } from "lucide-react";

export default function DownloadLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-14rem)] container mx-auto px-4 py-8 text-center">
       <AdPlaceholder text="Floating Sticky Ad" className="fixed bottom-4 right-4 h-32 w-48 hidden md:flex !z-50"/>
      <div className="w-full max-w-4xl">
        <div className="mb-8">
            <Film className="h-12 w-12 text-primary mx-auto" />
            <h1 className="font-headline text-3xl font-bold mt-2">CineLink Hub</h1>
            <p className="text-muted-foreground">Your download is a few steps away</p>
        </div>
        <div className="w-full p-4 md:p-8 border rounded-lg bg-card animate-in fade-in duration-500">
            {children}
        </div>
      </div>
    </div>
  );
}

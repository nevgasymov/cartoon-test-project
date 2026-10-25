"use client";

import { Button } from "@/components/ui/button";

export default function ErrorPage({ retry }: { retry: () => void }) {
  return (
    <div className="space-y-4 py-8 text-center">
      <h1 className="text-2xl font-semibold">Something went wrong</h1>
      <p className="text-muted-foreground">
        We could not load data from the Rick and Morty API. Please try again.
      </p>
      <Button onClick={() => retry()}>Try again</Button>
    </div>
  );
}

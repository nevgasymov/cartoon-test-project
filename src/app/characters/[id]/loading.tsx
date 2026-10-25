import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="space-y-6">
      <p role="status" className="text-sm text-muted-foreground">
        Loading character...
      </p>
      <div aria-hidden="true" className="grid gap-8 md:grid-cols-[300px_1fr]">
        <Skeleton className="aspect-square w-full max-w-[300px] rounded-xl" />
        <div className="space-y-4">
          <Skeleton className="h-9 w-64" />
          {Array.from({ length: 6 }, (_, i) => (
            <Skeleton key={i} className="h-5 w-80 max-w-full" />
          ))}
        </div>
      </div>
    </div>
  );
}

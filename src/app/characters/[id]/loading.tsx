import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="space-y-6">
      <p role="status" className="text-sm text-[#ffffffb0]">
        Loading character...
      </p>
      <div
        aria-hidden="true"
        className="grid overflow-hidden rounded-[7px] bg-white shadow-[0_0_16px_6px_#bfde42] md:grid-cols-[300px_1fr]"
      >
        <Skeleton className="aspect-square w-full rounded-none" />
        <div className="space-y-4 p-6">
          <Skeleton className="h-9 w-64" />
          {Array.from({ length: 6 }, (_, i) => (
            <Skeleton key={i} className="h-5 w-80 max-w-full" />
          ))}
        </div>
      </div>
    </div>
  );
}

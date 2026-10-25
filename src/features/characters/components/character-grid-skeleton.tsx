import { Skeleton } from "@/components/ui/skeleton";

export function CharacterGridSkeleton() {
  return (
    <div
      aria-hidden="true"
      className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5"
    >
      {Array.from({ length: 20 }, (_, i) => (
        <div key={i} className="overflow-hidden rounded-[7px] bg-[#dff1dbb0]">
          <Skeleton className="aspect-square rounded-none" />
          <div className="space-y-2 p-3">
            <Skeleton className="h-5 w-3/4" />
            <Skeleton className="h-4 w-1/2" />
          </div>
        </div>
      ))}
    </div>
  );
}

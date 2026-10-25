import { CharacterGridSkeleton } from "@/features/characters/components/character-grid-skeleton";

export default function Loading() {
  return (
    <div className="space-y-6">
      <p role="status" className="text-sm text-muted-foreground">
        Loading characters...
      </p>
      <CharacterGridSkeleton />
    </div>
  );
}

import { Suspense } from "react";
import { CharacterFilters } from "@/features/characters/components/character-filters";
import { CharacterGridSkeleton } from "@/features/characters/components/character-grid-skeleton";
import { CharacterResults } from "@/features/characters/components/character-results";
import { ResultCount } from "@/features/characters/components/result-count";
import {
  loadCharacterSearchParams,
  toQueryVariables,
} from "@/features/characters/search-params";

export default async function Home({ searchParams }: PageProps<"/">) {
  const params = await loadCharacterSearchParams(searchParams);

  return (
    <div className="space-y-6">
      <CharacterFilters />
      <p role="status" className="text-sm text-muted-foreground">
        <Suspense fallback="Loading characters...">
          <ResultCount params={params} />
        </Suspense>
      </p>
      <Suspense
        key={JSON.stringify(toQueryVariables(params))}
        fallback={<CharacterGridSkeleton />}
      >
        <CharacterResults params={params} />
      </Suspense>
    </div>
  );
}

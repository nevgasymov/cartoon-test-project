import { CharacterFilters } from "@/features/characters/components/character-filters";
import { CharacterResults } from "@/features/characters/components/character-results";
import { loadCharacterSearchParams } from "@/features/characters/search-params";

export default async function Home({ searchParams }: PageProps<"/">) {
  const params = await loadCharacterSearchParams(searchParams);

  return (
    <div>
      <CharacterFilters />
      <CharacterResults params={params} />
    </div>
  );
}

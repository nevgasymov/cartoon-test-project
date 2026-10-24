import { getCharacters } from "@/features/characters/api/get-characters";
import { CharacterFilters } from "@/features/characters/components/character-filters";
import { CharacterGrid } from "@/features/characters/components/character-grid";
import {
  loadCharacterSearchParams,
  toQueryVariables,
} from "@/features/characters/search-params";

export default async function Home({ searchParams }: PageProps<"/">) {
  const params = await loadCharacterSearchParams(searchParams);
  const { characters } = await getCharacters(toQueryVariables(params));

  return (
    <div>
      <CharacterFilters />
      <CharacterGrid characters={characters} />
    </div>
  );
}

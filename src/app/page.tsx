import { getCharacters } from "@/features/characters/api/get-characters";
import { CharacterGrid } from "@/features/characters/components/character-grid";

export default async function Home() {
  const { characters } = await getCharacters({ page: 1 });

  return (
    <div>
      <h1>Characters</h1>
      <CharacterGrid characters={characters} />
    </div>
  );
}

import Link from "next/link";
import { getCharacters } from "../api/get-characters";
import { toQueryVariables, type CharacterSearchParams } from "../search-params";
import { CharacterGrid } from "./character-grid";
import { Pagination } from "./pagination";

export async function CharacterResults({
  params,
}: {
  params: CharacterSearchParams;
}) {
  const { pages, characters } = await getCharacters(toQueryVariables(params));

  if (characters.length === 0) {
    return (
      <div>
        <p>No characters match your search</p>
        <p>Try a different name or fewer filters.</p>
        <Link href="/">Show all characters</Link>
      </div>
    );
  }

  return (
    <div>
      <CharacterGrid characters={characters} />
      <Pagination params={params} pages={pages} />
    </div>
  );
}

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
      <div className="space-y-3 py-12 text-center">
        <p className="text-lg font-medium">No characters match your search</p>
        <p className="text-muted-foreground">
          Try a different name or fewer filters.
        </p>
        <Link href="/" className="inline-block underline underline-offset-4">
          Show all characters
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <CharacterGrid characters={characters} />
      <Pagination params={params} pages={pages} />
    </div>
  );
}

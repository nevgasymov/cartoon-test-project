import Link from "next/link";
import { cn } from "cn";
import { buttonVariants } from "@/components/ui/button";
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
      <div className="mx-auto my-8 max-w-md space-y-4 rounded-[7px] bg-white p-8 text-center shadow-[0_0_16px_6px_#bfde42]">
        <p className="text-lg font-medium">No characters match your search</p>
        <p className="text-muted-foreground">
          Try a different name or fewer filters.
        </p>
        <Link href="/" className={cn(buttonVariants())}>
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

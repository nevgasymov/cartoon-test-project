import { getCharacters } from "../api/get-characters";
import { toQueryVariables, type CharacterSearchParams } from "../search-params";

export async function ResultCount({
  params,
}: {
  params: CharacterSearchParams;
}) {
  const { count } = await getCharacters(toQueryVariables(params));
  if (count === 0) return "No characters found";
  return count === 1 ? "1 character found" : `${count} characters found`;
}

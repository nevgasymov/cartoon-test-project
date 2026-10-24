import { cacheLife } from "next/cache";
import { graphql } from "@/gql";
import type { GetCharactersQueryVariables } from "@/gql/graphql";
import { gqlFetch } from "@/lib/graphql/fetcher";

const GetCharactersQuery = graphql(`
  query GetCharacters($page: Int, $filter: FilterCharacter) {
    characters(page: $page, filter: $filter) {
      info {
        count
        pages
      }
      results {
        id
        ...CharacterCard_Character
      }
    }
  }
`);

export async function getCharacters(variables: GetCharactersQueryVariables) {
  "use cache";
  cacheLife("hours");

  const { characters } = await gqlFetch(GetCharactersQuery, variables);
  return {
    count: characters?.info?.count ?? 0,
    pages: characters?.info?.pages ?? 0,
    characters: characters?.results?.filter((c) => c !== null) ?? [],
  };
}

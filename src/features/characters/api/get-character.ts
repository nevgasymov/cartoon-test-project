import { cacheLife } from "next/cache";
import { graphql } from "@/gql";
import { gqlFetch } from "@/lib/graphql/fetcher";

const GetCharacterQuery = graphql(`
  query GetCharacter($id: ID!) {
    character(id: $id) {
      ...CharacterDetails_Character
    }
  }
`);

export async function getCharacter(id: string) {
  if (!/^\d+$/.test(id)) return null;
  return fetchCharacter(id);
}

async function fetchCharacter(id: string) {
  "use cache";
  cacheLife("hours");

  const { character } = await gqlFetch(GetCharacterQuery, { id });
  return character;
}

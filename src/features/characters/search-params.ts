import {
  createLoader,
  createSerializer,
  parseAsInteger,
  parseAsString,
  parseAsStringLiteral,
  type inferParserType,
} from "nuqs/server";
import type { GetCharactersQueryVariables } from "@/gql/graphql";

export const STATUSES = ["alive", "dead", "unknown"] as const;
export const GENDERS = ["female", "male", "genderless", "unknown"] as const;

export const characterSearchParams = {
  name: parseAsString.withDefault(""),
  species: parseAsString.withDefault(""),
  status: parseAsStringLiteral(STATUSES),
  gender: parseAsStringLiteral(GENDERS),
  page: parseAsInteger.withDefault(1),
};

export type CharacterSearchParams = inferParserType<
  typeof characterSearchParams
>;

export const loadCharacterSearchParams = createLoader(characterSearchParams);
export const serializeCharacterSearchParams = createSerializer(
  characterSearchParams,
);

export function toQueryVariables(
  params: CharacterSearchParams,
): GetCharactersQueryVariables {
  return {
    page: Math.max(1, params.page),
    filter: {
      name: params.name.trim() || undefined,
      species: params.species.trim() || undefined,
      status: params.status ?? undefined,
      gender: params.gender ?? undefined,
    },
  };
}

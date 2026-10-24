import "server-only";
import { print } from "graphql";
import type { TypedDocumentNode } from "@graphql-typed-document-node/core";

export const GRAPHQL_ENDPOINT = "https://rickandmortyapi.com/graphql";

type GraphQLResponse<TData> = {
  data?: TData | null;
  errors?: { message: string }[];
};

export async function gqlFetch<TData, TVariables>(
  document: TypedDocumentNode<TData, TVariables>,
  variables: TVariables,
): Promise<TData> {
  const url = new URL(GRAPHQL_ENDPOINT);
  url.searchParams.set("query", print(document));
  url.searchParams.set("variables", JSON.stringify(variables));

  const res = await fetch(url, { signal: AbortSignal.timeout(10_000) });
  if (!res.ok) {
    throw new Error(`GraphQL request failed with HTTP ${res.status}`);
  }

  const body = (await res.json()) as GraphQLResponse<TData>;
  if (body.errors?.length) {
    throw new Error(`GraphQL error: ${body.errors[0].message}`);
  }
  if (!body.data) {
    throw new Error("GraphQL response has no data");
  }
  return body.data;
}

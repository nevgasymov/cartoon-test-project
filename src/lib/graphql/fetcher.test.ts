import { parse } from "graphql";
import type { TypedDocumentNode } from "@graphql-typed-document-node/core";
import { HttpResponse } from "msw";
import { graphql } from "msw/graphql";
import { describe, expect, it } from "vitest";
import { server } from "@/test/msw/server";
import { GRAPHQL_ENDPOINT, gqlFetch } from "./fetcher";

const api = graphql.link(GRAPHQL_ENDPOINT);

const CountQuery: TypedDocumentNode<
  { characters: { info: { count: number } } },
  { name: string }
> = parse(`
  query Count($name: String) {
    characters(filter: { name: $name }) { info { count } }
  }
`);

describe("gqlFetch", () => {
  it("sends the query and variables as a GET request", async () => {
    let method = "";
    server.use(
      api.query("Count", ({ request, variables }) => {
        method = request.method;
        return HttpResponse.json({
          data: { characters: { info: { count: variables.name.length } } },
        });
      }),
    );

    const data = await gqlFetch(CountQuery, { name: "rick" });

    expect(method).toBe("GET");
    expect(data.characters.info.count).toBe(4);
  });

  it("throws on an HTTP error", async () => {
    server.use(
      api.query("Count", () => new HttpResponse(null, { status: 502 })),
    );

    await expect(gqlFetch(CountQuery, { name: "rick" })).rejects.toThrow(
      "HTTP 502",
    );
  });

  it("throws on GraphQL errors instead of returning partial data", async () => {
    server.use(
      api.query("Count", () =>
        HttpResponse.json({
          data: null,
          errors: [{ message: "Bad filter" }],
        }),
      ),
    );

    await expect(gqlFetch(CountQuery, { name: "rick" })).rejects.toThrow(
      "Bad filter",
    );
  });
});

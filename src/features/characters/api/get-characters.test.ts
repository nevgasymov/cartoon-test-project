import { HttpResponse } from "msw";
import { graphql } from "msw/graphql";
import { describe, expect, it } from "vitest";
import { GRAPHQL_ENDPOINT } from "@/lib/graphql/fetcher";
import { server } from "@/test/msw/server";
import { getCharacters } from "./get-characters";

const api = graphql.link(GRAPHQL_ENDPOINT);

const rick = {
  id: "1",
  name: "Rick Sanchez",
  image: "https://rickandmortyapi.com/api/character/avatar/1.jpeg",
  status: "Alive",
  species: "Human",
};

describe("getCharacters", () => {
  it("passes page and filter to the API and drops null results", async () => {
    let received: unknown;
    server.use(
      api.query("GetCharacters", ({ variables }) => {
        received = variables;
        return HttpResponse.json({
          data: {
            characters: {
              info: { count: 1, pages: 1 },
              results: [rick, null],
            },
          },
        });
      }),
    );

    const result = await getCharacters({ page: 2, filter: { name: "rick" } });

    expect(received).toEqual({ page: 2, filter: { name: "rick" } });
    expect(result).toEqual({ count: 1, pages: 1, characters: [rick] });
  });

  it("maps the API's empty result (null info) to zero counts", async () => {
    server.use(
      api.query("GetCharacters", () =>
        HttpResponse.json({
          data: {
            characters: {
              info: { count: null, pages: null },
              results: [],
            },
          },
        }),
      ),
    );

    await expect(getCharacters({ filter: { name: "zzzz" } })).resolves.toEqual({
      count: 0,
      pages: 0,
      characters: [],
    });
  });
});

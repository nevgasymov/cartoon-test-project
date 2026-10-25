import { HttpResponse } from "msw";
import { graphql } from "msw/graphql";
import { describe, expect, it } from "vitest";
import { GRAPHQL_ENDPOINT } from "@/lib/graphql/fetcher";
import { server } from "@/test/msw/server";
import { getCharacter } from "./get-character";

const api = graphql.link(GRAPHQL_ENDPOINT);

describe("getCharacter", () => {
  it("returns null for a non-numeric id without calling the API", async () => {
    await expect(getCharacter("abc")).resolves.toBeNull();
  });

  it("returns null when the API has no character with that id", async () => {
    server.use(
      api.query("GetCharacter", () =>
        HttpResponse.json({ data: { character: null } }),
      ),
    );

    await expect(getCharacter("99999")).resolves.toBeNull();
  });

  it("returns the character for a known id", async () => {
    server.use(
      api.query("GetCharacter", ({ variables }) =>
        HttpResponse.json({
          data: { character: { id: variables.id, name: "Rick Sanchez" } },
        }),
      ),
    );

    await expect(getCharacter("1")).resolves.toMatchObject({
      id: "1",
      name: "Rick Sanchez",
    });
  });

  it("throws when the API reports an error", async () => {
    server.use(
      api.query("GetCharacter", () =>
        HttpResponse.json({
          data: { character: null },
          errors: [{ message: "Internal error" }],
        }),
      ),
    );

    await expect(getCharacter("1")).rejects.toThrow("Internal error");
  });
});

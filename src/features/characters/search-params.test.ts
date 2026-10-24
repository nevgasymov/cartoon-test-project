import { describe, expect, it } from "vitest";
import { loadCharacterSearchParams, toQueryVariables } from "./search-params";

const variablesFor = (query: string) =>
  toQueryVariables(loadCharacterSearchParams(query));

describe("toQueryVariables", () => {
  it("defaults to page 1 with no filters", () => {
    expect(variablesFor("")).toEqual({
      page: 1,
      filter: {
        name: undefined,
        species: undefined,
        status: undefined,
        gender: undefined,
      },
    });
  });

  it("drops unknown status and gender values", () => {
    const { filter } = variablesFor("?status=zombie&gender=robot");
    expect(filter?.status).toBeUndefined();
    expect(filter?.gender).toBeUndefined();
  });

  it("keeps known status and gender values", () => {
    const { filter } = variablesFor("?status=dead&gender=female");
    expect(filter?.status).toBe("dead");
    expect(filter?.gender).toBe("female");
  });

  it("trims text filters and treats blank ones as absent", () => {
    const { filter } = variablesFor("?name=%20rick%20&species=%20%20");
    expect(filter?.name).toBe("rick");
    expect(filter?.species).toBeUndefined();
  });

  it.each(["?page=0", "?page=-3", "?page=abc"])(
    "falls back to page 1 for %s",
    (query) => {
      expect(variablesFor(query).page).toBe(1);
    },
  );
});

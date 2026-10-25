// @vitest-environment jsdom
import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { CharacterDetails } from "./character-details";

const morty = {
  id: "2",
  name: "Morty Smith",
  image: null,
  status: "Alive",
  species: "Human",
  type: "",
  gender: "Male",
  origin: { name: "unknown", dimension: null },
  location: { name: "Citadel of Ricks", dimension: "unknown" },
  episode: [
    { id: "1", name: "Pilot", episode: "S01E01", air_date: "December 2, 2013" },
    null,
  ],
};

function valueOf(term: string) {
  const dt = screen.getByText(term, { selector: "dt" });
  return dt.nextElementSibling?.textContent;
}

describe("CharacterDetails", () => {
  it("shows every field, with readable fallbacks for missing values", () => {
    render(<CharacterDetails character={morty} />);

    expect(
      screen.getByRole("heading", { level: 1, name: "Morty Smith" }),
    ).toBeInTheDocument();
    expect(valueOf("Status")).toBe("alive");
    expect(valueOf("Species")).toBe("Human");
    expect(valueOf("Type")).toBe("None");
    expect(valueOf("Gender")).toBe("Male");
    expect(valueOf("Origin")).toBe("Unknown");
    expect(valueOf("Last known location")).toBe("Citadel of Ricks");
  });

  it("lists the episodes and skips null entries", () => {
    render(<CharacterDetails character={{ ...morty, origin: null }} />);

    const episodes = screen.getByRole("region", { name: "Episodes (1)" });
    expect(within(episodes).getAllByRole("listitem")).toHaveLength(1);
    expect(within(episodes).getByText("Pilot")).toBeInTheDocument();
    expect(valueOf("Origin")).toBe("Unknown");
  });
});

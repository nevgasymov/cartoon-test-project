import type { ComponentProps } from "react";
import { CharacterCard } from "./character-card";

type Props = {
  characters: ComponentProps<typeof CharacterCard>["character"][];
};

export function CharacterGrid({ characters }: Props) {
  return (
    <ul
      aria-label="Characters"
      className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5"
    >
      {characters.map((character, index) => (
        <li key={character.id}>
          <CharacterCard character={character} aboveFold={index < 4} />
        </li>
      ))}
    </ul>
  );
}

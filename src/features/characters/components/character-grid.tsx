import type { ComponentProps } from "react";
import { CharacterCard } from "./character-card";

type Props = {
  characters: ComponentProps<typeof CharacterCard>["character"][];
};

export function CharacterGrid({ characters }: Props) {
  return (
    <ul aria-label="Characters">
      {characters.map((character) => (
        <li key={character.id}>
          <CharacterCard character={character} />
        </li>
      ))}
    </ul>
  );
}

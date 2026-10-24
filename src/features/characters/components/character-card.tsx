import Image from "next/image";
import Link from "next/link";
import type { ResultOf } from "@graphql-typed-document-node/core";
import { graphql } from "@/gql";

export const CharacterCardFragment = graphql(`
  fragment CharacterCard_Character on Character {
    id
    name
    image
    status
    species
  }
`);

type Props = {
  character: ResultOf<typeof CharacterCardFragment>;
};

export function CharacterCard({ character }: Props) {
  return (
    <article>
      {character.image && (
        <Image src={character.image} alt="" width={300} height={300} />
      )}
      <h2>
        <Link href={`/characters/${character.id}`}>{character.name}</Link>
      </h2>
      <p>
        {character.status} · {character.species}
      </p>
    </article>
  );
}

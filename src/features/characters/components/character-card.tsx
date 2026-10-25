import Image from "next/image";
import Link from "next/link";
import type { ResultOf } from "@graphql-typed-document-node/core";
import { graphql } from "@/gql";
import { StatusBadge } from "./status-badge";

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
  aboveFold?: boolean;
};

export function CharacterCard({ character, aboveFold = false }: Props) {
  return (
    <article className="group relative overflow-hidden rounded-[7px] bg-[#dff1dbb0] transition-[background-color,box-shadow] duration-300 hover:bg-white hover:shadow-[0_0_16px_6px_#bfde42] dark:bg-card dark:hover:bg-muted has-[a:focus-visible]:ring-3 has-[a:focus-visible]:ring-ring/50">
      {character.image && (
        <Image
          src={character.image}
          alt=""
          width={300}
          height={300}
          sizes="(min-width: 1280px) 216px, (min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw"
          loading={aboveFold ? "eager" : "lazy"}
          fetchPriority={aboveFold ? "high" : "auto"}
          className="aspect-square w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
      )}
      <div className="space-y-1 p-3">
        <h2
          className="truncate leading-snug font-medium"
          title={character.name ?? undefined}
        >
          <Link
            href={`/characters/${character.id}`}
            prefetch={false}
            className="outline-none after:absolute after:inset-0"
          >
            {character.name}
          </Link>
        </h2>
        <p className="flex items-center gap-2 text-sm text-muted-foreground">
          <StatusBadge
            status={character.status}
            labelClassName="sr-only md:not-sr-only"
          />
          <span aria-hidden="true" className="hidden md:inline">
            ·
          </span>
          <span
            className="min-w-0 truncate"
            title={character.species ?? undefined}
          >
            {character.species}
          </span>
        </p>
      </div>
    </article>
  );
}

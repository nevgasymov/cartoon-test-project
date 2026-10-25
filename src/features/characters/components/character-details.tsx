import Image from "next/image";
import type { ResultOf } from "@graphql-typed-document-node/core";
import type { ReactNode } from "react";
import { graphql } from "@/gql";
import { StatusBadge } from "./status-badge";

export const CharacterDetailsFragment = graphql(`
  fragment CharacterDetails_Character on Character {
    id
    name
    image
    status
    species
    type
    gender
    origin {
      name
      dimension
    }
    location {
      name
      dimension
    }
    episode {
      id
      name
      episode
      air_date
    }
  }
`);

type Character = ResultOf<typeof CharacterDetailsFragment>;
type Place = Character["origin"];

export function CharacterDetails({ character }: { character: Character }) {
  const episodes = character.episode.filter((e) => e !== null);

  return (
    <article className="space-y-10">
      <div className="grid overflow-hidden rounded-[7px] bg-white shadow-[0_0_16px_6px_#bfde42] md:grid-cols-[300px_1fr]">
        {character.image && (
          <Image
            src={character.image}
            alt=""
            width={300}
            height={300}
            preload
            className="aspect-square w-full object-cover md:h-full"
          />
        )}
        <div className="space-y-6 p-6">
          <h1 className="text-3xl font-semibold tracking-tight">
            {character.name}
          </h1>
          <dl className="grid grid-cols-[auto_1fr] gap-x-8 gap-y-3 text-sm">
            <Row label="Status">
              <StatusBadge status={character.status} />
            </Row>
            <Row label="Species">{character.species}</Row>
            <Row label="Type">{character.type || "None"}</Row>
            <Row label="Gender">{character.gender}</Row>
            <Row label="Origin">
              <PlaceName place={character.origin} />
            </Row>
            <Row label="Last known location">
              <PlaceName place={character.location} />
            </Row>
          </dl>
        </div>
      </div>

      <section aria-labelledby="episodes" className="space-y-4">
        <h2 id="episodes" className="text-xl font-semibold text-white">
          Episodes ({episodes.length})
        </h2>
        <ul className="grid gap-2 text-sm sm:grid-cols-2 lg:grid-cols-3">
          {episodes.map((episode) => (
            <li
              key={episode.id}
              className="rounded-[7px] bg-white p-3 shadow-[0_0_16px_6px_#bfde42]"
            >
              <p className="font-medium">{episode.name}</p>
              <p className="text-muted-foreground">
                {episode.episode} · {episode.air_date}
              </p>
            </li>
          ))}
        </ul>
      </section>
    </article>
  );
}

function Row({ label, children }: { label: string; children: ReactNode }) {
  return (
    <>
      <dt className="text-muted-foreground">{label}</dt>
      <dd className="font-medium">{children}</dd>
    </>
  );
}

function PlaceName({ place }: { place: Place }) {
  if (!place?.name || place.name === "unknown") return "Unknown";
  return (
    <>
      {place.name}
      {place.dimension && place.dimension !== "unknown" && (
        <span className="block font-normal text-muted-foreground">
          {place.dimension}
        </span>
      )}
    </>
  );
}

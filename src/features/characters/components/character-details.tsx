import Image from "next/image";
import type { ResultOf } from "@graphql-typed-document-node/core";
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

export function CharacterDetails({ character }: { character: Character }) {
  const episodes = character.episode.filter((e) => e !== null);
  const origin =
    character.origin?.name && character.origin.name !== "unknown"
      ? character.origin
      : null;
  const location =
    character.location?.name && character.location.name !== "unknown"
      ? character.location
      : null;

  return (
    <article className="space-y-10">
      <div className="grid gap-8 md:grid-cols-[300px_1fr]">
        {character.image && (
          <Image
            src={character.image}
            alt=""
            width={300}
            height={300}
            preload
            className="w-full max-w-[300px] rounded-xl border"
          />
        )}
        <div className="space-y-6">
          <h1 className="text-3xl font-semibold tracking-tight">
            {character.name}
          </h1>
          <dl className="grid grid-cols-[auto_1fr] gap-x-8 gap-y-3 text-sm">
            <dt className="text-muted-foreground">Status</dt>
            <dd className="font-medium">
              <StatusBadge status={character.status} />
            </dd>
            <dt className="text-muted-foreground">Species</dt>
            <dd className="font-medium">{character.species}</dd>
            <dt className="text-muted-foreground">Type</dt>
            <dd className="font-medium">{character.type || "None"}</dd>
            <dt className="text-muted-foreground">Gender</dt>
            <dd className="font-medium">{character.gender}</dd>
            <dt className="text-muted-foreground">Origin</dt>
            <dd className="font-medium">
              {origin ? (
                <>
                  {origin.name}
                  {origin.dimension && origin.dimension !== "unknown" && (
                    <span className="block font-normal text-muted-foreground">
                      {origin.dimension}
                    </span>
                  )}
                </>
              ) : (
                "Unknown"
              )}
            </dd>
            <dt className="text-muted-foreground">Last known location</dt>
            <dd className="font-medium">
              {location ? (
                <>
                  {location.name}
                  {location.dimension && location.dimension !== "unknown" && (
                    <span className="block font-normal text-muted-foreground">
                      {location.dimension}
                    </span>
                  )}
                </>
              ) : (
                "Unknown"
              )}
            </dd>
          </dl>
        </div>
      </div>

      <section aria-labelledby="episodes" className="space-y-4">
        <h2 id="episodes" className="text-xl font-semibold">
          Episodes ({episodes.length})
        </h2>
        <ul className="grid gap-2 text-sm sm:grid-cols-2 lg:grid-cols-3">
          {episodes.map((episode) => (
            <li key={episode.id} className="rounded-lg border p-3">
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

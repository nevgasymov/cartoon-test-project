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
    <article>
      <div>
        {character.image && (
          <Image
            src={character.image}
            alt=""
            width={300}
            height={300}
            preload
          />
        )}
        <div>
          <h1>{character.name}</h1>
          <dl>
            <dt>Status</dt>
            <dd>
              <StatusBadge status={character.status} />
            </dd>
            <dt>Species</dt>
            <dd>{character.species}</dd>
            <dt>Type</dt>
            <dd>{character.type || "None"}</dd>
            <dt>Gender</dt>
            <dd>{character.gender}</dd>
            <dt>Origin</dt>
            <dd>
              {origin ? (
                <>
                  {origin.name}
                  {origin.dimension && origin.dimension !== "unknown" && (
                    <span>{origin.dimension}</span>
                  )}
                </>
              ) : (
                "Unknown"
              )}
            </dd>
            <dt>Last known location</dt>
            <dd>
              {location ? (
                <>
                  {location.name}
                  {location.dimension && location.dimension !== "unknown" && (
                    <span>{location.dimension}</span>
                  )}
                </>
              ) : (
                "Unknown"
              )}
            </dd>
          </dl>
        </div>
      </div>

      <section aria-labelledby="episodes">
        <h2 id="episodes">Episodes ({episodes.length})</h2>
        <ul>
          {episodes.map((episode) => (
            <li key={episode.id}>
              <p>{episode.name}</p>
              <p>
                {episode.episode} · {episode.air_date}
              </p>
            </li>
          ))}
        </ul>
      </section>
    </article>
  );
}

"use client";

import { useQueryStates } from "nuqs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { characterSearchParams, GENDERS, STATUSES } from "../search-params";

export function CharacterFilters() {
  const [params, setParams] = useQueryStates(characterSearchParams, {
    shallow: false,
  });
  const hasFilters = Boolean(
    params.name || params.species || params.status || params.gender,
  );

  return (
    <search>
      <div>
        <label htmlFor="name">Name</label>
        <Input
          id="name"
          type="search"
          placeholder="Rick, Morty..."
          value={params.name}
          onChange={(e) => setParams({ name: e.target.value, page: null })}
        />
      </div>
      <div>
        <label htmlFor="species">Species</label>
        <Input
          id="species"
          type="search"
          placeholder="Human, Alien..."
          value={params.species}
          onChange={(e) => setParams({ species: e.target.value, page: null })}
        />
      </div>
      <div>
        <label htmlFor="status">Status</label>
        <select
          id="status"
          value={params.status ?? ""}
          onChange={(e) =>
            setParams({
              status: characterSearchParams.status.parse(e.target.value),
              page: null,
            })
          }
        >
          <option value="">Any</option>
          {STATUSES.map((status) => (
            <option key={status} value={status}>
              {status}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="gender">Gender</label>
        <select
          id="gender"
          value={params.gender ?? ""}
          onChange={(e) =>
            setParams({
              gender: characterSearchParams.gender.parse(e.target.value),
              page: null,
            })
          }
        >
          <option value="">Any</option>
          {GENDERS.map((gender) => (
            <option key={gender} value={gender}>
              {gender}
            </option>
          ))}
        </select>
      </div>
      <Button
        variant="outline"
        disabled={!hasFilters}
        onClick={() => setParams(null)}
      >
        Clear filters
      </Button>
    </search>
  );
}

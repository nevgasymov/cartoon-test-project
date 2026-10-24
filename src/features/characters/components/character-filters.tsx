"use client";

import { useQueryStates } from "nuqs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { characterSearchParams, GENDERS, STATUSES } from "../search-params";

const controlClass =
  "border border-[#1a384066] bg-[#41b4ca] text-white outline-none focus-visible:border-[#1a384066] focus-visible:shadow-[0_0_7px_5px_#bfde42] focus-visible:ring-0 dark:bg-[#41b4ca]";
const selectClass = `h-8 w-full appearance-none rounded-lg bg-[url(data:image/svg+xml,%3Csvg%20xmlns=%27http://www.w3.org/2000/svg%27%20viewBox=%270%200%2024%2024%27%20fill=%27none%27%20stroke=%27white%27%20stroke-width=%272.5%27%20stroke-linecap=%27round%27%20stroke-linejoin=%27round%27%3E%3Cpath%20d=%27m6%209%206%206%206-6%27/%3E%3C/svg%3E)] bg-size-[14px] bg-[position:right_7px_center] bg-no-repeat pr-9 pl-2.5 text-sm capitalize [&_option]:text-black ${controlClass}`;
const inputClass = `${controlClass} appearance-none placeholder:text-white/70 [&:-webkit-autofill]:shadow-[inset_0_0_0_1000px_#41b4ca] [&:-webkit-autofill]:[-webkit-text-fill-color:white]`;

export function CharacterFilters() {
  const [params, setParams] = useQueryStates(characterSearchParams, {
    shallow: false,
  });
  const hasFilters = Boolean(
    params.name || params.species || params.status || params.gender,
  );

  return (
    <search className="grid items-end gap-4 sm:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr_1fr_auto]">
      <div className="grid">
        <label htmlFor="name" className="text-sm font-medium">
          Name
        </label>
        <Input
          className={inputClass}
          id="name"
          type="search"
          placeholder="Rick, Morty..."
          value={params.name}
          onChange={(e) => setParams({ name: e.target.value, page: null })}
        />
      </div>
      <div className="grid">
        <label htmlFor="species" className="text-sm font-medium">
          Species
        </label>
        <Input
          className={inputClass}
          id="species"
          type="search"
          placeholder="Human, Alien..."
          value={params.species}
          onChange={(e) => setParams({ species: e.target.value, page: null })}
        />
      </div>
      <div className="grid">
        <label htmlFor="status" className="text-sm font-medium">
          Status
        </label>
        <select
          id="status"
          className={selectClass}
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
      <div className="grid">
        <label htmlFor="gender" className="text-sm font-medium">
          Gender
        </label>
        <select
          id="gender"
          className={selectClass}
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
      <Button disabled={!hasFilters} onClick={() => setParams(null)}>
        Clear filters
      </Button>
    </search>
  );
}

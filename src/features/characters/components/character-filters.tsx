"use client";

import { debounce, useQueryStates } from "nuqs";
import type { ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { characterSearchParams, GENDERS, STATUSES } from "../search-params";

const typingUpdate = { limitUrlUpdates: debounce(300) };
const pickUpdate = { history: "push" } as const;

const controlClass =
  "border border-[#1a384066] bg-[#41b4ca] text-[#1a3840] outline-none focus-visible:border-[#1a384066] focus-visible:shadow-[0_0_7px_5px_#bfde42] focus-visible:ring-0 dark:bg-[#41b4ca]";
const selectClass = `h-8 w-full appearance-none rounded-lg bg-[url(data:image/svg+xml,%3Csvg%20xmlns=%27http://www.w3.org/2000/svg%27%20viewBox=%270%200%2024%2024%27%20fill=%27none%27%20stroke=%27%231a3840%27%20stroke-width=%272.5%27%20stroke-linecap=%27round%27%20stroke-linejoin=%27round%27%3E%3Cpath%20d=%27m6%209%206%206%206-6%27/%3E%3C/svg%3E)] bg-size-[14px] bg-[position:right_7px_center] bg-no-repeat pr-9 pl-2.5 text-sm capitalize [&_option]:text-black ${controlClass}`;
const inputClass = `${controlClass} appearance-none placeholder:text-[#1a3840]/60 [&:-webkit-autofill]:shadow-[inset_0_0_0_1000px_#41b4ca] [&:-webkit-autofill]:[-webkit-text-fill-color:#1a3840] [&:-webkit-autofill:focus-visible]:shadow-[inset_0_0_0_1000px_#41b4ca,0_0_7px_5px_#bfde42]`;

export function CharacterFilters() {
  const [params, setParams] = useQueryStates(characterSearchParams, {
    shallow: false,
  });
  const hasFilters = Boolean(
    params.name || params.species || params.status || params.gender,
  );

  return (
    <search className="grid items-end gap-4 sm:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr_1fr_auto]">
      <Field id="name" label="Name">
        <Input
          className={inputClass}
          id="name"
          type="search"
          autoComplete="off"
          placeholder="Rick, Morty..."
          value={params.name}
          onChange={(e) =>
            setParams({ name: e.target.value, page: null }, typingUpdate)
          }
        />
      </Field>
      <Field id="species" label="Species">
        <Input
          className={inputClass}
          id="species"
          type="search"
          autoComplete="off"
          placeholder="Human, Alien..."
          value={params.species}
          onChange={(e) =>
            setParams({ species: e.target.value, page: null }, typingUpdate)
          }
        />
      </Field>
      <Field id="status" label="Status">
        <select
          id="status"
          className={selectClass}
          value={params.status ?? ""}
          onChange={(e) =>
            setParams(
              {
                status: characterSearchParams.status.parse(e.target.value),
                page: null,
              },
              pickUpdate,
            )
          }
        >
          <option value="">Any</option>
          {STATUSES.map((status) => (
            <option key={status} value={status}>
              {status}
            </option>
          ))}
        </select>
      </Field>
      <Field id="gender" label="Gender">
        <select
          id="gender"
          className={selectClass}
          value={params.gender ?? ""}
          onChange={(e) =>
            setParams(
              {
                gender: characterSearchParams.gender.parse(e.target.value),
                page: null,
              },
              pickUpdate,
            )
          }
        >
          <option value="">Any</option>
          {GENDERS.map((gender) => (
            <option key={gender} value={gender}>
              {gender}
            </option>
          ))}
        </select>
      </Field>
      <Button
        disabled={!hasFilters}
        onClick={() => setParams(null, pickUpdate)}
      >
        Clear filters
      </Button>
    </search>
  );
}

function Field({
  id,
  label,
  children,
}: {
  id: string;
  label: string;
  children: ReactNode;
}) {
  return (
    <div className="grid">
      <label htmlFor={id} className="text-sm font-medium">
        {label}
      </label>
      {children}
    </div>
  );
}

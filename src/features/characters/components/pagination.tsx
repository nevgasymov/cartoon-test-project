import Link from "next/link";
import { cn } from "cn";
import { buttonVariants } from "@/components/ui/button";
import {
  serializeCharacterSearchParams,
  type CharacterSearchParams,
} from "../search-params";

type Props = {
  params: CharacterSearchParams;
  pages: number;
};

export function Pagination({ params, pages }: Props) {
  if (pages <= 1) return null;

  const { page } = params;
  const hrefFor = (target: number) =>
    serializeCharacterSearchParams("/", { ...params, page: target });

  return (
    <nav
      aria-label="Pagination"
      className="grid grid-cols-3 items-center gap-4"
    >
      <div>
        {page > 1 && (
          <Link
            href={hrefFor(page - 1)}
            rel="prev"
            className={cn(buttonVariants())}
          >
            Previous
          </Link>
        )}
      </div>
      <p className="text-center text-sm text-[#ffffffb0]">
        Page {page} of {pages}
      </p>
      <div className="text-right">
        {page < pages && (
          <Link
            href={hrefFor(page + 1)}
            rel="next"
            className={cn(buttonVariants())}
          >
            Next
          </Link>
        )}
      </div>
    </nav>
  );
}

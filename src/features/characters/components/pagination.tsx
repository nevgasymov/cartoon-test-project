import Link from "next/link";
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
    <nav aria-label="Pagination">
      <div>
        {page > 1 && (
          <Link href={hrefFor(page - 1)} rel="prev">
            Previous
          </Link>
        )}
      </div>
      <p>
        Page {page} of {pages}
      </p>
      <div>
        {page < pages && (
          <Link href={hrefFor(page + 1)} rel="next">
            Next
          </Link>
        )}
      </div>
    </nav>
  );
}

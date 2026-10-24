import Link from "next/link";
import { notFound } from "next/navigation";
import { getCharacter } from "@/features/characters/api/get-character";
import { CharacterDetails } from "@/features/characters/components/character-details";

export function generateStaticParams() {
  return [{ id: "1" }];
}

export default async function CharacterPage({
  params,
}: PageProps<"/characters/[id]">) {
  const { id } = await params;
  const character = await getCharacter(id);
  if (!character) notFound();

  return (
    <div className="space-y-6">
      <Link
        href="/"
        className="text-sm text-muted-foreground underline-offset-4 hover:underline"
      >
        ← All characters
      </Link>
      <CharacterDetails character={character} />
    </div>
  );
}

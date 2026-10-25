import Link from "next/link";

export default function NotFound() {
  return (
    <div className="space-y-4 py-8 text-center">
      <h1 className="text-2xl font-semibold">Character not found</h1>
      <p className="text-muted-foreground">
        There is no character with this id.
      </p>
      <Link href="/" className="underline underline-offset-4">
        Back to all characters
      </Link>
    </div>
  );
}

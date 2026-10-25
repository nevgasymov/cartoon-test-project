import Link from "next/link";

export default function NotFound() {
  return (
    <div className="space-y-4 py-8 text-center">
      <h1 className="text-2xl font-semibold">Page not found</h1>
      <Link href="/" className="underline underline-offset-4">
        Back to all characters
      </Link>
    </div>
  );
}

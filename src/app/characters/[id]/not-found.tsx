import Link from "next/link";
import { cn } from "cn";
import { buttonVariants } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="mx-auto my-8 max-w-md space-y-4 rounded-[7px] bg-white p-8 text-center shadow-[0_0_16px_6px_#bfde42]">
      <h1 className="text-2xl font-semibold">Character not found</h1>
      <p className="text-muted-foreground">
        There is no character with this id.
      </p>
      <Link href="/" className={cn(buttonVariants())}>
        Back to all characters
      </Link>
    </div>
  );
}

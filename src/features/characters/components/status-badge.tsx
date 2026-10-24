import { cn } from "cn";

const DOT_COLORS: Record<string, string> = {
  alive: "bg-green-500",
  dead: "bg-red-500",
};

type Props = {
  status: string | null | undefined;
  labelClassName?: string;
};

export function StatusBadge({ status, labelClassName }: Props) {
  const value = status?.toLowerCase() || "unknown";
  return (
    <span className="inline-flex items-center gap-1.5 capitalize">
      <span
        aria-hidden="true"
        className={cn(
          "size-2 rounded-full",
          DOT_COLORS[value] ?? "bg-amber-400",
        )}
      />
      <span className={labelClassName}>{value}</span>
    </span>
  );
}

interface StatBadgeProps {
  label: string;
  value: string;
  tone?: "default" | "success" | "warn";
}

const toneStyles = {
  default: "text-foreground",
  success: "text-green-600",
  warn: "text-amber-500",
};

export function StatBadge({ label, value, tone = "default" }: StatBadgeProps) {
  return (
    <div className="border border-gray-200 rounded-lg px-4 py-3 min-w-[120px]">
      <p className="text-xs text-gray-500 mb-1">{label}</p>
      <p className={`text-sm font-mono font-medium tabular-nums ${toneStyles[tone]}`}>
        {value}
      </p>
    </div>
  );
}

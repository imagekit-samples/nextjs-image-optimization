interface SectionHeaderProps {
  number: string;
  title: string;
  subtitle: string;
}

export function SectionHeader({ number, title, subtitle }: SectionHeaderProps) {
  return (
    <div className="mb-6">
      <span className="inline-block text-xs font-mono text-gray-400 border border-gray-200 rounded px-2 py-0.5 mb-3">
        {number}
      </span>
      <h2 className="text-2xl font-bold tracking-tight mb-1">{title}</h2>
      <p className="text-gray-500">{subtitle}</p>
    </div>
  );
}

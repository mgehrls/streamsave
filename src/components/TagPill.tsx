export default function TagPill({
  tag,
}: {
  key: number;
  tag: { id: number; name: string };
}) {
  return (
    <span className="rounded-md bg-slate-800 px-1 py-0.5 text-xs tracking-wider">
      {tag.name}
    </span>
  );
}

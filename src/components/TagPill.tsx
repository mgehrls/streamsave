export default function TagPill({
  tag,
}: {
  key: number;
  tag: { id: number; name: string };
}) {
  return (
    <span className="rounded-md bg-slate-200 px-1 py-0.5 text-xs tracking-wider text-black">
      {tag.name}
    </span>
  );
}

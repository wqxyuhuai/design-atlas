interface TagListProps {
  tags: string[];
}

export function TagList({ tags }: TagListProps) {
  return (
    <div className="flex flex-wrap gap-1.5">
      {tags.map((tag) => (
        <span
          key={tag}
          className="rounded-full bg-atlas-surface2 px-2.5 py-1 text-xs tracking-[-0.01em] text-atlas-subtle"
        >
          {tag}
        </span>
      ))}
    </div>
  );
}

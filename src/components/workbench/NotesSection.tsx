import { EmptyState } from "../common/EmptyState";

interface NotesSectionProps {
  notes: string;
}

const urlPattern = /(https?:\/\/[^\s]+)/g;

function renderLinkedText(text: string) {
  const parts = text.split(urlPattern);

  return parts.map((part, index) => {
    if (part.match(urlPattern)) {
      return (
        <a
          key={`${part}-${index}`}
          href={part}
          target="_blank"
          rel="noreferrer"
          className="text-atlas-ink underline decoration-atlas-accent/45 underline-offset-4 transition hover:text-atlas-accent"
        >
          {part}
        </a>
      );
    }

    return part;
  });
}

export function NotesSection({ notes }: NotesSectionProps) {
  if (!notes.trim()) {
    return <EmptyState title="No notes yet." description="Add implementation and reuse notes here." />;
  }

  return (
    <section className="rounded-[18px] bg-atlas-canvas p-5">
      <h2 className="text-[21px] font-semibold leading-[1.2] tracking-[-0.01em] text-atlas-ink">Notes</h2>

      <div className="mt-5 space-y-4">
        {notes
          .split(/\n{2,}/)
          .map((block) => block.trim())
          .filter(Boolean)
          .map((block, index) => (
            <p
              key={`${block.slice(0, 20)}-${index}`}
              className="whitespace-pre-wrap text-[15px] font-normal leading-[1.6] tracking-[-0.01em] text-atlas-muted"
            >
              {renderLinkedText(block)}
            </p>
          ))}
      </div>
    </section>
  );
}

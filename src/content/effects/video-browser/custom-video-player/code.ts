export const code = `import { ProjectVideoCard } from "@/components/video/ProjectVideoCard";

export function ProjectVideoModule() {
  return (
    <ProjectVideoCard
      video={{
        src: "/videos/project.mp4",
        poster: "/videos/project-poster.webp",
        spriteSrc: "/videos/project-sprite.jpg",
        spriteFrameCount: 8,
        spriteColumns: 8,
        spriteRows: 1,
        duration: 21,
        mutedDefault: true,
        title: "Project film"
      }}
    />
  );
}`;

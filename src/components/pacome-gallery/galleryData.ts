export type GalleryProject = {
  id: string;
  title: string;
  image: string;
  href?: string;
  width?: number;
  height?: number;
};

const masterpieceBase = "/placeholders/world-masterpieces";
const wide = { width: 1200, height: 760 };

export const galleryProjects: GalleryProject[] = [
  { id: "project-01", title: "Project 01", image: `${masterpieceBase}/13_luncheon_boating_party_renoir.webp`, href: "/works/project-01", ...wide },
  { id: "project-02", title: "Project 02", image: `${masterpieceBase}/15_sunday_afternoon_seurat.webp`, href: "/works/project-02", ...wide },
  { id: "project-03", title: "Project 03", image: `${masterpieceBase}/17_cafe_terrace_at_night_van_gogh.webp`, href: "/works/project-03", ...wide },
  { id: "project-04", title: "Project 04", image: `${masterpieceBase}/04_the_kiss_klimt.webp`, href: "/works/project-04", ...wide },
  { id: "project-05", title: "Project 05", image: `${masterpieceBase}/05_the_scream_munch.webp`, href: "/works/project-05", ...wide },
  { id: "project-06", title: "Project 06", image: `${masterpieceBase}/08_liberty_leading_the_people_delacroix.webp`, href: "/works/project-06", ...wide },
  { id: "project-07", title: "Project 07", image: `${masterpieceBase}/10_fighting_temeraire_turner.webp`, href: "/works/project-07", ...wide },
  { id: "project-08", title: "Project 08", image: `${masterpieceBase}/11_whistlers_mother.webp`, href: "/works/project-08", ...wide },
  { id: "project-09", title: "Project 09", image: `${masterpieceBase}/12_the_gleaners_millet.webp`, href: "/works/project-09", ...wide },
  { id: "project-10", title: "Project 10", image: `${masterpieceBase}/14_moulin_de_la_galette_renoir.webp`, href: "/works/project-10", ...wide },
  { id: "project-11", title: "Project 11", image: `${masterpieceBase}/16_irises_van_gogh.webp`, href: "/works/project-11", ...wide },
  { id: "project-12", title: "Project 12", image: `${masterpieceBase}/18_the_hay_wain_constable.webp`, href: "/works/project-12", ...wide },
  { id: "project-13", title: "Project 13", image: `${masterpieceBase}/19_arnolfini_portrait_van_eyck.webp`, href: "/works/project-13", ...wide },
  { id: "project-14", title: "Project 14", image: `${masterpieceBase}/20_the_milkmaid_vermeer.webp`, href: "/works/project-14", ...wide },
  { id: "project-15", title: "Project 15", image: `${masterpieceBase}/06_impression_sunrise_monet.webp`, href: "/works/project-15", ...wide },
  { id: "project-16", title: "Project 16", image: `${masterpieceBase}/07_the_swing_fragonard.webp`, href: "/works/project-16", ...wide }
];

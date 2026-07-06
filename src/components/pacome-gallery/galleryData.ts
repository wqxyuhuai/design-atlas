export type GalleryProject = {
  id: string;
  title: string;
  image: string;
  href?: string;
  width?: number;
  height?: number;
};

const pacomeBase = "/demo/pacome-gallery";

export const galleryProjects: GalleryProject[] = [
  { id: "project-01", title: "Project 01", image: `${pacomeBase}/teal-top.png`, href: "/works/project-01" },
  { id: "project-02", title: "Project 02", image: `${pacomeBase}/purple-eye.png`, href: "/works/project-02" },
  { id: "project-03", title: "Project 03", image: `${pacomeBase}/chair-yellow.png`, href: "/works/project-03" },
  { id: "project-04", title: "Project 04", image: `${pacomeBase}/hero-blue.png`, href: "/works/project-04" },
  { id: "project-05", title: "Project 05", image: `${pacomeBase}/blue-frame.png`, href: "/works/project-05" },
  { id: "project-06", title: "Project 06", image: `${pacomeBase}/cream-blur.png`, href: "/works/project-06" },
  { id: "project-07", title: "Project 07", image: `${pacomeBase}/aqua-blur.png`, href: "/works/project-07" },
  { id: "project-08", title: "Project 08", image: `${pacomeBase}/deep-purple.png`, href: "/works/project-08" },
  { id: "project-09", title: "Project 09", image: `${pacomeBase}/yellow-orb.png`, href: "/works/project-09" },
  { id: "project-10", title: "Project 10", image: `${pacomeBase}/green-orbit.png`, href: "/works/project-10" },
  { id: "project-11", title: "Project 11", image: `${pacomeBase}/side-splash.png`, href: "/works/project-11" },
  { id: "project-12", title: "Project 12", image: `${pacomeBase}/mountain-white.png`, href: "/works/project-12" },
  { id: "project-13", title: "Project 13", image: `${pacomeBase}/dark-flame.png`, href: "/works/project-13" },
  { id: "project-14", title: "Project 14", image: `${pacomeBase}/top-green.png`, href: "/works/project-14" },
  { id: "project-15", title: "Project 15", image: `${pacomeBase}/wide-blue.png`, href: "/works/project-15" },
  { id: "project-16", title: "Project 16", image: `${pacomeBase}/soft-card.png`, href: "/works/project-16" }
];

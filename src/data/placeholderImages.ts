export type PlaceholderImage = {
  src: string;
  alt: string;
  title: string;
};

const basePath = "/placeholders/world-masterpieces";

export const worldMasterpiecePlaceholders: PlaceholderImage[] = [
  {
    src: `${basePath}/01_school_of_athens_raphael.webp`,
    alt: "The School of Athens by Raphael",
    title: "The School of Athens"
  },
  {
    src: `${basePath}/02_las_meninas_velazquez.webp`,
    alt: "Las Meninas by Diego Velazquez",
    title: "Las Meninas"
  },
  {
    src: `${basePath}/03_garden_of_earthly_delights_bosch.webp`,
    alt: "The Garden of Earthly Delights by Hieronymus Bosch",
    title: "The Garden of Earthly Delights"
  },
  {
    src: `${basePath}/04_the_kiss_klimt.webp`,
    alt: "The Kiss by Gustav Klimt",
    title: "The Kiss"
  },
  {
    src: `${basePath}/05_the_scream_munch.webp`,
    alt: "The Scream by Edvard Munch",
    title: "The Scream"
  },
  {
    src: `${basePath}/06_impression_sunrise_monet.webp`,
    alt: "Impression, Sunrise by Claude Monet",
    title: "Impression, Sunrise"
  },
  {
    src: `${basePath}/07_the_swing_fragonard.webp`,
    alt: "The Swing by Jean-Honore Fragonard",
    title: "The Swing"
  },
  {
    src: `${basePath}/08_liberty_leading_the_people_delacroix.webp`,
    alt: "Liberty Leading the People by Eugene Delacroix",
    title: "Liberty Leading the People"
  },
  {
    src: `${basePath}/09_wanderer_above_the_sea_of_fog_friedrich.webp`,
    alt: "Wanderer above the Sea of Fog by Caspar David Friedrich",
    title: "Wanderer above the Sea of Fog"
  },
  {
    src: `${basePath}/10_fighting_temeraire_turner.webp`,
    alt: "The Fighting Temeraire by J. M. W. Turner",
    title: "The Fighting Temeraire"
  },
  {
    src: `${basePath}/11_whistlers_mother.webp`,
    alt: "Whistler's Mother by James McNeill Whistler",
    title: "Whistler's Mother"
  },
  {
    src: `${basePath}/12_the_gleaners_millet.webp`,
    alt: "The Gleaners by Jean-Francois Millet",
    title: "The Gleaners"
  },
  {
    src: `${basePath}/13_luncheon_boating_party_renoir.webp`,
    alt: "Luncheon of the Boating Party by Pierre-Auguste Renoir",
    title: "Luncheon of the Boating Party"
  },
  {
    src: `${basePath}/14_moulin_de_la_galette_renoir.webp`,
    alt: "Bal du moulin de la Galette by Pierre-Auguste Renoir",
    title: "Bal du moulin de la Galette"
  },
  {
    src: `${basePath}/15_sunday_afternoon_seurat.webp`,
    alt: "A Sunday Afternoon on the Island of La Grande Jatte by Georges Seurat",
    title: "A Sunday Afternoon"
  },
  {
    src: `${basePath}/16_irises_van_gogh.webp`,
    alt: "Irises by Vincent van Gogh",
    title: "Irises"
  },
  {
    src: `${basePath}/17_cafe_terrace_at_night_van_gogh.webp`,
    alt: "Cafe Terrace at Night by Vincent van Gogh",
    title: "Cafe Terrace at Night"
  },
  {
    src: `${basePath}/18_the_hay_wain_constable.webp`,
    alt: "The Hay Wain by John Constable",
    title: "The Hay Wain"
  },
  {
    src: `${basePath}/19_arnolfini_portrait_van_eyck.webp`,
    alt: "Arnolfini Portrait by Jan van Eyck",
    title: "Arnolfini Portrait"
  },
  {
    src: `${basePath}/20_the_milkmaid_vermeer.webp`,
    alt: "The Milkmaid by Johannes Vermeer",
    title: "The Milkmaid"
  }
];

export function placeholderImagesForEffect(count: number, offset = 0) {
  return Array.from({ length: count }, (_, index) => {
    const imageIndex = (offset + index) % worldMasterpiecePlaceholders.length;
    return worldMasterpiecePlaceholders[imageIndex];
  });
}

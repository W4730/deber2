export const BRAND = {
  name: "Lunara",
  tagline: "Necklaces made to become part of your story.",
  description:
    "A modern jewelry atelier for delicate necklaces, personalized pieces, and everyday gold.",
  email: "hello@lunara.ec",
  phone: "+593 2 000 0000",
  address: "Quito, Ecuador",
  instagram: "https://instagram.com",
  pinterest: "https://pinterest.com",
  facebook: "https://facebook.com",
}

const unsplash = (id: string, w = 1200) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=80`

// Keyed by product category handle
export const CATEGORY_VISUALS: Record<
  string,
  { image: string; subtitle: string }
> = {
  necklaces: {
    image: unsplash("1600721391776-b5cd0e0048f9"),
    subtitle: "Everyday gold & pearls",
  },
  "personalized-necklaces": {
    image: unsplash("1620656798579-1984d9e87df7"),
    subtitle: "Letters, names & dates",
  },
  sets: {
    image: unsplash("1601121141461-9d6647bca1ed"),
    subtitle: "Layered jewelry sets",
  },
  "new-arrivals": {
    image: unsplash("1611085583191-a3b181a88401"),
    subtitle: "Just landed",
  },
  "best-sellers": {
    image: unsplash("1599643478518-a784e5dc4c8f"),
    subtitle: "Most loved pieces",
  },
}

export const HERO_IMAGE = unsplash("1611652022419-a9419f74343d", 1800)

export const PROMO_IMAGE = unsplash("1515562141207-7a88fb7ce338", 1600)

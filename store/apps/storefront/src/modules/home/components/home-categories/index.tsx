import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { CATEGORY_VISUALS } from "@lib/constants/brand"
import { HttpTypes } from "@medusajs/types"

const fallback = [
  { name: "Necklaces", handle: "store", image: CATEGORY_VISUALS.necklaces.image, subtitle: "Everyday gold & pearls" },
  { name: "Personalized", handle: "store", image: CATEGORY_VISUALS["personalized-necklaces"].image, subtitle: "Letters, names & dates" },
  { name: "Sets", handle: "store", image: CATEGORY_VISUALS.sets.image, subtitle: "Layered jewelry sets" },
  { name: "New Arrivals", handle: "store", image: CATEGORY_VISUALS["new-arrivals"].image, subtitle: "Just landed" },
  { name: "Best Sellers", handle: "store", image: CATEGORY_VISUALS["best-sellers"].image, subtitle: "Most loved pieces" },
]

export default function HomeCategories({
  categories,
}: {
  categories: HttpTypes.StoreProductCategory[]
}) {
  const cards =
    categories?.filter((c) => !c.parent_category).slice(0, 5).map((category) => {
      const visual =
        CATEGORY_VISUALS[category.handle] ||
        CATEGORY_VISUALS.necklaces
      return {
        name: category.name,
        handle: `/categories/${category.handle}`,
        image: visual.image,
        subtitle: visual.subtitle,
      }
    }) || []

  const items = cards.length ? cards : fallback.map((item) => ({ ...item, handle: `/${item.handle}` }))

  return (
    <section className="content-container py-16 small:py-24">
      <div className="mb-10 text-center">
        <p className="text-xs tracking-[0.24em] uppercase text-lunara-gold">Collections</p>
        <h2 className="mt-2 font-serif text-4xl">Shop by category</h2>
      </div>
      <div className="grid grid-cols-2 small:grid-cols-5 gap-4">
        {items.map((item) => (
          <LocalizedClientLink
            key={item.name}
            href={item.handle.startsWith("/") ? item.handle : `/categories/${item.handle}`}
            className="group overflow-hidden rounded-2xl bg-lunara-blush"
          >
            <div
              className="aspect-[3/4] bg-cover bg-center transition duration-500 group-hover:scale-105"
              style={{ backgroundImage: `url(${item.image})` }}
            />
            <div className="p-4">
              <h3 className="font-serif text-xl">{item.name}</h3>
              <p className="text-xs text-lunara-muted mt-1">{item.subtitle}</p>
            </div>
          </LocalizedClientLink>
        ))}
      </div>
    </section>
  )
}

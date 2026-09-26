import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { CATEGORY_VISUALS } from "@lib/constants/brand"
import { HttpTypes } from "@medusajs/types"

export default function HomeCategories({
  categories,
}: {
  categories: HttpTypes.StoreProductCategory[]
}) {
  const items = categories
    .filter((c) => !c.parent_category)
    .slice(0, 5)
    .map((category) => ({
      name: category.name,
      handle: `/categories/${category.handle}`,
      ...(CATEGORY_VISUALS[category.handle] || CATEGORY_VISUALS.necklaces),
    }))

  if (!items.length) {
    return null
  }

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
            href={item.handle}
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

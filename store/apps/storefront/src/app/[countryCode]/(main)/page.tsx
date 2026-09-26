import { Metadata } from "next"

import FeaturedProducts from "@modules/home/components/featured-products"
import Hero from "@modules/home/components/hero"
import HomeCategories from "@modules/home/components/home-categories"
import PromoBanner from "@modules/home/components/promo-banner"
import TrustSection from "@modules/home/components/trust-section"
import { listCollections } from "@lib/data/collections"
import { listCategories } from "@lib/data/categories"
import { getRegion } from "@lib/data/regions"
import FeaturedAll from "@modules/home/components/featured-all"
import { BRAND } from "@lib/constants/brand"

export const metadata: Metadata = {
  title: `${BRAND.name} | Necklace jewelry`,
  description: BRAND.description,
}

export default async function Home(props: {
  params: Promise<{ countryCode: string }>
}) {
  const params = await props.params

  const { countryCode } = params

  const region = await getRegion(countryCode)

  const [{ collections }, categories] = await Promise.all([
    listCollections({
      fields: "id, handle, title",
    }),
    listCategories(),
  ])

  if (!region) {
    return null
  }

  return (
    <>
      <Hero />
      <HomeCategories categories={categories || []} />
      <div className="pb-8">
        {collections?.length ? (
          <ul className="flex flex-col">
            <FeaturedProducts collections={collections} region={region} />
          </ul>
        ) : (
          <FeaturedAll region={region} />
        )}
      </div>
      <PromoBanner />
      <TrustSection />
    </>
  )
}

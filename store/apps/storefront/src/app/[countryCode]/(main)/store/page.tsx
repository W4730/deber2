import { Metadata } from "next"

import { parseOptionValueIds } from "@lib/util/product-option-filters"
import { SortOptions } from "@modules/store/components/refinement-list/sort-products"
import StoreTemplate from "@modules/store/templates"
import { listCategories } from "@lib/data/categories"

export const metadata: Metadata = {
  title: "Shop necklaces",
  description: "Explore the Lunara necklace collection.",
}

type StorePageSearchParams = Record<string, string | string[] | undefined> & {
  sortBy?: SortOptions
  page?: string
  optionValueIds?: string | string[]
  q?: string
  categoryId?: string
  availability?: string
}

type Params = {
  searchParams: Promise<StorePageSearchParams>
  params: Promise<{
    countryCode: string
  }>
}

export default async function StorePage(props: Params) {
  const params = await props.params
  const searchParams = await props.searchParams
  const { sortBy, page, q, categoryId, availability } = searchParams
  const optionValueIds = parseOptionValueIds(searchParams)
  const categories = await listCategories()

  return (
    <StoreTemplate
      sortBy={sortBy}
      page={page}
      countryCode={params.countryCode}
      optionValueIds={optionValueIds}
      q={typeof q === "string" ? q : undefined}
      categoryId={typeof categoryId === "string" ? categoryId : undefined}
      availability={typeof availability === "string" ? availability : undefined}
      categories={categories}
    />
  )
}

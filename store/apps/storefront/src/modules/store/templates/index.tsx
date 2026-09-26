import { Suspense } from "react"

import { OptionValueIds } from "@lib/util/product-option-filters"
import SkeletonProductGrid from "@modules/skeletons/templates/skeleton-product-grid"
import RefinementList from "@modules/store/components/refinement-list"
import { SortOptions } from "@modules/store/components/refinement-list/sort-products"
import { HttpTypes } from "@medusajs/types"

import PaginatedProducts from "./paginated-products"

const StoreTemplate = ({
  sortBy,
  page,
  countryCode,
  optionValueIds,
  q,
  categoryId,
  availability,
  categories,
}: {
  sortBy?: SortOptions
  page?: string
  countryCode: string
  optionValueIds?: OptionValueIds
  q?: string
  categoryId?: string
  availability?: string
  categories?: HttpTypes.StoreProductCategory[]
}) => {
  const pageNumber = page ? parseInt(page) : 1
  const sort = sortBy || "created_at"

  return (
    <div
      className="flex flex-col small:flex-row small:items-start py-10 content-container"
      data-testid="category-container"
    >
      <RefinementList
        sortBy={sort}
        categories={categories}
        selectedCategoryId={categoryId}
        availability={availability}
        q={q}
      />
      <div className="w-full">
        <div className="mb-8">
          <p className="text-xs tracking-[0.24em] uppercase text-lunara-gold">Catalog</p>
          <h1 data-testid="store-page-title" className="font-serif text-4xl mt-2">
            Necklace collection
          </h1>
          <p className="mt-2 text-lunara-muted max-w-xl">
            Delicate pieces for every day, chosen for light, comfort, and a quiet kind of luxury.
          </p>
        </div>
        <Suspense fallback={<SkeletonProductGrid />}>
          <PaginatedProducts
            sortBy={sort}
            page={pageNumber}
            countryCode={countryCode}
            optionValueIds={optionValueIds}
            q={q}
            categoryId={categoryId}
            availability={availability}
          />
        </Suspense>
      </div>
    </div>
  )
}

export default StoreTemplate

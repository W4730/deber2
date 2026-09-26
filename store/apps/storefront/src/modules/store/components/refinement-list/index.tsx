"use client"

import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { FormEvent, useCallback, useMemo, useState } from "react"
import { HttpTypes } from "@medusajs/types"

import {
  OPTION_VALUE_QUERY_KEY,
  parseOptionValueIds,
} from "@lib/util/product-option-filters"
import OptionsPicker from "./options-picker"
import SortProducts, { SortOptions } from "./sort-products"

type RefinementListProps = {
  sortBy: SortOptions
  search?: boolean
  hideOptionsPicker?: boolean
  "data-testid"?: string
  categories?: HttpTypes.StoreProductCategory[]
  selectedCategoryId?: string
  availability?: string
  q?: string
}

const RefinementList = ({
  sortBy,
  hideOptionsPicker = false,
  "data-testid": dataTestId,
  categories,
  selectedCategoryId,
  availability,
  q,
}: RefinementListProps) => {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [query, setQuery] = useState(q || "")

  const updateQueryParams = useCallback(
    (updater: (params: URLSearchParams) => void) => {
      const params = new URLSearchParams(searchParams.toString())
      updater(params)

      params.delete("page")

      const queryString = params.toString()
      const currentQuery = searchParams.toString()
      const nextPath = queryString ? `${pathname}?${queryString}` : pathname
      const currentPath = currentQuery
        ? `${pathname}?${currentQuery}`
        : pathname

      if (nextPath !== currentPath) {
        router.push(nextPath)
      }
    },
    [pathname, router, searchParams]
  )

  const setQueryParams = (name: string, value: string) =>
    updateQueryParams((params) => {
      if (value) {
        params.set(name, value)
      } else {
        params.delete(name)
      }
    })

  const selectedOptionValueIds = useMemo(
    () => parseOptionValueIds(searchParams),
    [searchParams]
  )

  const setOptionValueIds = (valueIds: string[]) =>
    updateQueryParams((params) => {
      params.delete(OPTION_VALUE_QUERY_KEY)
      valueIds.forEach((valueId) =>
        params.append(OPTION_VALUE_QUERY_KEY, valueId)
      )
    })

  const submitSearch = (event: FormEvent) => {
    event.preventDefault()
    setQueryParams("q", query.trim())
  }

  const parentCategories = categories?.filter((c) => !c.parent_category) || []

  return (
    <div className="flex flex-col gap-8 py-4 mb-8 small:px-0 small:min-w-[250px] small:mr-8">
      <form onSubmit={submitSearch} className="flex flex-col gap-2">
        <label className="text-xs tracking-[0.16em] uppercase text-lunara-gold">
          Search
        </label>
        <input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search necklaces"
          className="rounded-full border border-lunara-nude bg-lunara-white px-4 py-2 text-sm outline-none focus:border-lunara-gold"
        />
      </form>
      {parentCategories.length > 0 && (
        <div className="flex flex-col gap-3">
          <span className="text-xs tracking-[0.16em] uppercase text-lunara-gold">
            Category
          </span>
          <button
            type="button"
            onClick={() => setQueryParams("categoryId", "")}
            className={`text-left text-sm ${!selectedCategoryId ? "text-lunara-ink" : "text-lunara-muted"}`}
          >
            All
          </button>
          {parentCategories.map((category) => (
            <button
              key={category.id}
              type="button"
              onClick={() => setQueryParams("categoryId", category.id)}
              className={`text-left text-sm ${selectedCategoryId === category.id ? "text-lunara-ink" : "text-lunara-muted"}`}
            >
              {category.name}
            </button>
          ))}
        </div>
      )}
      <div className="flex flex-col gap-3">
        <span className="text-xs tracking-[0.16em] uppercase text-lunara-gold">
          Availability
        </span>
        <button
          type="button"
          onClick={() => setQueryParams("availability", "")}
          className={`text-left text-sm ${!availability ? "text-lunara-ink" : "text-lunara-muted"}`}
        >
          All pieces
        </button>
        <button
          type="button"
          onClick={() => setQueryParams("availability", "in_stock")}
          className={`text-left text-sm ${availability === "in_stock" ? "text-lunara-ink" : "text-lunara-muted"}`}
        >
          In stock
        </button>
      </div>
      <SortProducts
        sortBy={sortBy}
        setQueryParams={setQueryParams}
        data-testid={dataTestId}
      />
      {!hideOptionsPicker && (
        <OptionsPicker
          selectedValueIds={selectedOptionValueIds}
          setOptionValueIds={setOptionValueIds}
        />
      )}
    </div>
  )
}

export default RefinementList

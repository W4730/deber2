"use client"

import { updateRegion } from "@lib/data/cart"
import { HttpTypes } from "@medusajs/types"
import { clx } from "@modules/common/components/ui"
import { useParams, usePathname } from "next/navigation"
import { useTransition } from "react"

// Country each currency lands on when switching; falls back to the region's first country
const HOME_COUNTRY = ["ec", "es"]

export default function CurrencySelect({
  regions,
}: {
  regions: HttpTypes.StoreRegion[]
}) {
  const { countryCode } = useParams() as { countryCode: string }
  const currentPath = usePathname().split(`/${countryCode}`)[1] ?? ""
  const [pending, startTransition] = useTransition()

  if (regions.length < 2) {
    return null
  }

  return (
    <div
      className={clx(
        "flex items-center rounded-full border border-lunara-nude p-0.5 text-[11px] tracking-[0.12em]",
        { "opacity-60": pending }
      )}
      role="group"
      aria-label="Currency"
    >
      {regions.map((region) => {
        const codes = region.countries?.map((c) => c.iso_2 ?? "") ?? []
        const active = codes.includes(countryCode)
        const target = codes.find((c) => HOME_COUNTRY.includes(c)) ?? codes[0]

        return (
          <button
            key={region.id}
            type="button"
            disabled={active || pending || !target}
            aria-pressed={active}
            onClick={() =>
              startTransition(() => updateRegion(target, currentPath))
            }
            className={clx(
              "rounded-full px-2.5 py-1 uppercase transition-colors",
              active
                ? "bg-lunara-ink text-lunara-cream"
                : "text-lunara-muted hover:text-lunara-ink"
            )}
          >
            {region.currency_code}
          </button>
        )
      })}
    </div>
  )
}

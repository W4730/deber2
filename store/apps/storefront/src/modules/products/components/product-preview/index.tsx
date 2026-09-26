"use client"

import { Text } from "@modules/common/components/ui"
import { getProductPrice } from "@lib/util/get-product-price"
import { HttpTypes } from "@medusajs/types"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import Thumbnail from "../thumbnail"
import PreviewPrice from "./price"
import WishlistButton from "@modules/common/components/wishlist-button"
import { addToCart } from "@lib/data/cart"
import { useParams } from "next/navigation"
import { useState, type MouseEvent } from "react"

export default function ProductPreview({
  product,
  isFeatured,
}: {
  product: HttpTypes.StoreProduct
  isFeatured?: boolean
  region: HttpTypes.StoreRegion
}) {
  const { cheapestPrice } = getProductPrice({
    product,
  })
  const { countryCode } = useParams() as { countryCode: string }
  const [adding, setAdding] = useState(false)
  const variantId = product.variants?.[0]?.id
  const category = product.categories?.[0]?.name || product.collection?.title || "Necklace"

  const handleAdd = async (event: MouseEvent) => {
    event.preventDefault()
    if (!variantId) {
      return
    }
    setAdding(true)
    try {
      await addToCart({ variantId, quantity: 1, countryCode })
    } finally {
      setAdding(false)
    }
  }

  return (
    <div className="group" data-testid="product-wrapper">
      <div className="relative">
        <LocalizedClientLink href={`/products/${product.handle}`}>
          <Thumbnail
            thumbnail={product.thumbnail}
            images={product.images}
            size="full"
            isFeatured={isFeatured}
          />
        </LocalizedClientLink>
        {product.id && (
          <WishlistButton
            productId={product.id}
            className="absolute top-3 right-3"
          />
        )}
        <button
          type="button"
          onClick={handleAdd}
          disabled={!variantId || adding}
          className="absolute inset-x-4 bottom-4 rounded-full bg-lunara-ink/90 py-2.5 text-center text-[11px] tracking-[0.16em] uppercase text-lunara-cream opacity-100 small:opacity-0 small:group-hover:opacity-100 transition"
        >
          {adding ? "Adding..." : "Add to Cart"}
        </button>
      </div>
      <div className="mt-4 space-y-1">
        <p className="text-[11px] tracking-[0.16em] uppercase text-lunara-gold">
          {category}
        </p>
        <LocalizedClientLink href={`/products/${product.handle}`}>
          <Text className="font-serif text-xl text-lunara-ink" data-testid="product-title">
            {product.title}
          </Text>
        </LocalizedClientLink>
        {product.description && (
          <p className="text-sm text-lunara-muted line-clamp-2">
            {product.description}
          </p>
        )}
        <div className="pt-1 text-lunara-ink">
          {cheapestPrice && <PreviewPrice price={cheapestPrice} />}
        </div>
        <LocalizedClientLink
          href={`/products/${product.handle}`}
          className="inline-block pt-2 text-[11px] tracking-[0.16em] uppercase text-lunara-muted hover:text-lunara-ink"
        >
          View Product
        </LocalizedClientLink>
      </div>
    </div>
  )
}

"use client"

import Heart from "@modules/common/icons/heart"
import { clx } from "@modules/common/components/ui"
import { useWishlist } from "@lib/hooks/use-wishlist"

const WishlistButton = ({
  productId,
  className,
}: {
  productId: string
  className?: string
}) => {
  const { has, toggle } = useWishlist()
  const active = has(productId)

  return (
    <button
      type="button"
      aria-label={active ? "Remove from wishlist" : "Add to wishlist"}
      onClick={(event) => {
        event.preventDefault()
        event.stopPropagation()
        toggle(productId)
      }}
      className={clx(
        "inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-lunara-ink shadow-sm transition hover:bg-lunara-blush",
        className
      )}
    >
      <Heart
        size={16}
        color={active ? "#C9A227" : "currentColor"}
        fill={active ? "#C9A227" : "none"}
      />
    </button>
  )
}

export default WishlistButton

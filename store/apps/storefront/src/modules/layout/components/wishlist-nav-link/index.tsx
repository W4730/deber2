"use client"

import LocalizedClientLink from "@modules/common/components/localized-client-link"
import Heart from "@modules/common/icons/heart"
import { useWishlist } from "@lib/hooks/use-wishlist"

const WishlistNavLink = () => {
  const { count } = useWishlist()

  return (
    <LocalizedClientLink
      href="/account"
      aria-label="Wishlist"
      className="relative inline-flex h-10 w-10 items-center justify-center text-lunara-ink hover:text-lunara-gold"
    >
      <Heart size={18} />
      {count > 0 && (
        <span className="absolute right-1 top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-lunara-gold px-1 text-[10px] text-white">
          {count}
        </span>
      )}
    </LocalizedClientLink>
  )
}

export default WishlistNavLink

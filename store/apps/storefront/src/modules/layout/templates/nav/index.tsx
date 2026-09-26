import { Suspense } from "react"

import { listLocales } from "@lib/data/locales"
import { getLocale } from "@lib/data/locale-actions"
import { listRegions } from "@lib/data/regions"
import { BRAND } from "@lib/constants/brand"
import { StoreRegion } from "@medusajs/types"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import CartButton from "@modules/layout/components/cart-button"
import CurrencySelect from "@modules/layout/components/currency-select"
import SearchToggle from "@modules/layout/components/search-toggle"
import SideMenu from "@modules/layout/components/side-menu"
import WishlistNavLink from "@modules/layout/components/wishlist-nav-link"
import User from "@modules/common/icons/user"

const links = [
  { href: "/", label: "Home" },
  { href: "/store", label: "Shop" },
  { href: "/categories/necklaces", label: "Necklaces" },
  { href: "/categories/personalized-necklaces", label: "Personalized" },
  { href: "/about", label: "About Us" },
  { href: "/contact", label: "Contact" },
]

export default async function Nav() {
  const [regions, locales, currentLocale] = await Promise.all([
    listRegions().then((regions: StoreRegion[]) => regions),
    listLocales(),
    getLocale(),
  ])

  return (
    <div className="sticky top-0 inset-x-0 z-50">
      <div className="hidden bg-lunara-ink py-1.5 text-center text-[11px] tracking-[0.22em] text-lunara-cream uppercase small:block">
        Complimentary wrapping · Shipping across Ecuador
      </div>
      <header className="relative h-16 mx-auto border-b border-lunara-nude bg-lunara-white/90 backdrop-blur">
        <nav className="content-container flex items-center justify-between w-full h-full text-small-regular">
          <div className="flex items-center gap-4 flex-1 basis-0 h-full">
            <div className="h-full small:hidden">
              <SideMenu
                regions={regions}
                locales={locales}
                currentLocale={currentLocale}
              />
            </div>
            <LocalizedClientLink
              href="/"
              className="font-serif text-2xl tracking-[0.18em] uppercase text-lunara-ink"
              data-testid="nav-store-link"
            >
              {BRAND.name}
            </LocalizedClientLink>
          </div>

          <div className="hidden small:flex items-center gap-7 h-full text-[13px] tracking-[0.16em] uppercase text-lunara-muted">
            {links.map((link) => (
              <LocalizedClientLink
                key={link.label}
                href={link.href}
                className="hover:text-lunara-ink"
              >
                {link.label}
              </LocalizedClientLink>
            ))}
          </div>

          <div className="flex items-center justify-end gap-1 h-full flex-1 basis-0 text-lunara-ink">
            <CurrencySelect regions={regions} />
            <SearchToggle />
            <WishlistNavLink />
            <LocalizedClientLink
              className="inline-flex h-10 w-10 items-center justify-center hover:text-lunara-gold"
              href="/account"
              data-testid="nav-account-link"
              aria-label="Account"
            >
              <User size={18} />
            </LocalizedClientLink>
            <Suspense
              fallback={
                <LocalizedClientLink
                  className="hover:text-lunara-gold px-2"
                  href="/cart"
                  data-testid="nav-cart-link"
                >
                  Cart (0)
                </LocalizedClientLink>
              }
            >
              <CartButton />
            </Suspense>
          </div>
        </nav>
      </header>
    </div>
  )
}

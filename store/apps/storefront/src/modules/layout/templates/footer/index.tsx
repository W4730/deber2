import { listCategories } from "@lib/data/categories"
import { listCollections } from "@lib/data/collections"
import { BRAND } from "@lib/constants/brand"
import { Text, clx } from "@modules/common/components/ui"

import LocalizedClientLink from "@modules/common/components/localized-client-link"

export default async function Footer() {
  const { collections } = await listCollections({
    fields: "*products",
  })
  const productCategories = await listCategories()

  return (
    <footer className="border-t border-lunara-nude w-full bg-lunara-ink text-lunara-cream">
      <div className="content-container flex flex-col w-full">
        <div className="flex flex-col gap-y-10 small:flex-row items-start justify-between py-16">
          <div className="max-w-sm">
            <LocalizedClientLink
              href="/"
              className="font-serif text-3xl tracking-[0.2em] uppercase"
            >
              {BRAND.name}
            </LocalizedClientLink>
            <p className="mt-4 text-sm text-lunara-nude leading-6">
              {BRAND.tagline}
            </p>
            <p className="mt-6 text-sm text-lunara-nude">
              {BRAND.address}
              <br />
              {BRAND.email}
              <br />
              {BRAND.phone}
            </p>
          </div>
          <div className="text-small-regular gap-10 md:gap-x-16 grid grid-cols-2 sm:grid-cols-3">
            <div className="flex flex-col gap-y-3">
              <span className="tracking-[0.18em] uppercase text-xs text-lunara-gold">
                Shop
              </span>
              <ul className="grid grid-cols-1 gap-2 text-lunara-nude">
                <li>
                  <LocalizedClientLink href="/store" className="hover:text-white">
                    All necklaces
                  </LocalizedClientLink>
                </li>
                <li>
                  <LocalizedClientLink href="/about" className="hover:text-white">
                    About us
                  </LocalizedClientLink>
                </li>
                <li>
                  <LocalizedClientLink href="/contact" className="hover:text-white">
                    Contact
                  </LocalizedClientLink>
                </li>
                <li>
                  <LocalizedClientLink href="/account" className="hover:text-white">
                    Account
                  </LocalizedClientLink>
                </li>
              </ul>
            </div>
            {productCategories && productCategories?.length > 0 && (
              <div className="flex flex-col gap-y-3">
                <span className="tracking-[0.18em] uppercase text-xs text-lunara-gold">
                  Categories
                </span>
                <ul className="grid grid-cols-1 gap-2" data-testid="footer-categories">
                  {productCategories?.slice(0, 6).map((c) => {
                    if (c.parent_category) {
                      return
                    }
                    return (
                      <li key={c.id} className="text-lunara-nude">
                        <LocalizedClientLink
                          className="hover:text-white"
                          href={`/categories/${c.handle}`}
                          data-testid="category-link"
                        >
                          {c.name}
                        </LocalizedClientLink>
                      </li>
                    )
                  })}
                </ul>
              </div>
            )}
            {collections && collections.length > 0 && (
              <div className="flex flex-col gap-y-3">
                <span className="tracking-[0.18em] uppercase text-xs text-lunara-gold">
                  Collections
                </span>
                <ul
                  className={clx("grid grid-cols-1 gap-2 text-lunara-nude")}
                >
                  {collections?.slice(0, 6).map((c) => (
                    <li key={c.id}>
                      <LocalizedClientLink
                        className="hover:text-white"
                        href={`/collections/${c.handle}`}
                      >
                        {c.title}
                      </LocalizedClientLink>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
        <div className="flex flex-col small:flex-row w-full mb-10 gap-4 justify-between text-lunara-nude border-t border-white/10 pt-6">
          <Text className="txt-compact-small">
            © {new Date().getFullYear()} {BRAND.name}. All rights reserved.
          </Text>
          <div className="flex gap-5 text-xs tracking-[0.16em] uppercase">
            <a href={BRAND.instagram} target="_blank" rel="noreferrer">
              Instagram
            </a>
            <a href={BRAND.pinterest} target="_blank" rel="noreferrer">
              Pinterest
            </a>
            <a href={BRAND.facebook} target="_blank" rel="noreferrer">
              Facebook
            </a>
          </div>
          <div className="text-xs tracking-[0.12em] uppercase">
            Visa · Mastercard · Debit
          </div>
        </div>
      </div>
    </footer>
  )
}

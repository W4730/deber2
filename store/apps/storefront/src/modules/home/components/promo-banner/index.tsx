import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { PROMO_IMAGE } from "@lib/constants/brand"

const PromoBanner = () => {
  return (
    <section className="content-container pb-16 small:pb-24">
      <div className="relative overflow-hidden rounded-3xl min-h-[360px]">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${PROMO_IMAGE})` }}
        />
        <div className="absolute inset-0 bg-lunara-ink/40" />
        <div className="relative z-10 flex min-h-[360px] flex-col items-start justify-center p-10 small:p-16">
          <p className="text-xs tracking-[0.24em] uppercase text-lunara-gold">
            New Collection
          </p>
          <h2 className="mt-3 max-w-md font-serif text-4xl small:text-5xl text-lunara-cream">
            Discover pieces made to become part of your story.
          </h2>
          <LocalizedClientLink
            href="/store"
            className="mt-8 rounded-full bg-lunara-cream px-7 py-3 text-xs tracking-[0.2em] uppercase text-lunara-ink"
          >
            Explore Collection
          </LocalizedClientLink>
        </div>
      </div>
    </section>
  )
}

export default PromoBanner

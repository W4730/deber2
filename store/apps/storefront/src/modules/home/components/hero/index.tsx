import { Heading } from "@modules/common/components/ui"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { BRAND, HERO_IMAGE } from "@lib/constants/brand"

const Hero = () => {
  return (
    <div className="relative min-h-[78vh] w-full overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${HERO_IMAGE})` }}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-lunara-ink/55 via-lunara-ink/25 to-transparent" />
      <div className="relative z-10 content-container flex min-h-[78vh] flex-col justify-center py-20">
        <p className="mb-4 text-xs tracking-[0.28em] uppercase text-lunara-cream/80">
          Fine necklaces · Ecuador
        </p>
        <Heading
          level="h1"
          className="font-serif max-w-xl text-5xl small:text-7xl leading-tight text-lunara-cream font-normal"
        >
          Jewelry that feels like you.
        </Heading>
        <p className="mt-6 max-w-md text-base leading-7 text-lunara-cream/85">
          {BRAND.description}
        </p>
        <LocalizedClientLink
          href="/store"
          className="mt-8 inline-flex w-fit rounded-full bg-lunara-cream px-8 py-3 text-xs tracking-[0.2em] uppercase text-lunara-ink hover:bg-white"
        >
          Shop Now
        </LocalizedClientLink>
      </div>
    </div>
  )
}

export default Hero

import { BRAND } from "@lib/constants/brand"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: `About ${BRAND.name}`,
  description: BRAND.description,
}

export default function AboutPage() {
  return (
    <div className="content-container py-16 small:py-24 max-w-3xl">
      <p className="text-xs tracking-[0.24em] uppercase text-lunara-gold">Our atelier</p>
      <h1 className="mt-3 font-serif text-5xl">{BRAND.name}</h1>
      <p className="mt-6 text-lg leading-8 text-lunara-muted">
        Lunara is a necklace house designed for women who want jewelry that feels
        intimate, modern, and easy to live in. Every piece is chosen to catch
        the light softly and become part of your daily ritual.
      </p>
      <p className="mt-4 leading-7 text-lunara-muted">
        From Quito, we ship across Ecuador with gift-ready wrapping, thoughtful
        materials, and a boutique team that still answers by name.
      </p>
    </div>
  )
}

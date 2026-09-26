import { BRAND } from "@lib/constants/brand"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: `Contact ${BRAND.name}`,
  description: "Reach the Lunara boutique team.",
}

export default function ContactPage() {
  return (
    <div className="content-container py-16 small:py-24 max-w-3xl">
      <p className="text-xs tracking-[0.24em] uppercase text-lunara-gold">Contact</p>
      <h1 className="mt-3 font-serif text-5xl">We would love to hear from you</h1>
      <div className="mt-8 space-y-3 text-lunara-muted leading-7">
        <p>{BRAND.address}</p>
        <p>{BRAND.email}</p>
        <p>{BRAND.phone}</p>
        <p>Monday to Friday, 9:00–18:00</p>
      </div>
    </div>
  )
}

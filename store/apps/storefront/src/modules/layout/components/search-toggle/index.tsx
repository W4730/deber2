"use client"

import { FormEvent, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import Search from "@modules/common/icons/search"
import X from "@modules/common/icons/x"

const SearchToggle = () => {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState("")
  const router = useRouter()
  const { countryCode } = useParams() as { countryCode: string }

  const submit = (event: FormEvent) => {
    event.preventDefault()
    const value = query.trim()
    setOpen(false)
    router.push(
      `/${countryCode}/store${value ? `?q=${encodeURIComponent(value)}` : ""}`
    )
  }

  return (
    <>
      <button
        type="button"
        aria-label="Search"
        onClick={() => setOpen(true)}
        className="inline-flex h-10 w-10 items-center justify-center text-lunara-ink hover:text-lunara-gold"
      >
        <Search size={18} />
      </button>
      {open && (
        <div className="fixed inset-0 z-[70] flex items-start justify-center bg-lunara-ink/30 px-4 pt-28 backdrop-blur-sm">
          <form
            onSubmit={submit}
            className="relative w-full max-w-xl rounded-2xl bg-lunara-cream p-4 shadow-xl"
          >
            <div className="flex items-center gap-3 border-b border-lunara-nude pb-3">
              <Search size={18} />
              <input
                autoFocus
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search necklaces..."
                className="w-full bg-transparent text-base text-lunara-ink outline-none placeholder:text-lunara-muted"
              />
              <button type="button" aria-label="Close search" onClick={() => setOpen(false)}>
                <X />
              </button>
            </div>
            <button
              type="submit"
              className="mt-4 w-full rounded-full bg-lunara-ink py-3 text-sm tracking-wide text-lunara-cream"
            >
              Search collection
            </button>
          </form>
        </div>
      )}
    </>
  )
}

export default SearchToggle

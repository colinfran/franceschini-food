"use client"
import React, { FC } from "react"
import { Input } from "./ui/input"
import { usePathname, useSearchParams, useRouter } from "next/navigation"
import { useDebouncedCallback } from "use-debounce"

const Searchbar: FC = () => {
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const router = useRouter()

  const onChange = useDebouncedCallback((e) => {
    const value = e.target.value
    const params = new URLSearchParams(searchParams)
    if (value) {
      params.set("search", value)
    } else {
      params.delete("search")
    }
    router.replace(`${pathname}?${params.toString()}`)
  }, 300)

  return (
    <div>
      <div className="relative">
        <Input placeholder="Search" type="email" onChange={onChange} />
        <div className="pointer-events-none absolute right-2 top-1/2 z-10 -translate-y-1/2">
          <svg
            className="size-6"
            height="48"
            viewBox="0 0 48 48"
            width="48"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              className="fill-black dark:fill-white"
              d="M31 28h-1.59l-.55-.55c1.96-2.27 3.14-5.22 3.14-8.45 0-7.18-5.82-13-13-13s-13 5.82-13 13 5.82 13 13 13c3.23 0 6.18-1.18 8.45-3.13l.55.55v1.58l10 9.98 2.98-2.98-9.98-10zm-12 0c-4.97 0-9-4.03-9-9s4.03-9 9-9 9 4.03 9 9-4.03 9-9 9z"
            />
            <path d="M0 0h48v48h-48z" fill="none" />
          </svg>
        </div>
      </div>
    </div>
  )
}

export default Searchbar

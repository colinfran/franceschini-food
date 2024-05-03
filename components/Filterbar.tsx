"use client"
import React, { FC, useEffect } from "react"
import MultipleSelector, { Option } from "@/components/ui/multiple-selector"
import { listOfCategories } from "@/lib/utils"
import { useDebouncedCallback } from "use-debounce"
import { usePathname, useRouter, useSearchParams } from "next/navigation"

const MultipleSelectorDemo: FC = () => {
  const [value, setValue] = React.useState<Option[]>([])
  const options = listOfCategories.map((item) => ({ label: item, value: item }))
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const router = useRouter()

  useEffect(() => {
    const filter = searchParams.get("filter")
    if (filter) {
      const listOfFilters = decodeURIComponent(filter)
        .split(",")
        .map((item) => ({ value: item, label: item }))
      setValue(listOfFilters)
    }
    // we only want this to run once
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const onChange = useDebouncedCallback((newOptions: Option[]) => {
    setValue(newOptions)
    const arrString = newOptions.map((item) => item.value).join(",")
    const params = new URLSearchParams(searchParams)
    if (newOptions.length > 0) {
      params.set("filter", arrString)
    } else {
      params.delete("filter")
    }
    router.replace(`${pathname}?${params.toString()}`)
  }, 300)

  return (
    <div className="w-full">
      <MultipleSelector
        defaultOptions={options}
        emptyIndicator={
          <p className="text-center text-lg leading-10 text-gray-600 dark:text-gray-400">
            no results found.
          </p>
        }
        placeholder="Select categories..."
        value={value}
        onChange={onChange}
      />
    </div>
  )
}

export default MultipleSelectorDemo

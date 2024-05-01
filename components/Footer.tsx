"use client"
import React, { FC, Suspense, useEffect, useState } from "react"
import { Button } from "./ui/button"
import { useTheme } from "next-themes"
import Link from "next/link"

export const Footer: FC = () => {
  const { resolvedTheme, setTheme } = useTheme()

  const [text, setText] = useState("")

  useEffect(() => {
    setText(resolvedTheme === "dark" ? "light mode" : "dark mode")
  }, [resolvedTheme])

  const buttonClick = (): void => {
    if (resolvedTheme === "dark") {
      setTheme("light")
    } else {
      setTheme("dark")
    }
  }
  return (
    <Suspense>
      <div className="absolute bottom-1 flex w-full flex-row justify-center gap-5">
        <Button className="h-auto text-xs" variant="link" onClick={buttonClick}>
          {text}
        </Button>
        <Button className="h-auto text-xs" variant="link" asChild>
          <Link href="/random" prefetch={false}>
            random recipe
          </Link>
        </Button>
      </div>
    </Suspense>
  )
}

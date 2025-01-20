"use client"
import React, { FC, Suspense, useState } from "react"
import { Button } from "./ui/button"
import { Dialog, DialogContent, DialogFooter } from "@/components/ui/dialog"

import { useTheme } from "next-themes"
import Link from "next/link"

export const Footer: FC = () => {
  const { resolvedTheme, setTheme } = useTheme()
  const [isInfoOpen, setIsInfoOpen] = useState(false)

  const onThemeClick = (): void => {
    if (resolvedTheme === "dark") {
      setTheme("light")
    } else {
      setTheme("dark")
    }
  }
  return (
    <Suspense>
      <div className="absolute bottom-1 flex w-full flex-row items-center justify-center gap-5">
        <Button
          className="h-auto text-xs before:content-['dark_mode'] dark:before:content-['light_mode']"
          variant="link"
          onClick={onThemeClick}
        />
        <span className="flex h-auto items-center text-xs">|</span>
        <button
          className="flex size-[16px] items-center justify-center rounded-full bg-black dark:bg-white"
          onClick={() => setIsInfoOpen(!isInfoOpen)}
        >
          <span className=" text-xxs text-white dark:text-black">i</span>
        </button>
        <span className="flex h-auto items-center text-xs">|</span>
        <Button className="h-auto text-xs" variant="link" asChild>
          <Link
            href="/random"
            prefetch={false}
            onClick={(e) => {
              e.preventDefault()
              window.location.href = "/random"
            }}
          >
            random recipe
          </Link>
        </Button>
      </div>
      <>
        <Dialog open={isInfoOpen} onOpenChange={(open) => setIsInfoOpen(open)}>
          <DialogContent className="sm:max-w-[425px]">
            <div className="grid gap-4 py-4">
              <div className="text-center">
                <span>Created by </span>
                <Link className="underline" href="https://colinfran.com?utm_source=https%3A%2F%2Ffranceschini.food&utm_medium=referral" target="_blank">
                  Colin Franceschini
                </Link>
              </div>
              <div className="text-center">
                <span>Check out the code </span>
                <Link
                  className="underline"
                  href="https://github.com/colinfran/franceschini-food"
                  target="_blank"
                >
                  here
                </Link>
              </div>
              <div className="mt-6 flex flex-row justify-center gap-5">
                <a
                  aria-label="Github Link"
                  className="group flex size-10 items-center justify-center space-x-2 whitespace-nowrap rounded-md border border-input bg-background text-sm font-medium ring-offset-background transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
                  href="https://github.com/colinfran"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  <svg
                    aria-labelledby="Github Link"
                    fill="none"
                    height="24"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                    viewBox="0 0 24 24"
                    width="24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"></path>
                    <path d="M9 18c-4.51 2-5-2-7-2"></path>
                  </svg>
                </a>
                <a
                  aria-label="LinkedIn Link"
                  className="group flex size-10 items-center justify-center space-x-2 whitespace-nowrap rounded-md border border-input bg-background text-sm font-medium ring-offset-background transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
                  href="https://www.linkedin.com/in/colinfranceschini/"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  <svg
                    aria-labelledby="LinkedIn Link"
                    fill="none"
                    height="24"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                    viewBox="0 0 24 24"
                    width="24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                    <rect height="12" width="4" x="2" y="9"></rect>
                    <circle cx="4" cy="4" r="2"></circle>
                  </svg>
                </a>
                <a
                  aria-label="Instagram Link"
                  className="group flex size-10 items-center justify-center space-x-2 whitespace-nowrap rounded-md border border-input bg-background text-sm font-medium ring-offset-background transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
                  href="https://www.instagram.com/colinfran/"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  <svg
                    aria-labelledby="Instagram Link"
                    fill="none"
                    height="24"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                    viewBox="0 0 24 24"
                    width="24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <rect height="20" rx="5" ry="5" width="20" x="2" y="2"></rect>
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"></line>
                  </svg>
                </a>
                <a
                  aria-label="X (Twitter) Link"
                  className="group flex size-10 items-center justify-center space-x-2 whitespace-nowrap rounded-md border border-input bg-background text-sm font-medium ring-offset-background transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
                  href="https://x.com/colinfran"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  <svg
                    aria-labelledby="X (Twitter) Link"
                    className="size-5 transition-all"
                    stroke="currentColor"
                    strokeWidth=".25px"
                    viewBox="0 0 24 24"
                    width="24px"
                  >
                    <path
                      d="M14.095479,10.316482L22.286354,1h-1.940718l-7.115352,8.087682L7.551414,1H1l8.589488,12.231093L1,23h1.940717  l7.509372-8.542861L16.448587,23H23L14.095479,10.316482z M11.436522,13.338465l-0.871624-1.218704l-6.924311-9.68815h2.981339  l5.58978,7.82155l0.867949,1.218704l7.26506,10.166271h-2.981339L11.436522,13.338465z"
                      fill="currentColor"
                    ></path>
                  </svg>
                </a>
                <a
                  aria-label="Email Link"
                  className="group flex size-10 items-center justify-center space-x-2 whitespace-nowrap rounded-md border border-input bg-background text-sm font-medium ring-offset-background transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
                  href="mailto:hello@colinfran.com"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  <svg
                    aria-labelledby="Email Link"
                    fill="none"
                    height="24"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                    viewBox="0 0 24 24"
                    width="24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <rect height="16" rx="2" width="20" x="2" y="4"></rect>
                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
                  </svg>
                </a>
              </div>
            </div>
            <DialogFooter>
              <Button onClick={() => setIsInfoOpen(!isInfoOpen)}>Close</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </>
    </Suspense>
  )
}

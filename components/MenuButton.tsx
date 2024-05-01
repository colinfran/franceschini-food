"use client"
import React, { FC, Suspense, useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { LoadingSpinner } from "./LoadingSpinner"
import Link from "next/link"
import { useTheme } from "next-themes"
import { useRouter } from "next/navigation"
import { Recipe } from "@/types"
import { useRecipe } from "../providers/recipe-provider"

type Props = { recipe: Recipe }

const MenuButton: FC<Props> = ({ recipe }) => {
  const router = useRouter()
  const [areYouSureView, setAreYouSureView] = useState(false)
  const [loading, setLoading] = useState(false)
  const [theme, setTheme] = useState<string | undefined>(undefined)
  const [dialogOpen, setDialogOpen] = useState(false)
  const { resolvedTheme } = useTheme()
  const { setCurrentRecipe } = useRecipe()

  useEffect(() => {
    if (recipe) {
      setCurrentRecipe(recipe)
    }
    router.refresh()
  }, [recipe, router, setCurrentRecipe])

  const deleteRecipe = async (e: React.MouseEvent<HTMLButtonElement>): Promise<void> => {
    setLoading(true)
    e.preventDefault()
    try {
      const response = await fetch("/api/recipes/remove", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ data: recipe }),
      })
      if (!response.ok) {
        throw new Error("Network response was not ok")
      }
      const responseData = await response.json()
      if (responseData.success) {
        router.push("/?deleted=true")
        setDialogOpen(false)
      }
    } catch (error) {
      console.error("Error fetching data:", error)
    }
    setLoading(false)
  }

  useEffect(() => {
    if (resolvedTheme) setTheme(resolvedTheme)
  }, [resolvedTheme])

  return (
    <Suspense>
      <div>
        <>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">
                <svg
                  fill={theme === "dark" ? "#fff" : "#000"}
                  height={16}
                  viewBox="0 0 16 16"
                  width={16}
                >
                  <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z" />
                </svg>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuGroup>
                <Link href="/edit">
                  <DropdownMenuItem>Edit</DropdownMenuItem>
                </Link>
                <AlertDialog
                  open={dialogOpen}
                  onOpenChange={(open) => {
                    if (open) setAreYouSureView(false)
                    setDialogOpen(open)
                  }}
                >
                  <AlertDialogTrigger className="w-full">
                    <DropdownMenuItem onSelect={(e) => e.preventDefault()}>Delete</DropdownMenuItem>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>
                        {areYouSureView ? "Are you absolutely sure?" : "Are you sure?"}
                      </AlertDialogTitle>
                      <AlertDialogDescription>
                        {areYouSureView
                          ? "Seriously! This is no joke! This will permanently delete the recipe from the database. This cannot be undone."
                          : "This action cannot be undone. This will permanently delete the recipe and the data will be removed."}
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      {areYouSureView ? (
                        <AlertDialogAction className="sm:w-[98px]" onClick={deleteRecipe}>
                          {loading ? <LoadingSpinner /> : "Delete"}
                        </AlertDialogAction>
                      ) : (
                        <Button onClick={() => setAreYouSureView(true)}>Continue</Button>
                      )}
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </>
      </div>
    </Suspense>
  )
}

export default MenuButton

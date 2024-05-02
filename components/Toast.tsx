"use client"
import React, { FC, useEffect } from "react"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { Toaster } from "./ui/toaster"
import { useToast } from "@/components/ui/use-toast"

const Toast: FC = () => {
  const router = useRouter()
  const pathname = usePathname()
  const query = useSearchParams()
  const { toast } = useToast()

  useEffect(() => {
    const loggedIn = query.get("loggedIn")
    const loggedOut = query.get("loggedOut")
    const addedRecipe = query.get("added")
    const deletedRecipe = query.get("deleted")
    const editedRecipe = query.get("edited")
    const params = new URLSearchParams(query)
    if (loggedIn) {
      toast({
        title: "Logged In",
        description: "You were successfully logged in.",
        duration: 3000,
      })
      router.refresh()
      params.delete("loggedIn")
      router.replace(pathname)
      router.refresh()
    }
    if (loggedOut) {
      toast({
        title: "Logged Out",
        description: "You were successfully logged out.",
        duration: 3000,
      })
      params.delete("loggedOut")
      router.replace(pathname)
      router.refresh()
    }
    if (addedRecipe) {
      toast({
        title: "Recipe added",
        description: "You have successfully added a recipe to the database.",
        duration: 3000,
      })
      params.delete("added")
      router.replace(pathname)
      router.refresh()
    }
    if (deletedRecipe) {
      toast({
        title: "Recipe deleted",
        description: "You have successfully deleted a recipe from the database.",
        duration: 3000,
      })
      params.delete("deleted")
      router.replace(pathname)
      router.refresh()
    }
    if (editedRecipe) {
      toast({
        title: "Recipe edited",
        description: "You have successfully edited a recipe from the database.",
        duration: 3000,
      })
      params.delete("edited")
      router.replace(pathname)
      router.refresh()
    }
  }, [pathname, query, router, toast])

  return <Toaster />
}

export default Toast

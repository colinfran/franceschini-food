"use client"
import React, { FC, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Toaster } from "./ui/toaster"
import { useToast } from "@/components/ui/use-toast"
import { useToaster } from "@/providers/toast-provider"

const Toast: FC = () => {
  const router = useRouter()
  const { toast } = useToast()
  const { setCurrentToast, currentToast } = useToaster()

  useEffect(() => {
    const loggedIn = currentToast === "loggedIn"
    const loggedOut = currentToast === "loggedOut"
    const addedRecipe = currentToast === "addedRecipe"
    const deletedRecipe = currentToast === "deletedRecipe"
    const editedRecipe = currentToast === "editedRecipe"
    if (loggedIn) {
      toast({
        title: "Logged In",
        description: "You were successfully logged in.",
        duration: 3000,
      })
      setCurrentToast(undefined)
      router.refresh()
    }
    if (loggedOut) {
      toast({
        title: "Logged Out",
        description: "You were successfully logged out.",
        duration: 3000,
      })
      setCurrentToast(undefined)
      router.refresh()
    }
    if (addedRecipe) {
      toast({
        title: "Recipe added",
        description: "You have successfully added a recipe to the database.",
        duration: 3000,
      })
      setCurrentToast(undefined)
      router.refresh()
    }
    if (deletedRecipe) {
      toast({
        title: "Recipe deleted",
        description: "You have successfully deleted a recipe from the database.",
        duration: 3000,
      })
      setCurrentToast(undefined)
      router.refresh()
    }
    if (editedRecipe) {
      toast({
        title: "Recipe edited",
        description: "You have successfully edited a recipe from the database.",
        duration: 3000,
      })
      setCurrentToast(undefined)
      router.refresh()
    }
  }, [currentToast, router, toast, setCurrentToast])

  return <Toaster />
}

export default Toast

"use client"
import React, { FC, useEffect } from "react"
import { useRouter, usePathname } from "next/navigation"
import { Toaster } from "./ui/toaster"
import { useToast } from "@/components/ui/use-toast"
import { useToaster } from "@/providers/toast-provider"

const Toast: FC = () => {
  const router = useRouter()
  const pathname = usePathname()
  const { toast } = useToast()
  const { setCurrentToast, currentToast } = useToaster()

  useEffect(() => {
    if (pathname === "/"){
      switch (currentToast) {
        case "loggedIn": {
          toast({
            title: "Logged In",
            description: "You were successfully logged in.",
            duration: 3000,
          })
          router.refresh()
          setCurrentToast(undefined)
          break;
        }
        case "loggedOut": {
          toast({
            title: "Logged Out",
            description: "You were successfully logged out.",
            duration: 3000,
          })
          setCurrentToast(undefined)
          break;
        }
        case "addedRecipe": {
          toast({
            title: "Recipe added",
            description: "You have successfully added a recipe to the database.",
            duration: 3000,
          })
          router.refresh()
          setCurrentToast(undefined)
          break;
        }
        case "deletedRecipe": {
          toast({
            title: "Recipe deleted",
            description: "You have successfully deleted a recipe from the database.",
            duration: 3000,
          })
          router.refresh()
          setCurrentToast(undefined)
          break;
        }
        case "editedRecipe": {
          toast({
            title: "Recipe edited",
            description: "You have successfully edited a recipe from the database.",
            duration: 3000,
          })
          router.refresh()
          setCurrentToast(undefined)
          break;
        }
        default: {
          break;
        }
      }
    }
  }, [currentToast, pathname])

  return <Toaster />
}

export default Toast

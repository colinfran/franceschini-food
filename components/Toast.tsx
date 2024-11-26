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
    if (currentToast && pathname === "/") {
      let message = {}
      switch (currentToast) {
        case "loggedIn": {
          message = {
            title: "Logged In",
            description: "You were successfully logged in.",
            duration: 3000,
          }
          break
        }
        case "loggedOut": {
          message = {
            title: "Logged Out",
            description: "You were successfully logged out.",
            duration: 3000,
          }
          break
        }
        case "addedRecipe": {
          message = {
            title: "Recipe added",
            description: "You have successfully added a recipe to the database.",
            duration: 3000,
          }
          break
        }
        case "deletedRecipe": {
          message = {
            title: "Recipe deleted",
            description: "You have successfully deleted a recipe from the database.",
            duration: 3000,
          }
          break
        }
        case "editedRecipe": {
          message = {
            title: "Recipe edited",
            description: "You have successfully edited a recipe from the database.",
            duration: 3000,
          }
          break
        }
        default:
          break
      }
      toast(message)
      router.refresh()
      setCurrentToast(undefined)
    }
  }, [currentToast, pathname])

  return <Toaster />
}

export default Toast

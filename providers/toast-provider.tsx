// This file contains a context and provider for managing the currently selected recipe.
// It also provides a custom hook, useRecipe, for accessing the current recipe and a function to update it.
// The RecipeProvider wraps the content of the page in the root layout file.

"use client"
import { usePathname } from "next/navigation"
import React, { createContext, FC, ReactNode, useContext, useEffect, useState } from "react"

type ContextProps = {
  currentToast: string | undefined
  setCurrentToast: (val: string | undefined) => void
}

const defaultContextValue: ContextProps = {
  currentToast: undefined,
  setCurrentToast: () => {},
}

const ToastContext = createContext<ContextProps>(defaultContextValue)

export const ToastProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [currentToast, setCurrentToast] = useState<string | undefined>(undefined)
  const pathname = usePathname()

  useEffect(() => {
    if (pathname !== "/") {
      setCurrentToast(undefined)
    }
  }, [pathname, setCurrentToast])
  return (
    <ToastContext.Provider value={{ currentToast, setCurrentToast }}>
      {children}
    </ToastContext.Provider>
  )
}

export const useToaster = (): ContextProps => {
  return useContext(ToastContext)
}

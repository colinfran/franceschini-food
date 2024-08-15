"use client"
import React, { FC } from "react"
import { useToaster } from "@/providers/toast-provider"
import { Button } from "./ui/button"

const LogoutButton: FC = () => {
  const { setCurrentToast } = useToaster()
  return <Button onClick={() => setCurrentToast("loggedOut")}>Logout</Button>
}

export default LogoutButton

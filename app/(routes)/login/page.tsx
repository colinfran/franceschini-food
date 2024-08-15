"use client"
import React, { FC, useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { LoadingSpinner } from "@/components/LoadingSpinner"
import { useRouter } from "next/navigation"
import { useToaster } from "@/providers/toast-provider"

const Page: FC = () => {
  const router = useRouter()
  const [key, setKey] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("<no-error>")
  const { setCurrentToast } = useToaster()

  const handleSubmit = async (): Promise<void> => {
    setLoading(true)
    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ key }),
      })
      const data = await response.json()
      if (!data.valid) {
        setLoading(false)
        setError("Invalid Key")
      } else {
        router.push("/")
        setTimeout(() => {
          setCurrentToast("loggedIn")
        }, 500)
        setLoading(false)
      }
    } catch (e) {
      console.error(e)
    }
  }

  return (
    <div className="mt-10 flex flex-row justify-center">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl">Login</CardTitle>
          <CardDescription>
            Enter your key below to login to the admin account. With admin access, you can add,
            edit, or delete recipes from the database.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div>
            <div className="grid gap-2">
              <Label htmlFor="key">Secret Key</Label>
              <Input
                id="key"
                placeholder="Abc123"
                type="text"
                value={key}
                required
                onChange={(event) => setKey(event.target.value)}
              />
            </div>
            <p className={`${error !== "<no-error>" ? "visible" : "invisible"} text-red-500`}>
              {error}
            </p>
          </div>
        </CardContent>
        <CardFooter>
          <Button className="w-full" disabled={loading} type="submit" onClick={handleSubmit}>
            {loading ? <LoadingSpinner /> : "Sign in"}
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}

export default Page

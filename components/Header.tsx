import React from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "./ui/button"
import { cookies, headers } from "next/headers"
import { redirect } from "next/navigation"

const Header: React.FC = async () => {
  const heads = headers()
  const showAddButton = heads.get("next-url") !== "/edit"
  const authCookie = cookies().get("auth")?.value

  return (
    <header className="container">
      <div className="flex items-center justify-between border-b py-4">
        <a href="/">
          <Image
            alt="Logo"
            className="header-logo"
            height={38}
            src="/icons/favicon-white.ico"
            width={38}
            priority
          />
        </a>
        {authCookie ? (
          <>
            {showAddButton && (
              <Button asChild>
                <Link href="/add">+ Add</Link>
              </Button>
            )}
            <form
              action={async () => {
                "use server"
                cookies().delete("auth")
                redirect("/?loggedOut=true")
              }}
            >
              <div className="space-x-4">
                <Button>Logout</Button>
              </div>
            </form>
          </>
        ) : (
          <div className="space-x-4">
            <Button asChild>
              <Link href="/login">Login</Link>
            </Button>
          </div>
        )}
      </div>
    </header>
  )
}

export default Header

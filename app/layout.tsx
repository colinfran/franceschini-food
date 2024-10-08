import React, { Suspense } from "react"
import "../assets/css/globals.css"
import { ThemeProvider } from "@/providers/theme-provider"
import Header from "@/components/Header"
import { Metadata } from "next"
import Toast from "@/components/Toast"
import { Footer } from "@/components/Footer"
import { RecipeProvider } from "@/providers/recipe-provider"
import { ToastProvider } from "@/providers/toast-provider"
import NextTopLoader from "nextjs-toploader"
import { Analytics } from "@vercel/analytics/react"
import { GoogleAnalytics } from "@next/third-parties/google"
const gaId = process.env.NEXT_PUBLIC_MEASUREMENT_ID!

export const metadata: Metadata = {
  title: {
    template: "%s | franceschini.food",
    default: "Franceschini Recipes",
  },
  keywords: [
    "food",
    "fran",
    "frances",
    "franceschi",
    "food franceschi",
    "franceschi food",
    "franceschini food",
    "food franceschini",
    "colin franceschini",
    "colinfranceschini",
    "franceschini",
    "san francisco",
  ],
  description: "Franceschini Recipe Book",
  icons: {
    icon: [
      {
        media: "(prefers-color-scheme: light)",
        url: "/icons/favicon-black.ico",
        href: "/icons/favicon-black.ico",
      },
      {
        media: "(prefers-color-scheme: dark)",
        url: "/icons/favicon-white.ico",
        href: "/icons/favicon-white.ico",
      },
    ],
    shortcut: "/icons/favicon-16x16.png",
    apple: "/icons/apple-icon-precomposed.png",
  },
}

type RootLayoutProps = {
  children?: React.ReactNode
}

const RootLayout: React.FC<RootLayoutProps> = async ({ children }) => {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="relative flex min-h-screen flex-col">
        <NextTopLoader color="#36568a" showSpinner={false} zIndex={100} />
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          disableTransitionOnChange
          enableSystem
        >
          <ToastProvider>
            <main>
              <Header />
              <RecipeProvider>
                <div className="flex-1">{children}</div>
              </RecipeProvider>
            </main>
            <Footer />
            <Suspense>
              <Toast />
            </Suspense>
          </ToastProvider>
        </ThemeProvider>
        <Analytics />
      </body>
      <GoogleAnalytics gaId={gaId} />
    </html>
  )
}

export default RootLayout

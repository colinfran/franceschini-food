import React from "react"
import Link from "next/link"

const Page: React.FC = async () => (
  <div className="flex size-full">
    <div className="flex size-full flex-col">
      <div className="flex min-h-[calc(100vh-72px)] flex-col items-center px-10 text-center">
        <div className="flex flex-row">
          <div className="mt-20 flex flex-row gap-5 text-center">
            <h1 className="mb-6 animate-bounce text-9xl font-bold">4</h1>
            <h1 className="mb-6 animate-bounce text-9xl font-bold">0</h1>
            <h1 className="mb-6 animate-bounce text-9xl font-bold">4</h1>
          </div>
        </div>
        <div className="space-y-2">
          <div className="inline-block rounded-lg bg-gray-100 px-3 py-1 text-sm dark:bg-gray-800">
            Error
          </div>
          <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl">
            Oops! You broke the internet.
          </h1>
          <p className="max-w-[600px] text-gray-500 dark:text-gray-400 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
            Don&apos;t worry, you can still get back to safety. It&apos;s just a 404 error.
            Let&apos;s get you back to the{" "}
            <Link className="underline underline-offset-2" href="/">
              homepage
            </Link>
            .
          </p>
        </div>
      </div>
    </div>
  </div>
)

export default Page

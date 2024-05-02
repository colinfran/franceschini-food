import React, { FC, useRef, useState } from "react"
import { Button } from "../ui/button"
import Image from "next/image"
import { LoadingSpinner } from "../LoadingSpinner"

type Props = {
  setImagePreview: (val: string | undefined) => void
  imagePreview: string | null | undefined
}

const ImageUpload: FC<Props> = ({ imagePreview, setImagePreview }) => {
  const [imageLoading, setImageLoading] = useState<boolean>(false)
  const [isDragging, setIsDragging] = useState<boolean>(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const uploadImage = async (file: File): Promise<void> => {
    const formData = new FormData()
    formData.append("image", file)
    try {
      const response = await fetch("/api/recipes/upload-image", {
        method: "POST",
        body: formData,
      })
      if (!response.ok) {
        throw new Error("Image upload failed")
      }
      const { url } = await response.json()
      setImagePreview(url)
    } catch (error) {
      console.error("Error uploading image:", error)
    } finally {
      setImageLoading(false)
      setTimeout(() => {
        window.scrollTo({
          top: document.documentElement.scrollHeight,
          behavior: "smooth",
        })
      }, 300)
    }
  }

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>): Promise<void> => {
    setImageLoading(true)
    const file = e.target.files?.[0]
    if (file) {
      await uploadImage(file)
    }
  }

  const handleDrop = async (e: React.DragEvent<HTMLButtonElement>): Promise<void> => {
    e.preventDefault()
    e.stopPropagation()
    const file = e.dataTransfer.files?.[0]
    if (file) {
      setImageLoading(true)
      await uploadImage(file)
    }
    setIsDragging(false)
  }

  const handleDragOver = (e: React.DragEvent<HTMLButtonElement>): void => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(true)
  }

  const handleDragLeave = (e: React.DragEvent<HTMLButtonElement>): void => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(false)
  }

  const handleClickUpload = (): void => {
    if (fileInputRef.current) {
      fileInputRef.current.click()
    }
  }

  return (
    <div className="">
      {imageLoading && !imagePreview && (
        <div className="mt-1 flex h-[146px] w-full items-center	justify-center rounded-md border-2 border-dashed border-gray-300 px-6 pb-6 pt-5 dark:border-gray-600">
          <LoadingSpinner className="size-20" />
        </div>
      )}
      {!imageLoading && imagePreview && (
        <div className="relative w-full">
          <Button
            className="absolute right-2 top-2"
            variant="outline"
            onClick={() => setImagePreview(undefined)}
          >
            <svg
              fill="none"
              height="24"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <line x1="18" x2="6" y1="6" y2="18"></line>
              <line x1="6" x2="18" y1="6" y2="18"></line>
            </svg>
          </Button>
          <Image
            alt="Preview"
            className="mx-auto object-cover"
            height={500}
            src={imagePreview as string}
            width={500}
          />
        </div>
      )}
      {!imageLoading && !imagePreview && (
        <button
          className={`mt-1 flex h-[146px] w-full cursor-pointer justify-center rounded-md border-2 border-dashed px-6 pb-6 pt-5 ${isDragging ? "border-blue-500 shadow-lg dark:border-blue-500 dark:shadow-white-lg" : "border-gray-300 dark:border-gray-600"}`}
          tabIndex={0}
          onClick={handleClickUpload}
          onDragLeave={handleDragLeave}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleClickUpload()
            }
          }}
        >
          <div className="space-y-1 text-center">
            <svg
              aria-hidden="true"
              className="mx-auto size-12 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 48 48"
            >
              <path
                d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
              />
            </svg>
            <div className="flex text-sm text-gray-600 dark:text-gray-400">
              <span>Upload a file</span>
              <input
                className="sr-only"
                id="image"
                name="image"
                ref={fileInputRef}
                type="file"
                onChange={handleImageChange}
              />
              <p className="pl-1">or drag and drop</p>
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400">PNG, JPG, GIF up to 10MB</p>
          </div>
        </button>
      )}
    </div>
  )
}

export default ImageUpload

import React from "react"
import { ImagePlus } from "lucide-react"

interface UploadImagemProps {
  label: string
  onChange?: (file: File) => void
}

function UploadImagem({ label, onChange }: UploadImagemProps) {
  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.files && e.target.files[0]) {
      onChange?.(e.target.files[0])
    }
  }

  return (
    <div className="flex text-center items-center flex-col gap-1.5 font-sans">
      <label className="font-bold text-lg text-luna-teal no-underline 4xl:text-2xl">
        {label}
      </label>

      <label className="relative w-43 3xl:w-52 4xl:w-60 h-10 4xl:h-13 border-2 border-dashed border-luna-teal rounded-xl flex items-center justify-center text-center cursor-pointer">
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="hidden"
        />

        <span className="text-center text-luna-teal">
          <ImagePlus className="size-[18px] 4xl:size-8" />
        </span>
      </label>
    </div>
  )
}

export default UploadImagem
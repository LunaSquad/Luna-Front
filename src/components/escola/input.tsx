import React from "react"

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string
}

function Input({ label, id, ...props }: InputProps) {
  return (
    <div className="flex flex-col gap-5.5 font-sans font-bold text-lg text-luna-teal w-full">
      <label
        htmlFor={id}
        className="font-sans font-bold text-lg text-luna-teal 4xl:text-3xl"
      >
        {label}
      </label>

      <input id={id}
        className="border-0 border-b-2 border-b-luna-teal text-black font-sans font-light text-sm bg-transparent focus:outline-none placeholder:text-gray-400 4xl:!pb-1 4xl:placeholder:text-xl" {...props}
      />
    </div>
  )
}

export default Input                          
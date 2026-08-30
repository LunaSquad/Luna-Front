import { Search, Plus } from "lucide-react";
import Button from "./button";

type SearchActionBarProps = {
    searchValue: string
    onSearchChange: (value: string) => void
    searchPlaceholder?: string
    buttonLabel: string
    onButtonClick: () => void
}

export default function SearchActionBar({
    searchValue,
    onSearchChange,
    searchPlaceholder = "Buscar",
    buttonLabel,
    onButtonClick,
}: SearchActionBarProps){
    return(
        <div className="flex flex-wrap justify-between items-center !my-8">
            <div className="flex items-center justify-center gap-3 w-85 h-11 rounded-lg !px-3 shadow-2xs shadow-luna-shadow2">
                <Search size={18} className="text-luna-teal shrink-0" />
                <input
                 type="text"
                 value={searchValue}
                 onChange={(e) => onSearchChange(e.target.value)}
                 placeholder={searchPlaceholder}
                 className="border-none outline-none bg-transparent w-full h-full font-sans text-sm text-black placeholder:text-black"
                />
            </div>

            <Button
                type="button"
                onClick={onButtonClick}
                className="flex items-center gap-4 h-10 !px-5 bg-luna-teal text-white font-sans font-semibold rounded-lg cursor-pointer transition-all duration-300 ease hover:opacity-[0.94]"
             >
                <Plus size={18} className="w-6 h-6 rounded-full text-white"/>
                <span>{buttonLabel}</span>
             </Button>
        </div>
    )
}
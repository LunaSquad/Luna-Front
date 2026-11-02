import { Settings2, Search } from "lucide-react"
import Button from "./button"
import UserInfo from "./UserInfo"

type NavBarHomeProps = {
    onSearchChange: (value: string) => void
    searchPlaceholder?: string
    buttonLabel: string
    onButtonClickc: () => void

    nome: string
    foto: string
    notificacoes: number
    onButtonClick: () => void
}

export default function NavbarHome({
    onSearchChange,
    searchPlaceholder = "Filtrar",
    buttonLabel,
    onButtonClickc,
    nome,
    foto,
    notificacoes,
    onButtonClick
}: NavBarHomeProps) {

    return (
        <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="order-2 flex w-full items-center gap-2.5 sm:order-1 sm:w-auto sm:gap-5 4xl:gap-8">
                <div className="flex h-10 min-w-0 flex-1 items-center justify-center gap-3 rounded-[10px] bg-white px-3.5! shadow-[0_4px_8px_rgba(0,0,0,0.3)] sm:w-50 sm:flex-none lg:w-65 xl:w-75 min-[1600px]:h-12 min-[1600px]:w-95 4xl:h-16 4xl:w-140 4xl:gap-5 4xl:rounded-2xl 4xl:px-6!">
                    <Search className="size-[18px] shrink-0 text-luna-teal 4xl:size-8" />
                    <input
                        type="text"
                        onChange={(e) => onSearchChange(e.target.value)}
                        placeholder={searchPlaceholder}
                        className="h-full w-full border-none bg-transparent font-sans text-[15px] text-black outline-none placeholder:text-black 4xl:text-2xl"
                    />
                </div>

                <Button
                    type="button"
                    onClick={onButtonClickc}
                    className="flex h-10 w-10 shrink-0 cursor-pointer items-center justify-center gap-2.5 rounded-[10px] border-none bg-white p-0! font-sans text-sm font-bold text-luna-teal shadow-[0_4px_8px_rgba(0,0,0,0.3)] transition-all duration-300 ease-in-out hover:bg-luna-teal hover:text-white sm:w-30 sm:px-3.5! 4xl:h-16 4xl:w-48 4xl:gap-4 4xl:rounded-2xl 4xl:text-2xl"
                >
                    <Settings2 className="size-5 shrink-0 4xl:size-8" />
                    <span className="hidden sm:inline">{buttonLabel}</span>
                </Button>
            </div>

            <div className="order-1 flex w-full justify-end sm:order-2 sm:w-auto sm:flex-1">
                <UserInfo
                    nome={nome}
                    foto={foto}
                    notificacoes={notificacoes}
                    onButtonClick={onButtonClick}
                />
            </div>
        </div>
    )
}
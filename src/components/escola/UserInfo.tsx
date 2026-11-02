import { Bell } from "lucide-react";

interface UserInfoProps {
    nome: string
    foto: string
    notificacoes: number
    onButtonClick: () => void
}

export default function UserInfo({ nome, foto, notificacoes, onButtonClick }: UserInfoProps) {
    return (
        <div className="flex items-center justify-center gap-3 4xl:gap-5">
            <button
                type="button"
                aria-label="Notificações"
                onClick={onButtonClick}
                className="relative flex cursor-pointer items-center border-none bg-transparent p-0!"
            >
                <Bell className="size-[26px] text-luna-teal 4xl:size-10" />

                {notificacoes > 0 && (
                    <span className="absolute -top-1.5 -right-1.5 flex h-4.5 min-w-4.5 items-center justify-center rounded-full bg-red-500 px-1.25! font-sans text-xs font-bold text-white 4xl:-top-2.5 4xl:-right-2.5 4xl:h-7 4xl:min-w-7 4xl:text-base">
                        {notificacoes > 99 ? "+99" : notificacoes}
                    </span>
                )}
            </button>

            <p className="max-w-28 truncate font-sans text-[13px] font-bold text-black md:max-w-35 md:text-sm xl:max-w-45 xl:text-base min-[1600px]:max-w-55 min-[1600px]:text-lg 4xl:max-w-96 4xl:text-3xl">
                Olá, {nome}!
            </p>

            <img src={foto} alt="avatar" className="size-11 shrink-0 rounded-full object-cover 4xl:size-18" />
        </div>
    )
}
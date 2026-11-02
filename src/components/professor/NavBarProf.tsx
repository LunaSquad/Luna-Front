import { Link } from "react-router-dom";
import { Menu, House, LibraryBig, LogOut, Users } from "lucide-react";

type NavLateralProps = {
    aberta: boolean;
    setAberta: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function NavBarProf({ aberta, setAberta }: NavLateralProps) {
    const icone = "size-7 4xl:size-11";

    const itens = [
        { icone: <House className={icone} />, texto: "Home", rota: "/professor/home" },
        { icone: <LibraryBig className={icone} />, texto: "Atividades", rota: "/professores/atividades" },
        { icone: <Users className={icone} />, texto: "Turmas", rota: "/professores/turmas" },
    ];

    return (
        <aside className={`fixed top-0 left-0 z-1 flex min-h-screen flex-col items-start gap-12 overflow-hidden bg-luna-teal !px-6 !py-10 transition-all duration-500 ease-in-out 4xl:gap-20 4xl:!px-10 4xl:!py-16 ${aberta ? "w-80 4xl:w-120" : "w-20 4xl:w-32"}`}>

            <button
                className="cursor-pointer border-none bg-transparent text-white"
                onClick={() => setAberta(!aberta)}
                type="button"
            >
                <Menu className="size-[30px] 4xl:size-12" />
            </button>

            <nav className="flex w-full flex-col gap-4 4xl:gap-7">
                {itens.map((item) => (
                    <Link
                        to={item.rota}
                        className={`group flex h-18 items-center gap-4 rounded-full font-sans text-[18px] font-bold text-white no-underline transition-all duration-500 ease-in-out 4xl:h-28 4xl:gap-7 4xl:text-3xl ${
                            aberta ? "w-full justify-start pl-0 hover:w-40 hover:translate-x-2 hover:bg-white/40 hover:text-[16px] 4xl:hover:w-64 4xl:hover:text-2xl" : "w-10 4xl:w-16"
                        }`}
                        key={item.texto}
                    >
                        <span className="flex min-w-6 items-center justify-center transition-transform duration-300 ease-in-out group-hover:translate-x-2">
                            {item.icone}
                        </span>
                        {aberta && <span className="overflow-hidden whitespace-nowrap">{item.texto}</span>}
                    </Link>
                ))}
            </nav>

            <Link to="/" className={`!mt-auto flex items-center gap-4 rounded-[50px] font-sans text-[18px] font-bold text-white no-underline transition-all duration-500 ease-in-out 4xl:gap-7 4xl:text-3xl ${aberta ? "w-full justify-start pl-0" : "w-20 4xl:w-32"}`}>
                <span className="flex min-w-8 items-center justify-center">
                    <LogOut className={icone} />
                </span>
                {aberta && <span className="overflow-hidden whitespace-nowrap">Sair</span>}
            </Link>

        </aside>
    );
}
import { Link } from "react-router-dom";
import { Menu, House, LibraryBig, LogOut, Users } from "lucide-react";

type NavLateralProps = {
    aberta: boolean;
    setAberta: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function NavBarProf({ aberta, setAberta }: NavLateralProps) {
    const itens = [
        { icone: <House size={28} />, texto: "Home", rota: "/professor/home" },
        { icone: <LibraryBig size={28} />, texto: "Atividades", rota: "/professores/atividades" },
        { icone: <Users size={28} />, texto: "Turmas", rota: "/professores/turmas" },
    ];

    return (
        <aside className={`fixed top-0 left-0 min-h-screen bg-luna-teal !py-10 !px-6 flex flex-col items-start gap-12 overflow-hidden z-1 transition-all duration-500 ease-in-out ${aberta ? "w-80" : "w-20"}`}>
            
            <button
                className="bg-transparent border-none text-white cursor-pointer"
                onClick={() => setAberta(!aberta)}
                type="button"
            >
                <Menu size={30} />
            </button>

            <nav className="flex flex-col gap-4 w-full">
                {itens.map((item) => (
                    <Link
                        to={item.rota}
                        className={`group flex items-center gap-4 no-underline text-white font-sans font-bold text-[18px] h-18 rounded-full transition-all duration-500 ease-in-out ${
                            aberta ? "w-full justify-start pl-0 hover:w-40 hover:bg-white/40 hover:translate-x-2 hover:text-[16px]" : "w-10"
                        }`}
                        key={item.texto}
                    >
                        <span className={`flex items-center justify-center min-w-6 transition-transform duration-300 ease-in-out group-hover:translate-x-2`}>
                            {item.icone}
                        </span>
                        {aberta && <span className="whitespace-nowrap overflow-hidden">{item.texto}</span>}
                    </Link>
                ))}
            </nav>

            <Link to="/" className={`!mt-auto flex items-center gap-4 no-underline text-white font-sans font-bold text-[18px] rounded-[50px] transition-all duration-500 ease-in-out ${aberta ? "w-full justify-start pl-0" : "w-20"}`}>
                <span className="flex items-center justify-center min-w-8">
                    <LogOut size={28} />
                </span>
                {aberta && <span className="whitespace-nowrap overflow-hidden">Sair</span>}
            </Link>

        </aside>
    );
}
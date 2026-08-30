import { Users, Plus, BookOpen } from "lucide-react";
import Button from "../escola/button";

type AdicionaAlunosProps = {
    onButtonClick: () => void
    buttonLabel: string
    abaAtiva: string
    setAbaAtiva: (aba: string) => void
}

export default function AdicionaAlunos({
    onButtonClick,
    buttonLabel,
    abaAtiva,
    setAbaAtiva
}: AdicionaAlunosProps) {

    
    return (
        <div className="flex flex-col gap-6 !my-4 w-full">
            <div className="flex w-full justify-between items-center flex-wrap gap-4">
                
                <div className="flex items-center w-fit h-13 !py-1.5 !px-2 gap-4 bg-gray-200 rounded-lg">

                    <button
                        onClick={() => setAbaAtiva('alunos')}
                        className={`flex items-center gap-3 h-full !px-5 !py-2.5 rounded-lg font-medium text-md transition-all duration-300 cursor-pointer ${abaAtiva === 'alunos'
                                ? 'bg-white text-luna-teal shadow-sm'
                                : 'text-luna-teal/60 hover:text-luna-teal hover:bg-gray-200/50 bg-transparent border-none'
                            }`}
                    >
                        <Users size={20} />
                        Alunos
                        <span className="flex items-center justify-center bg-luna-teal/20 text-luna-teal !px-2 !py-1.5 rounded-full text-xs">
                            10
                        </span>
                    </button>

                    <button
                        onClick={() => setAbaAtiva('atividades')}
                        className={`flex items-center gap-3 h-full !px-5 !py-2.5 rounded-lg font-medium text-md transition-all duration-300 cursor-pointer ${abaAtiva === 'atividades'
                                ? 'bg-white text-luna-teal shadow-sm'
                                : 'text-luna-teal/60 hover:text-luna-teal hover:bg-gray-200/50 bg-transparent border-none'
                            }`}
                    >
                        <BookOpen size={20} /> 
                        Atividades
                        <span className="flex items-center justify-center bg-luna-teal/20 text-luna-teal !px-2.5 !py-1.5 rounded-full text-xs">
                            3
                        </span>
                    </button>
                </div>

                <Button
                    type="button"
                    onClick={onButtonClick}
                    className="flex items-center gap-4 h-10 !px-5 bg-luna-teal text-white font-sans font-semibold rounded-lg cursor-pointer transition-all duration-300 ease hover:opacity-[0.94]"
                >
                    <Plus size={18} className="w-6 h-6 rounded-full text-white" />
                    <span>{buttonLabel}</span>
                </Button>
            </div>


            

        </div>
    )
}
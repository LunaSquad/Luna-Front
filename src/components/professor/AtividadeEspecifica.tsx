import { Check, Clock } from "lucide-react";
import { useNavigate } from "react-router-dom";

type StatusEntrega = "Entregue" | "Corrigido" | "Pendente";

interface AlunoBase {
    _id: string;
    nome: string;
    avatarUrl?: string;
}

interface AtividadeEspecificaProps {
    alunos?: AlunoBase[];
    atividadeId: string;
    turmaId: string;
}


const statusMock: StatusEntrega[] = ["Entregue", "Corrigido", "Corrigido", "Pendente"];

export default function AtividadeEspecifica({ alunos = [], atividadeId, turmaId }: AtividadeEspecificaProps) {

    const navigate = useNavigate();

    const abrirCorrecao = (alunoId: string) => {

        const idSimulado = atividadeId || "1";

        navigate(
            `/professores/correcaoAtividade/${idSimulado}/${alunoId}?turmaId=${turmaId}`
        );
    };

    return (
        <div className="flex flex-col gap-6 w-full !mt-8">
            {alunos.length === 0 && (
                <p className="text-center text-gray-500 font-sans">
                    Nenhum aluno nesta turma.
                </p>
            )}

            {alunos.map((aluno, index) => {
                const status = statusMock[index % statusMock.length];
                const isPendente = status === "Pendente";
                const isCorrigido = status === "Corrigido";

                return (
                    <div
                        key={aluno._id}
                        className="relative w-full bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow flex items-center justify-between min-h-[84px] overflow-hidden pr-8 pl-10 py-4"
                    >
                        <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-[#001A72] rounded-l-xl" />

                        <div className="flex items-center gap-4 !ml-6">
                            {aluno.avatarUrl ? (
                                <img
                                    src={aluno.avatarUrl}
                                    alt={aluno.nome}
                                    className="w-12 h-12 rounded-full object-cover shrink-0"
                                />
                            ) : (
                                <div className="w-12 h-12 rounded-full bg-[#FFD8C9] flex items-center justify-center text-[#005B52] font-bold text-base shrink-0">
                                    {aluno.nome.charAt(0)}
                                </div>
                            )}

                            <span className="font-sans font-medium text-lg text-neutral-900">
                                {aluno.nome}
                            </span>
                        </div>

                        <div className="flex items-center gap-4 shrink-0 !mr-5">
                            {status === "Entregue" && (
                                <span className="inline-flex items-center justify-center gap-2 w-[118px] h-10 rounded-md text-sm font-semibold bg-[#FFF8F6] text-[#005B52] border border-[#F3D6CE]">
                                    <span className="w-4 h-4 rounded-full bg-[#005B52] text-white flex items-center justify-center shrink-0">
                                        <Check size={11} strokeWidth={3.5} />
                                    </span>
                                    Entregue
                                </span>
                            )}

                            {isCorrigido && (
                                <span className="inline-flex items-center justify-center gap-2 w-[118px] h-10 rounded-md text-sm font-semibold bg-[#D6EAE8] text-[#005B52] border border-[#005B52]/50">
                                    <span className="w-4 h-4 rounded-full bg-[#005B52] text-white flex items-center justify-center shrink-0">
                                        <Check size={11} strokeWidth={3.5} />
                                    </span>
                                    Corrigido
                                </span>
                            )}

                            {isPendente && (
                                <span className="inline-flex items-center justify-center gap-2 w-[118px] h-10 rounded-md text-sm font-semibold bg-[#FFE9E9] text-[#FF0000] border border-[#FF4D4D]">
                                    <Clock size={18} className="fill-[#FF0000] text-[#FFE9E9] shrink-0" />
                                    Pendente
                                </span>
                            )}

                            <button
                                type="button"
                                onClick={() => abrirCorrecao(aluno._id)}
                                className={`w-[115px] h-10 rounded-md font-sans font-semibold text-sm transition-colors cursor-pointer flex items-center justify-center ${isCorrigido
                                        ? "text-[#005B52] border border-[#005B52] bg-white hover:bg-teal-50/50"
                                        : "text-white bg-[#005B52] hover:bg-[#004347] border-none shadow-xs"
                                    }`}
                            >
                                {isCorrigido ? "Rever" : "Corrigir"}
                            </button>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}
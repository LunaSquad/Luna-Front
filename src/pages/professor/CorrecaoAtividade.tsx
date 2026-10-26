import { useState, useEffect } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import InfoHeaderProfessor from "../../components/professor/InfoHeaderProfessor";
import LayoutBaseProf from "../../components/professor/layout/LayoutBaseProf";
import { api } from "../../services/api";
import ControlePaginacao from "../../components/professor/controlePaginacao";
import { Check, MessagesSquare, X, Send } from "lucide-react";

interface Questao {
    _id: string;
    numero: number;
    enunciado: string;
    respostaAluno: string;
    correta: boolean;
}

interface RespostaAluno {
    _id: string;
    alunoId: string;
    nome: string;
    avatarUrl: string;
    acertos: number;
    totalQuestoes: number;
    aproveitamento: number;
    comentarioProfessor: string;
    questoes: Questao[];
}

export default function CorrecaoAtividade() {
    const { atividadeId, alunoId } = useParams();
    const [respostas, setRespostas] = useState<RespostaAluno[]>([]);
    const [paginaAtual, setPaginaAtual] = useState(1);
    const [comentarioTexto, setComentarioTexto] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const [searchParams] = useSearchParams();
    const turmaId = searchParams.get("turmaId")

    const questoesPorPagina = 3;

    useEffect(() => {
        const buscarRespostas = async () => {
            try {
                setIsLoading(true);
                const res = await api.getRespostasAtividade(
                    atividadeId as string
                );
                setRespostas(res.data);
            } catch (erro) {
                console.error("Erro ao carregar respostas:", erro);
            } finally {
                setIsLoading(false);
            }
        };

        buscarRespostas();
    }, [atividadeId]);

    const alunoAtual = alunoId
        ? respostas.find(resp => resp.alunoId === alunoId)
        : respostas[0]

    const totalPaginas = alunoAtual ? Math.ceil(alunoAtual.questoes.length / questoesPorPagina) : 0;

    const questoesDaPagina = alunoAtual
        ? alunoAtual.questoes.slice((paginaAtual - 1) * questoesPorPagina, paginaAtual * questoesPorPagina)
        : [];

    const lidarComEnvioFeedback = async () => {
        if (!alunoAtual) return;

        try {
            await api.enviarFeedback(alunoAtual._id, comentarioTexto.trim());
            alert("Enviado com sucesso!");
            setComentarioTexto("");
        } catch (erro) {
            console.error(erro);
            alert("Não foi possível enviar o feedback.")
        }
    };

    const irParaProximo = () => {

        if (paginaAtual < totalPaginas) {
            setPaginaAtual(paginaAtual + 1);
        }
    };

    const irParaAnterior = () => {
        if (paginaAtual > 1) {
            setPaginaAtual(paginaAtual - 1);
        }
    };

    const DesempenhoBaixo = (alunoAtual?.aproveitamento ?? 0) < 50;

    return (
        <LayoutBaseProf>
            <InfoHeaderProfessor
                textoVoltar="Voltar para as Atividades"
                rotaVoltar={turmaId
                    ? `/professores/turmaEspecifica/${turmaId}?aba=atividades`
                    : "/professores/turmas"}
            />

            <div className="w-full mx-auto !p-6">
                {isLoading ? (
                    <div className="flex justify-center items-center !py-20 text-luna-teal">
                        <div className="animate-pulse flex flex-col items-center gap-3">
                            <div className="w-8 h-8 border-4 border-luna-teal border-t-transparent rounded-full animate-spin">
                            </div>
                            <p className="font-medium">
                                Carregando atividades...
                            </p>
                        </div>
                    </div>
                ) :
                    respostas.length > 0 && alunoAtual ? (
                        <>
                            <ControlePaginacao
                                avatarUrl={alunoAtual.avatarUrl}
                                nomeAluno={alunoAtual.nome}
                                paginaAtual={paginaAtual}
                                totalPaginas={totalPaginas}
                                onAnterior={irParaAnterior}
                                onProximo={irParaProximo}
                            />

                            <hr className="!mt-6 border-luna-teal" />
                            <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-12 !mt-6">
                                <div className="bg-white rounded-xl shadow-sm !p-6 border border-gray-100">
                                    <div className="flex justify-between items-center !mb-6">
                                        <h2 className="text-luna-teal font-semibold text-md tracking-wide uppercase">
                                            Resposta do Aluno
                                        </h2>
                                        <span className="text-luna-teal text-sm">
                                            {alunoAtual.totalQuestoes} questões
                                        </span>
                                    </div>

                                    <div className="flex flex-col gap-4">
                                        {questoesDaPagina.map((questao) => (
                                            <div
                                                key={questao._id}
                                                className={`flex gap-4 !p-4 rounded-xl border ${questao.correta
                                                    ? "bg-luna-teal/20 border-luna-teal"
                                                    : "bg-red-500/20 border-red-500"
                                                    }`}
                                            >
                                                <div className="shrink-0 mt-0.5">
                                                    {questao.correta ? (
                                                        <div className="w-7 h-7 rounded-full bg-luna-teal flex items-center justify-center text-white">
                                                            <Check size={18} strokeWidth={4} />
                                                        </div>
                                                    ) : (
                                                        <div className="w-7 h-7 rounded-full bg-red-500 flex items-center justify-center text-white">
                                                            <X size={18} strokeWidth={4} />
                                                        </div>
                                                    )}
                                                </div>
                                                <div className="flex flex-col gap-1">
                                                    <span className={`test-xs font-semibold ${questao.correta ? 'text-luna-teal' : 'text-red-500'}`}>
                                                        QUESTÃO {questao.numero}
                                                    </span>
                                                    <p className="text-gray-800 text-sm">
                                                        {questao.enunciado}
                                                    </p>
                                                    <p className={`test-xs font-semibold !mt-2 ${questao.correta ? 'text-luna-teal' : 'text-red-500'}`}>
                                                        RESPOSTA:
                                                        <span className="test-xs font-light !ml-1 !mt-2 text-gray-800">
                                                            {questao.respostaAluno}
                                                        </span>
                                                    </p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="flex flex-col gap-4">
                                    <div className="bg-white rounded-xl shadow-sm !p-6 border border-gray-100 flex flex-col h-full">
                                        <div className="flex justify-between items-center !mb-6">
                                            <span className="text-luna-teal font-semibold text-xl">
                                                {alunoAtual.acertos}/{alunoAtual.totalQuestoes}
                                            </span>
                                            <div className="bg-luna-teal/20 text-luna-teal text-xs font-semibold !px-3 !py-1 rounded-full border border-luna-teal">
                                                {alunoAtual.aproveitamento}% de aproveitamento
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-3 !mb-6">
                                            <div className="w-full bg-gray-200 rounded-full h-2.5 overflow-hidden">
                                                <div className={`h-full rounded-full ${DesempenhoBaixo ? "bg-red-500" : "bg-luna-teal"}`}
                                                    style={{ width: `${alunoAtual.aproveitamento}%` }}
                                                />

                                            </div>
                                            <span className={`font-sans font-medium w-10 shrink-0 ${DesempenhoBaixo ? "text-red-500" : "text-luna-teal"}`}>
                                                {alunoAtual.aproveitamento}%
                                            </span>
                                        </div>

                                        <div className="relative flex-1">
                                            <textarea
                                                value={comentarioTexto}
                                                onChange={(e) => setComentarioTexto(e.target.value)}
                                                placeholder="Adicione um comentário..."
                                                className="w-full h-full !p-4 border border-luna-teal rounded-xl resize-none focus:outline-none focus:border-luna-teal/20 focus:ring-1 focus:border-luna-teal/20 text-gray-700 text-sm placeholder-gray-400 placeholder:font-light"
                                            ></textarea>
                                            <div className="absolute bottom-3 right-3 text-luna-teal">
                                                <MessagesSquare size={20} />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex justify-end !mt-2">
                                        <button
                                            onClick={lidarComEnvioFeedback}
                                            disabled={!comentarioTexto.trim()}
                                            className="flex items-center gap-4 !px-6 !py-2.5 border-none rounded-lg bg-luna-teal font-sans text-md font-bold text-white cursor-pointer transition duration-300 ease hover:opacity-[0.9] disabled:opacity-50 disabled:cursor-not-allowed"
                                        >
                                            <Send size={18} />
                                            Enviar Feedback
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </>
                    ) : (
                        <div className="flex justify-center items-center h-40">
                            <p className="text-gray-500">
                                Nenhuma resposta encontrada para este aluno.
                            </p>
                        </div>
                    )}
            </div>
        </LayoutBaseProf>
    );
}
import { useState, useEffect } from "react";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import { Users, BookOpen, FileText, ChevronRight, CheckCircle2 } from "lucide-react";
import InfoHeaderProfessor from "../../components/professor/InfoHeaderProfessor";
import LayoutBaseProf from "../../components/professor/layout/LayoutBaseProf";
import AdicionaAlunos from "../../components/professor/AdicionaAlunos";
import Table from "../../components/escola/TableInformations";
import ConviteAluno from "../../components/professor/ConviteAluno";
import ListaAtividades from "../../components/professor/ListaAtividades";
import AtividadeEspecifica from "../../components/professor/AtividadeEspecifica";
import { api } from "../../services/api";

type SituacaoAluno = "Excelente" | "Atenção" | "Bom";

type Aluno = {
    _id: string;
    nome: string;
    avatarUrl: string;
    ra: string;
    urlFotoLaudo?: string;
    desempenho: number;
    situacao: SituacaoAluno;
};

export default function TurmaEspecifica() {

    const { id } = useParams();

    const [alunos, setAlunos] = useState<Aluno[]>([])
    const [modalAberto, setModalAberto] = useState(false)
    const [alunoSelecionado, setAlunoSelecionado] = useState<Aluno | null>(null)
    const navigate = useNavigate();
    const location = useLocation();
    const turma = location.state?.turma;
    const [abaAtiva, setAbaAtiva] = useState('alunos')
    const [atividadeSelecionada, setAtividadeSelecionada] = useState<any>(null);
    const [paginaAtual, setPaginaAtual] = useState(1);
    const itensPorPagina = 4;
    const [isLoading, setIsLoading] = useState(true)
    // utilizar o link original
    const linkDeConvite = "https://sua-plataforma.com/turma-3anoA-luna";

    // Cards normais da Turma
    const dadosCardsTurma = [
        { id: 1, icone: <Users size={24} />, valor: "10", label: "ALUNOS", alerta: false },
        { id: 2, icone: <BookOpen size={24} />, valor: "2", label: "PENDENTES", alerta: true },
        { id: 3, icone: <FileText size={24} />, valor: "3", label: "ATIVIDADES", alerta: false },
    ];

    // Cards quando entra na Atividade Específica (reaproveita a mesma estrutura de cards!)
    const dadosCardsAtividade = [
        { id: 1, icone: <CheckCircle2 size={24} />, valor: "5", label: "CORRIGIDAS", alerta: false },
        { id: 2, icone: <BookOpen size={24} />, valor: "2", label: "PENDENTES", alerta: true },
        { id: 3, icone: <Users size={24} />, valor: "10", label: "ENTREGUES", alerta: false },
    ];

    const dadosCards = abaAtiva === 'correcao' ? dadosCardsAtividade : dadosCardsTurma;

    useEffect(() => {
        const carregarAlunos = async () => {
            setIsLoading(true);
            try {
                if (id) {
                    const response = await api.getAlunosPorTurma(id) as { data: Aluno[] };
                    setAlunos(response.data);
                }
            } catch (error) {
                console.error("Erro ao carregar Alunos", error);
            } finally {
                setIsLoading(false)
            }
        };
        carregarAlunos();
    }, [id]);

    const columns = [
        {
            header: "Nome",
            accessor: "nome",
            render: (row: Aluno) => (
                <div className="flex items-center gap-3">
                    <img src={row.avatarUrl} alt="Foto do ALuno" className="h-10 w-10 rounded-full object-cover" />
                    <span className="font-sans font-medium">{row.nome}</span>
                </div>
            ),
        },
        {
            header: (
                <div className="flex justify-center items-center w-full">
                    RA
                </div>
            ),
            accessor: "ra",
            render: (row: Aluno) => (
                <div className="flex justify-center items-center w-full">
                    <span className="inline-block font-sans font-medium">
                        {row.ra}
                    </span>
                </div>
            ),
        },
        {
            header: (
                <div className="flex justify-center items-center w-full">
                    Laudo
                </div>
            ),
            accessor: "laudo",
            render: (row: Aluno) => (
                <div className="flex justify-center items-center w-full">
                    {row.urlFotoLaudo ? (
                        <a 
                            href={row.urlFotoLaudo} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 text-luna-teal hover:text-[#004347] transition-colors cursor-pointer text-sm font-sans font-medium decoration-transparent hover:underline"
                        >
                            <FileText size={18} />
                            Laudo
                        </a>
                    ) : (
                        <span className="text-gray-400 font-sans font-medium">-</span>
                    )}
                </div>
            ),
        },
        {
            header: (
                <div className="flex justify-center w-full">
                    Desempenho
                </div>
            ),
            accessor: "desempenho",
            render: (row: Aluno) => {

                const DesempenhoBaixo = row.desempenho < 50;

                return (
                    <div className="w-full flex justify-center items-center gap-4">
                        <div className="w-full bg-gray-200 rounded-full h-2.5 overflow-hidden">
                            <div className={`h-full rounded-full ${DesempenhoBaixo ? "bg-red-500" : "bg-luna-teal"}`}
                                style={{ width: `${row.desempenho}%` }}
                            />

                        </div>
                        <span className={`font-sans font-medium w-10 shrink-0 ${DesempenhoBaixo ? "text-red-500" : "text-luna-teal"}`}>
                            {row.desempenho}%
                        </span>
                    </div>
                )

            },
        },
        {
            header: (
                <div className="flex justify-center w-full">
                    Situação
                </div>
            ),
            accessor: "situacao",
            render: (row: Aluno) => (
                <div className={`w-full flex items-center justify-center font-sans font-semibold text-md rounded-lg border border-luna-teal !py-0.5 ${row.situacao == "Atenção" ? "text-red-500 bg-red-500/20 border-red-500" : "text-luna-teal bg-luna-teal/20 border-luna-teal"}`}>
                    {row.situacao}
                </div>
            ),
        },
        {
            header: "",
            accessor: "detalhes",
            render: (row: Aluno) => (
                <div className="flex justify-center">
                    <button
                        type="button"
                        onClick={() => {
                            alert(`Navegar para detalhes do aluno: ${row.nome} (ID: ${row._id})`);
                        }}
                        className="flex items-center justify-center w-8 h-8 rounded-full bg-luna-teal/15 text-luna-teal hover:bg-luna-teal/25 transition-colors cursor-pointer border-none"
                    >
                        <ChevronRight size={18} />
                    </button>
                </div>
            ),
        },

    ];

    const indiceUltimoItem = paginaAtual * itensPorPagina;
    const indicePrimeiroItem = indiceUltimoItem - itensPorPagina;

    const alunosPagina = alunos.slice(indicePrimeiroItem, indiceUltimoItem);
    const totalPaginas = Math.ceil(alunos.length / itensPorPagina);


    return (
        <LayoutBaseProf>
            <InfoHeaderProfessor />

            {/* CABEÇALHO E CARDS REAPROVEITADOS */}
            <div className="w-full flex justify-between !mt-4">
                <div className="flex flex-col gap-6 w-90">
                    <h2 className="m-0 font-sans font-bold text-4xl text-luna-teal">
                        {abaAtiva === 'correcao' 
                            ? (atividadeSelecionada?.nome || "Soma") 
                            : (turma?.nome || "Turma não encontrada")}
                    </h2>
                    <p className="m-0 font-sans font-light">
                        {abaAtiva === 'correcao' 
                            ? "Acompanhe e corrija a entrega dos alunos." 
                            : "Gerencie alunos, acompanhe atividades e desempenho."}
                    </p>
                </div>

                <div className="flex h-26 gap-12">
                    {dadosCards.map((card) => (
                        <div
                            key={card.id}
                            className={`relative flex items-center gap-4 bg-white rounded-md !px-6 w-54 shadow-md border overflow-hidden ${card.alerta ? "border-red-200" : "border-gray-200"
                                }`}
                        >
                            <div
                                className={`absolute left-0 top-0 bottom-0 w-1.5 ${card.alerta ? "bg-red-500" : "bg-luna-teal"
                                    }`}
                            />
                            <div
                                className={`flex items-center justify-center w-12 h-12 rounded-full shrink-0 ${card.alerta ? "bg-red-100 text-red-500" : "bg-luna-teal/15 text-luna-teal"
                                    }`}
                            >
                                {card.icone}
                            </div>

                            <div className="flex flex-col">
                                <span className={`text-2xl font-bold ${card.alerta ? "text-red-500" : "text-luna-teal"}`
                                }>
                                    {card.valor}
                                </span>
                                <span className={`text-xs font-regular tracking-wider ${card.alerta ? "text-red-400" : "text-luna-teal/70"}`
                                }>
                                    {card.label}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Esconde os botões de abas (Alunos/Atividades) quando estiver na tela de correção */}
            {abaAtiva !== 'correcao' && (
                <AdicionaAlunos
                    buttonLabel={abaAtiva === 'alunos' ? 'Adicionar Alunos' : 'Adicionar Atividade'}
                    onButtonClick={() => {
                        if (abaAtiva === 'alunos') {
                            setModalAberto(true)
                            setAlunoSelecionado(null)
                        } else {
                            console.log('Abrir Modal de atividade')
                        }
                    }}
                    abaAtiva={abaAtiva}
                    setAbaAtiva={setAbaAtiva}
                />
            )}

            <div className="w-full bg-transparent">
                {abaAtiva === 'alunos' && (
                    <div className="animate-in fade-in duration-500 flex flex-col h-full justify-between">

                        {isLoading ? (
                            <div className="flex justify-center items-center py-10 text-luna-teal font-sans font-medium">
                                Carregando alunos...
                            </div>
                        ) : (
                            <>
                                <Table columns={columns as any} data={alunosPagina} />

                                {totalPaginas > 1 && (
                                    <div className="flex items-center justify-center w-full !mt-6">
                                        <div className="flex items-center gap-2">

                                            <button
                                                onClick={() => setPaginaAtual(prev => Math.max(prev - 1, 1))}
                                                disabled={paginaAtual === 1}
                                                className="px-3 py-1 text-sm font-semibold text-luna-teal rounded-md cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                            >
                                                Anterior
                                            </button>

                                            {Array.from({ length: totalPaginas }).map((_, index) => (
                                                <button
                                                    key={index}
                                                    onClick={() => setPaginaAtual(index + 1)}
                                                    className={`w-8 h-8 flex items-center justify-center text-sm font-semibold rounded-md transition-colors ${paginaAtual === index + 1
                                                        ? "bg-luna-teal text-white"
                                                        : "text-gray-600 hover:bg-gray-100"
                                                        }`}
                                                >
                                                    {index + 1}
                                                </button>
                                            ))}

                                            <button
                                                onClick={() => setPaginaAtual(prev => Math.min(prev + 1, totalPaginas))}
                                                disabled={paginaAtual === totalPaginas}
                                                className="px-3 py-1 text-sm font-semibold text-luna-teal rounded-md cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                            >
                                                Próximo
                                            </button>
                                        </div>

                                    </div>
                                )}

                            </>
                        )}
                    </div>
                )}

                {abaAtiva === 'atividades' && (
                    <div className="animate-in fade-in duration-500">
                        <ListaAtividades 
                            onSelecionarAtividade={(ativ: any) => {
                                setAtividadeSelecionada(ativ);
                                setAbaAtiva('correcao');
                            }} 
                        />
                    </div>
                )}

                {abaAtiva === 'correcao' && (
                    <div className="animate-in fade-in duration-500">
                        <AtividadeEspecifica alunos={alunos.slice(0, 4)} />
                    </div>
                )}
                
            </div>

            <ConviteAluno
                isOpen={modalAberto}
                onClose={() => setModalAberto(false)}
                inviteLink={linkDeConvite}
            />

        </LayoutBaseProf>
    )
}
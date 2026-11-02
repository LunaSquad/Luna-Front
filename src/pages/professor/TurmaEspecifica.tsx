import { useState, useEffect } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { Users, BookOpen, FileText, ChevronRight, CheckCircle2 } from "lucide-react";
import InfoHeaderProfessor from "../../components/professor/InfoHeaderProfessor";
import LayoutBaseProf from "../../components/professor/layout/LayoutBaseProf";
import AdicionaAlunos from "../../components/professor/AdicionaAlunos";
import Table from "../../components/escola/TableInformations";
import ConviteAluno from "../../components/professor/ConviteAluno";
import ListaAtividades, {
    type PlanoDeAulaTurma
} from "../../components/professor/ListaAtividades";
import AtividadeEspecifica from "../../components/professor/AtividadeEspecifica";
import { http } from "../../services/api";

type SituacaoAluno = "Excelente" | "Atenção" | "Bom" | "Sem atividades";

type Aluno = {
    _id: string;
    nome: string;
    cpf: string;
    urlFotoAluno: string;
    urlFotoLaudo?: string;
    desempenho: number;
    situacao: SituacaoAluno;
};

type TurmaDetalhe = {
    _id: string;
    nome: string;
    codigoConvite: string;
    linkConvite: string;
    resumo: {
        totalAlunos: number;
        totalAtividades: number;
        pendentes: number;
    };
    alunos: Aluno[];
    atividades: PlanoDeAulaTurma[];
};

type StatusEntrega = "Entregue" | "Corrigido" | "Pendente";

interface AlunoAtividadePlano {
    _id: string;
    nome: string;
    cpf: string;
    urlFotoAluno: string | null;
    status: StatusEntrega;
    atividadeId: string | null;
}

interface AtividadesPlanoResponse {
    plano: {
        _id: string;
        titulo: string;
        descricao: string;
        materia: string;
        dataAula: string;
        dataFechamento: string;
    };
    resumo: {
        corrigidas: number;
        pendentes: number;
        total: number;
    };
    alunos: AlunoAtividadePlano[];
}

export default function TurmaEspecifica() {

    const { id } = useParams();

    const [turmaDetalhe, setTurmaDetalhe] = useState<TurmaDetalhe | null>(null);

    const alunos = turmaDetalhe?.alunos ?? [];

    const [modalAberto, setModalAberto] = useState(false);
    const [alunoSelecionado, setAlunoSelecionado] = useState<Aluno | null>(null);

    const [searchParams] = useSearchParams();

    const [abaAtiva, setAbaAtiva] = useState(
        searchParams.get("aba") === "atividades" ? "atividades" : "alunos"
    );

    const [atividadeSelecionada, setAtividadeSelecionada] = useState<any>(null);
    const [dadosAtividadePlano, setDadosAtividadePlano] = useState<AtividadesPlanoResponse | null>(null);
    const [carregandoAtividadePlano, setCarregandoAtividadePlano] = useState(false);
    const [erroAtividadePlano, setErroAtividadePlano] = useState("");

    const [paginaAtual, setPaginaAtual] = useState(1);
    const itensPorPagina = 4;
    const [isLoading, setIsLoading] = useState(true);

    const linkDeConvite = turmaDetalhe?.linkConvite ?? "";

    // Cards normais da Turma
    const dadosCardsTurma = [
        {
            id: 1,
            icone: <Users size={24} />,
            valor: String(turmaDetalhe?.resumo.totalAlunos ?? 0),
            label: "ALUNOS",
            alerta: false
        },
        {
            id: 2,
            icone: <BookOpen size={24} />,
            valor: String(turmaDetalhe?.resumo.pendentes ?? 0),
            label: "PENDENTES",
            alerta: true
        },
        {
            id: 3,
            icone: <FileText size={24} />,
            valor: String(turmaDetalhe?.resumo.totalAtividades ?? 0),
            label: "ATIVIDADES",
            alerta: false
        },
    ];

    // Cards quando entra na Atividade Específica (reaproveita a mesma estrutura de cards!)
    const dadosCardsAtividade = [
        {
            id: 1,
            icone: <CheckCircle2 size={24} />,
            valor: String(dadosAtividadePlano?.resumo.corrigidas ?? 0),
            label: "CORRIGIDAS",
            alerta: false
        },
        {
            id: 2,
            icone: <BookOpen size={24} />,
            valor: String(dadosAtividadePlano?.resumo.pendentes ?? 0),
            label: "PENDENTES",
            alerta: true
        },
        {
            id: 3,
            icone: <Users size={24} />,
            valor: String(dadosAtividadePlano?.resumo.total ?? 0),
            label: "ENTREGUES",
            alerta: false
        },
    ];

    const dadosCards = abaAtiva === 'correcao' ? dadosCardsAtividade : dadosCardsTurma;

    useEffect(() => {
        const carregarTurma = async () => {
            if (!id) {
                setIsLoading(false);
                return;
            }

            try {
                setIsLoading(true);

                const response = await http.get<TurmaDetalhe>(`/turmas/${id}`);

                setTurmaDetalhe(response.data);

            } catch (error) {
                console.error("Erro ao carregar turma:", error);
                setTurmaDetalhe(null);

            } finally {
                setIsLoading(false);
            }
        };

        carregarTurma();
    }, [id]);

    const selecionarPlano = async (plano: { _id: string; titulo: string }) => {
        setAtividadeSelecionada(plano);
        setDadosAtividadePlano(null);
        setErroAtividadePlano("");
        setCarregandoAtividadePlano(true);
        setAbaAtiva("correcao");

        try {
            const response = await http.get<AtividadesPlanoResponse>(
                `/atividades/plano/${plano._id}`
            );

            setDadosAtividadePlano(response.data);

        } catch (error) {
            console.error("Erro ao carregar atividades do plano:", error);
            setErroAtividadePlano(
                "Não foi possível carregar os alunos e suas atividades."
            );

        } finally {
            setCarregandoAtividadePlano(false);
        }
    };

    if (isLoading) {
        return (
            <div className="flex justify-center items-center !py-20 text-luna-teal">
                <div className="animate-pulse flex flex-col items-center gap-3">
                    <div className="w-8 h-8 border-4 border-luna-teal border-t-transparent rounded-full animate-spin">
                    </div>
                    <p className="font-medium">
                        {abaAtiva === "atividades" ? "Carregando as Atividades" : "Carregando os Alunos"}
                    </p>
                </div>
            </div>
        )
    }

    const columns = [
        {
            header: "Nome",
            accessor: "nome",
            render: (row: Aluno) => (
                <div className="flex items-center gap-3">
                    <img src={row.urlFotoAluno} alt="Foto do aluno" className="h-10 w-10 rounded-full object-cover" />
                    <span className="font-sans font-medium">{row.nome}</span>
                </div>
            ),
        },
        {
            header: (
                <div className="flex justify-center items-center w-full">
                    CPF
                </div>
            ),
            accessor: "ra",
            render: (row: Aluno) => (
                <div className="flex justify-center items-center w-full">
                    <span className="inline-block font-sans font-medium">
                        {row.cpf}
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
            <InfoHeaderProfessor
                textoVoltar="Voltar para Turmas"
                rotaVoltar={`/professores/turmas`}
            />

            {/* CABEÇALHO E CARDS REAPROVEITADOS */}
            <div className="w-full flex justify-between !mt-4">
                <div className="flex flex-col gap-6 w-90">
                    <h2 className="m-0 font-sans font-bold text-4xl text-luna-teal">
                        {abaAtiva === 'correcao'
                            ? (
                                dadosAtividadePlano?.plano.titulo ||
                                atividadeSelecionada?.titulo ||
                                "Atividade"
                            )
                            : (turmaDetalhe?.nome || "Turma não encontrada")}
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
                    totalAlunos={turmaDetalhe?.resumo.totalAlunos ?? 0}
                    totalAtividades={turmaDetalhe?.resumo.totalAtividades ?? 0}
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
                            planos={turmaDetalhe?.atividades ?? []}
                            onSelecionarAtividade={selecionarPlano}
                        />
                    </div>
                )}

                {abaAtiva === 'correcao' && atividadeSelecionada && (
                    <div className="animate-in fade-in duration-500">

                        {carregandoAtividadePlano ? (
                            <div className="flex justify-center items-center !py-20 text-luna-teal font-medium">
                                Carregando atividades dos alunos...
                            </div>
                        ) : erroAtividadePlano ? (
                            <div className="text-center text-red-500 !py-10">
                                {erroAtividadePlano}
                            </div>
                        ) : dadosAtividadePlano ? (
                            <AtividadeEspecifica
                                alunos={dadosAtividadePlano.alunos}
                                turmaId={id || ""}
                            />
                        ) : null}

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
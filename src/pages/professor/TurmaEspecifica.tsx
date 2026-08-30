import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Users, BookOpen, FileText, ChevronRight } from "lucide-react";
import InfoHeaderProfessor from "../../components/professor/InfoHeaderProfessor";
import LayoutBaseProf from "../../components/professor/layout/LayoutBaseProf";
import AdicionaAlunos from "../../components/professor/AdicionaAlunos";
import { Row } from "react-day-picker";
import Table from "../../components/escola/TableInformations";
import fotoMariaClara from "./imagensAlunos/maria-clara.jpg";

type SituacaoAluno = "Excelente" | "Atenção" | "Bom";

type Aluno = {
    _id: string;
    nome: string;
    avatarUrl: string;
    ra: string;
    desempenho: number;
    situacao: SituacaoAluno;
};


export default function TurmaEspecifica() {

    const [alunos, setAlunos] = useState<Aluno[]>([])
    const [modalAberto, setModalAberto] = useState(false)
    const [alunoSelecionado, setAlunoSelecionado] = useState<Aluno | null>(null)
    const navigate = useNavigate();
    const [abaAtiva, setAbaAtiva] = useState('alunos')
    const [paginaAtual, setPaginaAtual] = useState(1);
    const itensPorPagina = 4;

    const dadosCards = [
        { id: 1, icone: <Users size={24} />, valor: "10", label: "ALUNOS", alerta: false },
        { id: 2, icone: <BookOpen size={24} />, valor: "2", label: "PENDENTES", alerta: true },
        { id: 3, icone: <FileText size={24} />, valor: "3", label: "ATIVIDADES", alerta: false },
    ];

    const dadosAlunosMock: Aluno[] = [
        {
            _id: "1",
            nome: "Maria Clara",
            avatarUrl: fotoMariaClara,
            ra: "234585960",
            desempenho: 90,
            situacao: "Excelente",
        },
        {
            _id: "2",
            nome: "João Oliveira",
            avatarUrl: fotoMariaClara,
            ra: "289487567",
            desempenho: 40,
            situacao: "Atenção",
        },
        {
            _id: "3",
            nome: "Carol Silva",
            avatarUrl: fotoMariaClara,
            ra: "298574890",
            desempenho: 50,
            situacao: "Bom",
        },
        {
            _id: "4",
            nome: "Sofia Santos",
            avatarUrl: fotoMariaClara,
            ra: "285948678",
            desempenho: 70,
            situacao: "Bom",
        },
        {
            _id: "5",
            nome: "Fernando Silva",
            avatarUrl: fotoMariaClara,
            ra: "258741748",
            desempenho: 98,
            situacao: "Excelente",
        },
    ];


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
            header: "RA",
            accessor: "ra",
            render: (row: Aluno) => (
                <span className="inline-block font-sans font-medium">
                    {row.ra}
                </span>
            ),
        },
        {
            header: "Desempenho",
            accessor: "desempenho",
            render: (row: Aluno) => {

                const DesempenhoBaixo = row.desempenho < 50;

                return (
                    <div className="w-full flex justify-between items-center gap-4">
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
            header: "Situação",
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
                            // navigate(`/alunos/${row._id}`);
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

    const alunosPagina = dadosAlunosMock.slice(indicePrimeiroItem, indiceUltimoItem);
    const totalPaginas = Math.ceil(dadosAlunosMock.length / itensPorPagina);


    return (
        <LayoutBaseProf>
            <InfoHeaderProfessor />

            <div className="w-full flex justify-between !mt-4">
                <div className="flex flex-col gap-6 w-90">
                    <h2 className="m-0 font-sans font-bold text-4xl text-luna-teal">3º ano A</h2>
                    <p className="m-0 font-sans font-light">Gerencie alunos, acompanhe atividades e desempenho.</p>
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

            <AdicionaAlunos
                buttonLabel="Adicionar Alunos"
                onButtonClick={() => {
                    setModalAberto(true)
                }}
                abaAtiva={abaAtiva}
                setAbaAtiva={setAbaAtiva}
            />

            <div className="w-full bg-transparent">
                {abaAtiva === 'alunos' && (
                    <div className="animate-in fade-in duration-500 flex flex-col h-full justify-between">

                        <Table columns={columns} data={alunosPagina} />

                        {totalPaginas > 1 && (
                            <div className="flex items-center justify-center w-full !mt-6">
                                <div className="flex items-center gap-2">

                                    <button
                                        onClick={() => setPaginaAtual(prev => Math.max(prev - 1, 1))}
                                        disabled={paginaAtual === 1}
                                        className="px-3 py-1 text-sm font-semibold text-luna-teal rounded-md disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
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
                                        className="px-3 py-1 text-sm font-semibold text-luna-teal bg-luna-teal/10 rounded-md disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                    >
                                        Próximo
                                    </button>
                                </div>

                            </div>
                        )}

                    </div>
                )}

                {abaAtiva === 'atividades' && (
                    <div className="animate-in fade-in duration-500">
                        <h3 className="text-lg font-bold text-luna-teal">Atividades Pendentes</h3>
                        <p className="text-gray-500 mt-2">Aqui vai aparecer a lista das 3 atividades...</p>
                    </div>
                )}
            </div>


        </LayoutBaseProf>
    )
}
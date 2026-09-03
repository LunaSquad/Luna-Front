import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Users, Trash2, Pencil, ChevronRight } from "lucide-react";
import InfoHeader from "../../components/escola/InfoHeader";
import LayoutBaseProf from "../../components/professor/layout/LayoutBaseProf";
import SearchActionBar from "../../components/escola/SearchActionBar";
import Table from "../../components/escola/TableInformations";

interface TurmaItem {
  id: number;
  nome: string;
  alunos: number;
  pendentes: number | null;
  progresso: number;
}

const turmasMock: TurmaItem[] = [
  { id: 1, nome: "3º ano A", alunos: 10, pendentes: 3, progresso: 70 },
  { id: 2, nome: "2º ano B", alunos: 9, pendentes: null, progresso: 90 },
  { id: 3, nome: "3º ano C", alunos: 12, pendentes: 6, progresso: 50 },
  { id: 4, nome: "1º ano A", alunos: 11, pendentes: 1, progresso: 77 },
  { id: 5, nome: "1º ano B", alunos: 7, pendentes: 2, progresso: 68 },
  { id: 6, nome: "2º ano C", alunos: 8, pendentes: null, progresso: 98 },
];

export default function CadastroTurmas() {
  const navigate = useNavigate();
  const [busca, setBusca] = useState("");
  const [turmas, setTurmas] = useState<TurmaItem[]>(turmasMock);

  const turmasFiltradas = turmas.filter((t) =>
    t.nome.toLowerCase().includes(busca.toLowerCase())
  );

  const columns = [
    {
      header: (
        <div className="flex items-center text-left font-sans font-semibold text-base text-[#005B60] pl-3">
          Turma
        </div>
      ),
      accessor: "nome",
      render: (row: TurmaItem) => (
        <div className="flex items-center gap-4 py-2 pl-3">
          <div className="w-10 h-10 rounded-full bg-[#FFD8C9] flex items-center justify-center text-[#005B60] shrink-0">
            <Users size={20} />
          </div>
          <span className="font-sans font-medium text-base text-neutral-800">
            {row.nome}
          </span>
        </div>
      ),
    },
    {
      header: (
        <div className="flex justify-center items-center w-full font-sans font-semibold text-base text-[#005B60]">
          Alunos
        </div>
      ),
      accessor: "alunos",
      render: (row: TurmaItem) => (
        <div className="flex justify-center items-center w-full py-2">
          <span className="inline-flex items-center justify-center min-w-[50px] h-7 px-2.5 rounded-full font-sans font-medium text-sm bg-[#FFF9F6] border border-[#FAD9CC] text-neutral-800">
            {row.alunos}
          </span>
        </div>
      ),
    },
    {
      header: (
        <div className="flex justify-center items-center w-full font-sans font-semibold text-base text-[#005B60]">
          Pendentes
        </div>
      ),
      accessor: "pendentes",
      render: (row: TurmaItem) => (
        <div className="flex justify-center items-center w-full py-2">
          {row.pendentes !== null && row.pendentes > 0 ? (
            <span className="inline-flex items-center justify-center min-w-[50px] h-7 px-2.5 rounded-full font-sans font-semibold text-sm bg-[#FFD7D7] text-[#E05353]">
              {row.pendentes}
            </span>
          ) : (
            <span className="inline-flex items-center justify-center min-w-[50px] h-7 px-2.5 rounded-full font-sans font-bold text-sm bg-[#D2EAEF] text-[#005B60]">
              -
            </span>
          )}
        </div>
      ),
    },
    {
      header: (
        <div className="flex justify-center items-center w-full font-sans font-semibold text-base text-[#005B60]">
          Progresso
        </div>
      ),
      accessor: "progresso",
      render: (row: TurmaItem) => (
        <div className="flex items-center justify-center gap-3 w-full py-2">
          <div className="w-36 bg-[#ECEFF1] rounded-full h-2.5 overflow-hidden">
            <div
              className="bg-[#005B60] h-2.5 rounded-full transition-all duration-300"
              style={{ width: `${row.progresso}%` }}
            />
          </div>
          <span className="font-sans font-bold text-sm text-[#005B60] w-10 shrink-0 text-left">
            {row.progresso}%
          </span>
        </div>
      ),
    },
    {
      header: (
        <div className="flex justify-center items-center w-full font-sans font-semibold text-base text-[#005B60]">
          Ações
        </div>
      ),
      accessor: "acoes",
      render: (row: TurmaItem) => (
        <div className="flex items-center justify-center gap-4 w-full py-2">
          <button
            type="button"
            onClick={() => alert(`Excluir ${row.nome}`)}
            className="text-[#005B60] hover:text-[#004347] hover:scale-110 transition-all cursor-pointer border-none bg-transparent p-1"
            title="Excluir turma"
          >
            <Trash2 size={20} />
          </button>

          <button
            type="button"
            onClick={() => alert(`Editar ${row.nome}`)}
            className="text-[#005B60] hover:text-[#004347] hover:scale-110 transition-all cursor-pointer border-none bg-transparent p-1"
            title="Editar turma"
          >
            <Pencil size={20} />
          </button>
        </div>
      ),
    },
    {
      header: "",
      accessor: "detalhes",
      render: (row: TurmaItem) => (
        <div className="flex justify-center items-center w-full py-2 pr-4">
          <button
            type="button"
            onClick={() => navigate(`/professor/turmas/${row.id}`)}
            className="w-7 h-7 rounded-full bg-[#D2EAEF] hover:bg-[#c2e4ea] text-[#005B60] flex items-center justify-center transition-colors cursor-pointer border-none"
            title="Ver turma"
          >
            <ChevronRight size={16} />
          </button>
        </div>
      ),
    },
  ];

  return (
    <LayoutBaseProf>
      <InfoHeader
        icon={<Users size={26} />}
        title="Turmas"
        subtitle="Acompanhe suas turmas, alunos e atividades pendentes de correção"
      />

      <SearchActionBar
        searchValue={busca}
        onSearchChange={setBusca}
        searchPlaceholder="Buscar"
        buttonLabel="Nova turma"
        onButtonClick={() => alert("Abrir modal de cadastro de turma")}
      />

      <div className="w-full mt-4">
        <Table columns={columns as any} data={turmasFiltradas as any} />
      </div>
    </LayoutBaseProf>
  );
}
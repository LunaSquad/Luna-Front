import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Users, Trash2, Pencil, ChevronRight, ThumbsUp, ThumbsDown } from "lucide-react";
import InfoHeader from "../../components/escola/InfoHeader";
import LayoutBaseProf from "../../components/professor/layout/LayoutBaseProf";
import SearchActionBar from "../../components/escola/SearchActionBar";
import Table from "../../components/escola/TableInformations";
import { api } from "../../services/api";
import ModalTurma from "../modals/ModalTurmas";
import Input from "../../components/escola/input";
import ModalDelete from "../modals/ModalDelete";
import EditarTurma from "../../components/professor/EditarTurma";

interface Turma {
  _id: string;
  nome: string;
  professorId?: {
    _id: string;
    nome: string;
    sobrenome: string;
  };
  qtdAlunos: number;
  pendentes: number | null;
  progresso: number;
}

export default function CadastroTurmas() {
  const navigate = useNavigate();
  const [busca, setBusca] = useState("");
  const [turmas, setTurmas] = useState<Turma[]>([]);
  const [nomeTurma, setNomeTurma] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [modalAberto, setModalAberto] = useState(false);
  const [modalDeleteOpen, setModalDeleteOpen] = useState(false);
  const [modalEditarOpen, setModalEditarOpen] = useState(false);
  const [turmaSelecionada, setTurmaSelecionada] = useState<Turma | null>(null);

  const [paginaAtual, setPaginaAtual] = useState(1);
  const itensPorPagina = 4;

  const linkDeConvite = "https://sua-plataforma.com/turma-3anoA-luna";

  const turmasFiltradas = turmas.filter((t) =>
    t.nome.toLowerCase().includes(busca.toLowerCase()) ||
    (t.professorId?.nome || "").toLowerCase().includes(busca.toLocaleUpperCase())
  );

  const totalPaginas = Math.ceil(turmasFiltradas.length / itensPorPagina);
  const indiceUltimoItem = paginaAtual * itensPorPagina;
  const indicePrimeiroItem = indiceUltimoItem - itensPorPagina;
  const turmasPagina = turmasFiltradas.slice(indicePrimeiroItem, indiceUltimoItem);

  const carregarTurmas = async () => {
    try {
      setIsLoading(true);
      const response = await api.getTurmas() as { data: Turma[] };
      setTurmas(response.data);
    } catch (error) {
      console.error("Erro ao carregar Turmas", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    carregarTurmas();
  }, []);


  if (isLoading) {
    return (
      <div className="flex justify-center items-center !py-20 text-luna-teal">
        <div className="animate-pulse flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-4 border-luna-teal border-t-transparent rounded-full animate-spin">
          </div>
          <p className="font-medium">
            Carregando Turmas...
          </p>
        </div>
      </div>
    )
  }

  const criarTurma = () => {
    const nome = nomeTurma.trim();

    if (!nome) {
      alert("Digite o nome da turma!");
      return;
    }

    // Cria um objeto no mesmo formato das turmas existentes
    const novaTurma: Turma = {
      _id: crypto.randomUUID(),
      nome: nome,
      qtdAlunos: 0,
      pendentes: 0,
      progresso: 0,
    };

    // Adiciona a nova turma à lista
    setTurmas((turmasAtuais) => [...turmasAtuais, novaTurma]);

    // Limpa o campo e fecha o modal
    setNomeTurma("");
    setModalAberto(false);

    // Volta à primeira página para facilitar a visualização
    setPaginaAtual(1);
    setBusca("");

    alert("Turma criada com sucesso!");
  };

  async function handleDeletar() {
    if (!turmaSelecionada) return;

    setTurmas((prev) => prev.filter((t) => t._id !== turmaSelecionada._id));
    setModalDeleteOpen(false);

    try {
      await api.deleteTurma(turmaSelecionada._id);
    } catch (error) {
      console.error("Erro ao deletar a turma:", error);
    }
  }

  const salvarEdicaoTurma = (id: string, novoNome: string) => {
    setTurmas((turmasAtuais) =>
      turmasAtuais.map((turma) =>
        turma._id === id
          ? { ...turma, nome: novoNome }
          : turma
      )
    );
  };

  const columns = [
    {
      header: (
        <div className="flex items-center text-left font-sans font-semibold text-base text-[#005B60] pl-3">
          Turma
        </div>
      ),
      accessor: "nome",
      render: (row: Turma) => (
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
      render: (row: Turma) => (
        <div className="flex justify-center items-center w-full py-2">
          <span className="inline-flex items-center justify-center min-w-[50px] h-7 px-2.5 rounded-xl font-sans font-medium text-sm bg-[#FFF9F6] border border-[#FAD9CC] text-neutral-800">
            {row.qtdAlunos}
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
      render: (row: Turma) => (
        <div className="flex justify-center items-center w-full py-2">
          {row.pendentes !== null && row.pendentes > 0 ? (
            <span className="inline-flex items-center justify-center min-w-[50px] h-7 px-2.5 rounded-xl font-sans font-semibold text-sm bg-[#FFD7D7] text-[#E05353]">
              {row.pendentes}
            </span>
          ) : (
            <span className="inline-flex items-center justify-center min-w-[50px] h-7 px-2.5 rounded-xl font-sans font-bold text-sm bg-[#D2EAEF] text-[#005B60]">
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
      render: (row: Turma) => (
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
      render: (row: Turma) => (
        <div className="flex items-center justify-center gap-4 w-full !py-2">
          <button
            type="button"
            onClick={() => {
              setTurmaSelecionada(row)
              setModalDeleteOpen(true)
            }}
            className="text-[#005B60] !p-1.5 rounded-md hover:text-[#E05353] hover:bg-luna-icon-bg-ex transition-all cursor-pointer border-none bg-transparent"
            title="Excluir turma"
          >
            <Trash2 size={20} />
          </button>

          <button
            type="button"
            onClick={() => {
              setTurmaSelecionada(row)
              setModalEditarOpen(true)
            }}
            className="text-[#005B60] !p-1.5 rounded-md hover:bg-luna-icon-bg2 transition-all cursor-pointer border-none bg-transparent"
            title="Editar turma"
          >
            <Pencil size={20} />
          </button>
        </div >
      ),
    },
    {
      header: "",
      accessor: "detalhes",
      render: (row: Turma) => (
        <div className="flex justify-center items-center w-full py-2 pr-4">
          <button
            type="button"
            onClick={() => navigate(`/professores/turmaEspecifica/${row._id}`, { state: { turma: row } })}
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
        onSearchChange={(val) => {
          setBusca(val);
          setPaginaAtual(1);
        }}
        searchPlaceholder="Buscar"
        buttonLabel="Nova turma"
        onButtonClick={() => {
          setTurmaSelecionada(null)
          setModalAberto(true)
        }}
      />

      <div className="w-full mt-4">
        {isLoading ? (
          <div className="flex justify-center items-center !py-10 text-luna-teal font-sans font-medium">
            Carregando Turmas
          </div>
        ) : (
          <>
            <Table columns={columns as any} data={turmasPagina as any} />

            {totalPaginas > 1 && (
              <div className="flex items-center justify-center w-full !mt-6">
                <div className="flex items-center gap-3 text-sm font-medium">
                  <button
                    type="button"
                    onClick={() => setPaginaAtual((prev) => Math.max(prev - 1, 1))}
                    disabled={paginaAtual === 1}
                    className="cursor-pointer text-[#005B60] hover:underline disabled:text-gray-400 disabled:no-underline disabled:cursor-not-allowed transition-colors font-semibold"
                  >
                    Anterior
                  </button>

                  {Array.from({ length: totalPaginas }).map((_, index) => {
                    const numeroPagina = index + 1;
                    const estaAtiva = paginaAtual === numeroPagina;

                    return (
                      <button
                        key={numeroPagina}
                        type="button"
                        onClick={() => setPaginaAtual(numeroPagina)}
                        className={`w-7 h-7 flex items-center justify-center rounded cursor-pointer transition-colors ${estaAtiva
                          ? "bg-[#005B60] text-white font-semibold"
                          : "text-gray-700 hover:text-[#005B60] font-medium"
                          }`}
                      >
                        {numeroPagina}
                      </button>
                    );
                  })}

                  <button
                    type="button"
                    onClick={() => setPaginaAtual((prev) => Math.min(prev + 1, totalPaginas))}
                    disabled={paginaAtual === totalPaginas}
                    className="cursor-pointer text-[#005B60] hover:underline disabled:text-gray-400 disabled:no-underline disabled:cursor-not-allowed transition-colors font-semibold"
                  >
                    Próximo
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </div>

      <ModalTurma
        isOpen={modalAberto}
        onClose={() => setModalAberto(false)}
      >
        <div className="flex items-start gap-6 w-full sm:min-w-[600px]">
          <div className="flex shrink-0 justify-center items-center rounded-full w-13 h-13 bg-luna-icon-bg text-luna-teal">
            <Users size={24} />
          </div>

          <div className="flex flex-col flex-1 min-w-0 !pt-16 !pr-8">

            <div className="relative flex flex-col gap-2 w-full font-sans font-bold text-lg text-luna-teal">
              <Input
                id="turma"
                label="Turma"
                type={"text"}
                placeholder="Nome da Turma"
                value={nomeTurma}
                onChange={(e) => setNomeTurma(e.target.value)}
              />
              <Users size={18} className="absolute right-0 bottom-2 pointer-events-none" />
            </div>
            <div className="flex justify-start gap-6 !mt-8 h-10">
              <button
                className="flex items-center justify-center w-full !px-6 rounded-lg font-sans text-md font-semibold text-luna-teal border border-luna-teal cursor-pointer bg-white transition duration-300 ease hover:bg-gray-50"
                type="button"
                onClick={() => {
                  setNomeTurma("")
                  setModalAberto(false)
                }}>
                Cancelar
              </button>
              <button
                className="flex items-center justify-center w-full !px-8 border-none rounded-lg bg-luna-teal font-sans text-md font-semibold text-white cursor-pointer transition duration-300 ease hover:opacity-90"
                type="button"
                onClick={criarTurma}
              >
                Criar
              </button>
            </div>
          </div>
        </div>
      </ModalTurma>

      <ModalDelete
        isOpen={modalDeleteOpen}
        onClose={() => setModalDeleteOpen(false)}
        icon={<Users size={30} />}
        title={`Deseja excluir a turma ${turmaSelecionada?.nome}?`}
        decision1={<ThumbsUp size={22} />}
        decision2={<ThumbsDown size={22} />}
        onConfirm={handleDeletar}
      />

      <EditarTurma
        isOpen={modalEditarOpen}
        onClose={() => setModalEditarOpen(false)}
        turma={turmaSelecionada}
        inviteLink={linkDeConvite}
        onSalvar={salvarEdicaoTurma}
      />

    </LayoutBaseProf>
  );
}
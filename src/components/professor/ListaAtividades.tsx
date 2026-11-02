import { Calendar, ChevronRight } from "lucide-react";
import { useState } from "react";

export interface PlanoDeAulaTurma {
  _id: string;
  materiaId: {
    _id: string;
    nome: string;
  } | null;
  tipoConteudo: "manual" | "anexo";
  titulo: string | null;
  descricao: string | null;
  dataAula: string;
  dataFechamento: string;
  urlPlanoDeAula: string | null;
  statusTurma: "concluida" | "pendente";
}

interface Atividade {
  _id: string;
  materia: string;
  sigla: string;
  titulo: string;
  descricao: string;
  data: string;
  statusTurma: "concluida" | "pendente";
  urlPlanoDeAula: string | null;
}

interface ListaAtividadesProps {
  planos: PlanoDeAulaTurma[];
  onSelecionarAtividade?: (atividade: Atividade) => void;
}

const configMaterias: Record<string, { main: string, bg: string, badgeBg?: string }> = {
  LP: { main: "#005B52", bg: "#E6F4F2" },
  MAT: { main: "#001A72", bg: "#E8EDFB" },
  GEO: { main: "#7A2E12", bg: "#FCEFEA" },
  HIS: { main: "#4A2619", bg: "#F5E6E1", badgeBg: "#E4A795" },
  CIE: { main: "#064E1D", bg: "#E6F5EA", badgeBg: "#A7E2B5" },
};

function obterSiglaMateria(nome: string): string {
  const normalizado = nome
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();

  const siglas: Record<string, string> = {
    "lingua portuguesa": "LP",
    "portugues": "LP",
    "matematica": "MAT",
    "geografia": "GEO",
    "historia": "HIS",
    "ciencias": "CIE",
  };

  if (siglas[normalizado]) {
    return siglas[normalizado];
  }

  return (
    nome
      .split(/\s+/)
      .filter(Boolean)
      .map((palavra) => palavra[0])
      .join("")
      .slice(0, 3)
      .toUpperCase() || "OUT"
  );
}

function formatarData(data: string): string {
  const dataConvertida = new Date(data);

  if (Number.isNaN(dataConvertida.getTime())) {
    return "-";
  }

  return dataConvertida.toLocaleDateString("pt-BR", {
    timeZone: "UTC",
  });
}

function ListaAtividades({
  planos,
  onSelecionarAtividade
}: ListaAtividadesProps) {

  const [filtroAtivo, setFiltroAtivo] = useState<string>("Todos");

  const atividades: Atividade[] = planos.map((plano) => {
    const materia = plano.materiaId?.nome ?? "Matéria não identificada";

    return {
      _id: plano._id,
      materia,
      sigla: obterSiglaMateria(materia),
      titulo: plano.titulo || "Plano de aula",
      descricao:
        plano.descricao ||
        (plano.tipoConteudo === "anexo"
          ? "Arquivo anexado"
          : "Sem descrição"),
      data: formatarData(plano.dataAula),
      statusTurma: plano.statusTurma,
      urlPlanoDeAula: plano.urlPlanoDeAula,
    };
  });

  const siglasDisponiveis: string[] = Array.from(
    new Set([
      ...Object.keys(configMaterias),
      ...atividades.map((atividade) => atividade.sigla),
    ])
  );

  const atividadesFiltradas = filtroAtivo === "Todos"
    ? atividades
    : atividades.filter((ativ) => ativ.sigla === filtroAtivo);

  const contagemPorMateria = atividades.reduce(
    (acc, ativ) => {
      acc[ativ.sigla] = (acc[ativ.sigla] || 0) + 1;
      return acc;
    },
    {} as Record<string, number>
  );




  return (
    <div className="flex flex-col w-full">
      {/* Barra de Filtros */}
      <div className="flex items-center gap-[25px] flex-wrap !mb-7">
        <button
          type="button"
          onClick={() => setFiltroAtivo("Todos")}
          className={`h-10 w-20 text-[15px] rounded-lg border border-[#005B52] font-bold shadow-xs transition-colors cursor-pointer ${filtroAtivo === "Todos"
            ? "bg-luna-teal text-white"
            : "bg-white text-luna-teal hover:bg-teal-50/50"
            }`}
        >
          Todos
        </button>

        {siglasDisponiveis.map((sigla) => {
          const cores = configMaterias[sigla] ?? configMaterias.LP;
          const quantidade = contagemPorMateria[sigla] || 0;
          const isAtivo = filtroAtivo === sigla;

          return (
            <button
              key={sigla}
              type="button"
              onClick={() => setFiltroAtivo(sigla)}
              style={{ backgroundColor: cores.main, opacity: isAtivo || filtroAtivo === "Todos" ? 1 : 0.6 }}
              className="relative h-10 w-20 rounded-lg text-white text-sm font-bold flex items-center justify-center shadow-xs cursor-pointer transition-opacity"
            >
              <span className="!mr-5">
                {sigla}
              </span>
              <span
                style={{
                  backgroundColor: cores.badgeBg || "white",
                  color: cores.badgeBg ? cores.main : cores.main
                }}
                className="absolute right-3 w-5 h-5 rounded-full flex items-center justify-center text-xs font-black shrink-0"
              >
                {quantidade > 0 ? quantidade : "-"}
              </span>
            </button>
          )
        })}
      </div>

      {/* lista de cards de atividades */}

      <div className="flex flex-col gap-6 w-full">
        {atividadesFiltradas.length === 0 ? (
          <div className="bg-gray-50 rounded-xl !p-8 text-center text-gray-500 border border-gray-200">
            Nenhuma Atividade Encontrada para esta matéria no momento.
          </div>
        ) : (
          atividadesFiltradas.map((atividade) => {
            const cores = configMaterias[atividade.sigla] || configMaterias.LP;

            return (
              <div
                key={atividade._id}
                className="relative w-full bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow flex items-center justify-between min-h-[96px] overflow-hidden !pr-8 pl-10 py-5"
              >
                <div
                  className="absolute left-0 top-0 bottom-0 w-1.5 rounded-l-xl"
                  style={{ backgroundColor: cores.main }}
                />

                <div className="flex items-center gap-7">
                  <div
                    className="!ml-6 w-[52px] h-[52px] rounded-xl flex items-center justify-center font-bold text-sm shrink-0"
                    style={{ backgroundColor: cores.bg, color: cores.main }}
                  >
                    {atividade.sigla}
                  </div>

                  <div className="flex flex-col gap-1">
                    <h4
                      className="font-bold text-base tracking-tight"
                      style={{ color: cores.main }}
                    >
                      {atividade.titulo}
                    </h4>
                    <p className="text-gray-500 text-sm">
                      {atividade.descricao}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-9 shrink-0">
                  <div className="flex items-center gap-2.5 text-gray-600 text-sm font-medium">
                    <Calendar size={18} className="text-[#005B52]" />
                    <span>{atividade.data}</span>
                  </div>

                  <button
                    type="button"
                    onClick={() => onSelecionarAtividade?.(atividade)}
                    className="!mr-5 w-8 h-8 rounded-full bg-[#D4ECE9] flex items-center justify-center text-[#005B52] hover:bg-luna-teal/25 transition-colors cursor-pointer"
                  >
                    <ChevronRight size={18} />
                  </button>
                </div>
              </div>
            );

          })
        )}
      </div>

    </div>
  )
}

export default ListaAtividades
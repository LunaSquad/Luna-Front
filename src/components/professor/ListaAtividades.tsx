import { Calendar, ChevronRight } from "lucide-react"
import { useState, useEffect } from "react";
import { api } from "../../services/api";

interface Atividade {
  _id: string;
  materia: string;
  sigla: string;
  titulo: string;
  descricao: string;
  data: string;
}

interface ListaAtividadesProps {
  onSelecionarAtividade?: (atividade: Atividade) => void;
}

const configMaterias: Record<string, { main: string, bg: string, badgeBg?: string }> = {
  LP: { main: "#005B52", bg: "#E6F4F2" },
  MAT: { main: "#001A72", bg: "#E8EDFB" },
  GEO: { main: "#7A2E12", bg: "#FCEFEA" },
  HIS: { main: "#4A2619", bg: "#F5E6E1", badgeBg: "#E4A795" },
  CIE: { main: "#064E1D", bg: "#E6F5EA", badgeBg: "#A7E2B5" },
};

function ListaAtividades({ onSelecionarAtividade }: ListaAtividadesProps) {

  const [atividades, setAtividades] = useState<Atividade[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [filtroAtivo, setFiltroAtivo] = useState<string>("Todos");

  useEffect(() => {
    const buscarDados = async () => {
      try {
        setCarregando(true);
        const response = await api.getAtividades();
        setAtividades(response.data);
      } catch (erro) {
        console.error("Erro ao carregar atividades:", erro);
      } finally {
        setCarregando(false);
      }
    };

    buscarDados();
  }, []);

  const atividadesFiltradas = filtroAtivo === "Todos"
    ? atividades
    : atividades.filter(ativ => ativ.sigla === filtroAtivo)

  const contagemPorMateria = atividades.reduce((acc, ativ) => {
    acc[ativ.sigla] = (acc[ativ.sigla] || 0) + 1
    return acc;
  }, {} as Record<string, number>);

  if (carregando) {
    return (
      <div className="flex justify-center items-center !py-20 text-luna-teal">
        <div className="animate-pulse flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-4 border-luna-teal border-t-transparent rounded-full animate-spin">
          </div>
          <p className="font-medium">
            Carregando atividades...
          </p>
        </div>
      </div>
    )
  }



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

        {Object.entries(configMaterias).map(([sigla, cores]) => {
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
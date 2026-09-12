import { Calendar, ChevronRight } from "lucide-react"

function ListaAtividades() {
  return (
    <div className="flex flex-col w-full">
      {/* Barra de Filtros (Todas as Matérias) */}
      <div className="flex items-center gap-[25px] flex-wrap !mb-7">
        <button
          type="button"
          className="h-10 w-20 px-5 text-[15px] rounded-lg border border-[#005B52] bg-white text-[#005B52] font-bold shadow-xs hover:bg-teal-50/50 transition-colors cursor-pointer"
        >
          Todos
        </button>

        <button
          type="button"
          className="relative h-10 w-20 rounded-lg bg-[#005B52] text-white text-sm font-bold flex items-center justify-center shadow-xs cursor-pointer"
        >
          <span className="!mr-5">LP</span>
          <span className="absolute right-3 bg-white text-[#005B52] w-5 h-5 rounded-full flex items-center justify-center text-xs font-black shrink-0">
            1
          </span>
        </button>

        <button
          type="button"
          className="relative h-10 w-20 rounded-lg bg-[#001A72] text-white text-sm font-bold flex items-center justify-center shadow-xs cursor-pointer"
        >
          <span className="!mr-5">MAT</span>
          <span className="absolute right-3 bg-white text-[#001A72] w-5 h-5 rounded-full flex items-center justify-center text-xs font-black">
            1
          </span>
        </button>

        <button
          type="button"
          className="relative h-10 w-20 rounded-lg bg-[#7A2E12] text-white text-sm font-bold flex items-center justify-center shadow-xs cursor-pointer"
        >
          <span className="!mr-5">GEO</span>
          <span className="absolute right-3 bg-white text-[#7A2E12] w-5 h-5 rounded-full flex items-center justify-center text-xs font-black">
            1
          </span>
        </button>

        <button
          type="button"
          className="relative h-10 w-20 rounded-lg bg-[#4A2619] text-white text-sm font-bold flex items-center justify-center shadow-xs cursor-pointer"
        >
          <span className="!mr-5">HIS</span>
          <span className="absolute right-3 bg-[#E4A795] text-[#4A2619] w-5 h-5 rounded-full flex items-center justify-center text-xs font-black">
            -
          </span>
        </button>

        <button
          type="button"
          className="relative h-10 w-20 rounded-lg bg-[#064E1D] text-white text-sm font-bold flex items-center justify-center shadow-xs cursor-pointer"
        >
          <span className="!mr-5">CIE</span>
          <span className="absolute right-3 bg-[#A7E2B5] text-[#064E1D] w-5 h-5 rounded-full flex items-center justify-center text-xs font-black">
            -
          </span>
        </button>
      </div>

      {/* Lista de Cards de Atividades */}
      <div className="flex flex-col gap-6 w-full">
        {/* Card LP */}
        <div className="relative w-full bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow flex items-center justify-between min-h-[96px] overflow-hidden pr-8 pl-10 py-5">
          <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-[#005B52] rounded-l-xl" />

          <div className="flex items-center gap-7">
            <div className="!ml-6 w-[52px] h-[52px] rounded-xl bg-[#E6F4F2] text-[#005B52] flex items-center justify-center font-bold text-sm shrink-0">
              LP
            </div>

            <div className="flex flex-col gap-1">
              <h4 className="font-bold text-base text-[#005B52] tracking-tight">
                Separação silábica
              </h4>
              <p className="text-gray-500 text-sm">
                Separas as palavras de acordo com suas sílabas
              </p>
            </div>
          </div>

          <div className="flex items-center gap-9 shrink-0">
            <div className="flex items-center gap-2.5 text-gray-600 text-sm font-medium">
              <Calendar size={18} className="text-[#005B52]" />
              <span>07/08/2026</span>
            </div>

            <button
              type="button"
              className="!mr-5 w-8 h-8 rounded-full bg-[#D4ECE9] flex items-center justify-center text-[#005B52] hover:bg-teal-200 transition-colors cursor-pointer"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>

        {/* Card MAT */}
        <div className="relative w-full bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow flex items-center justify-between min-h-[96px] overflow-hidden pr-8 pl-10 py-5">
          <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-[#001A72] rounded-l-xl" />

          <div className="flex items-center gap-7">
            <div className="!ml-6 w-[52px] h-[52px] rounded-xl bg-[#E8EDFB] text-[#001A72] flex items-center justify-center font-bold text-sm shrink-0">
              MAT
            </div>

            <div className="flex flex-col gap-1">
              <h4 className="font-bold text-base text-[#001A72] tracking-tight">
                Soma
              </h4>
              <p className="text-gray-500 text-sm">
                Determine o resultado da soma dos números
              </p>
            </div>
          </div>

          <div className="flex items-center gap-9 shrink-0">
            <div className="flex items-center gap-2.5 text-gray-600 text-sm font-medium">
              <Calendar size={18} className="text-[#005B52]" />
              <span>07/08/2026</span>
            </div>

            <button
              type="button"
              className="!mr-5 w-8 h-8 rounded-full bg-[#D4ECE9] flex items-center justify-center text-[#005B52] hover:bg-teal-200 transition-colors cursor-pointer"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>

        {/* Card GEO */}
        <div className="relative w-full bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow flex items-center justify-between min-h-[96px] overflow-hidden pr-8 pl-10 py-5">
          <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-[#7A2E12] rounded-l-xl" />

          <div className="flex items-center gap-7">
            <div className="!ml-6 w-[52px] h-[52px] rounded-xl bg-[#FCEFEA] text-[#7A2E12] flex items-center justify-center font-bold text-sm shrink-0">
              GEO
            </div>

            <div className="flex flex-col gap-1">
              <h4 className="font-bold text-base text-[#7A2E12] tracking-tight">
                Espaços Urbanos
              </h4>
              <p className="text-gray-500 text-sm">
                Identifique as imagens que apresentam espaços urbanos
              </p>
            </div>
          </div>

          <div className="flex items-center gap-9 shrink-0">
            <div className="flex items-center gap-2.5 text-gray-600 text-sm font-medium">
              <Calendar size={18} className="text-[#005B52]" />
              <span>07/08/2026</span>
            </div>

            <button
              type="button"
              className="!mr-5 w-8 h-8 rounded-full bg-[#D4ECE9] flex items-center justify-center text-[#005B52] hover:bg-teal-200 transition-colors cursor-pointer"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ListaAtividades
import { useState, useEffect, useMemo } from "react"
import { GraduationCap, Users, Plus, Clock, ChevronRight, ArrowRight } from "lucide-react"
import { useNavigate } from 'react-router-dom';
import NavbarHome from "../../components/escola/NavbarHome";
import foto from "../../assets/escola.jpg"
import MeuCalendario from "../../components/calendar/MeuCalendario";
import EventsList from "../../components/escola/EventsInput";
import ModalEvents from "../modals/ModalEvents";
import LayoutBaseProf from "../../components/professor/layout/LayoutBaseProf";
import { http } from "../../services/api";

interface Evento {
  description: string;
  date: string;
}

interface UserData {
  nome?: string;
  foto?: string;
}

interface TurmaAPI {
  _id: string;
  nome: string;
  quantidadeAlunos: number;
  atividades: {
    total: number;
    feitas: number;
    pendentes: number;
    progresso: number;
  };
}

function Home() {
  const navigate = useNavigate()

  const user: UserData = JSON.parse(localStorage.getItem("user") ?? "{}")
  const token = localStorage.getItem("token")

  const [events, setEvents] = useState<Evento[]>([])
  const [modalOpen, setModalOpen] = useState(false)
  const [selectedDate, setSelectedDate] = useState<string>("")
  const [turmas, setTurmas] = useState<TurmaAPI[]>([]);

  const totalAlunos = turmas.reduce(
    (total, turma) => total + turma.quantidadeAlunos,
    0
  );

  const totalPendentes = turmas.reduce(
    (total, turma) => total + turma.atividades.pendentes,
    0
  );

  useEffect(() => {
    async function fetchTurma() {
      try {
        const response = await http.get<TurmaAPI[]>("/turmas?formato=completo");
        setTurmas(response.data);
      } catch {
        console.error("Erro ao carregar turma")
      }
    }

    async function fetchEventos() {
      try {
        const response = await fetch("https://sua-api.com/eventos", {
          headers: { Authorization: `Bearer ${token}` },
        })
        if (!response.ok) throw new Error()
        const dados = await response.json()
        setEvents(dados)
      } catch {
        console.error("Erro ao carregar eventos")
      }
    }

    fetchTurma()
    fetchEventos()
  }, [])

  const goTo = (path: string): void => { navigate(path) }

  // Mantém o mesmo objeto entre renders, para o modal não limpar a descrição digitada
  const dadosModal = useMemo(() => ({ date: selectedDate }), [selectedDate])

  const handleSelectDate = (date: Date) => {
    const formatted = date.toLocaleDateString('sv-SE')
    setSelectedDate(formatted)
    setModalOpen(true)
  }

  const handleAddEvent = async (description: string, date: string) => {
    const newEvent: Evento = { description, date }

    setEvents((prev) => [...prev, newEvent])

    try {
      await fetch("https://sua-api.com/eventos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(newEvent),
      })
    } catch {
      console.error("Erro ao salvar evento")
    }
  }

  const handleDeleteEvent = async (index: number) => {
    // const eventoParaDeletar = events[index]

    setEvents(events.filter((_, i) => i !== index))

    try {
      await fetch(`https://sua-api.com/eventos/${index}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      })
    } catch {
      console.error("Erro ao deletar evento")
    }
  }

  return (
    <LayoutBaseProf>
      <NavbarHome
        onSearchChange={() => { }}
        buttonLabel="Filtrar"
        onButtonClickc={() => { }}
        nome={user?.nome ?? "Professor"}
        foto={user?.foto ?? foto}
        notificacoes={5}
        onButtonClick={() => { }}
      />

      <div className="flex w-full min-w-0 flex-col gap-7.5 lg:flex-row lg:items-start lg:justify-between 4xl:gap-14">

        <div className="mt-3.5 flex w-full min-w-0 flex-1 flex-col gap-10 md:gap-16 4xl:mt-6 4xl:gap-28">

          <div className="h-auto !p-0 bg-transparent">
            <div className="flex max-w-175 flex-wrap items-center justify-between gap-6 rounded-2xl bg-luna-teal !px-7 !py-6 3xl:max-w-225 4xl:max-w-300 4xl:gap-10 4xl:rounded-3xl 4xl:!px-12 4xl:!py-10">

              <div className="flex min-w-45 flex-1 flex-col gap-2.5 4xl:min-w-96 4xl:gap-4">
                <h2 className="m-0! font-sans text-2xl font-semibold text-white sm:text-3xl 3xl:text-4xl 4xl:text-6xl">
                  Visão <span className="text-luna-peach">geral</span>
                </h2>

                <p className="m-0! max-w-78 font-sans text-sm font-semibold text-white 3xl:max-w-100 3xl:text-lg 4xl:max-w-150 4xl:text-2xl">
                  Gerencie suas turmas e planos de aula em um único painel.
                </p>

                <div className="!mt-1 flex flex-wrap items-center gap-4 text-white 4xl:gap-7">
                  <p className="flex items-center gap-1.5 font-sans text-sm 3xl:text-lg 4xl:gap-3 4xl:text-2xl">
                    <span className="text-luna-peach">
                      <GraduationCap className="size-[18px] 4xl:size-9" />
                    </span>
                    {totalAlunos} alunos
                  </p>

                  <div className="h-2 w-2 rounded-full bg-luna-peach/60 4xl:h-3.5 4xl:w-3.5"></div>

                  <p className="flex items-center gap-1.5 font-sans text-sm 3xl:text-lg 4xl:gap-3 4xl:text-2xl">
                    <span className="text-luna-peach">
                      <Users className="size-[18px] 4xl:size-9" />
                    </span>
                    {turmas.length} turmas
                  </p>
                </div>
              </div>

              <div className="flex w-full flex-col items-center justify-center gap-2.5 sm:w-auto sm:min-w-53 3xl:min-w-72 4xl:min-w-110 4xl:gap-4">

                <button
                  className="flex w-full transform cursor-pointer items-center justify-between gap-3 rounded-xl border-none bg-white !px-4.5 !py-3 transition-all duration-200 ease-in-out hover:-translate-y-1 4xl:gap-5 4xl:rounded-2xl 4xl:!px-7 4xl:!py-5"
                  onClick={() => goTo("/professores/atividades")}
                >
                  <div className="flex items-center gap-2.5 4xl:gap-4">
                    <div className="flex h-7.5 w-7.5 shrink-0 items-center justify-center rounded-sm bg-luna-teal/30 text-luna-teal 4xl:h-13 4xl:w-13">
                      <Plus className="size-[18px] 4xl:size-8" />
                    </div>

                    <div className="flex flex-col text-left font-semibold">
                      <span className="font-sans text-sm text-luna-teal 3xl:text-base 4xl:text-2xl">
                        Adicionar atividade
                      </span>
                      <span className="font-sans text-xs font-medium text-luna-teal/60 3xl:text-sm 4xl:text-lg">
                        Crie uma nova tarefa para a turma
                      </span>
                    </div>
                  </div>

                  <ChevronRight className="size-[18px] shrink-0 4xl:size-8" color="#005A63" />
                </button>

                <button
                  className="flex w-full transform cursor-pointer items-center justify-between gap-3 rounded-xl border border-gray-300/40 bg-transparent !px-4.5 !py-3 transition-all duration-200 ease-in-out hover:-translate-y-1 4xl:gap-5 4xl:rounded-2xl 4xl:!px-7 4xl:!py-5"
                  onClick={() => goTo("/atividades/pendentes")}
                >
                  <div className="flex items-center gap-2.5 4xl:gap-4">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-sm bg-luna-peach/30 text-luna-peach 4xl:h-13 4xl:w-13">
                      <Clock className="size-[18px] 4xl:size-8" />
                    </div>

                    <div className="flex items-center justify-center gap-6 4xl:gap-10">
                      <div className="flex flex-col text-left font-semibold">
                        <span className="font-sans text-sm text-luna-peach 3xl:text-base 4xl:text-2xl">
                          Pendente
                        </span>
                        <span className="font-sans text-xs font-medium text-luna-peach/60 3xl:text-sm 4xl:text-lg">
                          Atividades para revisar hoje
                        </span>
                      </div>

                      <div className="flex h-5 w-5 items-center justify-center rounded-full bg-luna-peach font-sans text-sm font-semibold text-luna-teal 4xl:h-9 4xl:w-9 4xl:text-xl">
                        {totalPendentes}
                      </div>
                    </div>
                  </div>

                  <ChevronRight className="size-[18px] shrink-0 4xl:size-8" color="rgba(255,221,210,0.54)" />
                </button>

              </div>
            </div>
          </div>

          <div className="flex max-w-175 flex-col gap-7.5 font-sans text-base font-bold 3xl:max-w-225 4xl:max-w-300 4xl:gap-12">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-black 3xl:text-3xl 4xl:text-5xl">
                Turmas
              </h2>

              <button
                onClick={() => goTo("/professores/turmas")}
                className="flex cursor-pointer items-center gap-1.5 text-sm font-semibold text-luna-teal transition-opacity hover:opacity-70 3xl:text-base 4xl:gap-3 4xl:text-2xl"
              >
                Ver todas
                <ArrowRight className="size-5 4xl:size-8" />
              </button>
            </div>

            <div className="grid grid-cols-[repeat(auto-fill,minmax(180px,1fr))] gap-5 4xl:grid-cols-[repeat(auto-fill,minmax(320px,1fr))] 4xl:gap-9">

              {turmas.map((turma) => (
                <div
                  key={turma._id}
                  className="flex min-h-52 flex-col rounded-xl bg-white p-5! shadow-md transition-transform duration-200 hover:-translate-y-1 4xl:min-h-88 4xl:rounded-2xl 4xl:p-9!"
                >
                  <div className="flex h-13 w-13 items-center justify-center rounded-full bg-luna-teal/25 text-luna-teal 4xl:h-22 4xl:w-22">
                    <Users fill="currentColor" className="size-6 4xl:size-10" />
                  </div>

                  <h3 className="mt-2.5! text-lg font-semibold text-black 3xl:text-xl 4xl:mt-5! 4xl:text-4xl">
                    {turma.nome}
                  </h3>

                  <div className="mt-5! grid grid-cols-2 gap-2 4xl:mt-9! 4xl:gap-4">
                    <div className="flex flex-col items-center justify-center rounded-sm bg-gray-50 px-2! py-2! 4xl:rounded-md 4xl:px-4! 4xl:py-4!">
                      <span className="text-xs font-medium text-gray-400 4xl:text-xl">
                        ALUNOS
                      </span>
                      <span className="mt-1! text-base font-semibold text-luna-teal 4xl:mt-2! 4xl:text-4xl">
                        {turma.quantidadeAlunos}
                      </span>
                    </div>

                    <div className="flex flex-col items-center justify-center rounded-sm bg-gray-50 px-2! py-2! 4xl:rounded-md 4xl:px-4! 4xl:py-4!">
                      <span className="text-xs font-medium text-gray-400 4xl:text-xl">
                        ATIVIDADES
                      </span>
                      <span className="mt-1! text-base font-semibold text-luna-teal 4xl:mt-2! 4xl:text-4xl">
                        {turma.atividades.total}
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={() => goTo(`/professores/turmaEspecifica/${turma._id}`)}
                    className="mt-5! w-full cursor-pointer rounded-lg bg-luna-teal py-2! text-sm font-semibold text-white transition-colors hover:bg-luna-teal/90 4xl:mt-9! 4xl:rounded-xl 4xl:py-4! 4xl:text-2xl"
                  >
                    Detalhes
                  </button>
                </div>
              ))}

            </div>
          </div>
        </div>

        <div className="grid w-full grid-cols-1 gap-2.5 md:grid-cols-2 lg:w-80 lg:shrink-0 lg:grid-cols-1 xl:w-87.5 min-[1600px]:w-100 3xl:w-120 4xl:w-170 4xl:gap-5">
          <MeuCalendario onSelectDate={handleSelectDate} />
          <EventsList events={events} onDelete={handleDeleteEvent} />
        </div>

      </div>

      <ModalEvents
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onAddEvent={handleAddEvent}
        dados={dadosModal}
      />

    </LayoutBaseProf>
  )
}

export default Home

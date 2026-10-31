import { useState, useEffect } from "react"
import { GraduationCap, Users, Plus, Clock, ChevronRight, ArrowRight, BookOpen, FlaskConical, Globe, Calculator, Landmark } from "lucide-react"
import { useNavigate } from 'react-router-dom';
import NavbarHome from "../../components/escola/NavbarHome";
import foto from "../../assets/escola.jpg"
import Button from "../../components/escola/button";
import MeuCalendario from "../../components/calendar/MeuCalendario";
import EventsList from "../../components/escola/EventsInput";
import ModalEvents from "../modals/ModalEvents";
import LayoutBaseProf from "../../components/professor/layout/LayoutBaseProf";
import { api } from "../../services/api";

interface Evento {
  description: string;
  date: string;
}

interface Turma {
  nome: string
  letra: string
  totalAlunos: number
  totalTarefas: number
  percentualConcluidas: number
  tarefasPendentes: number
}

interface TurmaCard {
  id: number;
  nome: string;
  alunos: number;
  atividades: number;
}

interface UserData {
  nome?: string;
  foto?: string;
}

const TURMAS: TurmaCard[] = [
  { id: 1, nome: "1º ano A", alunos: 8, atividades: 5 },
  { id: 2, nome: "2º ano A", alunos: 6, atividades: 4 },
  { id: 3, nome: "3º ano A", alunos: 5, atividades: 3 },
];

function Home() {
  const navigate = useNavigate()

  const [turma, setTurma] = useState<Turma>({
    nome: "2º ano",
    letra: "A",
    totalAlunos: 0,
    totalTarefas: 0,
    percentualConcluidas: 0,
    tarefasPendentes: 0,
  })

  const user: UserData = JSON.parse(localStorage.getItem("user") ?? "{}")
  const token = localStorage.getItem("token")

  const [events, setEvents] = useState<Evento[]>([])
  const [modalOpen, setModalOpen] = useState(false)
  const [selectedDate, setSelectedDate] = useState<string>("")

  useEffect(() => {
    async function fetchTurma() {
      try {
        const response = await api.get<Turma>("/professores/turma")
        setTurma(response.data)
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
    const eventoParaDeletar = events[index]

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

      <div className="flex w-full min-w-0 flex-row items-start justify-between gap-7.5">

        <div className="flex min-w-0 flex-1 flex-col gap-16 mt-3.5">

          <div className="h-auto !p-0 bg-transparent">
            <div className="flex justify-between items-center bg-luna-teal rounded-2xl !py-6 !px-7 gap-6 flex-wrap max-w-175">
              <div className="flex flex-1 flex-col gap-2.5 min-w-45">
                <h2 className="font-sans text-3xl font-semibold text-white m-0!">
                  Visão <span className="text-luna-peach">geral</span>
                </h2>
                <p className="font-sans text-sm font-semibold text-white m-0! max-w-78">
                  Gerencie suas turmas e planos de aula em um único painel.
                </p>
                <div className="flex flex-wrap gap-4 !mt-1 text-white items-center">
                  <p className="flex items-center gap-1.5 font-sans text-sm">
                    <span className="text-luna-peach">
                      <GraduationCap size={18} />
                    </span>
                    {turma.totalAlunos} alunos
                  </p>

                  <div className="w-2 h-2 bg-luna-peach/60 rounded-full"></div>

                  <p className="flex items-center gap-1.5 font-sans text-sm">
                    <span className="text-luna-peach">
                      <Users size={18} />
                    </span>
                    {turma.totalTarefas} turmas
                  </p>
                </div>
              </div>

              <div className="flex flex-col items-center justify-center gap-2.5 min-w-53">
                <button
                  className="flex items-center justify-between bg-white border-none rounded-xl !py-3 !px-4.5 gap-3 w-full cursor-pointer transform hover:-translate-y-1 ease-in-out duration-200 transition-all"
                  onClick={() => goTo("/professores/atividades")}
                >
                  <div className="flex items-center gap-2.5">
                    <div className="flex items-center justify-center w-7.5 h-7.5 bg-luna-teal/30 rounded-sm text-luna-teal shrink-0">
                      <Plus size={18} />
                    </div>
                    <div className="flex flex-col text-left font-semibold">
                      <span className="font-sans text-sm text-luna-teal">Adicionar atividade</span>
                      <span className="font-sans text-xs font-medium text-luna-teal/60">Crie uma nova tarefa para a turma</span>
                    </div>
                  </div>
                  <ChevronRight size={18} color="#005A63" />
                </button>

                <button
                  className="flex items-center justify-between bg-transparent border border-gray-300/40 rounded-xl !py-3 !px-4.5 gap-3 w-full cursor-pointer transform hover:-translate-y-1 ease-in-out duration-200 transition-all"
                  onClick={() => goTo("/atividades/pendentes")}>
                  <div className="flex items-center gap-2.5">
                    <div className="flex items-center justify-center w-8 h-8 bg-luna-peach/30 rounded-sm text-luna-peach shrink-0">
                      <Clock size={18} />
                    </div>
                    <div className="flex items-center justify-center gap-6">
                      <div className="flex flex-col text-left font-semibold">
                        <span className="font-sans text-sm text-luna-peach">
                          Pendente
                        </span>
                        <span className="font-sans text-xs font-medium text-luna-peach/60">
                          Atividades para revisar hoje
                        </span>
                      </div>
                      <div className="flex items-center justify-center w-5 h-5 bg-luna-peach text-luna-teal font-sans font-semibold rounded-full text-sm">
                        {turma.tarefasPendentes}
                      </div>
                    </div>
                  </div>
                  <ChevronRight size={18} color="rgba(255,221,210,0.54)" />
                </button>
              </div>
            </div>
          </div>

          <div className="flex flex-col font-sans text-base font-bold gap-7.5 max-w-175">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-black">
                Turmas
              </h2>

              <button
                onClick={() => goTo("/professores/turmas")}
                className="flex items-center gap-1.5 text-sm font-semibold text-luna-teal cursor-pointer transition-opacity hover:opacity-70"
              >
                Ver todas
                <ArrowRight size={20} />
              </button>
            </div>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">

              {TURMAS.map((turma) => (
                <div
                  key={turma.id}
                  className="flex min-h-52 flex-col rounded-xl bg-white p-5! shadow-md transition-transform duration-200 hover:-translate-y-1"
                >

                  <div className="flex h-13 w-13 items-center justify-center rounded-full bg-luna-teal/25 text-luna-teal">
                    <Users size={24} fill="currentColor" />
                  </div>

                  <h3 className="mt-2.5! text-lg font-semibold text-black">
                    {turma.nome}
                  </h3>

                  <div className="mt-5! grid grid-cols-2 gap-2">

                    <div className="flex flex-col items-center justify-center rounded-sm bg-gray-50 px-2! py-2!">
                      <span className="text-xs font-medium text-gray-400">
                        ALUNOS
                      </span>

                      <span className="mt-1! text-base font-semibold text-luna-teal">
                        {turma.alunos}
                      </span>
                    </div>

                    <div className="flex flex-col items-center justify-center rounded-sm bg-gray-50 px-2! py-2!">
                      <span className="text-xs font-medium text-gray-400">
                        ATIVIDADES
                      </span>

                      <span className="mt-1! text-base font-semibold text-luna-teal">
                        {turma.atividades}
                      </span>
                    </div>

                  </div>

                  <button
                    onClick={() =>
                      goTo(`/professores/turmaEspecifica/${turma.id}`)
                    }
                    className="mt-5! w-full rounded-lg bg-luna-teal py-2! text-sm font-semibold text-white transition-colors hover:bg-luna-teal/90"
                  >
                    Detalhes
                  </button>

                </div>
              ))}

            </div>
          </div>

        </div>

        <div className="flex shrink-0 flex-col gap-2.5">
          <div>
            <MeuCalendario onSelectDate={handleSelectDate} />
          </div>
          <EventsList events={events} onDelete={handleDeleteEvent} />
        </div>

      </div>

      <ModalEvents
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onAddEvent={handleAddEvent}
        dados={{ date: selectedDate }}
      />

    </LayoutBaseProf>
  )
}

export default Home
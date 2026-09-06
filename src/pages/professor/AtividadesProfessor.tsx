import { useState, useRef } from "react";
import { ClipboardList, Upload, Calendar, PenLine, X, Send, LibraryBig, ChevronDown } from "lucide-react";
import LayoutBaseProf from "../../components/professor/layout/LayoutBaseProf";
import InfoHeader from "../../components/escola/InfoHeader";

type Turma = {
  _id: string;
  nome: string;
  professorId?: {
    _id: string;
    nome: string;
    sobrenome: string;
  };
  qtdAlunos: number;
};

async function enviarPlanoManual(dataAula: string, dataFechamento: string, horarioFechamento: string ,turma: string, titulo: string, detalhamento: string) {
  await new Promise((resolve) => setTimeout(resolve, 1500));
  console.log("Plano manual enviado:", { dataAula, dataFechamento, horarioFechamento, turma, titulo, detalhamento });
}

async function enviarPlanoAnexo(dataAula: string, dataFechamento: string, horarioFechamento:string ,turma: string, arquivo: File) {
  await new Promise((resolve) => setTimeout(resolve, 1500));
  console.log("Plano por anexo enviado:", { dataAula, dataFechamento, horarioFechamento, turma, arquivo: arquivo.name });
}

export default function PlanoAula() {
  const [modo, setModo] = useState('manual');
  const [arquivoSelecionado, setArquivoSelecionado] = useState<File | null>(null);
  const inputArquivoRef = useRef<HTMLInputElement>(null);

  const [dataAula, setDataAula] = useState('');
  const [dataFechamento, setDataFechamento] = useState('');
  const [horarioFechamento, setHorarioFechamento] = useState('');
  const [turma, setTurma] = useState('');
  const [titulo, setTitulo] = useState('');
  const [detalhamento, setDetalhamento] = useState('');
  const [carregando, setCarregando] = useState(false);
  const [erro, setErro] = useState('');

  const turmasMock: Turma[] = [
    {
      _id: "1",
      nome: "Desenvolvimento Web Avançado",
      professorId: {
        _id: "p1",
        nome: "Carlos",
        sobrenome: "Silva",
      },
      qtdAlunos: 25,
    },
    {
      _id: "2",
      nome: "Banco de Dados NoSQL",
      professorId: {
        _id: "p2",
        nome: "Ana",
        sobrenome: "Souza",
      },
      qtdAlunos: 18,
    },
    {
      _id: "3",
      nome: "Introdução ao UI/UX Design",
      qtdAlunos: 30,
    },
  ];

  const formatarMascaraData = (valor: string) => {
    let v = valor.replace(/\D/g, "");
    if (v.length > 8) v = v.slice(0, 8);
    if (v.length > 4) v = v.replace(/^(\d{2})(\d{2})(\d{1,4}).*/, "$1/$2/$3");
    else if (v.length > 2) v = v.replace(/^(\d{2})(\d{1,2}).*/, "$1/$2");
    return v;
  };

  const formatarMascaraHora = (valor: string) => {
    let v = valor.replace(/\D/g, "");
    if (v.length > 4) v = v.slice(0, 4);
    if (v.length > 2) {
      v = v.replace(/^(\d{2})(\d{1,2}).*/, "$1:$2");
    }
    return v;
  };

  async function handleEnviar() {
    setErro('');

    if (!dataAula || (dataAula.length !== 10)) {
      setErro('Preencha a data da aula completa DD/MM/YY.');
      return;
    }

    if (!dataFechamento || (dataFechamento.length !== 10)) {
      setErro('Preencha a data de Fechamento completa DD/MM/YY.');
      return;
    }


    if (!horarioFechamento || (horarioFechamento.length !== 5)) {
      setErro('Preencha o horário de fechamento completo (HH:MM).');
      return;
    }


    if (!turma) {
      setErro('Selecione uma turma.');
      return;
    }

    if (modo === 'manual' && (!titulo || !detalhamento)) {
      setErro('Preencha todos os campos.');
      return;
    }

    if (modo === 'anexo' && !arquivoSelecionado) {
      setErro('Selecione um arquivo.');
      return;
    }

    setCarregando(true);

    try {

      const converterParaBackend = (dataPtBr: string) => {
        const [dia, mes, ano] = dataPtBr.split('/');
        return `${ano}-${mes}-${dia}`;
      };

      const dataAulaFormatada = converterParaBackend(dataAula);
      const dataFechamentoFormatada = converterParaBackend(dataFechamento);

      if (modo === 'manual') {
        await enviarPlanoManual(dataAulaFormatada, horarioFechamento, dataFechamentoFormatada, turma, titulo, detalhamento);
      } else {
        await enviarPlanoAnexo(dataAulaFormatada, horarioFechamento, dataFechamentoFormatada, turma, arquivoSelecionado!);
      }

      setDataAula('');
      setDataFechamento('');
      setHorarioFechamento('');
      setTurma('');
      setTitulo('');
      setDetalhamento('');
      setArquivoSelecionado(null);

      alert('Plano enviado com sucesso!');
    } catch (err) {
      setErro(err instanceof Error ? err.message : 'Erro inesperado');
    } finally {
      setCarregando(false);
    }
  }

  return (
    <LayoutBaseProf>
      <InfoHeader
        icon={<LibraryBig size={26} />}
        title="Plano de Aula"
        subtitle="Envie um novo plano de aula"
      />

      <div className="flex flex-col w-full !mt-3 gap-4">

        <div className="flex gap-6 w-full">
          <div
            className={`flex items-center gap-4 flex-1 !py-6 !px-5 rounded-xl border-2 cursor-pointer transition-all duration-200 ease-in-out hover:border-luna-teal ${modo === 'manual'
              ? 'border-luna-teal bg-[#f0fafa]'
              : 'border-[#e0e0e0] bg-white'
              }`}
            onClick={() => setModo('manual')}
          >
            <div className="flex items-center justify-center w-14 h-14 rounded-xl bg-luna-teal text-white shrink-0">
              <ClipboardList size={26} />
            </div>
            <div className="flex flex-col gap-1">
              <span className="font-sans font-bold text-luna-teal text-md">Escreva manualmente</span>
              <span className="font-sans text-sm font-light text-luna-font-description">Crie o plano com título, descrição e data</span>
            </div>
            {modo === 'manual' && <div className="w-2 h-2 rounded-full bg-luna-teal !ml-auto self-start" />}
          </div>

          <div
            className={`flex items-center gap-4 flex-1 !py-6 !px-5 rounded-xl border-2 cursor-pointer transition-all duration-200 ease-in-out hover:border-luna-teal ${modo === 'anexo'
              ? 'border-luna-teal bg-[#f0fafa]'
              : 'border-[#e0e0e0] bg-white'
              }`}
            onClick={() => setModo('anexo')}
          >
            <div className="flex items-center justify-center w-14 h-14 rounded-xl bg-luna-teal text-white shrink-0">
              <Upload size={24} />
            </div>
            <div className="flex flex-col gap-1">
              <span className="font-sans font-bold text-luna-teal text-md">Anexe o arquivo</span>
              <span className="font-sans text-sm font-light text-luna-font-description">Faça um upload de um arquivo já pronto</span>
            </div>
            {modo === 'anexo' && <div className="w-2 h-2 rounded-full bg-luna-teal !ml-auto self-start" />}
          </div>
        </div>

        <div className="flex flex-col rounded-lg bg-white !py-8 !px-10 gap-6 shadow-luna-shadow shadow-sm">

          <div className="flex w-full gap-8">
            <div className="flex flex-col gap-2 flex-1">
              <label className="font-sans font-bold text-sm text-luna-teal">Data da aula</label>
              <div className="relative flex items-end">
                <input
                  className="border-0 border-b-luna-teal border-b-2 bg-transparent font-sans font-light text-sm text-black !py-2 w-full focus:outline-none placeholder:text-gray-400"
                  type="text"
                  placeholder="Ex: 00/00/0000"
                  value={dataAula}
                  onChange={(e) => setDataAula(formatarMascaraData(e.target.value))}
                />
                <Calendar size={18} className="absolute right-0 bottom-3 text-luna-teal pointer-events-none" />
              </div>
            </div>


            {modo === 'manual' && (
              <div className="flex flex-col gap-2 flex-1">
                <label className="font-sans font-bold text-sm text-luna-teal">Conteúdo Programático (Título)</label>
                <div className="relative flex items-end">
                  <input
                    className="border-0 border-b-luna-teal border-b-2 bg-transparent font-sans font-light text-sm text-black !py-2 w-full focus:outline-none placeholder:text-gray-400"
                    type="text"
                    placeholder="Título do conteúdo"
                    value={titulo}
                    onChange={(e) => setTitulo(e.target.value)}
                  />
                  <PenLine size={18} className="absolute right-0 bottom-3 text-luna-teal pointer-events-none" />
                </div>
              </div>
            )}
          </div>

          <div className="w-full relative my-3">

            <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-luna-teal">
              <ChevronDown size={24} />
            </div>

            <select
              value={turma}
              onChange={(e) => setTurma(e.target.value)}
              className="w-full h-12 !pl-4 !pr-12 bg-white border text-gray-400 border-luna-teal rounded-lg text-md font-sans font-light appearance-none focus:outline-none focus:ring-1 focus:ring-luna-teal cursor-pointer"
              required
            >

              <option value="" disabled>
                Selecione uma turma
              </option>

              {turmasMock.map((tm) => (
                <option key={tm._id} value={tm._id} className="text-luna-teal font-sans font-light bg-white">{tm.nome}</option>
              ))}

            </select>

          </div>

          <div className="flex w-full gap-8">
            <div className="flex flex-col gap-2 flex-1">
              <label className="font-sans font-bold text-sm text-luna-teal">Data de Fechamento da Atividade</label>
              <div className="relative flex items-end">
                <input
                  className="border-0 border-b-luna-teal border-b-2 bg-transparent font-sans font-light text-sm text-black !py-2 w-full focus:outline-none placeholder:text-gray-400"
                  type="text"
                  placeholder="Ex: 00/00/0000"
                  value={dataFechamento}
                  onChange={(e) => setDataFechamento(formatarMascaraData(e.target.value))}
                />
                <Calendar size={18} className="absolute right-0 bottom-3 text-luna-teal pointer-events-none" />
              </div>
            </div>

            <div className="flex flex-col gap-2 flex-1">
              <label className="font-sans font-bold text-sm text-luna-teal">Horário de Fechamento da Atividade</label>
              <div className="relative flex items-end">
                <input
                  className="border-0 border-b-luna-teal border-b-2 bg-transparent font-sans font-light text-sm text-black !py-2 w-full focus:outline-none placeholder:text-gray-400"
                  type="text"
                  placeholder="EX: 17:59"
                  value={horarioFechamento}
                  onChange={(e) => setHorarioFechamento(formatarMascaraHora(e.target.value))}
                />
                <PenLine size={18} className="absolute right-0 bottom-3 text-luna-teal pointer-events-none" />
              </div>
            </div>
          </div>


          {modo === 'manual' && (
            <div className="flex flex-col gap-4 flex-1">
              <label className="font-sans font-bold text-sm text-luna-teal">Conteúdo Programático (Detalhamento)</label>
              <div className="relative">
                <textarea
                  className="border-2 border-luna-teal rounded-lg bg-transparent font-sans font-light text-sm text-black !p-3 w-full min-h-35 resize-y focus:outline-none placeholder:text-gray-400"
                  placeholder="Detalhamento do conteúdo"
                  value={detalhamento}
                  onChange={(e) => setDetalhamento(e.target.value)}
                />
                <PenLine size={18} className="absolute bottom-4 right-4 text-luna-teal pointer-events-none" />
              </div>
            </div>
          )}

          {modo === 'anexo' && (
            <div
              className="flex flex-col items-center justify-center gap-4 border-2 border-dashed border-luna-teal rounded-lg !py-6 !px-2 bg-white cursor-pointer"
              onClick={() => inputArquivoRef.current?.click()}
            >
              <input
                ref={inputArquivoRef}
                type="file"
                style={{ display: 'none' }}
                onChange={(e) => {
                  const arquivo = e.target.files?.[0];
                  if (arquivo) setArquivoSelecionado(arquivo);
                }}
              />
              <div className="flex items-center justify-center bg-luna-teal rounded-lg !p-4">
                <Upload size={34} className="text-white" strokeWidth={2} />
              </div>
              <p className="font-sans font-medium text-sm text-gray-700 text-center">
                {arquivoSelecionado
                  ? arquivoSelecionado.name
                  : <><span className="font-bold text-luna-teal cursor-pointer">Clique ou arraste o arquivo</span><br />PDF, DOC, DOCX ou imagens</>
                }
              </p>
            </div>
          )}

        </div>

        {erro && (
          <p style={{ color: 'red', fontFamily: 'Inter', fontSize: 14 }}>{erro}</p>
        )}

        <div className="flex justify-end gap-4 !mt-2 h-12">
          <button className="flex items-center gap-4 !px-6 rounded-xl font-sans text-md font-bold text-luna-teal border-2 border-gray-300 cursor-pointer bg-white transition duration-300 ease hover:border-luna-teal " onClick={() => window.history.back()}>
            <div className="flex justify-center items-center bg-luna-teal w-6 h-6 rounded-full text-white text-center">
              <X size={18} />
            </div>
            Cancelar
          </button>
          <button
            className="flex items-center gap-4 !px-6 border-none rounded-lg bg-luna-teal font-sans text-md font-bold text-white cursor-pointer transition duration-300 ease hover:opacity-[0.9]"
            onClick={handleEnviar}
            disabled={carregando}
          >
            <Send size={18} />
            {carregando ? 'Enviando...' : 'Enviar atividade'}
          </button>
        </div>

      </div>
    </LayoutBaseProf>
  );
}
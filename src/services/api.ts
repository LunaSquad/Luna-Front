// Usando mock para simular
let turmasMock = [
  {
    _id: "1",
    nome: "3º ano A",
    professorId: { 
      _id: "prof1", 
      nome: "Carlos", 
      sobrenome: "Alberto" 
    },
    qtdAlunos: 10,
    pendentes: 3,
    progresso: 70
  },
  {
    _id: "2",
    nome: "2º ano B",
    professorId: { 
      _id: "prof2", 
      nome: "Ana", 
      sobrenome: "Paula" 
    },
    qtdAlunos: 9,
    pendentes: null,
    progresso: 90
  },
  {
    _id: "3",
    nome: "3º ano C",
    professorId: {
      _id: "prof1", 
      nome: "Carlos", 
      sobrenome: "Alberto" 
    },
    qtdAlunos: 12,
    pendentes: 6,
    progresso: 50
  },
  {
    _id: "4",
    nome: "1º ano A",
    professorId: { 
      _id: "prof3", 
      nome: "Marcos", 
      sobrenome: "Silva" 
    },
    qtdAlunos: 11,
    pendentes: 1,
    progresso: 77
  },
  {
    _id: "5",
    nome: "1º ano B",
    professorId: {
      _id: "prof4", 
      nome: "Juliana", 
      sobrenome: "Mendes" 
    },
    qtdAlunos: 7,
    pendentes: 2,
    progresso: 68
  },
  {
    _id: "6",
    nome: "2º ano C",
    professorId: { 
      _id: "prof2", 
      nome: "Ana", 
      sobrenome: "Paula" 
    },
    qtdAlunos: 8,
    pendentes: null,
    progresso: 98
  },
];

import fotoMariaClara from "../pages/professor/imagensAlunos/maria-clara.jpg"
const dummyPdfUrl = "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf";

const dadosAlunosMock = [
  {
    _id: "1",
    nome: "Maria Clara",
    avatarUrl: fotoMariaClara,
    ra: "234585960",
    urlFotoLaudo: dummyPdfUrl, 
    desempenho: 90,
    situacao: "Excelente",
  },
  {
    _id: "2",
    nome: "João Oliveira",
    avatarUrl: fotoMariaClara,
    ra: "289487567",
    urlFotoLaudo: dummyPdfUrl, 
    desempenho: 40,
    situacao: "Atenção",
  },
  {
    _id: "3",
    nome: "Carol Silva",
    avatarUrl: fotoMariaClara,
    ra: "298574890",
    urlFotoLaudo: dummyPdfUrl, 
    desempenho: 50,
    situacao: "Bom",
  },
  {
    _id: "4",
    nome: "Sofia Santos",
    avatarUrl: fotoMariaClara,
    ra: "285948678",
    urlFotoLaudo: "", 
    desempenho: 70,
    situacao: "Bom",
  },
  {
    _id: "5",
    nome: "Fernando Silva",
    avatarUrl: fotoMariaClara,
    ra: "258741748",
    urlFotoLaudo: dummyPdfUrl,
    desempenho: 98,
    situacao: "Excelente",
  },
];

export const api = {
  // Simula a busca de todas as turmas
  getTurmas: async () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ data: turmasMock }); 
      }, 1000);
    });
  },
  deleteTurma: async (id: string) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const index = turmasMock.findIndex(t => t._id === id)

        if (index !== -1) {
          turmasMock = turmasMock.filter(t => t._id !== id);
          resolve({ status: 200, message: "Turma deletada com sucesso!" });
        } else {
          reject(new Error("Turma não encontrada!"));
        }
      }, 800)
    })
  },

  // Simula a busca de alunos de uma turma específica
  getAlunosPorTurma: async (turmaId?: string | number) => {

    console.log("Buscando a turma por ID", turmaId)

    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ data: dadosAlunosMock }); // Retornando { data: ... }
      }, 800);
    });
  }
};
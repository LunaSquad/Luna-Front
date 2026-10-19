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

// Usando mock para simular as respostas de uma atividade/prova
const respostasMock = [
  {
    _id: "resp1",
    alunoId: "1", // Referência ao _id "1" (Maria Clara) do dadosAlunosMock
    nome: "Maria Clara",
    avatarUrl: fotoMariaClara,
    acertos: 7,
    totalQuestoes: 9,
    aproveitamento: 77, // Mantendo os 80% do design
    comentarioProfessor: "",
    questoes: [
      {
        _id: "q1",
        numero: 1,
        enunciado: "Quanto é 2+3?",
        respostaAluno: "5",
        correta: true
      },
      {
        _id: "q2",
        numero: 2,
        enunciado: "Quanto é 23+3?",
        respostaAluno: "22",
        correta: false
      },
      {
        _id: "q3",
        numero: 3,
        enunciado: "Quanto é 5 + 3?",
        respostaAluno: "8",
        correta: true
      },
      { 
        _id: "q4", 
        numero: 4, 
        enunciado: "Quanto é 10 + 2?", 
        respostaAluno: "12", 
        correta: true 
      },
      { 
        _id: "q5", 
        numero: 5, 
        enunciado: "Quanto é 5 * 5?", 
        respostaAluno: "25", 
        correta: true 
      },
      { 
        _id: "q6", 
        numero: 6, 
        enunciado: "Quanto é 8 - 3?", 
        respostaAluno: "5", 
        correta: true 
      },
      { 
        _id: "q7", 
        numero: 7, 
        enunciado: "Quanto é 9 / 3?", 
        respostaAluno: "3", 
        correta: true 
      },
      { 
        _id: "q8", 
        numero: 8, 
        enunciado: "Quanto é 1 + 1?", 
        respostaAluno: "3", 
        correta: false 
      },
      { 
        _id: "q9", 
        numero: 9, 
        enunciado: "Quanto é 4 * 2?", 
        respostaAluno: "8", 
        correta: true 
      }
    ]
  },
  {
    _id: "resp2",
    alunoId: "2", // Referência ao _id "2" (João Oliveira)
    nome: "João Oliveira",
    avatarUrl: fotoMariaClara,
    acertos: 3,
    totalQuestoes: 3,
    aproveitamento: 100,
    comentarioProfessor: "Excelente trabalho, João!",
    questoes: [
      {
        _id: "q1",
        numero: 1,
        enunciado: "Quanto é 2+3?",
        respostaAluno: "5",
        correta: true
      },
      {
        _id: "q2",
        numero: 2,
        enunciado: "Quanto é 23+3?",
        respostaAluno: "26",
        correta: true
      },
      {
        _id: "q3",
        numero: 3,
        enunciado: "Quanto é 5 + 3?",
        respostaAluno: "8",
        correta: true
      }
    ]
  },
  {
    _id: "resp3",
    alunoId: "3", // Referência ao _id "3" (Carol Silva)
    nome: "Carol Silva",
    avatarUrl: fotoMariaClara,
    acertos: 1,
    totalQuestoes: 3,
    aproveitamento: 33,
    comentarioProfessor: "",
    questoes: [
      {
        _id: "q1",
        numero: 1,
        enunciado: "Quanto é 2+3?",
        respostaAluno: "6",
        correta: false
      },
      {
        _id: "q2",
        numero: 2,
        enunciado: "Quanto é 23+3?",
        respostaAluno: "25",
        correta: false
      },
      {
        _id: "q3",
        numero: 3,
        enunciado: "Quanto é 5 + 3?",
        respostaAluno: "8",
        correta: true
      }
    ]
  },
  {
    _id: "resp4",
    alunoId: "4", // Referência ao _id "4" (Sofia Santos)
    nome: "Sofia Santos",
    avatarUrl: fotoMariaClara,
    acertos: 2,
    totalQuestoes: 3,
    aproveitamento: 66,
    comentarioProfessor: "",
    questoes: [
      {
        _id: "q1",
        numero: 1,
        enunciado: "Quanto é 2+3?",
        respostaAluno: "5",
        correta: true
      },
      {
        _id: "q2",
        numero: 2,
        enunciado: "Quanto é 23+3?",
        respostaAluno: "24",
        correta: false
      },
      {
        _id: "q3",
        numero: 3,
        enunciado: "Quanto é 5 + 3?",
        respostaAluno: "8",
        correta: true
      }
    ]
  }
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
  },

  getRespostasAtividade: async (atividadeId: string) => {
    console.log("Buscando respostas para a atividade", atividadeId);

    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ data: respostasMock });
      }, 900);
    });
  },

  enviarFeedback: async (respostaId: string, comentario: string) => {
    console.log(`Enviando feedback para a resposta ${respostaId}: ${comentario}`);

    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const respostaIndex = respostasMock.findIndex(r => r._id === respostaId);

        if (respostaIndex !== -1) {
          // Atualiza o mock localmente
          respostasMock[respostaIndex].comentarioProfessor = comentario;
          resolve({ status: 200, message: "Feedback enviado com sucesso!" });
        } else {
          reject(new Error("Resposta não encontrada!"));
        }
      }, 600);
    });
  },

};


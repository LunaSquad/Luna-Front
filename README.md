# 🦋 Luna — Front-end Web

Interface web do **Luna**, uma plataforma educacional desenvolvida para apoiar escolas e professores na gestão de turmas, alunos, atividades e planos de aula, considerando uma abordagem humanizada e inclusiva, com suporte à neurodiversidade.

O front-end é responsável pela experiência do usuário, oferecendo painéis dedicados tanto à administração escolar quanto ao ambiente pedagógico dos professores, consumindo os dados e regras de negócio fornecidos pela API REST do Luna.

## 🚀 Tecnologias

| Tecnologia | Utilização |
|---|---|
| [React](https://react.dev/) | Biblioteca para construção da interface de usuário |
| [TypeScript](https://www.typescriptlang.org/) | Tipagem estática e segurança no desenvolvimento |
| [Vite](https://vite.dev/) | Bundler e servidor de desenvolvimento rápido |
| [React Router](https://reactrouter.com/) | Gerenciamento de rotas e navegação SPA |
| [Tailwind CSS](https://tailwindcss.com/) | Estilização utilitária e responsiva |
| [ESLint](https://eslint.org/) | Padronização e análise estática de código |
| [Docker](https://www.docker.com/) | Containerização da aplicação |
| [Docker Compose](https://docs.docker.com/compose/) | Orquestração e gerenciamento dos containers |

## 📋 Funcionalidades

- **Autenticação e Cadastro:** telas de login e registro com redirecionamento por perfil de acesso (Escola e Professor).

- **Módulo Escola (Gestão Institucional):**
  - **Dashboard Inicial:** visão geral com cards de acesso rápido e calendário escolar.
  - **Professores:** listagem, busca e cadastro de membros do corpo docente.
  - **Turmas:** gerenciamento e criação de turmas na instituição.
  - **Alunos:** controle de matrículas, listagem e visualização de informações dos estudantes.
  - **Calendário e Eventos:** visualização e agendamento de eventos institucionais.

- **Módulo Professor (Gestão Pedagógica):**
  - **Painel do Professor:** acompanhamento das turmas vinculadas ao docente autenticado.
  - **Gestão de Turma Específica:** visualização detalhada da turma, adição de alunos, edição de dados e envio de convites.
  - **Atividades:** criação, listagem e gerenciamento de atividades pedagógicas.
  - **Correção de Atividades:** fluxo dedicado para avaliação e acompanhamento do desempenho dos alunos.

- **Modais Interativos:** janelas modais para cadastros rápidos, convites de alunos, criação de eventos e confirmação de exclusões.

## 🛠️ Arquitetura e organização

O projeto utiliza uma arquitetura baseada em componentes e páginas, dividindo os fluxos de acordo com o contexto de uso (Escola vs. Professor) para facilitar a manutenção e escalabilidade.

- **Pages:** componentes de nível de rota que representam as telas completas da aplicação, subdivididas entre autenticação (`Login`, `Cadastro`), visão da escola (`pagesEscola`), visão do docente (`professor`) e modais de ação (`modals`).
- **Components:** elementos visuais reutilizáveis, formulários, barras de navegação, tabelas, controles de paginação e estruturas de layout (`LayoutBase` e `LayoutBaseProf`).
- **Assets:** recursos estáticos, como logotipos e imagens utilizadas na interface.

## ⚙️ Configuração do ambiente

Para que todas as funcionalidades de autenticação e persistência funcionem corretamente, é necessário que o **Luna — Back-end Web** esteja em execução (localmente ou via Docker).

### Pré-requisitos

- Node.js 20 ou superior.
- npm ou pnpm.
- Docker e Docker Compose (para execução conteinerizada).
- API do Luna (`Luna-web-Backend`) rodando na porta `4000` (ou outra porta configurada).

### 1. Clonar o repositório

```bash
git clone https://github.com/LunaSquad/Luna-Front.git

cd Luna-Front
```

### 2. Configurar as variáveis de ambiente

Crie um arquivo `.env` na raiz do projeto com a URL da API do back-end:

```env
VITE_API_URL=http://localhost:4000
```

## 💻 Execução em desenvolvimento

**Instalar as dependências:**

```bash
npm install
```

**Iniciar o servidor de desenvolvimento:**

```bash
npm run dev
```

A aplicação estará disponível no navegador (por padrão via Vite) em:

`http://localhost:5173`

## 🐳 Execução com Docker

O projeto também oferece suporte à execução utilizando Docker Compose, permitindo construir a imagem e iniciar a aplicação em um container, com configuração automatizada do ambiente.

### 1. Construir a imagem e iniciar o container

Na raiz do projeto, execute:

```bash
npm run compose:up
```

Esse comando executa a construção da imagem Docker e inicia o container em segundo plano (`-d`).

### 2. Acessar a aplicação

Após a inicialização, a aplicação estará disponível em:

`http://localhost:5173`

### 3. Visualizar os logs

Para acompanhar os logs do container em tempo real:

```bash
npm run compose:logs
```

### 4. Encerrar a execução

Para parar e remover os containers e a rede criada pelo Docker Compose:

```bash
npm run compose:down
```

### Comandos disponíveis

| Comando | Descrição |
|---|---|
| `npm run compose:up` | Constrói a imagem e inicia os containers em segundo plano. |
| `npm run compose:logs` | Exibe os logs dos containers em tempo real. |
| `npm run compose:down` | Para e remove os containers e a rede do projeto. |

### Observações sobre a configuração

- O serviço `luna-front` utiliza a porta `5173` do container, mapeada para a mesma porta da máquina local.
- O projeto utiliza volumes para disponibilizar os arquivos locais dentro do container e manter as dependências (`node_modules`) em um volume separado.
- O arquivo `.dockerignore` exclui `node_modules`, `dist` e `.git` do contexto de construção da imagem.
- As configurações de ambiente são carregadas pelo arquivo `.env`.
- O Docker Compose deste repositório é responsável pela execução do front-end. A API do Luna deve estar em execução separadamente e acessível pela URL configurada em `VITE_API_URL`.

## 📦 Build para produção

Para gerar os arquivos otimizados para deploy:

```bash
npm run build
```

Para visualizar localmente a versão de produção gerada:

```bash
npm run preview
```

## 🔗 Principais telas e fluxos

| Contexto | Página / Componente | Descrição |
|---|---|---|
| Público | `Login` / `Cadastro` | Entrada de usuários e criação de novas contas |
| Escola | `Home` | Painel administrativo principal com calendário e indicadores |
| Escola | `Professores` | Listagem, busca e formulário de cadastro de professores |
| Escola | `Turmas` | Gerenciamento geral das turmas da instituição |
| Escola | `Alunos` | Controle e visualização dos alunos cadastrados |
| Professor | `HomeProfessor` | Visão inicial do professor com acesso às suas turmas |
| Professor | `CadastroTurmas` / `TurmaEspecifica` | Criação e gerenciamento detalhado de uma turma e seus alunos |
| Professor | `AtividadesProfessor` | Listagem e criação de atividades pedagógicas |
| Professor | `CorrecaoAtividade` | Visualização e avaliação das entregas das atividades |

## 📁 Estrutura do projeto

```text
Luna-Front/
│
├── public/
│   ├── favicon.svg
│   └── icons.svg
│
├── src/
│   ├── assets/
│   │   ├── escola.jpg
│   │   └── logo.svg
│   │
│   ├── components/
│   │   ├── calendar/
│   │   │   └── MeuCalendario.tsx
│   │   │
│   │   ├── escola/
│   │   │   ├── layout/
│   │   │   │   └── LayoutBase.tsx
│   │   │   ├── FormAluno.tsx
│   │   │   ├── FormProfessor.tsx
│   │   │   ├── FormTurma.tsx
│   │   │   ├── NavLateral.tsx
│   │   │   ├── SearchActionBar.tsx
│   │   │   ├── TableInformations.tsx
│   │   │   └── ...
│   │   │
│   │   └── professor/
│   │       ├── layout/
│   │       │   └── LayoutBaseProf.tsx
│   │       ├── AdicionaAlunos.tsx
│   │       ├── AtividadeEspecifica.tsx
│   │       ├── ConviteAluno.tsx
│   │       ├── EditarTurma.tsx
│   │       ├── ListaAtividades.tsx
│   │       ├── NavBarProf.tsx
│   │       └── ...
│   │
│   ├── pages/
│   │   ├── modals/
│   │   │   ├── ModalAluno.tsx
│   │   │   ├── ModalConviteAlunos.tsx
│   │   │   ├── ModalDelete.tsx
│   │   │   ├── ModalEvents.tsx
│   │   │   ├── ModalProf.tsx
│   │   │   └── ModalTurmas.tsx
│   │   │
│   │   ├── pagesEscola/
│   │   │   ├── Alunos.tsx
│   │   │   ├── Home.tsx
│   │   │   ├── Professores.tsx
│   │   │   └── Turmas.tsx
│   │   │
│   │   ├── professor/
│   │   │   ├── AtividadesProfessor.tsx
│   │   │   ├── CadastroTurmas.tsx
│   │   │   ├── CorrecaoAtividade.tsx
│   │   │   ├── HomeProfessor.tsx
│   │   │   └── TurmaEspecifica.tsx
│   │   │
│   │   ├── Cadastro.tsx
│   │   └── Login.tsx
│   │
│   ├── App.css
│   ├── App.tsx
│   ├── index.css
│   └── main.tsx
│
├── .dockerignore
├── .env
├── .gitignore
├── docker-compose.yml
├── Dockerfile
├── eslint.config.js
├── index.html
├── LICENSE
├── package.json
├── README.md
└── vite.config.ts
```

## 👥 Equipe

**Luminous**

Projeto desenvolvido como parte do Projeto Integrador, com foco no desenvolvimento de uma solução educacional inclusiva e no apoio à gestão pedagógica.

---

**🦋 Luna — Tecnologia a serviço de uma educação mais inclusiva.**
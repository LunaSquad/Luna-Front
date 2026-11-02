import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { AxiosError } from "axios"
import NavTitulo from "../components/escola/NavbarTitulo"
import Button from "../components/escola/button"
import Input from "../components/escola/input"
import UploadImagem from "../components/escola/buttonImage"
import { Check, Circle, IdCard, Eye, EyeClosed, Mail, Building2, Smartphone, UserPen, Calendar } from "lucide-react"
import { http } from "../services/api"

function Cadastro() {
    const [nome, setNome] = useState("")
    const [cpf, setCpf] = useState("")
    const [email, setEmail] = useState("")
    const [sobrenome, setSobrenome] = useState("")
    const [telefone, setTelefone] = useState("")
    const [cidade, setCidade] = useState("")
    const [dataNasc, setDataNasc] = useState("")
    const [senha, setSenha] = useState("")
    const [imagem, setImagem] = useState<File | null>(null)
    const [verSenha, setVerSenha] = useState(false)
    const [erro, setErro] = useState<string | null>(null)
    const [carregando, setCarregando] = useState(false)

    const navigate = useNavigate()

    const toggleSenha = () => {
        setVerSenha(!verSenha);
    };

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault()
        setErro(null)
        if (!imagem) {
            setErro("A foto de perfil é obrigatória.");
            return;
        }
        setCarregando(true)

        try {
            const form = new FormData()

            const dadosUsuario = {
                email,
                senha
            }

            const dadosProfessor = {
                nome,
                sobrenome,
                cpf: cpf.replace(/\D/g, ""),
                dataNasc,
                cidade,
                telefone: telefone.replace(/\D/g, "")
            }

            form.append("dadosUsuario", JSON.stringify(dadosUsuario))
            form.append("dadosProfessor", JSON.stringify(dadosProfessor))

            if (imagem) {
                form.append("foto", imagem)
            }

            await http.post("/professores", form);

            alert("Professor cadastrado com sucesso!")
            navigate("/")
        } catch (err) {
            const erroAxios = err as AxiosError<{ erro?: string; detalhes?: string }>
            console.error("Detalhes do erro:", erroAxios.response?.data?.detalhes)
            setErro(erroAxios.response?.data?.erro || "Erro inesperado ao cadastrar")
        } finally {
            setCarregando(false)
        }
    }

    const campo = "relative w-full flex flex-col font-sans"
    const icone = "absolute right-0 bottom-2 pointer-events-none text-luna-teal size-[18px] 4xl:size-8"

    return (
        <div className="relative min-h-screen w-full bg-[#fdfdf8] flex flex-col lg:flex-row">
            <NavTitulo />

            <aside className="hidden lg:flex flex-col justify-center bg-luna-teal lg:w-[42%] xl:w-[34%] min-h-screen rounded-r-3xl 4xl:rounded-r-[48px] font-sans [font-optical-sizing:auto] shadow-lg gap-10 4xl:gap-18 !px-8 4xl:!px-10 !py-14 shrink-0">
                <div className="flex items-center bg-luna-cabecalho-dois w-fit !px-4 !py-2 4xl:!px-7 4xl:!py-3 font-light text-base 4xl:text-2xl text-luna-peach rounded-full gap-2 4xl:gap-4">
                    <Circle className="size-4 4xl:size-7" fill="#D9D9D9" />
                    <p>PLATAFORMA EDUCACIONAL</p>
                </div>

                <h1 className="text-white text-4xl xl:text-5xl 3xl:text-6xl 4xl:text-7xl max-w-[360px] 3xl:max-w-[480px] 4xl:max-w-[500px] font-semibold">
                    Educação que <span className="text-luna-peach italic font-light">acolhe</span> cada aluno.
                </h1>

                <p className="text-white text-base 3xl:text-xl 4xl:text-3xl max-w-[330px] 3xl:max-w-[440px] 4xl:max-w-[550px] 4xl:!mb-8">
                    Uma experiência para professores que valorizam cada aluno e promovem uma educação inclusiva.
                </p>

                <div className="flex flex-col gap-4 4xl:gap-7">
                    {[
                        "Acompanhamento focado em neurodiversidade",
                        "Ferramentas de suporte à acessibilidade",
                        "Gestão humanizada de alunos e turmas",
                    ].map((texto) => (
                        <div key={texto} className="flex items-center gap-3 4xl:gap-5 text-white text-base 3xl:text-xl 4xl:text-3xl">
                            <span className="flex items-center justify-center rounded-[2px] !p-0.5 4xl:!p-1 font-bold bg-luna-cabecalho-dois">
                                <Check className="size-4 4xl:size-8" />
                            </span>
                            <p>{texto}</p>
                        </div>
                    ))}
                </div>
            </aside>

            <main className="flex-1 flex flex-col items-center justify-center !px-6 !py-24 lg:!py-10">
                <form
                    onSubmit={handleSubmit}
                    className="w-full max-w-2xl 3xl:max-w-4xl 4xl:max-w-6xl flex flex-col items-center gap-6 4xl:gap-12"
                >
                    <div className="w-full flex flex-col items-start text-left gap-1 4xl:gap-3 font-sans">
                        <h2 className="font-semibold text-3xl 3xl:text-5xl 4xl:text-7xl text-luna-teal leading-tight">Cadastro</h2>
                        <p className="font-light text-sm 3xl:text-xl 4xl:text-3xl text-gray-400">Preencha com seus Dados</p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-10 lg:gap-x-16 4xl:gap-x-28 gap-y-4 4xl:gap-y-10 w-full">
                        <div className={campo}>
                            <Input id="nome" label="Nome" type="text" placeholder="Nome" value={nome} onChange={(e) => setNome(e.target.value)} required />
                            <UserPen className={icone} />
                        </div>

                        <div className={campo}>
                            <Input id="sobrenome" label="Sobrenome" type="text" placeholder="Sobrenome" value={sobrenome} onChange={(e) => setSobrenome(e.target.value)} required />
                            <UserPen className={icone} />
                        </div>

                        <div className={campo}>
                            <Input
                                id="cpf"
                                label="CPF"
                                type="text"
                                placeholder="000.000.000-00"
                                value={cpf}
                                onChange={(e) => setCpf(e.target.value)}
                                required
                            />
                            <IdCard className={icone} />
                        </div>

                        <div className={campo}>
                            <Input id="cidade" label="Cidade" type="text" placeholder="Cidade" value={cidade} onChange={(e) => setCidade(e.target.value)} required />
                            <Building2 className={icone} />
                        </div>

                        <div className={campo}>
                            <Input id="email" label="E-mail" type="email" placeholder="professor@gmail.com" value={email} onChange={(e) => setEmail(e.target.value)} required />
                            <Mail className={icone} />
                        </div>

                        <div className={campo}>
                            <Input
                                id="dataNasc"
                                label="Data de Nascimento"
                                type="date"
                                value={dataNasc}
                                onChange={(e) => setDataNasc(e.target.value)}
                                required
                            />
                            <Calendar className={icone} />
                        </div>

                        <div className={campo}>
                            <Input id="telefone" label="Telefone" type="text" placeholder="(00)00000-0000" value={telefone} onChange={(e) => setTelefone(e.target.value)} required />
                            <Smartphone className={icone} />
                        </div>

                        <div className={campo}>
                            <Input
                                id="senha"
                                label="Senha"
                                type={verSenha ? "text" : "password"}
                                placeholder="Senha"
                                value={senha}
                                onChange={(e) => setSenha(e.target.value)}
                                required
                            />
                            <div className="absolute right-0 bottom-2 cursor-pointer text-luna-teal" onClick={toggleSenha}>
                                {verSenha
                                    ? <Eye className="size-[18px] 4xl:size-10" />
                                    : <EyeClosed className="size-[18px] 4xl:size-8" />}
                            </div>
                        </div>
                    </div>

                    <UploadImagem
                        label="Imagem do Rosto do Docente"
                        onChange={(file) => setImagem(file)}
                    />

                    {erro && <p className="text-red-500 text-sm 4xl:text-2xl">{erro}</p>}

                    <Button
                        type="submit"
                        className="w-50 3xl:w-52 4xl:w-72 !p-2.5 4xl:!p-4 bg-luna-teal border-none text-white rounded-xl 4xl:rounded-2xl font-sans font-bold text-2xl 4xl:text-4xl cursor-pointer"
                        disabled={carregando}
                    >
                        {carregando ? "Cadastrando..." : "Cadastrar"}
                    </Button>

                    <p className="font-sans text-base 3xl:text-xl 4xl:text-3xl text-center">
                        Já possui conta?{" "}
                        <Link to="/" className="text-luna-teal font-semibold no-underline">
                            Entrar!
                        </Link>
                    </p>
                </form>
            </main>
        </div>
    )
}

export default Cadastro
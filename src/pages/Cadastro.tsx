import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { AxiosError } from "axios"
import NavTitulo from "../components/escola/NavbarTitulo"
import Button from "../components/escola/button"
import Input from "../components/escola/input"
import UploadImagem from "../components/escola/buttonImage"
import { Check, Circle, IdCard, Eye, EyeClosed,Mail, Building2, Smartphone, UserPen, Calendar } from "lucide-react"
import { api } from "../services/api"

function Cadastro() {
    const [nome, setNome] = useState("")
    const [cpf, setCpf] = useState("")
    const [email, setEmail] = useState("")
    const [sobrenome, setSobrenome] = useState("")
    const [telefone, setTelefone] = useState("")
    const [cidade, setCidade] = useState("")
    const [rua, setRua] = useState("")
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
        setCarregando(true)

        try {
            const form = new FormData()

            const cpfLimpo = cpf.replace(/\D/g, '')

            // colocar informações do professor

            // form.append("dadosEscola[nome]", nome)
            // form.append("dadosEscola[cpf]", cnpjLimpo)
            // form.append("dadosEscola[telefone]", telefone)

            // form.append("dadosEscola[endereco][rua]", rua)
            // form.append("dadosEscola[endereco][bairro]", bairro)
            // form.append("dadosEscola[endereco][cidade]", cidade)

            // form.append("dadosUsuario[email]", email)
            // form.append("dadosUsuario[senha]", senha)

            if (imagem) form.append("foto", imagem)

            await api.post("/escolas", form, {
                headers: { "Content-Type": "multipart/form-data" }
            })

            alert("Escola cadastrada com sucesso!")
            navigate("/")
        } catch (err) {
            const erroAxios = err as AxiosError<{ erro?: string; detalhes?: string }>
            console.error("Detalhes do erro:", erroAxios.response?.data?.detalhes)
            setErro(erroAxios.response?.data?.erro || "Erro inesperado ao cadastrar")
        } finally {
            setCarregando(false)
        }
    }

    return (
        <div className="relative w-full h-full bg-[#fdfdf8] flex items-center gap-[250px] overflow-hidden">
            <NavTitulo />

            <div className="flex flex-col justify-start !py-[100px] !px-[30px] bg-luna-teal h-screen rounded-tr-3xl rounded-br-3xl font-sans [font-optical-sizing:auto] shadow-lg gap-[40px] shrink-0">
                <div className="flex items-center bg-luna-cabecalho-dois h-0 w-[300px] !p-4 font-light text-base text-luna-peach rounded-full gap-2">
                    <Circle size={16} fill="#D9D9D9" />
                    <p>
                        PLATAFORMA EDUCACIONAL
                    </p>
                </div>

                <h1 className="text-white text-5xl w-[360px] font-semibold ">
                    Educação que <span className="text-luna-peach italic font-light">acolhe</span> cada aluno.
                </h1>

                <p className="text-white text-base w-[330px] !mb-6">
                    Uma experiência para professores que valorizam cada aluno e promovem uma educação inclusiva.
                </p>

                <div className="flex flex-col gap-4">
                    <div className="flex items-center gap-3 text-white text-base">
                        <p className="flex items-center justify-center rounded-[2px] !p-0.5 font-bold bg-luna-cabecalho-dois">
                            <Check size={16} />
                        </p>
                        <p>
                            Acompanhamento focado em neurodiversidade
                        </p>
                    </div>
                    <div className="flex items-center gap-3 text-white text-base">
                        <p className="flex items-center justify-center rounded-[2px] !p-0.5 font-bold bg-luna-cabecalho-dois">
                            <Check size={16} />
                        </p>
                        <p>
                            Ferramentas de suporte à acessibilidade
                        </p>
                    </div>
                    <div className="flex items-center gap-3 text-white text-base">
                        <p className="flex items-center justify-center rounded-[2px] !p-0.5 font-bold bg-luna-cabecalho-dois">
                            <Check size={16} />
                        </p>
                        <p>
                            Gestão humanizada de alunos e turmas
                        </p>
                    </div>
                </div>
            </div>

            <div className="flex-1 w-full flex flex-col items-center justify-center pl-6! pr-6! lg:pl-8! lg:pr-12! xl:pl-10! xl:pr-40! -translate-y-8">
                <form onSubmit={handleSubmit} className="w-full max-w-3xl flex flex-col items-center px-4">
                    <div className="w-full flex flex-col gap-4">
                        <div className="w-full self-start flex flex-col items-start text-left">
                            <h2 className="font-semibold text-[32px] text-luna-teal leading-tight">Cadastro</h2>
                            <p className="text-brand-gray font-light text-[14px] text-gray-400">Preencha com seus Dados</p>
                        </div>

                        <div className="grid grid-cols-2 gap-x-20 gap-y-4 w-full">
                            <div className="flex flex-col gap-4">
                                <div className="relative w-full flex flex-col">
                                    <Input id="nome" label="Nome" type="text" placeholder="Nome" value={nome} onChange={(e) => setNome(e.target.value)} required />
                                    <UserPen size={18} className="absolute right-0 bottom-2 pointer-events-none text-luna-teal" />
                                </div>
                                <div className="relative w-full flex flex-col">
                                    <Input id="cpf" label="CPF" type="text" placeholder="000.000.000-00" value={cpf} onChange={(e) => setCpf(e.target.value)} required />
                                    <IdCard size={18} className="absolute right-0 bottom-2 pointer-events-none text-luna-teal" />
                                </div>
                                <div className="relative w-full flex flex-col">
                                    <Input id="email" label="E-mail" type="email" placeholder="professor@gmail.com" value={email} onChange={(e) => setEmail(e.target.value)} required />
                                    <Mail size={18} className="absolute right-0 bottom-2 pointer-events-none text-luna-teal" />
                                </div>
                                <div className="relative w-full flex flex-col">
                                    <Input id="telefone" label="Telefone" type="text" placeholder="(00)00000-0000" value={telefone} onChange={(e) => setTelefone(e.target.value)} required />
                                    <Smartphone size={18} className="absolute right-0 bottom-2 pointer-events-none text-luna-teal" />
                                </div>
                            </div>

                            <div className="flex flex-col gap-4">
                                <div className="relative w-full flex flex-col">
                                    <Input id="sobrenome" label="Sobrenome" type="text" placeholder="Sobrenome" value={sobrenome} onChange={(e) => setSobrenome(e.target.value)} required />
                                    <UserPen size={18} className="absolute right-0 bottom-2 pointer-events-none text-luna-teal" />
                                </div>
                                <div className="relative w-full flex flex-col">
                                    <Input id="cidade" label="Cidade" type="text" placeholder="Cidade" value={cidade} onChange={(e) => setCidade(e.target.value)} required />
                                    <Building2 size={18} className="absolute right-0 bottom-2 pointer-events-none text-luna-teal" />
                                </div>
                                <div className="relative w-full flex flex-col">
                                    <Input id="dtaNascimento" label="Data de Nascimento" type="text" placeholder="00/00/0000" value={rua} onChange={(e) => setRua(e.target.value)} required />
                                    <Calendar size={18} className="absolute right-0 bottom-2 pointer-events-none text-luna-teal" />
                                </div>
                                <div className="relative w-full flex flex-col">
                                    <Input
                                        id="senha"
                                        label="Senha"
                                        type={verSenha ? "text" : "password"}
                                        placeholder="Senha"
                                        value={senha}
                                        onChange={(e) => setSenha(e.target.value)}
                                        required
                                    />
                                    <div className="absolute right-0 bottom-0 cursor-pointer text-luna-teal" onClick={toggleSenha}>
                                        {verSenha ? <Eye size={18} /> : <EyeClosed size={18} />}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="mt-3! flex flex-col items-center w-full gap-2">
                        <UploadImagem
                            label="Imagem do Rosto do Docente"
                            onChange={(file) => setImagem(file)}
                        />
                    </div>

                    {erro && <p className="text-red-500 text-sm mt-2">{erro}</p>}

                    <div className="mt-7! flex justify-center w-full">
                        <Button
                            type="submit"
                            className="w-44 !p-2.5 max-w-md bg-luna-teal border-none text-white rounded-xl font-sans font-bold text-2xl"
                            disabled={carregando}
                        >
                            {carregando ? "Cadastrando..." : "Cadastrar"}
                        </Button>
                    </div>
                </form>

                <p className="mt-4! text-base text-brand-gray text-center">
                    Já possui conta? <span><Link to="/" className="text-luna-teal font-semibold no-underline">Entrar!</Link></span>
                </p>
            </div>
        </div>
    )
}

export default Cadastro

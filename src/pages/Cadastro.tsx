import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import NavTitulo from "../components/escola/NavbarTitulo"
import Button from "../components/escola/button"
import Input from "../components/escola/input"
import UploadImagem from "../components/escola/buttonImage"
import { Check, Circle, IdCard, Eye, EyeClosed, Map, Mail, Building2, Smartphone, StretchVertical, UserPen } from "lucide-react"
import { api } from "../services/api"

function Cadastro() {
    const [nome, setNome] = useState("")
    const [cnpj, setCnpj] = useState("")
    const [email, setEmail] = useState("")
    const [bairro, setBairro] = useState("")
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

            const cnpjLimpo = cnpj.replace(/\D/g, '')

            form.append("dadosEscola[nome]", nome)
            form.append("dadosEscola[cnpj]", cnpjLimpo)
            form.append("dadosEscola[telefone]", telefone)

            form.append("dadosEscola[endereco][rua]", rua)
            form.append("dadosEscola[endereco][bairro]", bairro)
            form.append("dadosEscola[endereco][cidade]", cidade)

            form.append("dadosUsuario[email]", email)
            form.append("dadosUsuario[senha]", senha)

            // 5. Imagem
            if (imagem) form.append("foto", imagem)

            await api.post("/escolas", form, {
                headers: { "Content-Type": "multipart/form-data" }
            })

            alert("Escola cadastrada com sucesso!")
            navigate("/")
        } catch (err: any) {
            console.error("Detalhes do erro:", err.response?.data?.detalhes)
            setErro(err.response?.data?.erro || "Erro inesperado ao cadastrar")
        } finally {
            setCarregando(false)
        }
    }

    return (
        <div className="containerCadastro">
            <NavTitulo />

            <div className="principal-info-right">
                <div className="principal-platform-title">
                    <Circle size={16} fill="#D9D9D9" />
                    <p>PLATAFORMA ESCOLAR</p>
                </div>

                <h1 className="principal-info-right-title">
                    Educação que <span>acolhe</span> cada aluno.
                </h1>

                <p className="principal-info-right-description">
                    Uma experiência pensada para escolas que valorizam o cuidado individual, a organização inteligente e o desenvolvimento neurodiverso.
                </p>

                <div className="principal-info-right-opcs">
                    <div className="principal-info-right-opc">
                        <p className="opc-icon"><Check size={16} /></p>
                        <p className="opc-description">Acompanhamento focado em neurodiversidade</p>
                    </div>
                    <div className="principal-info-right-opc">
                        <p className="opc-icon"><Check size={16} /></p>
                        <p className="opc-description">Ferramentas de suporte à acessibilidade</p>
                    </div>
                    <div className="principal-info-right-opc">
                        <p className="opc-icon"><Check size={16} /></p>
                        <p className="opc-description">Gestão humanizada de alunos e turmas</p>
                    </div>
                </div>
            </div>

            <div className="flex-1 w-full flex flex-col items-start justify-start pl-8 lg:pl-12 -translate-y-8">
                <form onSubmit={handleSubmit} className="w-full max-w-3xl flex flex-col items-center px-4">
                    <div className="w-full flex flex-col gap-6">
                        <div className="w-full self-start flex flex-col items-start text-left">
                            <h2 className="font-semibold text-[32px] text-luna-teal leading-tight">Cadastro</h2>
                            <p className="text-brand-gray font-light text-[14px]">Preencha os dados da instituição</p>
                        </div>

                        <div className="grid grid-cols-2 gap-x-20 gap-y-5 w-full">
                            <div className="flex flex-col gap-5">
                                <div className="input-container">
                                    <Input id="nome" label="Nome" type="text" placeholder="Nome" value={nome} onChange={(e) => setNome(e.target.value)} required />
                                    <UserPen size={18} />
                                </div>
                                <div className="input-container">
                                    <Input id="cnpj" label="CNPJ" type="text" placeholder="CNPJ" value={cnpj} onChange={(e) => setCnpj(e.target.value)} required />
                                    <IdCard size={18} />
                                </div>
                                <div className="input-container">
                                    <Input id="email" label="E-mail" type="email" placeholder="E-mail" value={email} onChange={(e) => setEmail(e.target.value)} required />
                                    <Mail size={18} />
                                </div>
                                <div className="input-container">
                                    <Input id="telefone" label="Telefone" type="text" placeholder="Telefone" value={telefone} onChange={(e) => setTelefone(e.target.value)} required />
                                    <Smartphone size={18} />
                                </div>
                            </div>

                            <div className="flex flex-col gap-5">
                                <div className="input-container">
                                    <Input id="bairro" label="Bairro" type="text" placeholder="Bairro" value={bairro} onChange={(e) => setBairro(e.target.value)} required />
                                    <Map size={18} />
                                </div>
                                <div className="input-container">
                                    <Input id="cidade" label="Cidade" type="text" placeholder="Cidade" value={cidade} onChange={(e) => setCidade(e.target.value)} required />
                                    <Building2 size={18} />
                                </div>
                                <div className="input-container">
                                    <Input id="rua" label="Rua" type="text" placeholder="Rua" value={rua} onChange={(e) => setRua(e.target.value)} required />
                                    <StretchVertical size={18} />
                                </div>
                                <div className="input-container">
                                    <Input
                                        id="senha"
                                        label="Senha"
                                        type={verSenha ? "text" : "password"}
                                        placeholder="Senha"
                                        value={senha}
                                        onChange={(e) => setSenha(e.target.value)}
                                        required
                                    />
                                    <div className="icon-container-password" onClick={toggleSenha}>
                                        {verSenha ? <Eye size={18} /> : <EyeClosed size={18} />}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="mt-3.5! flex flex-col items-center w-full gap-6">
                        <UploadImagem
                            label="Imagem da Escola"
                            onChange={(file) => setImagem(file)}
                        />
                    </div>

                    {erro && <p className="text-red-500 text-sm mt-2">{erro}</p>}

                    <div className="mt-3.5! flex justify-center w-full">
                        <Button
                            type="submit"
                            className="submitCadastrar w-full max-w-md"
                            disabled={carregando}
                        >
                            {carregando ? "Cadastrando..." : "Cadastrar"}
                        </Button>
                    </div>
                </form>

                <p className="mt-6! text-sm text-brand-gray self-start! text-center w-full max-w-3xl mx-auto">
                    Já possui conta? <span><Link to="/" className="text-luna-teal font-semibold underline">Entrar!</Link></span>
                </p>
            </div>
        </div>
    )
}

export default Cadastro
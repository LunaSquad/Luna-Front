import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import NavTitulo from "../components/escola/NavbarTitulo"
import Button from "../components/escola/button"
import Input from "../components/escola/input"
import { Check, Circle, Mail, Eye, EyeClosed } from "lucide-react"
import { api } from '../services/api';

function Login() {
    const [email, setEmail] = useState("")
    const [senha, setSenha] = useState("")
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
            const response = await api.post("/login", { email, senha });

            const usuario = response.data.usuario;

            localStorage.setItem("token", response.data.token);
            localStorage.setItem("user", JSON.stringify(response.data.usuario));

            if (usuario.tipoUser === "escola") {
                navigate("/home");
            } else if (usuario.tipoUser === "professor") {
                navigate("/professor/home");
            } else {
                setErro("Tipo de utilizador desconhecido.");
            }

        } catch (err: any) {
            setErro(err.response?.data?.erro || "Erro inesperado ao fazer login");
        } finally {
            setCarregando(false);
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

            <div className="relative flex justify-start items-center flex-col !p-5 bg-transparent w-full max-w-150 h-137 rounded-lg gap-12">
                <div className="flex flex-col w-75 font-sans gap-1.5">
                    <h2 className="font-semibold text-3xl text-luna-teal">Entrar</h2>
                    <p className="font-normal text-base text-gray-400">Acesse sua conta</p>
                </div>
                <form onSubmit={handleSubmit} className="flex justify-start min-w-75 gap-10 flex-col">
                    <div className="relative flex flex-col gap-5.5 w-75 font-sans [font-optical-sizing:auto] font-bold font-normal text-lg text-luna-teal">
                        <Input
                            id="email"
                            label="E-mail"
                            type="email"
                            placeholder="E-mail"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <Mail size={18} className="absolute right-0 bottom-2 pointer-events-none" />
                    </div>
                    <div className="relative flex flex-col gap-5.5 w-75 font-sans [font-optical-sizing:auto] font-bold font-normal text-lg text-luna-teal">
                        <Input
                            id="senha"
                            label="Senha"
                            type={verSenha ? "text" : "password"}
                            placeholder="Senha"
                            value={senha}
                            onChange={(e) => setSenha(e.target.value)}
                        />
                        <div className="absolute right-0 bottom-2 cursor-pointer" onClick={toggleSenha}>
                            {verSenha ? <EyeClosed size={18} /> : <Eye size={18} />}
                        </div>
                    </div>

                    {erro && <p>{erro}</p>}

                    <div className="flex justify-center h-10 !mt-5">
                        <Button
                            type="submit"
                            className="w-32.5 border-none rounded-xl bg-luna-teal text-white font-sans [font-optical-sizing:auto] font-bold text-xl cursor-pointer"
                            disabled={carregando}
                        >
                            {carregando ? "Entrando..." : "Acessar"}
                        </Button>
                    </div>
                </form>

                <p className="font-sans font-light">
                    Novo por aqui? 
                    <span className="text-luna-teal font-bold no-underline">
                        <Link to="/cadastro">
                        Cadastre-se
                        </Link>
                    </span>
                </p>
            </div>

        </div>


    )
}

export default Login
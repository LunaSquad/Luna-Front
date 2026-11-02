import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import NavTitulo from "../components/escola/NavbarTitulo"
import Button from "../components/escola/button"
import Input from "../components/escola/input"
import { Check, Circle, Mail, Eye, EyeClosed } from "lucide-react"
import { http } from '../services/api';

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
            const response = await http.post("/login", { email, senha });

            const usuario = response.data.usuario;

            
            if (usuario.tipoUser === "professor") {
                localStorage.setItem("token", response.data.token);
                localStorage.setItem("user", JSON.stringify(response.data.usuario));
                navigate("/professor/home");
            } else {
                setErro("Acesso Restrito Somente para Professores");
            }

        } catch (err: any) {
            setErro(err.response?.data?.erro || "Erro inesperado ao fazer login");
        } finally {
            setCarregando(false);
        }
    }


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

            <main className="flex-1 flex flex-col items-center justify-center gap-10 4xl:gap-16 !px-6 !py-24 lg:!py-10">
                <div className="flex flex-col w-full max-w-xs 3xl:max-w-md 4xl:max-w-2xl gap-1.5 4xl:gap-3 font-sans">
                    <h2 className="font-semibold text-3xl 3xl:text-5xl 4xl:text-7xl text-luna-teal">Entrar</h2>
                    <p className="font-normal text-base 3xl:text-xl 4xl:text-3xl text-gray-400">Acesse sua conta</p>
                </div>

                <form onSubmit={handleSubmit} className="flex flex-col w-full max-w-xs 3xl:max-w-md 4xl:max-w-2xl gap-14 4xl:gap-24">
                    <div className="relative flex flex-col font-sans [font-optical-sizing:auto] font-bold text-lg 3xl:text-2xl 4xl:text-4xl text-luna-teal">
                        <Input
                            id="email"
                            label="E-mail"
                            type="email"
                            placeholder="E-mail"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <Mail className="absolute right-0 bottom-2 pointer-events-none size-[18px] 4xl:size-8" />
                    </div>

                    <div className="relative flex flex-col font-sans [font-optical-sizing:auto] font-bold text-lg 3xl:text-2xl 4xl:text-4xl text-luna-teal">
                        <Input
                            id="senha"
                            label="Senha"
                            type={verSenha ? "text" : "password"}
                            placeholder="Senha"
                            value={senha}
                            onChange={(e) => setSenha(e.target.value)}
                        />
                        <div className="absolute right-0 bottom-2 cursor-pointer" onClick={toggleSenha}>
                            {verSenha
                                ? <EyeClosed className="size-[18px] 4xl:size-8" />
                                : <Eye className="size-[18px] 4xl:size-8" />}
                        </div>
                    </div>

                    {erro && <p className="text-red-500 text-sm 4xl:text-2xl">{erro}</p>}

                    <div className="flex justify-center">
                        <Button
                            type="submit"
                            className="w-40 3xl:w-52 4xl:w-72 !p-2 4xl:!p-4 border-none rounded-xl 4xl:rounded-2xl bg-luna-teal text-white font-sans [font-optical-sizing:auto] font-bold text-xl 3xl:text-2xl 4xl:text-4xl cursor-pointer"
                            disabled={carregando}
                        >
                            {carregando ? "Entrando..." : "Acessar"}
                        </Button>
                    </div>
                </form>

                <p className="font-sans font-light 3xl:text-xl 4xl:text-3xl">
                    Novo por aqui?{" "}
                    <Link to="/cadastro" className="text-luna-teal font-bold no-underline">
                        Cadastre-se
                    </Link>
                </p>
            </main>
        </div>
    )
}

export default Login
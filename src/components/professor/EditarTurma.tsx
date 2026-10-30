import { useEffect, useState } from "react";
import {
    X,
    Copy,
    Check,
    Share2,
    Users,
    Link as LinkIcon,
} from "lucide-react";
import { QRCode } from "react-qrcode-logo";

interface Turma {
    _id: string;
    nome: string;
}

interface EditarTurmaProps {
    isOpen: boolean;
    onClose: () => void;
    turma: Turma | null;
    inviteLink: string;
    onSalvar: (id: string, novoNome: string) => void;
}

export default function EditarTurma({
    isOpen,
    onClose,
    turma,
    inviteLink,
    onSalvar,
}: EditarTurmaProps) {
    const [nomeTurma, setNomeTurma] = useState("");
    const [copiado, setCopiado] = useState(false);

    // Atualiza o campo quando outra turma é selecionada
    useEffect(() => {
        if (turma) {
            // setNomeTurma(turma.nome);
        }
    }, [turma]);

    if (!isOpen || !turma) return null;

    const handleSalvar = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const nome = nomeTurma.trim();

        if (!nome) {
            alert("Digite o nome da turma!");
            return;
        }

        onSalvar(turma._id, nome);
        onClose();
    };

    const handleCopiarLink = async () => {
        try {
            await navigator.clipboard.writeText(inviteLink);

            setCopiado(true);

            setTimeout(() => {
                setCopiado(false);
            }, 2000);
        } catch (error) {
            console.error("Erro ao copiar o link:", error);
            alert("Não foi possível copiar o link.");
        }
    };

    const handleCompartilhar = async () => {
        try {
            if (navigator.share) {
                await navigator.share({
                    title: `Convite para a turma ${nomeTurma}`,
                    text: "Acesse o link para entrar na turma:",
                    url: inviteLink,
                });
            } else {
                await handleCopiarLink();
            }
        } catch (error) {
            if (error instanceof Error && error.name !== "AbortError") {
                console.error("Erro ao compartilhar:", error);
            }
        }
    };

    const handleOutsideClick = (
        e: React.MouseEvent<HTMLDivElement>
    ) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm !p-4 animate-in fade-in duration-200"
            onClick={handleOutsideClick}
        >
            <form
                onSubmit={handleSalvar}
                className="relative flex flex-col w-full max-w-[440px] max-h-[90vh] overflow-y-auto bg-white rounded-2xl !px-10 !pt-10 !pb-8 shadow-2xl"
            >
                {/* Fechar */}
                <button
                    type="button"
                    onClick={onClose}
                    className="absolute top-3 right-2 text-luna-teal hover:opacity-70 transition cursor-pointer border-none bg-transparent"
                    title="Fechar"
                >
                    <X size={24} strokeWidth={2.5} />
                </button>

                {/* Título */}
                <h2 className="!m-0 !mb-4 font-sans font-bold text-lg text-luna-teal">
                    Turma
                </h2>

                {/* Nome da turma */}
                <div className="relative flex items-center w-full border-b border-luna-teal">
                    <input
                        id="nomeTurma"
                        type="text"
                        value={nomeTurma}
                        onChange={(e) => setNomeTurma(e.target.value)}
                        placeholder="Nome da turma"
                        className="w-full min-w-0 !py-2 !pr-8 bg-transparent outline-none border-none font-sans text-sm text-slate-700 placeholder:text-slate-500"
                        aria-label="Nome da turma"
                    />

                    <Users
                        size={17}
                        className="absolute right-0 text-luna-teal pointer-events-none"
                    />
                </div>

                {/* Link de convite */}
                <div className="flex items-center gap-2 w-full !mt-8 !p-3 rounded-xl border border-gray-100 bg-white shadow-sm">
                    <div className="flex items-center flex-1 min-w-0 gap-2 bg-gray-100 rounded-sm !px-3 !py-3">
                        <span className="text-luna-teal text-sm font-medium truncate">
                            {inviteLink}
                        </span>
                    </div>

                    <button
                        type="button"
                        onClick={handleCopiarLink}
                        className="text-luna-teal hover:text-luna-teal/70 transition-colors cursor-pointer border-none bg-transparent shrink-0"
                        title="Copiar link"
                    >
                        {copiado ? (
                            <Check size={19} className="text-green-600" />
                        ) : (
                            <Copy size={19} />
                        )}
                    </button>
                </div>

                {/* QR Code */}
                <div className="relative w-full bg-slate-50/50 border border-gray-100 rounded-xl !p-3 flex flex-col items-center justify-center shadow-sm !mt-6">
                    <div className="bg-white !p-2 rounded-2xl shadow-sm">
                        <QRCode
                            value={inviteLink}
                            size={220}
                            fgColor="#175b5b"
                            bgColor="#ffffff"
                            qrStyle="squares"
                            eyeRadius={[
                                [10, 10, 0, 10],
                                [10, 10, 10, 10],
                                [10, 10, 10, 10],
                            ]}
                        />

                        {/* Ícone central */}
                        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                            <div className="bg-white !px-4 p!y-2 flex flex-col items-center justify-center rounded-lg shadow-sm border border-gray-100">
                                <LinkIcon size={28} className="text-luna-teal stroke-[2.5]" />
                                <span className="text-luna-teal font-bold text-[10px] !mt-1 tracking-widest">
                                    Luna
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Compartilhar */}
                    <button
                        type="button"
                        onClick={handleCompartilhar}
                        className="absolute bottom-4 right-4 text-luna-teal hover:text-luna-teal/70 transition-colors cursor-pointer border-none bg-transparent"
                        title="Compartilhar convite"
                    >
                        <Share2 size={21} strokeWidth={2.5} />
                    </button>
                </div>

                {/* Salvar nome da turma */}
                <button
                    type="submit"
                    className="w-full !mt-5 !py-2.5 rounded-lg bg-luna-teal text-white font-sans font-semibold cursor-pointer border-none hover:opacity-90 transition"
                >
                    Salvar alterações
                </button>
            </form>
        </div>
    );
}

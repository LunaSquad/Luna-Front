import { useState } from "react";
import { X, Copy, Check, Share2, Link as LinkIcon } from "lucide-react";
import { QRCode } from "react-qrcode-logo";

interface ConviteAlunoProps {
    isOpen: boolean;
    onClose: () => void;
    inviteLink: string;
}

export default function ConviteAluno({ isOpen, onClose, inviteLink }: ConviteAlunoProps) {
    const [copiado, setCopiado] = useState(false);

    if (!isOpen) return null;

    const handleCopiarLink = async () => {
        try {
            await navigator.clipboard.writeText(inviteLink);
            setCopiado(true);
            setTimeout(() => setCopiado(false), 2000);
        } catch (err) {
            console.error("Falha ao copiar o link", err);
        }
    };

    // Fechar ao clicar fora do modal
    const handleOutsideClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    return (
        <div 
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm !p-4 animate-in fade-in duration-200"
            onClick={handleOutsideClick}
        >
            <div className="flex flex-col relative w-full max-w-md bg-white rounded-2xl !p-10 shadow-2xl items-center gap-6">
                
                {/* Botão Fechar */}
                <button 
                    onClick={onClose}
                    className="absolute top-3 right-2 text-luna-teal hover:text-luna-teal/70 transition-colors cursor-pointer border-none bg-transparent"
                >
                    <X size={28} strokeWidth={2.5} />
                </button>

                {/* Área do Link */}
                <div className="w-full !mt-4">
                    <div className="flex items-center justify-between bg-gray-100/80 border border-gray-200 !p-4 rounded-xl gap-2">
                        <span className="text-luna-teal text-sm font-medium truncate">
                            {inviteLink}
                        </span>
                        <button 
                            onClick={handleCopiarLink}
                            className="text-luna-teal hover:text-luna-teal/70 transition-colors cursor-pointer border-none bg-transparent shrink-0"
                            title="Copiar link"
                        >
                            {copiado ? <Check size={20} className="text-green-500" /> : <Copy size={20} />}
                        </button>
                    </div>
                </div>

                {/* Área do QR Code */}
                <div className="relative w-full bg-slate-50/50 border border-gray-100 rounded-3xl !p-6 flex flex-col items-center justify-center shadow-sm !m-2">
                    
                    <div className="bg-white p-2 rounded-2xl shadow-sm">
                        <QRCode
                            value={inviteLink}
                            size={220}
                            fgColor="#175b5b" // Cor dos pontinhos (ajuste para o HEX exato do seu luna-teal)
                            bgColor="#ffffff"
                            qrStyle="squares" // Deixa os pontinhos arredondados como no seu design
                            eyeRadius={[
                                [10, 10, 0, 10], // Arredondamento dos "olhos" do QR Code
                                [10, 10, 10, 10],
                                [10, 10, 10, 10],
                            ]}
                            logoImage="https://cdn-icons-png.flaticon.com/512/714/714034.png" // Opcional: Você pode passar a URL de uma logo aqui, mas faremos o ícone de link via CSS abaixo para ficar igual sua imagem
                            logoWidth={50}
                            logoHeight={50}
                            logoOpacity={0} // Ocultando a logo nativa para criar a nossa customizada abaixo
                        />
                        
                        {/* Box central customizado com o ícone de Link e texto "EXEMPLO" */}
                        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                            <div className="bg-white !px-4 p!y-2 flex flex-col items-center justify-center rounded-lg shadow-sm border border-gray-100">
                                <LinkIcon size={28} className="text-luna-teal stroke-[2.5]" />
                                <span className="text-luna-teal font-bold text-[10px] !mt-1 tracking-widest">
                                    Luna
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Botão de Compartilhar no canto inferior direito */}
                    <button className="absolute bottom-4 right-4 text-luna-teal hover:text-luna-teal/70 transition-colors cursor-pointer border-none bg-transparent">
                        <Share2 size={24} strokeWidth={2.5} />
                    </button>
                </div>
            </div>
        </div>
    );
}
import React from "react";
import { useNavigate} from "react-router-dom";
import logo from "../../assets/logo.svg"
import { ArrowLeft } from "lucide-react";

interface InfoHeaderProfessorProps{
    textoVoltar?: string;
    rotaVoltar: string;
}

export default function InfoHeaderProfessor({
    textoVoltar = "Voltar",
    rotaVoltar
}: InfoHeaderProfessorProps) {
    const navigate = useNavigate();
    return (
        <div className="flex w-full items-center justify-between">
            <div className="flex items-center gap-1">
                <button
                    onClick={() => navigate(rotaVoltar)}
                    className="flex h-12 items-center justify-center rounded-full text-luna-teal shrink cursor-pointer">
                    <ArrowLeft size={23} />
                </button>

                <div className="flex flex-col">
                    <h2 className="m-0 font-sans text-lg text-luna-teal">
                        {textoVoltar}
                    </h2>
                </div>
            </div>

            <div className="w-14">
                <img src={logo} alt="" />
            </div>
        </div>
    )
}
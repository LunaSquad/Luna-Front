import React from "react";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/logo.svg"
import { ArrowLeft } from "lucide-react";

export default function InfoHeaderProfessor() {
    const navigate = useNavigate();
    return (
        <div className="flex w-full items-center justify-between">
            <div className="flex items-center gap-1">
                <button
                    onClick={() => navigate(-1)}
                    className="flex h-12 items-center justify-center rounded-full text-luna-teal shrink">
                    <ArrowLeft size={23} />
                </button>

                <div className="flex flex-col">
                    <h2 className="m-0 font-sans text-lg text-luna-teal">
                        Voltar para turmas
                    </h2>
                </div>
            </div>

            <div className="w-14">
                <img src={logo} alt="" />
            </div>
        </div>
    )
}
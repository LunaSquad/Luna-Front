import React from "react";
import logo from "../../assets/logo.svg"

interface InfoHeaderProps{
    icon: React.ReactNode
    title: string
    subtitle: string
}

export default function InfoHeader({
    icon, title, subtitle
} : InfoHeaderProps){
        return(
            <div className="flex w-full items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="flex w-12 h-12 items-center justify-center rounded-full bg-luna-icon-bg text-luna-teal shrink">
                            {icon}
                        </div>

                        <div className="flex flex-col gap-1">
                            <h2 className="m-0 font-sans font-semibold text-xl text-black">
                                {title}
                            </h2>

                            <p className="m-0 font-sans font-light text-sm text-black">
                                {subtitle}
                            </p>
                        </div>
                    </div>

                    <div className="w-14">
                        <img src={logo} alt="" />
                    </div>
            </div>
        )
    }
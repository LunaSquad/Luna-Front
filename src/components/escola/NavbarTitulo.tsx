import '../../index.css'
import logo from '../../assets/logo.svg'

export default function NavTitulo() {
    return (
        <nav className="fixed flex justify-between items-center top-0 bg-transparent w-full h-13 !p-8 z-[900]">
            <p className='font-museo [font-optical-sizing:auto] font-thin text-3xl text-luna-peach'>
                luna
            </p>

            <img
                src={logo}
                alt="logo do aplicativo, em formato de borboleta"
                className='w-10.5 h-10.5'
            />
        </nav>
    )
}
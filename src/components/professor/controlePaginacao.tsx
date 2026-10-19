
interface AtividadeControle {
    avatarUrl: string;
    nomeAluno: string;
    paginaAtual: number;
    totalPaginas: number;
    onAnterior: () => void;
    onProximo: () => void;
}

export default function ControlePaginacao({
    avatarUrl,
    nomeAluno,
    paginaAtual,
    totalPaginas,
    onAnterior,
    onProximo
}: AtividadeControle) {
    return (
        <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
                <img src={avatarUrl} alt="foto do aluno" className="h-12 w-12 rounded-full object-cover" />
                <span className="font-sans font-medium">{nomeAluno}</span>
            </div>
            <div className="flex items-center gap-4">
                <button
                    onClick={onAnterior}
                    disabled={paginaAtual === 1}
                    className="flex items-center gap-2 !px-4 !py-1 border border-teal-700 text-teal-700 rounded-md bg-white hover:bg-teal-50 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed font-medium text-sm transition-colors"
                >
                    <span className="text-lg leading-none">
                        &lsaquo;
                    </span>
                    Anterior
                </button>
                <span className="text-gray-800 font-medium text-sm">
                    {paginaAtual}/{totalPaginas}
                </span>
                <button
                    onClick={onProximo}
                    disabled={paginaAtual === totalPaginas}
                    className="flex items-center gap-2 !px-4 !py-1 border border-teal-700 text-teal-700 rounded-md bg-white hover:bg-teal-50 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed font-medium text-sm transition-colors"
                >
                    Próximo
                    <span className="text-lg leading-none">
                        &rsaquo;
                    </span>
                </button>
            </div>
        </div>
    );
}
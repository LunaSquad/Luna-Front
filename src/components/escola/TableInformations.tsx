import React from "react"

type Column<T> = {
    header: string
    accessor: keyof T | string
    render?: (row: T) => React.ReactNode
}

type TableProps<T extends {_id: string | number}> = {
    columns: Column<T>[]
    data: T[]
}

export default function Table<T extends {_id: string | number}>({columns, data}: TableProps<T>){
    return(
        <div className="w-full h-full overflow-auto bg-white rounded-3xl max-h-[440px] shadow-lg shadow-luna-shadow">
            <table className="w-full w-min-[600px] border-collapse">
                <thead className="bg-luna-cabecalho z-1 top-0 border-b border-luna-teal">
                    <tr>
                        {columns.map((col, index) => (
                            <th key={`${String(col.accessor)}-${index}`} className="text-left !py-4 !px-6 text-luna-teal font-sans font-bold z-1 top-0 border-b">
                                {col.header}
                            </th>
                        ))}
                    </tr>
                </thead>

                <tbody>
                    {data.map((row) => (
                        <tr key={row._id}>
                            {columns.map((col, colIndex) => (
                                <td key={`${String(col.accessor)}-${colIndex}`} className="!py-6 !px-6">
                                    {col.render
                                        ? col.render(row)
                                        : String(row[col.accessor as keyof T])
                                    }
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}
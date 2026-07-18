"use client";

import { ReactNode } from "react";

export interface Column<T> {
    header: string;
    accessor: (row: T) => ReactNode;
    align?: "left" | "right" | "center";
    className?: string;
}

interface DataTableProps<T> {
    columns: Column<T>[];
    data: T[];
    keyField: (row: T) => string;
    emptyMessage?: string;
    loading?: boolean;
}

export function DataTable<T>({
    columns,
    data,
    keyField,
    emptyMessage = "No records found.",
    loading = false,
}: DataTableProps<T>) {
    if (loading) {
        return (
            <div className="p-12 text-center text-fog font-mono text-sm animate-pulse">
                LOADING DATA...
            </div>
        );
    }

    if (data.length === 0) {
        return (
            <div className="p-12 text-center text-fog font-mono text-sm">
                {emptyMessage}
            </div>
        );
    }

    const alignClass = (align?: "left" | "right" | "center") =>
        align === "right" ? "text-right" : align === "center" ? "text-center" : "text-left";

    return (
        <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
                <thead>
                    <tr className="border-b border-gray-800 text-xs font-mono text-fog uppercase bg-black/30">
                        {columns.map((col, i) => (
                            <th
                                key={i}
                                className={`p-4 ${i === 0 ? "pl-6" : ""} ${i === columns.length - 1 ? "pr-6" : ""} ${alignClass(col.align)}`}
                            >
                                {col.header}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-800/60 text-sm">
                    {data.map((row) => (
                        <tr key={keyField(row)} className="hover:bg-gray-900/30 transition-colors">
                            {columns.map((col, i) => (
                                <td
                                    key={i}
                                    className={`p-4 ${i === 0 ? "pl-6" : ""} ${i === columns.length - 1 ? "pr-6" : ""} ${alignClass(col.align)} ${col.className || ""}`}
                                >
                                    {col.accessor(row)}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
'use client'

import { UploadSimple } from "@phosphor-icons/react";
// React
import { FunctionComponent, useState } from "react";

const MangaReader: FunctionComponent = () => {
    const [pdfFile, setPdfFile] = useState(null)
    return (
        <section className="flex w-full bg-slate-50/5 ">
            {
                pdfFile ? <section>
                    {/* Render PDF */}
                </section> : <section className="flex flex-col w-full items-center justify-center">
                    <section className="p-5 border-2 border-text/25 border-dashed rounded hover:cursor-pointer opacity-50 hover:opacity-100 transition-opacity duration-200 flex items-center gap-x-2">
                        <UploadSimple size={25} weight="bold" />
                        <span className="font-semibold opacity-75">Upload PDF</span>
                    </section>
                </section>
            }
        </section>
    )
}

export default MangaReader;
"use client";

import { FunctionComponent, useState, useEffect } from "react";
import { UploadSimple } from "@phosphor-icons/react";

interface FileState {
    file: File | null;
    imageUrls: string[]; // Array to store the URLs of extracted images
}

const MangaReader: FunctionComponent = () => {
    const [fileState, setFileState] = useState<FileState>({
        file: null,
        imageUrls: [],
    });

    const onFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;

        if (files && files.length > 0) {
            const file = files[0];
            setFileState({ file, imageUrls: [] });
        }
    };

    return (
        <section className="flex overflow-y-scroll w-full bg-slate-50/5">
            {fileState.file ? (
                <></>
            ) : (
                <section className="flex flex-col w-full items-center justify-center">
                    <label
                        htmlFor="cbz-upload"
                        className="p-5 border-2 border-text/25 border-dashed rounded hover:cursor-pointer opacity-50 hover:opacity-100 transition-opacity duration-200 flex items-center gap-x-2"
                    >
                        <UploadSimple size={25} weight="bold" />
                        <span className="font-semibold opacity-75">Upload CBZ</span>
                    </label>
                    <input
                        id="cbz-upload"
                        type="file"
                        accept=".cbz"
                        onChange={onFileChange}
                        style={{ display: "none" }}
                    />
                </section>
            )}
        </section>
    );
};

export default MangaReader;

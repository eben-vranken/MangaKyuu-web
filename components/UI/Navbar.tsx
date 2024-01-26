'use client';

import { Books } from "@phosphor-icons/react";
import Link from "next/link";
import { FunctionComponent } from "react";

const Navbar: FunctionComponent = () => {
    return (
        <nav className="h-16 flex justify-between items-center">
            {/* Nav Brand */}
            <Link className="font-bold text-lg flex items-center gap-x-1" href={'/'}>
                <Books size={25} weight="bold" className="text-primary" />
                <span>MangaKyuu</span>
            </Link>

            {/* Links */}
            <ul className="flex items-center gap-x-8 font-medium">
                <li>
                    <Link href={'/'}>Home</Link>
                </li>
            </ul>
        </nav>
    )
}

export default Navbar
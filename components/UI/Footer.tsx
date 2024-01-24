'use client';

import { GithubLogo } from "@phosphor-icons/react";
import { FunctionComponent } from "react";

const Footer: FunctionComponent = () => {
    return <footer className="h-10 flex justify-between items-center opacity-50">
        <span className="font-semibold">Eben Vranken</span>

        {/* Links */}
        <a href="https://github.com/eben-vranken" target="_blank">
            <GithubLogo size={25} />
        </a>
    </footer>
}

export default Footer;
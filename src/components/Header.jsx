import React from "react";
import SearchBar from "./SearchBar";

function Header() {
    // todo: fissare l'altezza di header con valori globali (occhio responsive)
    return (
        <header className="fixed top-0 z-10 flex items-center justify-between w-full p-4 bg-black ">
            <a
                className="text-4xl font-bold tracking-wider text-red-700 uppercase"
                href="/"
            >
                Boolflix
            </a>
            <SearchBar />
        </header>
    );
}

export default Header;

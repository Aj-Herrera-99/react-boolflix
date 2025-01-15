import React from "react";
import SearchBar from "./SearchBar";

function Header() {
    console.log("Header render");
    return (
        <header className="flex items-center justify-between p-4 bg-black">
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

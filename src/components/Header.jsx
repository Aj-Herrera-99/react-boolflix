import React from "react";
import SearchBar from "./SearchBar";
import { Link, useNavigate } from "react-router-dom";
import { useGlobalContext } from "../contexts/GlobalContext";

function Header() {
    const { setIsHomepage, setSearch } = useGlobalContext();

    const handleLinkClick = () => {
        setIsHomepage((curr) => !curr);
        setSearch("");
    };

    // todo: fissare l'altezza di header con valori globali (occhio responsive)
    return (
        <header className="fixed top-0 z-10 flex items-center justify-between w-full p-4 bg-black shadow-md shadow-stone-500">
            <Link
                onClick={handleLinkClick}
                to={"/"}
                className="text-4xl font-bold tracking-wider text-red-700 uppercase"
            >
                Boolflix
            </Link>
            <SearchBar />
        </header>
    );
}

export default Header;

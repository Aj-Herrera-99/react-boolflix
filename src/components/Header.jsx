import React from "react";
import SearchBar from "./SearchBar";
import { Link } from "react-router-dom";
import { useGlobalContext } from "../contexts/GlobalContext";

function Header() {
    const { setIsHomepage, setSearch } = useGlobalContext();

    const handleLinkClick = () => {
        setIsHomepage((curr) => !curr);
        setSearch("");
    };

    return (
        <header className="fixed top-0 z-10 flex items-center justify-between w-full p-4 bg-black shadow-lg shadow-stone-800">
            <Link
                onClick={handleLinkClick}
                to={"/"}
                className="text-5xl font-semibold tracking-wide text-red-700 uppercase"
            >
                Boolflix
            </Link>
            <SearchBar />
        </header>
    );
}

export default Header;

import React from "react";
import SearchBar from "./SearchBar";
import { Link, NavLink } from "react-router-dom";
import { useGlobalContext } from "../contexts/GlobalContext";

function Header() {
    const { setIsHomepage } = useGlobalContext();

    const handleLinkClick = () => {
        setIsHomepage((curr) => !curr);
    };

    return (
        <header className="fixed top-0 z-10 flex items-center justify-between w-full p-4 bg-black shadow-lg shadow-stone-800">
            <nav className="flex items-center gap-10">
                <Link
                    onClick={handleLinkClick}
                    to={"/"}
                    className="text-5xl font-semibold tracking-wide text-red-700 uppercase"
                >
                    Boolflix
                </Link>
                <Navbar />
            </nav>
            <SearchBar />
        </header>
    );
}

const appLinks = [
    { to: "/", label: "Home" },
    { to: "/tv", label: "Tv Shows" },
    { to: "/movies", label: "Movies" },
    { to: "/hot", label: "New & Popular" },
    { to: "/browse", label: "Browse by Languages" },
];

const linkClasses = "hover:text-white font-light tracking-wide text-sm md:text-lg";
function Navbar() {
    return (
        <div className="absolute left-0 justify-between flex w-full gap-6 px-2 py-2 text-white bg-[#000000e0] border-b lg:border-0 lg:py-0 lg:static top-full text-center">
            {appLinks.map((link, index) => (
                <NavLink
                    key={index}
                    to={link.to}
                    className={({ isActive }) =>
                        linkClasses +
                        (isActive ? " text-white" : " text-stone-400")
                    }
                >
                    {link.label}
                </NavLink>
            ))}
        </div>
    );
}

export default Header;

import React from "react";
import SearchBar from "./SearchBar";

function Header() {
    console.log("Header render")
    return (
        <header className="bg-red-300">
            Header
            <SearchBar />
        </header>
    );
}

export default Header;

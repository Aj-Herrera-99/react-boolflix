import React, { useState } from "react";
import { useGlobalContext } from "../contexts/GlobalContext";
import axios from "axios";
import * as glob from "../globals/globals";

function SearchBar() {
    const { search, setSearch } = useGlobalContext();
    console.log("SearchBar render");
    const [inputData, setInputData] = useState("");

    // actions
    const handleInputChange = (e) => {
        setSearch(e.target.value);
    };

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        const movieParams = {
            api_key: glob.api_key,
            query: "a",
        };
        axios
            .get(`${glob.api_url}/movie`, { params: movieParams })
            .then((res) => console.log(res.data));
    };
    return (
        <form onSubmit={handleSearchSubmit}>
            <input
                onChange={handleInputChange}
                type="text"
                placeholder="Search a title"
                value={search}
            />
            <button type="submit">Search</button>
        </form>
    );
}

export default SearchBar;

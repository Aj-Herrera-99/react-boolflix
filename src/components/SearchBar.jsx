import React, { useState } from "react";
import { useGlobalContext } from "../contexts/GlobalContext";
import * as glob from "../globals/globals";
import { getMedia } from "../utils/utils";

function SearchBar() {
    // todo: isLoading, setIsLoading
    const { search, setSearch, setMovies } = useGlobalContext();
    console.log("SearchBar render");

    // actions
    const handleInputChange = (e) => {
        if (e.target.value === "") {
            console.log("test");
            const params = {
                api_key: glob.api_key,
                query: "a",
            };
            getMedia(glob.api_url, "/movie", params, setMovies);
            getMedia(glob.api_url, "/tv", params, setMovies);
        }
        setSearch(e.target.value);
    };

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        const params = {
            api_key: glob.api_key,
            query: search ? search : "a",
        };
        getMedia(glob.api_url, "/movie", params, setMovies);
        getMedia(glob.api_url, "/tv", params, setMovies);
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

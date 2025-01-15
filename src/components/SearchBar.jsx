import React from "react";
import { useGlobalContext } from "../contexts/GlobalContext";
import * as glob from "../globals/globals";
import { getMedia } from "../utils/utils";

function SearchBar() {
    const { search, setSearch, setMovies, setSeries } = useGlobalContext();

    // actions
    const handleInputChange = (e) => {
        if (e.target.value === "") {
            const params = {
                api_key: glob.api_key,
                query: "a",
            };
            Promise.all([
                getMedia(glob.api_url, "/movie", params),
                getMedia(glob.api_url, "/tv", params),
            ])
                .then(([resMovie, resSeries]) => {
                    setMovies(resMovie.data.results);
                    setSeries(resSeries.data.results);
                })
                .catch((err) => console.error(err));
        }
        setSearch(e.target.value);
    };

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        const params = {
            api_key: glob.api_key,
            query: search ? search : "a",
        };
        Promise.all([
            getMedia(glob.api_url, "/movie", params),
            getMedia(glob.api_url, "/tv", params),
        ])
            .then(([resMovie, resSeries]) => {
                setMovies(resMovie.data.results);
                setSeries(resSeries.data.results);
            })
            .catch((err) => console.error(err));
    };
    return (
        <form onSubmit={handleSearchSubmit}>
            <input
                className="p-1 rounded-md"
                onChange={handleInputChange}
                type="text"
                placeholder="Search a title"
                value={search}
            />
            <button
                className="px-3 py-1 ml-2 bg-red-700 rounded-md"
                type="submit"
            >
                <span>
                    <i className="text-white fa-solid fa-magnifying-glass"></i>
                </span>
            </button>
        </form>
    );
}

export default SearchBar;

import React, { useState } from "react";
import { useGlobalContext } from "../contexts/GlobalContext";
import { useNavigate } from "react-router-dom";
import { api_key, api_search_url } from "../globals/globals";

function SearchBar() {
    const { search, setSearch, setMovies, setSeries, getMedia, setIsLoading } =
        useGlobalContext();

    const [isShown, setIsShown] = useState(false);

    const navigate = useNavigate();

    // actions
    const handleInputChange = (e) => {
        // * alla cancellazione dell'input mi fa il fetch dei media con query="a"
        // if (e.target.value === "") {
        //     const params = {
        //         api_key: api_key,
        //         query: "a",
        //     };
        //     Promise.all([
        //         getMedia(api_search_url, "/movie", params),
        //         getMedia(api_search_url, "/tv", params),
        //     ])
        //         .then(([resMovie, resSeries]) => {
        //             setMovies(resMovie.data.results);
        //             setSeries(resSeries.data.results);
        //         })
        //         .catch((err) => console.error(err));
        // }
        setSearch(e.target.value);
    };

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        if (search) {
            setIsLoading(true);
            const params = {
                api_key: api_key,
                query: search ? search : "a",
            };
            Promise.all([
                getMedia(api_search_url, "/movie", params),
                getMedia(api_search_url, "/tv", params),
            ])
                .then(([resMovie, resSeries]) => {
                    setMovies(resMovie.data.results);
                    setSeries(resSeries.data.results);
                    setIsShown(false);
                    setSearch("");
                    navigate("/search");
                })
                .catch((err) => console.error(err))
                .finally(() => setIsLoading(false));
        }
    };

    // mobile

    const showSearchBar = () => {
        setIsShown(true);
    };

    return (
        <>
            <form onSubmit={handleSearchSubmit} className="hidden md:flex">
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

            <button
                onClick={showSearchBar}
                className="px-3 py-1 ml-2 bg-red-700 rounded-md md:hidden"
            >
                <span>
                    <i className="text-white fa-solid fa-magnifying-glass"></i>
                </span>
            </button>
            {isShown && (
                <div className="h-[100vh] absolute z-20 top-0 left-0 w-full bg-inherit p-4 md:hidden">
                    <form
                        onSubmit={handleSearchSubmit}
                        className="flex items-center w-full gap-4"
                    >
                        <i
                            onClick={() => setIsShown(false)}
                            className="text-2xl text-white cursor-pointer fa-solid fa-angle-left"
                        ></i>
                        <input
                            className="p-1 rounded-md grow"
                            onChange={handleInputChange}
                            type="text"
                            placeholder="Search a title"
                            value={search}
                        />
                    </form>
                </div>
            )}
        </>
    );
}

export default SearchBar;

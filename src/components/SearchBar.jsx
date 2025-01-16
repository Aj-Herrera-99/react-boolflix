import React, { useRef, useState } from "react";
import { useGlobalContext } from "../contexts/GlobalContext";
import { useNavigate } from "react-router-dom";
import { api_key, api_search_url } from "../globals/globals";

function SearchBar() {
    const { setMovies, setSeries, getMedia, setIsLoading } = useGlobalContext();

    const [isShown, setIsShown] = useState(false);

    const inputRef = useRef(null);

    const navigate = useNavigate();

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        if (inputRef.current) {
            const { value } = inputRef.current;
            if (!value) return;
            setIsLoading(true);
            const params = {
                api_key: api_key,
                query: inputRef.current.value,
            };
            Promise.all([
                getMedia(api_search_url, "/movie", params),
                getMedia(api_search_url, "/tv", params),
            ])
                .then(([resMovie, resSeries]) => {
                    setMovies(resMovie.data.results);
                    setSeries(resSeries.data.results);
                    setIsShown(false);
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
                    ref={inputRef}
                    className="p-1 rounded-md"
                    type="text"
                    placeholder="Search a title"
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
                            ref={inputRef}
                            className="p-1 rounded-md grow"
                            type="text"
                            placeholder="Search a title"
                        />
                    </form>
                </div>
            )}
        </>
    );
}

export default SearchBar;

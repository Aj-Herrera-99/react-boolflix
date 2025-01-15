import { createContext, useContext, useEffect, useState } from "react";
import { getMedia } from "../utils/utils";
import * as glob from "../globals/globals";

const GlobalContext = createContext();

const GlobalContextProvider = ({ children }) => {
    const [movies, setMovies] = useState([]);
    const [series, setSeries] = useState([]);
    const [search, setSearch] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
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
    }, []);

    return (
        <GlobalContext.Provider
            value={{
                movies,
                setMovies,
                series,
                setSeries,
                search,
                setSearch,
                isLoading,
                setIsLoading,
            }}
        >
            {children}
        </GlobalContext.Provider>
    );
};

const useGlobalContext = () => {
    const context = useContext(GlobalContext);
    return context;
};

export { GlobalContextProvider, useGlobalContext };

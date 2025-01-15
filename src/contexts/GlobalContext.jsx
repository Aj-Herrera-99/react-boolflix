import { createContext, useContext, useEffect, useState } from "react";
import * as glob from "../globals/globals";
import axios from "axios";

const GlobalContext = createContext();

const GlobalContextProvider = ({ children }) => {
    const [movies, setMovies] = useState([]);
    const [series, setSeries] = useState([]);
    const [search, setSearch] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [isHomePage, setIsHomepage] = useState(false);

    async function getMedia(baseURL, endpoint, params) {
        return await axios.get(`${baseURL}${endpoint}`, { params });
    }

    useEffect(() => {
        setIsLoading(true);
        const params = {
            api_key: glob.api_key,
            language: "en-US",
        };
        Promise.all([
            getMedia(glob.api_trending_url, "/movie/week", params),
            getMedia(glob.api_trending_url, "/tv/week", params),
        ])
            .then(([resMovie, resSeries]) => {
                setMovies(resMovie.data.results);
                setSeries(resSeries.data.results);
            })
            .catch((err) => console.error(err))
            .finally(() => setIsLoading(false));
    }, [isHomePage]);

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
                getMedia,
                setIsHomepage,
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

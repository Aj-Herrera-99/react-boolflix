import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { api_key, api_trending_url } from "../globals/globals";

const GlobalContext = createContext();

const GlobalContextProvider = ({ children }) => {
    const [movies, setMovies] = useState([]);
    const [series, setSeries] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isHomePage, setIsHomepage] = useState(false);

    useEffect(() => {
        setIsLoading(true);
        const params = {
            api_key: api_key,
            language: "en-US",
        };
        Promise.all([
            axios.get(`${api_trending_url}/movie/week`, {params}),
            axios.get(`${api_trending_url}/tv/week`, {params}),
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
                isLoading,
                setIsLoading,
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

import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { api_base_url, api_key, api_trending_url } from "../globals/globals";
import { getRndInteger } from "../utils/utils";

const GlobalContext = createContext();

const GlobalContextProvider = ({ children }) => {
    const [movies, setMovies] = useState([]);
    const [series, setSeries] = useState([]);
    const [jumboMedia, setJumboMedia] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [isHomePage, setIsHomepage] = useState(false);

    useEffect(() => {
        setIsLoading(true);
        const params = {
            api_key: api_key,
            language: "en-US",
        };
        Promise.all([
            axios.get(`${api_trending_url}/movie/week`, { params }),
            axios.get(`${api_trending_url}/tv/week`, { params }),
            axios.get(`${api_base_url}/movie/now_playing`, { params }),
        ])
            .then(([resMovie, resSeries, resNowPlaying]) => {
                setMovies(resMovie.data.results);
                setSeries(resSeries.data.results);
                const rndIndex = getRndInteger(
                    0,
                    resNowPlaying.data.results.length
                );
                const jumboId = resNowPlaying.data.results[rndIndex].id;
                axios
                    .get(`${api_base_url}/movie/${jumboId}`, {
                        params: { ...params, append_to_response: "videos" },
                    })
                    .then((res) => {
                        setJumboMedia(res.data);
                        console.log(res.data);
                    });
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
                setIsHomepage,
                jumboMedia,
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

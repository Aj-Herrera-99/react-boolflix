import { createContext, useContext } from "react";
import { useQueries } from "@tanstack/react-query";
import Loader from "../components/Loader";
import { fetchJumboMedia, fetchPopulars, fetchTrendings } from "./ApiStore";

const ApiContext = createContext();



const ApiContextProvider = ({ children }) => {
    

    const queries = useQueries({
        queries: [
            {
                queryKey: ["trendingMovies"],
                queryFn: () => fetchTrendings("movie"),
            },
            {
                queryKey: ["trendingSeries"],
                queryFn: () => fetchTrendings("tv"),
            },
            {
                queryKey: ["popularMovies"],
                queryFn: () => fetchPopulars("movie"),
            },
            {
                queryKey: ["popularSeries"],
                queryFn: () => fetchPopulars("tv"),
            },
            {
                queryKey: ["jumboMedia"],
                queryFn: () => fetchJumboMedia("movie"),
            },
        ],
    });
    const [
        trendingMovies,
        trendingSeries,
        popularMovies,
        popularSeries,
        jumboMedia,
    ] = queries;

    if (queries.some((query) => query.isLoading)) return <Loader />;
    if (queries.some((query) => query.isError))
        return <pre>Network error . . .</pre>;

    const value = {
        trendingMovies: trendingMovies.data,
        trendingSeries: trendingSeries.data,
        jumboMedia: jumboMedia.data,
        popularMovies: popularMovies.data,
        popularSeries: popularSeries.data,
    };

    return <ApiContext.Provider value={value}>{children}</ApiContext.Provider>;
};

const useApiContext = () => {
    const context = useContext(ApiContext);
    return context;
};

export { ApiContextProvider, useApiContext };

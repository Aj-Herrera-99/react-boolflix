import React, { useEffect } from "react";
import Card from "../components/Card";
import { useSearchParams } from "react-router-dom";
import CardsSection from "../components/CardsSection";
import { api_key } from "../globals/globals";
import Loader from "../components/Loader";
import { useQueries, useQueryClient } from "@tanstack/react-query";
import { fetchSearchQuery } from "../contexts/ApiStore";
import Error from "../components/Error";

function SearchMedia() {
    const [searchParams] = useSearchParams();
    const query = searchParams.get("q");
    const queryClient = useQueryClient();
    const params = {
        api_key,
        query,
    };

    const queries = useQueries({
        queries: [
            {
                queryKey: ["searchMovies"],
                enabled: !!query,
                queryFn: () => fetchSearchQuery("movie", params),
            },
            {
                queryKey: ["searchSeries"],
                enabled: !!query,
                queryFn: () => fetchSearchQuery("tv", params),
            },
        ],
    });

    useEffect(() => {
        if (query){
            queryClient.invalidateQueries(["searchMovies", "searchSeries"]);
        }
    }, [searchParams]);

    if (!query) {
        return (
            <div className="m-8 text-5xl font-light tracking-wide">
                Find A Movie or TV Show!
            </div>
        );
    }

    if (queries.some((query) => query.isLoading)) return <Loader />;
    if (queries.some((query) => query.isError)) return <Error />;

    const [moviesSearched, seriesSearched] = queries;
    const movies = moviesSearched?.data;
    const series = seriesSearched?.data;

    return (
        <>
            <p className="mt-10 ml-10 text-3xl font-light">
                Results for: {query}
            </p>
            <CardsContainer title="movies">
                {movies.map((movie) => (
                    <Card key={movie.id} type="movie" media={movie}></Card>
                ))}
            </CardsContainer>
            <CardsContainer title="series">
                {series.map((serie) => (
                    <Card key={serie.id} type="serie" media={serie}></Card>
                ))}
            </CardsContainer>
        </>
    );
}

function CardsContainer({ title, children }) {
    return (
        <>
            <CardsSection title={title}>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                    {children}
                </div>
            </CardsSection>
        </>
    );
}

export default SearchMedia;

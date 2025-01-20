import React, { useEffect, useState } from "react";
import Card from "../components/Card";
import { useSearchParams } from "react-router-dom";
import CardsSection from "../components/CardsSection";
import { api_key, api_search_url } from "../globals/globals";
import axios from "axios";
import Loader from "../components/Loader";

function SearchMedia() {
    const [movies, setMovies] = useState([]);
    const [series, setSeries] = useState([]);
    const [searchParams] = useSearchParams();
    const [isLoading, setIsLoading] = useState(false);
    const query = searchParams.get("q");

    useEffect(() => {
        if (query) {
            setIsLoading(true);
            const params = {
                api_key,
                query,
            };

            Promise.all([
                axios.get(`${api_search_url}/movie`, { params }),
                axios.get(`${api_search_url}/tv`, { params }),
            ])
                .then(([resMovie, resSeries]) => {
                    setMovies(resMovie.data.results);
                    setSeries(resSeries.data.results);
                })
                .catch((err) => console.error(err))
                .finally(() => {
                    setIsLoading(false);
                });
        }
    }, [searchParams]);

    if (!query)
        return (
            <div className="m-8 text-5xl font-light tracking-wide">
                Find A Movie or TV Show!
            </div>
        );

    if (isLoading) return <Loader />;

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

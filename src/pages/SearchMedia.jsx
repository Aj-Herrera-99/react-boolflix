import React from "react";
import { useGlobalContext } from "../contexts/GlobalContext";
import Card from "../components/Card";
import { useSearchParams } from "react-router-dom";

function SearchMedia() {
    const { movies, series } = useGlobalContext();
    const [searchParams] = useSearchParams();
    
    if(!searchParams.get("q")) return <div className="m-8 text-5xl font-light tracking-wide">Find A Movie or TV Show!</div>
    return (
        <>
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

// todo: componenti CardsSection, CardsContainer
function CardsContainer({ title, children }) {
    return (
        <>
            <section className="lg:max-w-[87vw] xl:max-w-[90vw] mx-auto py-8">
                <h2 className="p-4 text-4xl font-light tracking-wide capitalize">
                    {title}
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                    {children}
                </div>
            </section>
        </>
    );
}

export default SearchMedia;

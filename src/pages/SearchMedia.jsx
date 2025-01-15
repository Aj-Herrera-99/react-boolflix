import React from "react";
import { useGlobalContext } from "../contexts/GlobalContext";
import Slider from "@ant-design/react-slick";
import Card from "../components/Card";

function SearchMedia() {
    const { movies, series } = useGlobalContext();
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

function CardsContainer({ title, children }) {
    return (
        <>
            <h2 className="p-4 text-4xl font-light tracking-wide text-white capitalize">
                {title}
            </h2>
            <section className="px-16">
                <div className="grid grid-cols-1 auto-rows-fr sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">{children}</div>
            </section>
        </>
    );
}

export default SearchMedia;

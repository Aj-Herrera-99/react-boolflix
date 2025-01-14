import React from "react";
import { useGlobalContext } from "../contexts/GlobalContext";
import Card from "./Card";

function Main() {
    console.log("Main render");

    const { movies, series } = useGlobalContext();

    return (
        <main className="bg-green-300">
            <MediaSection title="Movies">
                {movies.map((movie) => (
                    <Card key={movie.id} type="movie" media={movie}></Card>
                ))}
            </MediaSection>
            <MediaSection title="Series">
                {series.map((serie) => (
                    <Card key={serie.id} type="serie" media={serie}></Card>
                ))}
            </MediaSection>
        </main>
    );
}

function MediaSection({ title, children }) {
    return (
        <>
            <h2>{title}</h2>
            <section className="grid grid-cols-3 gap-4 bg-blue-400">
                {children}
            </section>
        </>
    );
}

export default Main;

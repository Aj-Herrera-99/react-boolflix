import React from "react";
import { useGlobalContext } from "../contexts/GlobalContext";
import Card from "./Card";

function Main() {
    const { movies, series } = useGlobalContext();

    return (
        <main
            style={{ height: `calc(100vh - 72px)` }}
            className="bg-[#434343] pb-12 mt-[72px] overflow-auto
        "
        >
            <MediaSection title="popular movies" media={movies}>
                {movies.map((movie, index) => (
                    <Card
                        key={movie.id}
                        style={{ ["--position"]: index + 1 }}
                        type="movie"
                        media={movie}
                    ></Card>
                ))}
            </MediaSection>
            <MediaSection title="popular series" media={series}>
                {series.map((serie, index) => (
                    <Card
                        style={{ ["--position"]: index + 1 }}
                        key={serie.id}
                        type="serie"
                        media={serie}
                    ></Card>
                ))}
            </MediaSection>
        </main>
    );
}

function MediaSection({ title, media, children }) {
    return (
        <>
            <h2 className="p-4 text-4xl font-light tracking-wide text-white capitalize">
                {title}
            </h2>
            <section className="w-full pt-3 overflow-x-hidden">
                <div
                    style={{ ["--quantity"]: media.length }}
                    className="flex w-fit"
                >
                    {children}
                </div>
            </section>
        </>
    );
}

export default Main;

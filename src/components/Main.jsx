import React from "react";
import { useGlobalContext } from "../contexts/GlobalContext";
import Card from "./Card";

function Main() {
    console.log("Main render");

    const { movies, series } = useGlobalContext();

    return (
        <main className="bg-[#434343] grow pb-12">
            <MediaSection title="Movies" media={movies}>
                {movies.map((movie, index) => (
                    <Card
                        key={movie.id}
                        style={{ ["--position"]: index + 1 }}
                        type="movie"
                        media={movie}
                    ></Card>
                ))}
            </MediaSection>
            <MediaSection title="Series" media={series}>
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
            <h2 className="p-4 text-2xl text-white">{title}</h2>
            <section className="w-full my-2 overflow-hidden">
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

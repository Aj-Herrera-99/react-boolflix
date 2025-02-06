import React from "react";
import { useSearchParams } from "react-router-dom";
import MoviesSearchResults from "../components/MoviesSearchResults";
import SeriesSearchResults from "../components/SeriesSearchResults";

function SearchMedia() {
    const [searchParams] = useSearchParams();
    const query = searchParams.get("q");

    if (!query) {
        return (
            <div className="m-8 text-5xl font-light tracking-wide">
                Find A Movie or TV Show!
            </div>
        );
    }
    return (
        <>
            <p className="mt-10 ml-10 text-3xl font-light">
                Results for: {query}
            </p>
            <MoviesSearchResults query={query} />
            <SeriesSearchResults query={query} />
        </>
    );
}

export default SearchMedia;

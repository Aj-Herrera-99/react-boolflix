import React from "react";
import { useSearchParams } from "react-router-dom";
import MediaSearchResults from "../components/MediaSearchResults";

function SearchMedia() {
    const [searchParams] = useSearchParams();
    const query = searchParams.get("q");
    console.log("altro test")

    console.log("test")
    console.log("bella")
    if (!query) {
        return (
            <div className="m-8 text-5xl font-light tracking-wide">
                Find A Movie or TV Show!
            </div>
        );
    }
    return (
        <>
            <h1 className="mt-10 ml-10 text-3xl font-light">
                Results for: {query}
            </h1>
            <MediaSearchResults
                query={query}
                media="movies"
                type="movie"
                endpoint="movie"
            />
            <MediaSearchResults
                query={query}
                media="series"
                type="serie"
                endpoint="tv"
            />
        </>
    );
}

export default SearchMedia;

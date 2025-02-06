import React, { Fragment, useEffect, useState } from "react";
import Card from "../components/Card";
import { useSearchParams } from "react-router-dom";
import CardsSection from "../components/CardsSection";
import { api_key } from "../globals/globals";
import Loader from "../components/Loader";
import { useInfiniteQuery } from "@tanstack/react-query";
import { fetchSearchQuery } from "../contexts/ApiStore";
import Error from "../components/Error";
import LoadMoreBtn from "../components/LoadMoreBtn";
import MoviesSearchResults from "../components/MoviesSearchResults";
import SeriesSearchResults from "../components/SeriesSearchResults";

function SearchMedia() {
    // const [page, setPage] = useState(1);
    const [searchParams] = useSearchParams();
    const query = searchParams.get("q");

    // const params = {
    //     api_key,
    //     query,
    // };

    // const { data, isLoading, isError, isSuccess, hasNextPage, fetchNextPage } =
    //     useInfiniteQuery({
    //         queryKey: ["movies"],
    //         queryFn: ({ pageParam }) =>
    //             fetchSearchQuery("movie", { ...params, page: pageParam }),
    //         initialPageParam: page,
    //         getNextPageParam: (lastPage, allPages, lastPageParam) => {
    //             return lastPageParam + 1;
    //         },
    //     });

    if (!query) {
        return (
            <div className="m-8 text-5xl font-light tracking-wide">
                Find A Movie or TV Show!
            </div>
        );
    }
    // if (isLoading) return <Loader />;
    // if (isError) return <Error />;
    // if (isSuccess) {
    //     console.log(data.pages);
    //     const moviesTotPages = data.pages[0].total_pages;
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
// if (queries.every((query) => query.isSuccess)) {
//     const [moviesSearched, seriesSearched] = queries;
//     const movies = moviesSearched.data.results;
//     const series = seriesSearched.data.results;

//     const moviesTotPages = moviesSearched.data.total_pages;

//     return (
//         <>
//             <p className="mt-10 ml-10 text-3xl font-light">
//                 Results for: {query}
//             </p>
//             <CardsContainer title="movies">
//                 {movies.map((movie) => (
//                     <Card key={movie.id} type="movie" media={movie}></Card>
//                 ))}
//                 <LoadMoreBtn
//                     currPage={page}
//                     totalPages={moviesTotPages}
//                     onClick={() => setPage((curr) => curr + 1)}
//                 />
//             </CardsContainer>
//             <CardsContainer title="series">
//                 {series.map((serie) => (
//                     <Card key={serie.id} type="serie" media={serie}></Card>
//                 ))}
//             </CardsContainer>
//         </>
//     );
// }
// }

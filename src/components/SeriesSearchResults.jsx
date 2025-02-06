import React, { Fragment, useEffect, useState } from "react";
import Card from "./Card";
import CardsSection from "./CardsSection";
import { api_key } from "../globals/globals";
import Loader from "./Loader";
import { useInfiniteQuery, useQueryClient } from "@tanstack/react-query";
import { fetchSearchQuery } from "../contexts/ApiStore";
import Error from "./Error";
import LoadMoreBtn from "./LoadMoreBtn";

function SeriesSearchResults({ query }) {
    const [page, setPage] = useState(1);
    const queryClient = useQueryClient();

    const params = {
        api_key,
        query,
    };

    const { data, isLoading, isError, isSuccess, fetchNextPage } =
        useInfiniteQuery({
            queryKey: ["series", query],
            queryFn: ({ pageParam }) =>
                fetchSearchQuery("tv", { ...params, page: pageParam }),
            initialPageParam: 1,
            getNextPageParam: (_lastPage, _allPages, lastPageParam) => {
                return lastPageParam + 1;
            },
        });

    useEffect(() => {
        window.scrollTo({ top: 0 });
        setPage(1);
        return () => {
            queryClient.removeQueries({ queryKey: ["series", query] });
        };
    }, [query]);

    if (isLoading) return <Loader />;
    if (isError) return <Error />;
    if (isSuccess) {
        const seriesTotPages = data?.pages[0]?.total_pages;
        return (
            <>
                <CardsSection title="series">
                    {data?.pages?.map((group, i) => (
                        <Fragment key={i}>
                            {group.results.map((serie) => (
                                <Card
                                    key={serie.id}
                                    type="serie"
                                    media={serie}
                                ></Card>
                            ))}
                        </Fragment>
                    ))}

                    <LoadMoreBtn
                        currPage={page}
                        totalPages={seriesTotPages}
                        onClick={() => {
                            setPage((curr) => curr + 1);
                            fetchNextPage();
                        }}
                    />
                </CardsSection>
            </>
        );
    }
}

export default SeriesSearchResults;

import React, { useRef, useState } from "react";
import { useGlobalContext } from "../contexts/GlobalContext";
import Card from "./Card";
import Slider from "@ant-design/react-slick";

function Main() {
    const { movies, series } = useGlobalContext();

    return (
        <main
            className="bg-[#434343] pb-12
        "
        >
            <MediaSection title="trending movies" media={movies}>
                {movies.map((movie) => (
                    <Card key={movie.id} type="movie" media={movie}></Card>
                ))}
            </MediaSection>
            <MediaSection title="trending series" media={series}>
                {series.map((serie) => (
                    <Card key={serie.id} type="serie" media={serie}></Card>
                ))}
            </MediaSection>
        </main>
    );
}

function MediaSection({ title, media, children }) {
    const settings = {
        infinite: true,
        slidesToShow: 4,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        cssEase: "ease-out",
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 1,
                },
            },
        ],
    };

    return (
        <>
            <h2 className="p-4 text-4xl font-light tracking-wide text-white capitalize">
                {title}
            </h2>
            <section className="max-w-[78vw] sm:max-w-[88vw] xl:max-w-[92vw] mx-auto">
                <Slider {...settings}>{children}</Slider>
            </section>
            ù
        </>
    );
}

export default Main;

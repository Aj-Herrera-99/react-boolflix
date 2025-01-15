import React from "react";
import { useGlobalContext } from "../contexts/GlobalContext";
import Slider from "@ant-design/react-slick";
import Card from "../components/Card";

function Homepage() {
    const { movies, series } = useGlobalContext();
    return (
        <>
            <MediaSection title="trending movies">
                {movies.map((movie) => (
                    <Card key={movie.id} type="movie" media={movie}></Card>
                ))}
            </MediaSection>
            <MediaSection title="trending series">
                {series.map((serie) => (
                    <Card key={serie.id} type="serie" media={serie}></Card>
                ))}
            </MediaSection>
        </>
    );
}

function MediaSection({ title, children }) {
    const settings = {
        infinite: true,
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        cssEase: "ease-out",
        centerMode: true,
        swipeToSlide: true,
        responsive: [
            {
                breakpoint: 576,
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
        </>
    );
}

export default Homepage;

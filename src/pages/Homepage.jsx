import React from "react";
import { useGlobalContext } from "../contexts/GlobalContext";
import Slider from "@ant-design/react-slick";
import Card from "../components/Card";

function Homepage() {
    const { movies, series, isLoading } = useGlobalContext();
    return (
        <>
            <MediaSection title="trending movies" isLoading={isLoading}>
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

function MediaSection({ title, children, isLoading }) {
    const settings = {
        infinite: true,
        slidesToShow: 4,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2500,
        cssEase: "ease-out",
        centerMode: true,
        swipeToSlide: true,
        dots: true,
        appendDots: (dots) => (
            <div
                style={{
                    padding: "0px",
                }}
            >
                <ul style={{ margin: "0px" }}> {dots} </ul>
            </div>
        ),
        responsive: [
            {
                breakpoint: 1280,
                settings: {
                    slidesToShow: 3,
                },
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 2,
                },
            },
            {
                breakpoint: 576,
                settings: {
                    slidesToShow: 1,
                },
            },
        ],
    };

    return (
        <section className="lg:max-w-[87vw] xl:max-w-[90vw] mx-auto py-8">
            <h2 className="p-4 text-4xl font-light tracking-wide capitalize">
                {title}
            </h2>
            <Slider {...settings} swipe={true}>
                {children}
            </Slider>
        </section>
    );
}

export default Homepage;

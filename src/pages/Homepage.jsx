import React from "react";
import { useGlobalContext } from "../contexts/GlobalContext";
import Slider from "@ant-design/react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Card from "../components/Card";
import CardsSection from "../components/CardsSection";
import FrameClip from "../components/FrameClip";
import { getRndInteger } from "../utils/utils";
import { Link } from "react-router-dom";
import MiniCard from "../components/MiniCard";
import MiniCardsSection from "../components/MiniCardsSection";

function Homepage() {
    const { movies, series, jumboMedia, popularSeries, popularMovies } =
        useGlobalContext();

    return (
        <>
            <JumboSection jumboMedia={jumboMedia} />
            <MiniCardsSection title="popular series">
                {popularSeries.map((serie) => (
                    <MiniCard key={serie.id} media={serie} type="serie" />
                ))}
            </MiniCardsSection>
            <MiniCardsSection title="popular movies">
                {popularMovies.map((movie) => (
                    <MiniCard key={movie.id} media={movie} type="movie" />
                ))}
            </MiniCardsSection>
            <SliderContainer title="trending movies">
                {movies.map((movie) => (
                    <Card key={movie.id} type="movie" media={movie}></Card>
                ))}
            </SliderContainer>
            <SliderContainer title="trending series">
                {series.map((serie) => (
                    <Card key={serie.id} type="serie" media={serie}></Card>
                ))}
            </SliderContainer>
        </>
    );
}

function JumboSection({ jumboMedia }) {
    const getJumboVideoPath = () => {
        if (jumboMedia.videos) {
            const rndIndex = getRndInteger(0, jumboMedia.videos.results.length);
            return jumboMedia.videos.results[rndIndex]?.key;
        }
    };
    return (
        <>
            <FrameClip src={getJumboVideoPath()} />
            <section style={{ minHeight: "calc(100vh - 80px - 22vh)" }}>
                <div className="flex flex-col flex-wrap content-start h-full px-12 pt-20">
                    <p className="text-lg font-light tracking-wider md:text-3xl text-stone-300">
                        Now Playing
                    </p>
                    <h1 className="py-3 text-3xl font-semibold tracking-wide md:w-3/4 md:text-7xl">
                        {jumboMedia.title}
                    </h1>
                    <p className="my-3 text-lg font-light tracking-wider md:w-2/5">
                        {jumboMedia.overview}
                    </p>
                    <div className="flex gap-3 p-3 text-xl">
                        <button className="px-6 py-2 font-bold text-black scale-95 bg-white rounded-md hover:scale-100">
                            Play
                        </button>
                        <Link
                            to={`/search/${jumboMedia.id}`}
                            state={{ type: "movie" }}
                            className="px-6 py-2 font-bold text-white rounded-md scale-95 bg-[#ffffff40] hover:scale-100"
                        >
                            More Info
                        </Link>
                    </div>
                </div>
            </section>
        </>
    );
}

function SliderContainer({ title, children }) {
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
        className: "my-2",
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
        <CardsSection title={title}>
            <Slider {...settings} swipe={true}>
                {children}
            </Slider>
        </CardsSection>
    );
}

export default Homepage;

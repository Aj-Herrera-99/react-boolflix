import React from "react";
import { useGlobalContext } from "../contexts/GlobalContext";
import Slider from "@ant-design/react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Card from "../components/Card";
import CardsSection from "../components/CardsSection";
import FrameClip from "../components/FrameClip";
import { getRndInteger } from "../utils/utils";
import { api_img_url } from "../globals/globals";
import { Link } from "react-router-dom";

function Homepage() {
    const { movies, series, jumboMedia, popularSeries, popularMovies } =
        useGlobalContext();
    let jumboVideoPath;
    if (jumboMedia.videos) {
        const getJumboVideoPath = () => {
            const rndIndex = getRndInteger(0, jumboMedia.videos.results.length);
            return jumboMedia.videos.results[rndIndex]?.key;
        };
        jumboVideoPath = getJumboVideoPath();
    }
    return (
        <>
            <JumboSection
                path={jumboVideoPath}
                jumboMedia={jumboMedia}
            ></JumboSection>
            <section className="my-8">
                <h2 className="my-2 ml-4 text-xl">Popular TV Series</h2>
                <div className="flex gap-1 py-2 overflow-auto border-r-4 border-r-stone-300 scrollbar-hide">
                    {popularSeries.map((serie) => (
                        <Link
                            to={`/search/${serie.id}`}
                            state={{ type: "serie" }}
                            key={serie.id}
                            className="!aspect-video min-w-[150px]"
                            title={serie.name}
                        >
                            <img
                                className="object-cover w-full h-full"
                                src={`${api_img_url}/w342${serie.backdrop_path}`}
                                alt={serie.name}
                            />
                        </Link>
                    ))}
                </div>
            </section>
            <section className="my-8">
                <h2 className="my-2 ml-4 text-xl">Popular Movies</h2>
                <div className="flex gap-1 py-2 overflow-auto border-r-4 border-r-stone-300 scrollbar-hide">
                    {popularMovies.map((movie) => (
                        <Link
                            to={`/search/${movie.id}`}
                            state={{ type: "movie" }}
                            key={movie.id}
                            className="!aspect-video min-w-[150px]"
                            title={movie.title}
                        >
                            <img
                                className="object-cover w-full h-full"
                                src={`${api_img_url}/w342${movie.backdrop_path}`}
                            />
                        </Link>
                    ))}
                </div>
            </section>
            <SliderContainer title="trending movies">
                {movies.map((movie) => (
                    <Card
                        key={movie.id}
                        type="movie"
                        media={movie}
                        isMini={false}
                    ></Card>
                ))}
            </SliderContainer>
            <SliderContainer title="trending series">
                {series.map((serie) => (
                    <Card
                        key={serie.id}
                        type="serie"
                        media={serie}
                        isMini={false}
                    ></Card>
                ))}
            </SliderContainer>
        </>
    );
}

function JumboSection({ path, jumboMedia, children }) {
    return (
        <>
            <FrameClip src={path} title={"title"} />
            <section style={{ height: "calc(100vh - 80px - 22vh)" }}>
                <div className="flex flex-col px-12 pt-20">
                    <p className="text-3xl font-light tracking-wider text-stone-300">
                        Now Playing
                    </p>
                    <h1 className="w-3/4 py-3 font-semibold tracking-wide text-7xl">
                        {jumboMedia.title}
                    </h1>
                    <p className="w-2/5 my-3 text-lg font-light tracking-wider">
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
                <div className="">{children}</div>
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
        <CardsSection title={title}>
            <Slider {...settings} swipe={true}>
                {children}
            </Slider>
        </CardsSection>
    );
}

export default Homepage;

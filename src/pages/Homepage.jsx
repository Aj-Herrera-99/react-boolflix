import React from "react";
import { useGlobalContext } from "../contexts/GlobalContext";
import Slider from "@ant-design/react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Card from "../components/Card";
import CardsSection from "../components/CardsSection";
import FrameClip from "../components/FrameClip";
import { getRndInteger } from "../utils/utils";

function Homepage() {
    const { movies, series, jumboMedia } = useGlobalContext();
    let jumboVideoPath;
    if (jumboMedia.videos) {
        const getJumboVideoPath = () => {
            const rndIndex = getRndInteger(0, jumboMedia.videos.results.length);
            return jumboMedia.videos.results[rndIndex].key;
        };
        jumboVideoPath = getJumboVideoPath();
    }
    return (
        <>
            {jumboVideoPath && (
                <JumboSection path={jumboVideoPath} jumboMedia={jumboMedia} />
            )}
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

function JumboSection({ path, jumboMedia }) {
    return (
        <section className="h-full ">
            <FrameClip src={path} title={"title"} />
            <div className="relative px-12 py-20">
                <p className="text-3xl font-light tracking-wider text-stone-300">Now Playing</p>
                <h1 className="w-3/4 py-3 font-semibold tracking-wide text-8xl">
                    {jumboMedia.title}
                </h1>
                <p className="w-2/5 my-3 text-lg font-light tracking-wider">
                    {jumboMedia.overview}
                </p>
                <div className="flex gap-3 p-3 text-xl">
                    <button className="px-6 py-2 font-bold text-black scale-95 bg-white rounded-md hover:scale-100">Play</button>
                    <button className="px-6 py-2 font-bold text-white rounded-md scale-95 bg-[#ffffff40] hover:scale-100">More Info</button>
                </div>
            </div>
        </section>
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

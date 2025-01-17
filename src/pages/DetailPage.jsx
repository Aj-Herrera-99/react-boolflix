import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { api_base_url, api_img_url, api_key } from "../globals/globals";
import Rating from "../components/Rating";
import Loader from "../components/Loader";
import { getRndInteger } from "../utils/utils";
import FrameClip from "../components/FrameClip";
import axios from "axios";
import NotFound from "./NotFound";

function DetailPage() {
    const { id } = useParams();
    console.log(id);
    const location = useLocation();
    const type = location.state?.type;

    if (!type) return <NotFound></NotFound>;

    const [isLoading, setIsLoading] = useState(false);
    const [media, setMedia] = useState({});

    let { title, name, poster_path, vote_average, overview, credits, videos } =
        media;
    let { cast } = credits || { cast: null };
    let videoPath;
    if (videos?.results) {
        const rndIndex = getRndInteger(0, videos.results.length - 1);
        videoPath = videos.results[rndIndex]?.key;
    }

    useEffect(() => {
        setIsLoading(true);
        const endpoint = type === "movie" ? "/movie" : "/tv";
        const params = {
            api_key,
            append_to_response: "credits,videos",
        };
        axios
            .get(`${api_base_url}${endpoint}/${id}`, { params })
            .then((res) => setMedia(res.data))
            .catch((e) => console.error(e))
            .finally(() => setIsLoading(false));
    }, []);
    return (
        <>
            {isLoading ? (
                <Loader />
            ) : (
                <>
                    {videoPath && (
                        <FrameClip
                            src={`https://www.youtube.com/embed/${videoPath}?autoplay=1&mute=1&controls=0&rel=0&modestbranding=1&loop=1`}
                            title={type === "movie" ? title : name}
                        />
                    )}
                    <section className="relative flex flex-col items-center justify-between py-8 gap-y-12 lg:flex-row">
                        <div className="lg:w-[40vw]">
                            <img
                                className="w-[60vw] sm:w-[350px] mx-auto border border-white rounded-md "
                                src={`${api_img_url}/w500${poster_path}`}
                                alt={type === "movie" ? title : name}
                            />
                        </div>

                        <div className="flex flex-col gap-6 w-[100vw] lg:w-[60vw]">
                            <div className="flex flex-col flex-wrap px-8 gap-y-1 ">
                                <h1
                                    title={type === "movie" ? title : name}
                                    className="pb-4 text-5xl font-semibold tracking-wider lg:font-light md:text-6xl"
                                >
                                    {type === "movie" ? title : name}
                                </h1>
                                <div className="flex gap-2 text-2xl">
                                    <Rating
                                        stars={Math.ceil(vote_average / 2)}
                                    />
                                </div>
                            </div>
                            <div className="px-8">
                                <h2 className="pb-3 text-3xl font-semibold tracking-wide">
                                    Overview
                                </h2>
                                <p className="font-light tracking-wider lg:w-4/5">
                                    {overview}
                                </p>
                            </div>
                            <div className="pl-8">
                                <h2 className="pb-3 text-3xl font-semibold tracking-wide">
                                    Cast
                                </h2>
                                <div className="overflow-x-auto border-x-2 border-x-stone-400 scrollbar-hide">
                                    <ul className="flex gap-4 p-1 w-fit">
                                        {cast?.map((actor) => (
                                            <ActorCard
                                                key={actor.id}
                                                actor={actor}
                                            />
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </section>
                </>
            )}
        </>
    );
}

function ActorCard({ actor }) {
    return (
        <li
            title={actor.name}
            className="bg-stone-500 w-[80px] aspect-square overflow-hidden rounded-md cursor-pointer"
        >
            <img
                className="object-cover w-full h-full"
                src={`${api_img_url}/w92${actor.profile_path}`}
                alt=""
            />
        </li>
    );
}

export default DetailPage;

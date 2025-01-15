import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { useGlobalContext } from "../contexts/GlobalContext";
import { api_base_url, api_img_url, api_key } from "../globals/globals";
import Rating from "../components/Rating";

function DetailPage() {
    const { getMedia } = useGlobalContext();
    const { id } = useParams();
    const location = useLocation();
    const type = location.state.type;

    const [media, setMedia] = useState({});
    const [cast, setCast] = useState([]);

    let {
        title,
        original_title,
        name,
        original_name,
        original_language,
        poster_path,
        vote_average,
        overview,
    } = { ...media };

    useEffect(() => {
        const endpoint = type === "movie" ? "/movie" : "/tv";
        Promise.all([
            getMedia(api_base_url, `${endpoint}/${id}`, {
                api_key,
            }),
            getMedia(api_base_url, `${endpoint}/${id}/credits`, {
                api_key,
            }),
        ])
            .then(([resMedia, resCast]) => {
                console.log(resMedia.data);
                console.log(resCast.data.cast);
                setMedia(resMedia.data);
                setCast(resCast.data.cast);
            })
            .catch((err) => console.error(err));
    }, []);
    return (
        <>
            <section className="flex flex-wrap items-center justify-between gap-8 p-8 md:flex-nowrap">
                <div>
                    <img
                        className="border border-white rounded-md"
                        src={`${api_img_url}/w500${poster_path}`}
                        alt=""
                    />
                </div>

                <div className="flex flex-col gap-3 sm:w-[70vw]">
                    <div className="flex items-center gap-12 [&>*]:w-1/2">
                        <h1
                            title={type === "movie" ? title : name}
                            className="pb-4 text-6xl font-light tracking-wide line-clamp-2"
                        >
                            {type === "movie" ? title : name}
                        </h1>
                        <div className="flex gap-2 text-2xl">
                            <Rating stars={Math.ceil(vote_average / 2)} />
                        </div>
                    </div>
                    <div>
                        <h2 className="pb-3 text-3xl font-semibold tracking-wide">
                            Overview
                        </h2>
                        <p>{overview}</p>
                    </div>
                    <div>
                        <h2 className="pb-3 text-3xl font-semibold tracking-wide">
                            Cast
                        </h2>
                        <div className="max-w-full overflow-x-auto">
                            <ul className="flex gap-5 p-3 w-fit">
                                {cast.map((actor) => (
                                    <ActorCard key={actor.id} actor={actor} />
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </section>
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
                src={`${api_img_url}/w500${actor.profile_path}`}
                alt=""
            />
        </li>
    );
}

export default DetailPage;

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
                setMedia(resMedia.data);
                setCast(resCast.data.cast);
            })
            .catch((err) => console.error(err));
    }, []);
    return (
        <>
            <section
                style={{ width: "calc(100vw - 2rem)" }}
                className="flex flex-col items-center justify-between p-8 mx-auto gap-y-12 lg:flex-row"
            >
                <div className="w-full lg:w-[30vw]">
                    <img
                        className="w-[342px] border border-white rounded-md mx-auto"
                        src={`${api_img_url}/w342${poster_path}`}
                        alt=""
                    />
                </div>

                <div className="lg:w-[70vw] w-full flex flex-col gap-6 lg:pl-36">
                    <div className="flex items-center flex-wrap gap-8 lg:[&>*]:w-1/2">
                        <h1
                            title={type === "movie" ? title : name}
                            className="pb-4 text-5xl font-semibold tracking-wider lg:font-light md:text-6xl"
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
                        <p className="lg:w-1/2">{overview}</p>
                    </div>
                    <div>
                        <h2 className="pb-3 text-3xl font-semibold tracking-wide">
                            Cast
                        </h2>
                        <div className="overflow-x-auto border-x-2 border-x-stone-400 scrollbar-hide">
                            <ul className="flex gap-4 w-fit">
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

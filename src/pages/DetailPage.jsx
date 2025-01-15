import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { useGlobalContext } from "../contexts/GlobalContext";
import { api_base_url, api_img_url, api_key } from "../globals/globals";
import Rating from "../components/Rating";

function DetailPage() {
    const { getMedia, setIsLoading } = useGlobalContext();
    const { id } = useParams();
    const location = useLocation();
    const type = location.state.type;

    const [media, setMedia] = useState({});
    const [cast, setCast] = useState([]);

    let { title, name, poster_path, vote_average, overview } = { ...media };

    useEffect(() => {
        setIsLoading(true);
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
            .catch((err) => console.error(err))
            .finally(() => setIsLoading(false));
    }, []);
    return (
        <>
            <section className="flex flex-col items-center justify-between py-8 gap-y-12 lg:flex-row">
                <div className="lg:w-[40vw]">
                    <img
                        className="w-[350px] mx-auto border border-white rounded-md "
                        src={`${api_img_url}/w342${poster_path}`}
                        alt=""
                    />
                </div>

                <div className="flex flex-col gap-6 w-[100vw] lg:w-[60vw]">
                    <div className="flex items-center flex-wrap gap-8 lg:[&>*]:w-1/2 px-8">
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
                    <div className="px-8">
                        <h2 className="pb-3 text-3xl font-semibold tracking-wide">
                            Overview
                        </h2>
                        <p className="lg:w-1/2">{overview}</p>
                    </div>
                    <div className="pl-8">
                        <h2 className="pb-3 text-3xl font-semibold tracking-wide">
                            Cast
                        </h2>
                        <div className="overflow-x-auto border-x-2 border-x-stone-400 scrollbar-hide">
                            <ul className="flex gap-4 p-1 w-fit">
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

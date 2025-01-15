import axios from "axios";
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
        (async () => {
            const endpoint = type === "movie" ? "/movie" : "/tv";
            const res = await getMedia(api_base_url, `${endpoint}/${id}`, {
                api_key,
            });
            setMedia(res.data);
        })();
    }, []);
    return (
        <>
            <section className="flex gap-12 p-8">
                <div className="overflow-hidden border border-white rounded-md w-[300px] sm:w-[400px]">
                    <img src={`${api_img_url}/w500${poster_path}`} alt="" />
                </div>

                <div>
                    <div className="flex items-center gap-12 [&>*]:w-1/2">
                        <h1
                            title={type === "movie" ? title : name}
                            className="pb-8 text-6xl font-light tracking-wide line-clamp-2"
                        >
                            {type === "movie" ? title : name}
                        </h1>
                        <div className="flex gap-2 text-2xl">
                            <Rating stars={Math.ceil(vote_average / 2)} />
                        </div>
                    </div>
                    <h2 className="text-3xl font-semibold tracking-wide">
                        Overview
                    </h2>
                    <p className="max-w-[600px]">{overview}</p>
                </div>
            </section>
        </>
    );
}

export default DetailPage;

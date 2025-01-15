import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { useGlobalContext } from "../contexts/GlobalContext";
import { api_base_url, api_img_url, api_key } from "../globals/globals";

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

                <div className="max-w-[600px]">
                    <h1 className="mb-8 font-light tracking-wide text-7xl">{type === "movie" ? title : name}</h1>
                    <h2 className="text-3xl font-semibold tracking-wide">
                        Overview
                    </h2>
                    <p>{overview}</p>
                </div>
            </section>
        </>
    );
}

export default DetailPage;

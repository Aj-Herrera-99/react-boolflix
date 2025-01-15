import React from "react";
import { api_img_url } from "../globals/globals";

function Card({ type, media }) {
    let {
        title,
        original_title,
        name,
        original_name,
        original_language,
        poster_path,
        vote_average,
    } = media;
    if (original_language == "en") original_language = "gb";

    return (
        <div className="bg-blue-600 ">
            <img
                src={`${api_img_url}/w185${poster_path}`}
                alt={type === "movie" ? title : name}
            />
            <p>Title: {type === "movie" ? title : name}</p>
            <p>
                Original Title:{" "}
                {type === "movie" ? original_title : original_name}
            </p>
            <p>
                Original Language:{" "}
                <img
                    width={32}
                    src={`https://flagsapi.com/${original_language.toUpperCase()}/shiny/32.png`}
                ></img>
            </p>
            <p>Vote: {vote_average}</p>
        </div>
    );
}

export default Card;

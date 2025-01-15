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
    const rating = Array.from({ length: Math.ceil(vote_average / 2) });
    const totalRating = Array.from({ length: 5 - rating.length });

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
            <div>
                <span>Vote:</span>
                {rating.map((star, index) => (
                    <i
                        key={index}
                        className="text-yellow-500 fa-solid fa-star"
                    ></i>
                ))}
                {totalRating.map((star, index) => (
                    <i
                        key={index}
                        className="text-yellow-500 fa-regular fa-star"
                    ></i>
                ))}
            </div>
        </div>
    );
}

export default Card;

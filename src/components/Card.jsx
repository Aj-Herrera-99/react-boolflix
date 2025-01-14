import React from "react";
import { api_img_url } from "../globals/globals";

function Card({ type, media }) {
    return (
        <div className="bg-blue-600 ">
            <img
                src={`${api_img_url}/w185${media.poster_path}`}
                alt={type === "movie" ? media.title : media.name}
            />
            <p>Title: {type === "movie" ? media.title : media.name}</p>
            <p>Original Title: {type === "movie" ? media.original_title : media.original_name}</p>
            <p>Original Language: {media.original_language}</p>
            <p>Vote: {media.vote_average}</p>
        </div>
    );
}

export default Card;

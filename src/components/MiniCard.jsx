import React from "react";
import { Link } from "react-router-dom";
import { api_img_url } from "../globals/globals";

function MiniCard({ media, type }) {
    return (
        <Link
            to={`/search/${media.id}`}
            state={{ type }}
            className="!aspect-video min-w-[150px]"
            title={type === "movie" ? media.title : media.name}
        >
            <img
                className="object-cover w-full h-full"
                src={`${api_img_url}/w342${media.backdrop_path}`}
                alt={media.name}
            />
        </Link>
    );
}

export default MiniCard;

import React from "react";

function Card({ type, media }) {
    return (
        <div className="h-[300px] bg-blue-600">
            <p>{media.overview}</p>
            <br />
            <h2>{type === "movie" ? media.title : media.name}</h2>
        </div>
    );
}

export default Card;

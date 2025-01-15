import React, { useState } from "react";
import { api_img_url } from "../globals/globals";

function Card({ style, type, media }) {
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
    const imgSrc = `https://flagsapi.com/${original_language.toUpperCase()}/shiny/32.png`;

    const [isHovered, setIsHovered] = useState(false);

    return (
        <div
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            style={style}
            className={` w-[275px] h-[375px] slider-child px-2`}
        >
            {!isHovered ? (
                <>
                    <div className="h-full overflow-hidden rounded-md">
                        <img
                            className="object-cover w-full h-full"
                            src={`${api_img_url}/w342${poster_path}`}
                            alt={type === "movie" ? title : name}
                        />
                    </div>
                </>
            ) : (
                <div className="flex flex-col justify-around h-full px-2 text-white bg-black rounded-md ">
                    <p>
                        <span className="text-xl font-bold capitalize">
                            Title:
                        </span>{" "}
                        <br /> {type === "movie" ? title : name}
                    </p>
                    <p>
                        <span className="text-xl font-bold capitalize">
                            Original Title:
                        </span>{" "}
                        <br />
                        {type === "movie" ? original_title : original_name}
                    </p>
                    <p>
                        <span className="text-xl font-bold capitalize">
                            Original Language:
                        </span>{" "}
                        <br /> <img width={32} src={imgSrc}></img>
                    </p>
                    <div>
                        <span className="text-xl font-bold capitalize">
                            Rating: <br />{" "}
                        </span>
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
            )}
        </div>
    );
}

export default Card;

import React, { useRef } from "react";
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

    const overlayRef = useRef(null);

    const handleHover = (e) => {
        switch (e.type) {
            case "mouseenter":
                overlayRef.current.classList.add("!flex");
                break;
            case "mouseenter":
                overlayRef.current.classList.remove("!flex");
                break;
            default:
                overlayRef.current.classList.remove("!flex");
        }
    };

    return (
        <div
            onMouseEnter={handleHover}
            onMouseLeave={handleHover}
            style={style}
            className={` w-[275px] h-[375px] slider-child px-2 cursor-pointer`}
        >
            <div className="h-full bounce-anim">
                <div className="h-full">
                    <img
                        className="object-cover w-full h-full rounded-md"
                        src={`${api_img_url}/w342${poster_path}`}
                        alt={type === "movie" ? title : name}
                    />
                </div>
                <div
                    ref={overlayRef}
                    className="absolute top-0 bottom-0 z-30 flex-col justify-around hidden text-white bg-[#000000b5] rounded-md right-0 left-0 px-2 border border-white"
                >
                    <p>
                        <span className="text-xl font-bold capitalize">Title:</span>{" "}
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
            </div>
        </div>
    );
}

export default Card;

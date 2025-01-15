import React, { useRef } from "react";
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
    } = { ...media };
    if (original_language == "en") original_language = "gb";

    const rating = [];
    for (let i = 1; i <= 5; i++) {
        const star =
            i <= Math.ceil(vote_average / 2) ? (
                <i key={i} className="text-yellow-500 fa-solid fa-star"></i>
            ) : (
                <i key={i} className="text-yellow-500 fa-regular fa-star"></i>
            );
        rating.push(star);
    }

    const imgSrc = `https://flagsapi.com/${original_language.toUpperCase()}/shiny/32.png`;

    const overlayRef = useRef(null);

    // actions
    const handleHover = (e) => {
        switch (e.type) {
            case "mouseenter":
                overlayRef.current.classList.add("!flex");
                break;
            case "mouseleave":
                overlayRef.current.classList.remove("!flex");
                break;
            default:
                overlayRef.current.classList.remove("!flex");
        }
    };

    return (
        <div className="py-4 ">
            <div
                onMouseEnter={handleHover}
                onMouseLeave={handleHover}
                className="mx-4 cursor-pointer bounce-anim"
            >
                <div>
                    <img
                        className="overflow-hidden rounded-md"
                        src={`${api_img_url}/w342${poster_path}`}
                        alt={type === "movie" ? title : name}
                    />
                </div>
                <div
                    ref={overlayRef}
                    className="absolute top-0 bottom-0 z-30 flex-col justify-around hidden text-white bg-[#000000b5] rounded-md right-0 left-0 px-2 border-2 border-white"
                >
                    <p>
                        <strong className="text-xl font-bold capitalize">
                            Title:
                        </strong>{" "}
                        <br /> {type === "movie" ? title : name}
                    </p>
                    <p>
                        <strong className="text-xl font-bold capitalize">
                            Original Title:
                        </strong>{" "}
                        <br />
                        {type === "movie" ? original_title : original_name}
                    </p>
                    <p>
                        <strong className="text-xl font-bold capitalize">
                            Original Language:
                        </strong>{" "}
                        <br /> <img width={32} src={imgSrc}></img>
                    </p>
                    <div>
                        <strong className="text-xl font-bold capitalize">
                            Rating: <br />{" "}
                        </strong>
                        {rating}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Card;

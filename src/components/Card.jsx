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
    } = { ...media };
    if (original_language == "en") original_language = "gb";

    const rating = [];
    for (let i = 1; i <= 5; i++) {
        const star =
            i <= Math.ceil(vote_average / 2) ? (
                <i className="text-yellow-500 fa-solid fa-star"></i>
            ) : (
                <i className="text-yellow-500 fa-regular fa-star"></i>
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
        <div style={style} className={` w-[275px] h-[375px] slider-child`}>
            <div
                onMouseEnter={handleHover}
                onMouseLeave={handleHover}
                className="h-full px-2 cursor-pointer bounce-anim"
            >
                <div className="h-full">
                    <img
                        className="object-cover w-full h-full rounded-md"
                        src={`${api_img_url}/w342${poster_path}`}
                        alt={type === "movie" ? title : name}
                    />
                </div>
                <div
                    ref={overlayRef}
                    className="absolute top-0 bottom-0 z-30 flex-col justify-around hidden text-white bg-[#000000b5] rounded-md right-2 left-2 px-2 border-2 border-white"
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

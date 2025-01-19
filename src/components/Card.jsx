import React, { useRef } from "react";
import { api_img_url } from "../globals/globals";
import { Link } from "react-router-dom";
import Rating from "./Rating";
import axios from "axios";

function Card({ type, media }) {
    let {
        id,
        title,
        original_title,
        name,
        original_name,
        original_language,
        poster_path,
        vote_average,
    } = { ...media };
    switch (original_language) {
        case "en":
            original_language = "gb";
            break;
        case "ja":
            original_language = "jp";
            break;
        case "ko":
            original_language = "kr";
            break;
        case "zh":
            original_language = "cn";
            break;
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
        <div className="py-4">
            <Link
                to={`/search/${id}`}
                state={{ type }}
                onMouseEnter={handleHover}
                onMouseLeave={handleHover}
                className={`mx-6 block overflow-hidden border border-white rounded-md shadow-md cursor-pointer bounce-anim shadow-stone-800`}
            >
                <div className=" thumb-container">
                    <img
                        className="object-cover w-full h-full"
                        src={`${api_img_url}/w342${poster_path}`}
                        alt={type === "movie" ? title : name}
                    />
                </div>
                <div
                    ref={overlayRef}
                    className="absolute top-0 bottom-0 z-30 flex-col justify-around hidden text-white bg-[#000000b5] rounded-md right-0 left-0 px-2"
                >
                    <p>
                        <strong className="text-xl font-bold capitalize md:text-lg lg:text-2xl">
                            Title:
                        </strong>{" "}
                        <br /> {type === "movie" ? title : name}
                    </p>
                    <p>
                        <strong className="text-xl font-bold capitalize md:text-lg lg:text-2xl">
                            Original Title:
                        </strong>{" "}
                        <br />
                        {type === "movie" ? original_title : original_name}
                    </p>
                    <p>
                        <strong className="text-xl font-bold capitalize md:text-lg lg:text-2xl">
                            Original Language:
                        </strong>{" "}
                        <br /> <img width={32} src={imgSrc}></img>
                    </p>
                    <div>
                        <strong className="text-xl font-bold capitalize md:text-lg lg:text-2xl">
                            Rating: <br />{" "}
                        </strong>
                        <Rating stars={Math.ceil(vote_average / 2)} />
                    </div>
                </div>
            </Link>
        </div>
    );
}

export default Card;

import React, { useRef } from "react";
import { api_img_url } from "../globals/globals";
import { Link } from "react-router-dom";
import Rating from "./Rating";

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
    if (original_language == "en") original_language = "gb";

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
        <div className="py-4 " draggable={false}>
            <Link
                to={`/search/${id}`}
                state={{ type }}
                onMouseEnter={handleHover}
                onMouseLeave={handleHover}
                className="block mx-6 overflow-hidden border border-white rounded-md shadow-md cursor-pointer bounce-anim shadow-stone-800"
            >
                <div>
                    <img
                        className="object-cover w-full"
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

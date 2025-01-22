import React from "react";

function Rating({ stars }) {
    const rating = [];
    for (let i = 1; i <= 5; i++) {
        const star =
            stars >= i ? (
                <i key={i} className="text-yellow-500 fa-solid fa-star"></i>
            ) : stars >= i - 1 + 0.5 ? (
                <i
                    key={i}
                    className="text-yellow-500 fa-regular fa-star-half-stroke"
                ></i>
            ) : (
                <i key={i} className="text-yellow-500 fa-regular fa-star"></i>
            );
        rating.push(star);
    }
    return <>{rating}</>;
}

export default Rating;

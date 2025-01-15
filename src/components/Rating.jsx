import React from "react";

function Rating({stars}) {
    const rating = [];
    for (let i = 1; i <= 5; i++) {
        const star =
            i <= Math.ceil(stars / 2) ? (
                <i key={i} className="text-yellow-500 fa-solid fa-star"></i>
            ) : (
                <i key={i} className="text-yellow-500 fa-regular fa-star"></i>
            );
        rating.push(star);
    }
    return <>{rating}</>;
}

export default Rating;

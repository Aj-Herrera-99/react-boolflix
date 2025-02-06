import React from "react";

function FrameClip({ src }) {
    return (
        <iframe
        style={{height: "calc(100vh - 80px)"}}
            className="absolute top-0 left-0 w-full opacity-40 -z-10"
            src={`https://www.youtube.com/embed/${src}?autoplay=1&mute=1&controls=0&rel=0&modestbranding=1&loop=1`}
            allow="fullscreen; accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen="allowfullscreen"
        ></iframe>
    );
}

export default FrameClip;

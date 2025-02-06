import React from "react";
import { Link } from "react-router-dom";

function MiniCardsSection({ title, children }) {
    return (
        <section className="my-8">
            <h2 className="my-2 ml-4 text-xl capitalize">{title}</h2>
            <div className="flex gap-1 py-3 overflow-auto border-r-2 rounded-md border-r-white scrollbar-hide">
                {children}
                <Link to={"/"} className="flex items-center justify-center px-2 cursor-pointer text-nowrap">More . . .</Link>
            </div>
        </section>
    );
}

export default MiniCardsSection;

import React from "react";

function CardsSection({ title, children }) {
    return (
        <section className="lg:w-[80vw] xl:max-w-[90vw] mx-auto py-8">
            <h2 className="p-4 text-4xl lg:text-5xl font-light tracking-wide capitalize">
                {title}
            </h2>
            <div className="relative grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mx-[40px]">
                {children}
            </div>
        </section>
    );
}

export default CardsSection;

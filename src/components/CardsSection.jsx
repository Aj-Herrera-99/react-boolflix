import React from "react";

function CardsSection({ title, children }) {
    return (
        <section className="lg:max-w-[87vw] xl:max-w-[90vw] mx-auto py-8">
            <h2 className="p-4 text-4xl font-light tracking-wide capitalize">
                {title}
            </h2>
            {children}
        </section>
    );
}

export default CardsSection;

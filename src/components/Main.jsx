import React from "react";

function Main({ children }) {
    return (
        <main
            style={{ minHeight: "calc(100vh - 80px" }}
            className="relative pb-12 text-white mt-11 lg:mt-0"
        >
            {children}
        </main>
    );
}

export default Main;

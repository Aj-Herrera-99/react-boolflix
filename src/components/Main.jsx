import React from "react";

function Main({ children }) {
    return <main style={{height: "calc(100vh - 80px"}} className="relative pb-12 text-white">{children}</main>;
}

export default Main;

import React from "react";
import { useGlobalContext } from "../contexts/GlobalContext";

function Main() {
    const { search } = useGlobalContext();
    console.log(search);
    return <main className="bg-green-300">Main</main>;
}

export default Main;

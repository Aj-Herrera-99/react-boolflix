import React from "react";
import Header from "../components/Header";
import { Outlet } from "react-router-dom";
import Main from "../components/Main";
import Loader from "../components/Loader";
import { useGlobalContext } from "../contexts/GlobalContext";

function DefaultLayout() {
    const { isLoading } = useGlobalContext();
    return (
        <>
            <Header />
            {isLoading ? (
                <Loader />
            ) : (
                <Main>
                    <Outlet />
                </Main>
            )}
        </>
    );
}

export default DefaultLayout;

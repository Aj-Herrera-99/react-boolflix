import React from "react";
import Header from "../components/Header";
import { Outlet } from "react-router-dom";
import Main from "../components/Main";
import { ApiContextProvider } from "../contexts/ApiContext";

function DefaultLayout() {
    return (
        <>
            <Header />
            <Main>
                <ApiContextProvider>
                    <Outlet />
                </ApiContextProvider>
            </Main>
        </>
    );
}

export default DefaultLayout;

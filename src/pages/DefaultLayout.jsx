import React from "react";
import Header from "../components/Header";
import { Outlet } from "react-router-dom";
import Main from "../components/Main";

function DefaultLayout() {
    return (
        <>
            <Header />
            <Main>
                <Outlet />
            </Main>
        </>
    );
}

export default DefaultLayout;

import React, { lazy, Suspense } from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import DefaultLayout from "./pages/DefaultLayout";
const LazyHomepage = lazy(() => import("./pages/Homepage"));
// import Homepage from "./pages/Homepage";
import SearchMedia from "./pages/SearchMedia";
import DetailPage from "./pages/DetailPage";
import NotFound from "./pages/NotFound";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <BrowserRouter>
                <Routes>
                    <Route Component={DefaultLayout}>
                        <Route
                            index
                            element={
                                <Suspense fallback="Loading . . .">
                                    <LazyHomepage />
                                </Suspense>
                            }
                        ></Route>
                        <Route path="/search" Component={SearchMedia}></Route>
                        <Route
                            path="/search/:id"
                            Component={DetailPage}
                        ></Route>
                        <Route path="*" Component={NotFound}></Route>
                    </Route>
                </Routes>
            </BrowserRouter>
        </QueryClientProvider>
    );
}

export default App;

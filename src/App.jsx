import React, { lazy, Suspense } from "react";
import "./App.css";
import { BrowserRouter, HashRouter, Route, Routes } from "react-router-dom";
import DefaultLayout from "./pages/DefaultLayout";
const LazyHomepage = lazy(() => import("./pages/Homepage"));
import SearchMedia from "./pages/SearchMedia";
const LazyDetailPage = lazy(() => import("./pages/DetailPage"));
import NotFound from "./pages/NotFound";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import Loader from "./components/Loader";

const queryClient = new QueryClient();

function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <HashRouter>
                <Routes>
                    <Route Component={DefaultLayout}>
                        <Route
                            index
                            element={
                                <Suspense fallback={<Loader />}>
                                    <LazyHomepage />
                                </Suspense>
                            }
                        ></Route>
                        <Route path="/search" Component={SearchMedia}></Route>
                        <Route
                            path="/search/:id"
                            element={
                                <Suspense fallback={<Loader />}>
                                    <LazyDetailPage />
                                </Suspense>
                            }
                        ></Route>
                        <Route path="*" Component={NotFound}></Route>
                    </Route>
                </Routes>
            </HashRouter>
            <ReactQueryDevtools />
        </QueryClientProvider>
    );
}

export default App;

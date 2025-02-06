import React, { lazy, Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import Loader from "./components/Loader";
import DefaultLayout from "./pages/DefaultLayout";
import SearchMedia from "./pages/SearchMedia";
import NotFound from "./pages/NotFound";
const LazyHomepage = lazy(() => import("./pages/Homepage"));
const LazyDetailPage = lazy(() => import("./pages/DetailPage"));

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
            </BrowserRouter>
            <ReactQueryDevtools />
        </QueryClientProvider>
    );
}

export default App;

import "./App.css";
import { ApiContextProvider } from "./contexts/ApiContext";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import DefaultLayout from "./pages/DefaultLayout";
import Homepage from "./pages/Homepage";
import SearchMedia from "./pages/SearchMedia";
import DetailPage from "./pages/DetailPage";
import NotFound from "./pages/NotFound";
import Error from "./pages/Error";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <BrowserRouter>
                <Routes>
                    <Route Component={DefaultLayout}>
                        <Route index Component={Homepage}></Route>
                        <Route path="/search" Component={SearchMedia}></Route>
                        <Route
                            path="/search/:id"
                            Component={DetailPage}
                        ></Route>
                        <Route path="/error" Component={Error}></Route>
                        <Route path="*" Component={NotFound}></Route>
                    </Route>
                </Routes>
            </BrowserRouter>
        </QueryClientProvider>
    );
}

export default App;

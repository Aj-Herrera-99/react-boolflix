import "./App.css";
import { GlobalContextProvider } from "./contexts/GlobalContext";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import DefaultLayout from "./pages/DefaultLayout";
import Homepage from "./pages/Homepage";
import SearchMedia from "./pages/SearchMedia";
import DetailPage from "./pages/DetailPage";
import NotFound from "./pages/NotFound";
import Error from "./pages/Error";

function App() {
    return (
        <GlobalContextProvider>
            <BrowserRouter>
                <Routes>
                    <Route Component={DefaultLayout}>
                        <Route index Component={Homepage}></Route>
                        <Route path="/search" Component={SearchMedia}></Route>
                        <Route
                            path="/search/:id"
                            Component={DetailPage}
                        ></Route>
                        <Route path="/error" element={<Error></Error>}></Route>
                        <Route path="*" element={<NotFound></NotFound>}></Route>
                    </Route>
                </Routes>
            </BrowserRouter>
        </GlobalContextProvider>
    );
}

export default App;

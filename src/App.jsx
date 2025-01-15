import "./App.css";
import { GlobalContextProvider } from "./contexts/GlobalContext";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { HashRouter, Route, Routes } from "react-router-dom";

import DefaultLayout from "./pages/DefaultLayout";
import Homepage from "./pages/Homepage";
import SearchMedia from "./pages/SearchMedia";
import DetailPage from "./pages/DetailPage";

function App() {
    return (
        <GlobalContextProvider>
            <HashRouter>
                <Routes>
                    <Route Component={DefaultLayout}>
                        <Route index Component={Homepage}></Route>
                        <Route path="/search" Component={SearchMedia}></Route>
                        <Route
                            path="/search/:id"
                            Component={DetailPage}
                        ></Route>
                    </Route>
                </Routes>
            </HashRouter>
        </GlobalContextProvider>
    );
}

export default App;

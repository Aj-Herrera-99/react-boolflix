import "./App.css";
import { GlobalContextProvider } from "./contexts/GlobalContext";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import DefaultLayout from "./pages/DefaultLayout";
import Homepage from "./pages/Homepage";
import SearchMedia from "./pages/SearchMedia";

function App() {
    return (
        <BrowserRouter>
            <GlobalContextProvider>
                <Routes>
                    <Route Component={DefaultLayout}>
                        <Route index Component={Homepage}></Route>
                        <Route path="/search" Component={SearchMedia}></Route>
                    </Route>
                </Routes>
            </GlobalContextProvider>
        </BrowserRouter>
    );
}

// * testing
// function SimpleSlider() {
//     const settings = {
//         dots: true,
//         infinite: true,
//         slidesToShow: 3,
//         slidesToScroll: 1,
//         autoplay: true,
//         speed: 2000,
//         autoplaySpeed: 2000,
//         cssEase: "linear",
//     };
//     return (
//         <div className="mt-[100px] bg-red-300 max-w-[95vw] mx-auto">
//             <Slider {...settings}>
//                 <div>
//                     <h3>1</h3>
//                 </div>
//                 <div>
//                     <h3>2</h3>
//                 </div>
//                 <div>
//                     <h3>3</h3>
//                 </div>
//                 <div>
//                     <h3>4</h3>
//                 </div>
//                 <div>
//                     <h3>5</h3>
//                 </div>
//                 <div>
//                     <h3>6</h3>
//                 </div>
//             </Slider>
//         </div>
//     );
// }

export default App;

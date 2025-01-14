import "./App.css";
import Header from "./components/Header";
import Main from "./components/Main";
import { GlobalContextProvider } from "./contexts/GlobalContext";

function App() {
    return (
        <GlobalContextProvider>
            <Header />
            <Main />
        </GlobalContextProvider>
    );
}

export default App;

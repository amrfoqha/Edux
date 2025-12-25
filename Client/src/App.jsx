import HomePage from "./Pages/HomePage";
import LoginRegPage from "./Pages/LoginRegPage";
import {Navigate, Route, Routes} from "react-router-dom";
import Header from "./Components/Header.jsx";
import ChatPage from "./Pages/ChatPage.jsx";
function App() {
    return (
        <>
            <Header/>
            <Routes>
                <Route path="/" element={<HomePage/>}/>

                <Route path="/auth" element={<LoginRegPage/>}/>
                <Route path="/chat" element={<ChatPage/>}/>
                <Route path="*" element={<Navigate to="/" replace/>}/>
            </Routes>
        </>
    );
}

export default App;

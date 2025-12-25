import {Navigate, Route, Routes} from "react-router-dom";
import HomePage from "../Pages/HomePage";
import ChatPage from "../Pages/ChatPage";
import UserProfile from "../Pages/UserProfile";

export default function AuthRoutes() {

    return (
        <Routes>
            <Route path="/" element={<HomePage/>}/>
            <Route path="/chat" element={<ChatPage/>}/>
            <Route path="/profile" element={<UserProfile/>}/>
            <Route path="*" element={<Navigate to="/" replace/>}/>
        </Routes>
    );
}

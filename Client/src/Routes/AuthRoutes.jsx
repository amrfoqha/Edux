import {Navigate, Route, Routes} from "react-router-dom";
import HomePage from "../Pages/HomePage";
import ChatPage from "../Pages/ChatPage";
import UserProfile from "../Pages/UserProfile";
import DirectMessagePage from "../Pages/DirectMessagePage.jsx";
import GroupChatPage from "../Pages/GroupChatPage.jsx";
import {useAuth} from "../Hooks/useAuth.jsx";

export default function AuthRoutes() {
    const { user } = useAuth();
    return (
        <Routes>
            <Route path="/" element={<HomePage/>}/>
            <Route path="/chat" element={<ChatPage/>}/>
            <Route path="/dm/:otherUserId" element={<DirectMessagePage currentUser={user} />} />
            <Route path="/group" element={<GroupChatPage currentUser={user}/>} />
            <Route path="/profile" element={<UserProfile/>}/>
            <Route path="*" element={<Navigate to="/" replace/>}/>
        </Routes>
    );
}

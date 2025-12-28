import { useState, useEffect } from "react";
import { UserContext } from "./UserContext";
import {
    createUser,
    loginUser,
    logoutUser,
    getCurrentUser,
    refreshAccessToken as refreshAccessTokenApi,
} from "../API/UserAPI";
import api from "../API/baseUrl";
import { setSocketToken } from "../socket";
import socket from "../socket.js";

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [accessToken, setAccessToken] = useState(null);
    const [loading, setLoading] = useState(true);

    const setAuth = (accessToken, refreshToken, user) => {
        setAccessToken(accessToken);
        setUser(user);

        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("refreshToken", refreshToken);

        api.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;

        // Keep socket auth synced with token
        setSocketToken(accessToken);
    };

    const clearAuth = async () => {
        try {
            await logoutUser();
        } catch (err) {
            console.error("Logout API failed", err);
        }

        setAccessToken(null);
        setUser(null);

        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");

        delete api.defaults.headers.common["Authorization"];

        // Disconnect socket and clear token
        setSocketToken(null);
        if (socket.connected) socket.disconnect();
    };

    const refreshAccessToken = async () => {
        const refreshToken = localStorage.getItem("refreshToken");
        if (!refreshToken) throw new Error("No refresh token");

        const { accessToken } = await refreshAccessTokenApi(refreshToken);

        setAccessToken(accessToken);
        localStorage.setItem("accessToken", accessToken);
        api.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;

        // Update socket auth to new token
        setSocketToken(accessToken);

        // Force reconnect so server sees new token immediately
        if (socket.connected) socket.disconnect();
        socket.connect();

        return accessToken;
    };

    useEffect(() => {
        const initAuth = async () => {
            const storedAccessToken = localStorage.getItem("accessToken");
            if (!storedAccessToken) {
                setLoading(false);
                return;
            }

            api.defaults.headers.common["Authorization"] = `Bearer ${storedAccessToken}`;
            setSocketToken(storedAccessToken);

            try {
                const userData = await getCurrentUser();
                setAccessToken(storedAccessToken);
                setUser(userData);

                if (!socket.connected) socket.connect();
            } catch (error) {
                // Access token expired
                try {
                    await refreshAccessToken();
                    const userData = await getCurrentUser();
                    setUser(userData);
                } catch {
                    clearAuth();
                }
            } finally {
                setLoading(false);
            }
        };

        initAuth();
    }, []);

    const login = async (email, password) => {
        try {

            const { accessToken, refreshToken } = await loginUser(email, password);

            // Set token + headers + socket token
            setAuth(accessToken, refreshToken, null);

            const userData = await getCurrentUser();
            setAuth(accessToken, refreshToken, userData);

            // Ensure socket uses current token
            if (socket.connected) socket.disconnect();
            socket.connect();

            return { success: true };
        } catch (error) {
            return {
                success: false,
                error: error.response?.data?.message || "Login failed",
            };
        }
    };

    const register = async (regData) => {
        try {
            const { accessToken, refreshToken } = await createUser(regData);

            setAuth(accessToken, refreshToken, null);

            const userData = await getCurrentUser();
            setAuth(accessToken, refreshToken, userData);

            if (socket.connected) socket.disconnect();
            socket.connect();

            return { success: true };
        } catch (error) {
            return {
                success: false,
                error: error.response?.data?.message || "Registration failed",
            };
        }
    };

    const logout = () => clearAuth();

    const isAuthenticated = !!accessToken && !!user;

    return (
        <UserContext.Provider
            value={{
                user,
                accessToken,
                loading,
                login,
                register,
                logout,
                isAuthenticated,
            }}
        >
            {children}
        </UserContext.Provider>
    );
};

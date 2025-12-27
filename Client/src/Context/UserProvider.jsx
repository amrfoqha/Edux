import { useState, useEffect } from "react";
import { UserContext } from "./UserContext";
import {
    createUser,
    loginUser,
    getCurrentUser,
    refreshAccessToken as refreshAccessTokenApi ,
} from "../API/UserAPI";
import api from "../API/baseUrl";

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
    };

    const clearAuth = () => {
        setAccessToken(null);
        setUser(null);

        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");

        delete api.defaults.headers.common["Authorization"];
    };


    const refreshAccessToken = async () => {
        const refreshToken = localStorage.getItem("refreshToken");
        if (!refreshToken) throw new Error("No refresh token");

        const { accessToken } = await refreshAccessTokenApi(refreshToken);

        setAccessToken(accessToken);
        localStorage.setItem("accessToken", accessToken);
        api.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;

        return accessToken;
    };


    useEffect(() => {
        const initAuth = async () => {
            const storedAccessToken = localStorage.getItem("accessToken");
            if (!storedAccessToken) {
                setLoading(false);
                return;
            }

            api.defaults.headers.common["Authorization"] =
                `Bearer ${storedAccessToken}`;

            try {
                const userData = await getCurrentUser();
                setAccessToken(storedAccessToken);
                setUser(userData);
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
            setAuth(accessToken, refreshToken, null);
            const userData = await getCurrentUser();
            setUser(userData);

            setAuth(accessToken, refreshToken, userData);
            return { success: true };
        } catch (error) {
            return {
                success: false,
                error: error.response?.data?.message || "Login failed",
            };
        }
    };

    const register = async (userData) => {
        try {
            const { accessToken, refreshToken } = await createUser(userData);
            setAuth(accessToken, refreshToken, null);
            const userData = await getCurrentUser();
            setUser(userData);

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

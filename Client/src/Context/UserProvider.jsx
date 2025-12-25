import { useState, useEffect } from "react";
import { UserContext } from "./UserContext.jsx";
import { createUser, loginUser, getCurrentUser } from "../API/UserAPI";
import api from "../API/baseUrl";

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);
    const [loading, setLoading] = useState(true);

    const setAuth = (token, user) => {
        setToken(token);
        setUser(user);
        localStorage.setItem("token", token);
        api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    };

    const clearAuth = () => {
        setToken(null);
        setUser(null);
        localStorage.removeItem("token");
        delete api.defaults.headers.common["Authorization"];
    };

    useEffect(() => {
        const initAuth = async () => {
            const storedToken = localStorage.getItem("token");
            if (!storedToken) {
                setLoading(false);
                return;
            }

            api.defaults.headers.common["Authorization"] = `Bearer ${storedToken}`;

            try {
                const userData = await getCurrentUser();
                setToken(storedToken);
                setUser(userData);
            } catch {
                clearAuth();
            } finally {
                setLoading(false);
            }
        };

        initAuth();
    }, []);

    const login = async (email, password) => {
        try {
            const { token, user } = await loginUser(email, password);
            setAuth(token, user);
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
            const { token, user } = await createUser(userData);
            setAuth(token, user);
            return { success: true };
        } catch (error) {
            return {
                success: false,
                error: error.response?.data?.message || "Registration failed",
            };
        }
    };

    const logout = () => clearAuth();

    const refreshUser = async () => {
        try {
            const userData = await getCurrentUser();
            setUser(userData);
            return { success: true };
        } catch {
            clearAuth();
            return { success: false };
        }
    };

    const isAuthenticated = !!token && !!user;

    return (
        <UserContext.Provider
            value={{
                user,
                token,
                loading,
                login,
                register,
                logout,
                refreshUser,
                isAuthenticated,
            }}
        >
            {children}
        </UserContext.Provider>
    );
};

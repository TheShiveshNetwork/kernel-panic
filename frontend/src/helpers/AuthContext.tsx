import { PanicApi } from "@/api";
import React, { createContext, useState, useEffect, ReactNode } from "react";

type ILogout = {
    success: boolean;
    message: string;
};

export interface AuthContextType {
    token: string | null;
    setToken: React.Dispatch<React.SetStateAction<string | null>>;
    loading: boolean;
    logout: () => Promise<ILogout>;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [token, setToken] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    async function logout(): Promise<ILogout> {
        try {
            await PanicApi.get("/logout");
            localStorage.removeItem("token");
            setToken(null);
            return { success: true, message: "Logged out successfully" };
        } catch (error) {
            console.error(error);
            return { success: false, message: "An error occurred while logging out" };
        }
    }

    async function checkTokenValidity() {
        await PanicApi.get("/token-is-valid")
        .then((result) => {
            if (result.data.validToken) {
                return;
            }
            logout();
            return;
        })
        .catch((error) => {
            console.log(error);
            logout();
            return;
        });
    }

    useEffect(() => {
        const storedToken = localStorage.getItem("token");
        setToken(storedToken);
        setLoading(false);
    }, []);

    useEffect(() => {
        if (token) {
            checkTokenValidity();
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [token]);

    return (
        <AuthContext.Provider value={{ token, setToken, loading, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

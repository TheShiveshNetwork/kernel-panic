import { PanicApi } from "@/api";
import React, { createContext, useState, useEffect, ReactNode } from "react";

export interface AuthContextType {
    token: string | null;
    setToken: React.Dispatch<React.SetStateAction<string | null>>;
    loading: boolean;
    logout: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [token, setToken] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    async function logout() {
        localStorage.removeItem("token");
        setToken(null);
    }

    async function checkTokenValidity() {
        await PanicApi.get("/token-is-valid")
        .then((result) => {
            console.log(result.data);
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

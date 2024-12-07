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

    useEffect(() => {
        const storedToken = localStorage.getItem("token");
        setToken(storedToken);
        setLoading(false);
    }, []);

    return (
        <AuthContext.Provider value={{ token, setToken, loading, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

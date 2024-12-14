import { PanicApi } from "@/api";
import React, { createContext, useState, useEffect, ReactNode } from "react";

type ILogout = {
    success: boolean;
    message: string;
};

export interface AuthContextType {
    isLoggedIn: boolean;
    setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
    loading: boolean;
    logout: () => Promise<ILogout>;
}

// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(true);

    async function logout(): Promise<ILogout> {
        try {
            await PanicApi.get("/logout");
            setIsLoggedIn(false);
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
                setIsLoggedIn(true);
                setLoading(false);
                return;
            }
            setIsLoggedIn(false);
            setLoading(false);
            logout();
            return;
        })
        .catch((error) => {
            console.log(error);
            setIsLoggedIn(false);
            setLoading(false);
            logout();
            return;
        });
    }

    useEffect(() => {
        checkTokenValidity();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn, loading, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

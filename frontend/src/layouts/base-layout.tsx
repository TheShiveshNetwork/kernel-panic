import { AuthProvider } from "@/helpers/AuthContext";

export default function BaseLayout({ children }: { children: React.ReactNode }) {
    return (
        <AuthProvider>
            {children}
        </AuthProvider>
    );
}

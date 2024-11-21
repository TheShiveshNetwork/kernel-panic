import Loading from "@/components/loading";
import { useAuth } from "@/hooks/use-auth";
import { Navigate } from "react-router-dom";

export default function ProtectedLayout({ children }: { children: React.ReactNode }) {
    const { token, loading } = useAuth();

    if (loading) {
        return <Loading/>;
    }

    if (!token) {
        return <Navigate to="/" replace />;
    }

    return (
        <div>
            {children}
        </div>
    );
};

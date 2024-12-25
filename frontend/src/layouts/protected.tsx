import Spinner from "@/components/spinner";
import { useAuth } from "@/hooks/use-auth";
import { Navigate } from "react-router-dom";

export default function ProtectedLayout({ children }: { children: React.ReactNode }) {
    const { isLoggedIn, loading } = useAuth();

    if (loading) {
        return <Spinner/>;
    }

    if (!isLoggedIn) {
        return <Navigate to="/" replace />;
    }

    return (
        <div>
            {children}
        </div>
    );
};

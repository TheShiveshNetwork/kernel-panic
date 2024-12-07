import 'react-toastify/dist/ReactToastify.css';

import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import LandingPage from "@/pages/LandingPage";
import GamePage from "@/pages/GamePage";
import LeaderboardPage from "@/pages/LeaderboardPage";
import { ToastContainer } from "react-toastify";
import ProtectedLayout from '@/layouts/protected';
import BaseLayout from '@/layouts/base-layout';

const router = createBrowserRouter([
    {
        children: [
            {
                path: "/",
                element: <LandingPage />,
            },
            {
                path: "/leaderboard",
                element: <LeaderboardPage />,
            },
            {
                path: "/panic",
                element:
                    <ProtectedLayout>
                        <GamePage />
                    </ProtectedLayout>
                ,
            },
        ],
        path: "/",
        element:
            <BaseLayout>
                <ToastContainer />
                <Outlet />
            </BaseLayout>
        ,
    }
]);

export function Router() {
    return (
        <RouterProvider router={router} />
    );
}

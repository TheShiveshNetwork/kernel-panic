import 'react-toastify/dist/ReactToastify.css';

import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import LandingPage from "@/pages/LandingPage";
import GamePage from "@/pages/GamePage";
import LeaderboardPage from "@/pages/LeaderboardPage";
import { ToastContainer } from "react-toastify";
import ProtectedLayout from '@/layouts/protected';
import BaseLayout from '@/layouts/base-layout';
import ScrollToTop from '@/utils/scroll-to-top';
import { config } from '@/config';

const router = createBrowserRouter([
    {
        children: [
            {
                path: "/",
                element: <LandingPage />,
            },
            {
                path: config.routes.leaderboardPageRoute,
                element: <LeaderboardPage />,
            },
            {
                path: config.routes.gamePageRoute,
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
                <ToastContainer toastClassName="toast-message" position='bottom-right' hideProgressBar />
                <ScrollToTop />
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

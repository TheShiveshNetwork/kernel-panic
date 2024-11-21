import 'react-toastify/dist/ReactToastify.css';

import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import LandingPage from "@/pages/LandingPage";
import GamePage from "@/pages/GamePage";
import { ToastContainer } from "react-toastify";
import ProtectedLayout from '@/layouts/protected';
import BaseLayout from '@/layouts/base-layout';
import IncrementValue from '@/pages/IncrementValue';
import ReadValue from '@/pages/ReadValue';

const router = createBrowserRouter([
    {
        children: [
            {
                path: "/",
                element: <LandingPage />,
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
    },
    {
        path: "/incrementValue",
        element: <IncrementValue />,
    },
    {
        path: "/readValue",
        element: <ReadValue />,
    }
]);

export function Router() {
    return (
        <RouterProvider router={router} />
    );
}

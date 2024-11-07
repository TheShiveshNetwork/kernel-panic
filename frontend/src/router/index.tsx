import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LandingPage from "@/pages/LandingPage";
import GamePage from "@/pages/GamePage";

const router = createBrowserRouter([
    {
        path: "/",
        element: <LandingPage/>,
    },
    {
        path: "/panic",
        element: <GamePage/>,
    }
]);

export function Router() {
    return (
        <RouterProvider router={router} />
    );
}

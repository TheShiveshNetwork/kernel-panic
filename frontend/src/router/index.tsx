import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "@/pages/LandingPage";
import GamePage from "@/pages/GamePage";
import IncrementValue from "@/pages/IncrementValue";
import ReadValue from "@/pages/ReadValue";

const Router = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/incrementValue" element={<IncrementValue />} />
                <Route path="/readValue" element={<ReadValue />} />
                <Route path="/panic" element={<GamePage />} />
            </Routes>
        </BrowserRouter>
    );
};

export default Router;

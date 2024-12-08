import { useState, useEffect } from "react";

const TerminalLoading = () => {
    const [index, setIndex] = useState(0);
    const loadingChars = ["|", "/", "-", "\\"];

    useEffect(() => {
        const interval = setInterval(() => {
            setIndex((prevIndex) => (prevIndex + 1) % loadingChars.length);
        }, 200);
        return () => clearInterval(interval);
    }, [loadingChars.length]);

    return (
        <div>
            <span className="animate-pulse">Loading</span>
            <span className="ml-2">{loadingChars[index]}</span>
        </div>
    );
};

export default TerminalLoading;

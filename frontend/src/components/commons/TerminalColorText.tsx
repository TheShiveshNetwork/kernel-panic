export function TerminalColorText({ children, color, className }: { children: React.ReactNode, color: string, className?: string }) {
    const textColor = color === "green" ? "text-green-500" :
        color === "blue" ? "text-blue-600" :
            color === "red" ? "text-red-500" :
                "text-white";

    return (
        <div className={`${className} ${textColor}`}>
            {children}
        </div>
    );
}

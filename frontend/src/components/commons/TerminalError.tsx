import { TerminalColorText } from "./TerminalColorText";

export function TerminalError({ children }: { children: React.ReactNode }) {
    return (
        <TerminalColorText color="red">
            {children}
        </TerminalColorText>
    );
}

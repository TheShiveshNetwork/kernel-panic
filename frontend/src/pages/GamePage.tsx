import Terminal, { ColorMode } from 'react-terminal-ui';

function GamePage() {
    const terminalLineData = "Welcome to kernel panic!";
    return (
        <div className="container">
            <Terminal
                name='Kernel Panic'
                colorMode={ColorMode.Dark}
                onInput={terminalInput => console.log(`New terminal input received: '${terminalInput}'`)}
            >
                {terminalLineData}
            </Terminal>
        </div>
    );
}

export default GamePage;
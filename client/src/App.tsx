import { useState } from "react"

// Pages
import BuildTransition from "./pages/BuildTransition"
import EntryScreen from "./pages/EntryScreen"
import TerminalMode from "./pages/TerminalMode"

function App() {
    const [page, setPage] = useState<'entry' | 'loading' | 'terminal'>('entry')

    if (page === 'loading') return <BuildTransition mode="terminal" onDone={() => setPage('terminal')} />
    if (page === 'terminal') return <TerminalMode />

    return <EntryScreen onSelect={() => setPage('loading')} />
}

export default App

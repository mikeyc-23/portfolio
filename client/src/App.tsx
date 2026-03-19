import { useState } from "react"

// Pages
import BuildTransition from "./pages/BuildTransition"
import EntryScreen from "./pages/EntryScreen"
import TerminalMode from "./pages/TerminalMode"

function App() {
    const [mode, setMode] = useState('entry')       // which mode was selected
    const [isLoading, setIsLoading] = useState(false)
    const [page, setPage] = useState('entry')       // which page is currently showing

    function handleSelect(selected: string) {
        setMode(selected)
        setIsLoading(true)
    }

    function handleDone() {
        setIsLoading(false)
        setPage(mode)   // land on whichever mode was selected
    }

    if (isLoading) return <BuildTransition mode={mode} onDone={handleDone} />
    if (page === 'terminal') return <TerminalMode />

    return <EntryScreen onSelect={handleSelect} />
}

export default App

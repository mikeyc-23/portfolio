import { useState } from "react"

//Pages
import BuildTransition from "./pages/BuildTransition"
import EntryScreen from "./pages/EntryScreen"

function App() { 
    const [mode, setMode] = useState('entry')
    const [isLoading, setIsLoading] = useState(false)

    function handleSelect(selected: string) {
        setMode(selected)
        setIsLoading(true)
    }

    return (
        <div>
            {isLoading
                ? <BuildTransition mode={mode} onDone={() => setIsLoading(false)} />
                : <EntryScreen onSelect={handleSelect} />
            }
        </div>
    )
}

export default App
import { use, useState } from "react"
import EntryScreen from "./pages/EntryScreen"

function App() { 
    const [mode, setMode] = useState('entry')
    return (
        <div>
            <EntryScreen onSelect={setMode}/>
        </div>
    )
}

export default App
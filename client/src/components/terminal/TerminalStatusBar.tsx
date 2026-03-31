import { useState, useEffect } from "react"

function TerminalStatusBar() {
    const [time, setTime] = useState("")
    
    useEffect(() => {
        
        const timer = setInterval(() => {
            setTime(new Date().toLocaleTimeString())
        }, 1000)
        
        return () => {
            clearInterval(timer)
        }
        
    }, [])


    return (
        <div className="t-statusbar">
            <div className="t-statusbar__left">
                <span><span className="t-statusbar__online-dot">●</span> ONLINE</span>
                <span>UTF-8</span>
                <span>MAIN</span>
                <span>{time}</span>
            </div>
            <span className="t-statusbar__build">
                COMING SOON
            </span>
        </div>
    )
}

export default TerminalStatusBar

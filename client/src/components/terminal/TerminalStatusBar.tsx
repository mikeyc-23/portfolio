function TerminalStatusBar() {
    return (
        <div className="t-statusbar">
            <div className="t-statusbar__left">
                <span><span className="t-statusbar__online-dot">●</span> ONLINE</span>
                <span>UTF-8</span>
                <span>MAIN</span>
                <span>TORONTO</span>
            </div>
            <span className="t-statusbar__build">
                COMING SOON
            </span>
        </div>
    )
}

export default TerminalStatusBar

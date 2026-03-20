function TerminalStatusBar() {
    return (
        <div className="t-statusbar">
            <div className="t-statusbar__left">
                <span><span className="t-statusbar__online-dot">●</span> ONLINE</span>
                <span>UTF-8</span>
                <span>MAIN</span>
                <span>TORONTO</span>
            </div>
            <button className="t-statusbar__build">
                BUILD LIGHT MODE
            </button>
        </div>
    )
}

export default TerminalStatusBar

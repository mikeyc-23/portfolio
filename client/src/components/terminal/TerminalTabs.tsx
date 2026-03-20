import treeVideo from '../../assets/mascot-tree.mp4'

type Props = {
    tabs: string[]
}

function TerminalTabs({ tabs }: Props) {
    return (
        <nav className="t-tabs">
            {tabs.map(tab => (
                <button key={tab} className="t-tabs__tab">
                    {tab}
                </button>
            ))}
            <div className="t-tabs__mascot">
                <video
                    src={treeVideo}
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="t-tabs__mascot-video"
                />
            </div>
        </nav>
    )
}

export default TerminalTabs

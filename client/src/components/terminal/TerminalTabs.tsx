import treeVideo from '../../assets/mascot-tree.mp4'

type Props = {
    tabs: string[]
    activeTab: string
}

function TerminalTabs({ tabs, activeTab }: Props) {
    return (
        <nav className="t-tabs">
            {tabs.map(tab => (
                <button
                    key={tab}
                    className={`t-tabs__tab${tab === activeTab ? ' t-tabs__tab--active' : ''}`}
                    onClick={() => {
                        const el = document.getElementById(tab.toLowerCase())
                        el?.scrollIntoView({behavior: 'smooth'})
                    }}
                >
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

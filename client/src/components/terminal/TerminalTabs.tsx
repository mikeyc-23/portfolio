import turtle from '../../assets/turtle-removebg-preview.png'

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
            <img src={turtle} alt="" className="t-tabs__turtle" />
        </nav>
    )
}

export default TerminalTabs

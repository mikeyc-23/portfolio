import TerminalTabs from '../components/terminal/TerminalTabs'
import TerminalAbout from '../components/terminal/TerminalAbout'
import TerminalStatusBar from '../components/terminal/TerminalStatusBar'

const tabs = ['SUMMARY', 'ABOUT', 'PROJECTS', 'SKILLS', 'CONTACT']

function TerminalMode() {
    return (
        <div className="page t-terminal">
            <TerminalTabs tabs={tabs} />
            <div className="t-terminal__scroll">
                {<TerminalAbout/>}
            </div>
            <TerminalStatusBar />
        </div>
    )
}

export default TerminalMode

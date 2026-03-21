import TerminalTabs from '../components/terminal/TerminalTabs'
import TerminalAbout from '../components/terminal/TerminalAbout'
import TerminalSkills from '../components/terminal/TerminalSkills'
import TerminalStatusBar from '../components/terminal/TerminalStatusBar'
import TerminalProjects from '../components/terminal/TerminalProjects'
import wsLogo from '../assets/icons/wealthsimple.svg'

const tabs = ['SUMMARY', 'ABOUT', 'PROJECTS', 'SKILLS', 'CONTACT']

function TerminalMode() {
    return (
        <div className="page t-terminal">
            <TerminalTabs tabs={tabs} />
            <div className="t-terminal__scroll">
                <header className="t-hero">
                    <h1 className="t-hero__name">Meet Mikey</h1>
                    <p className="t-hero__tagline">developer &middot; builder &middot; nerd</p>
                    <p className="t-hero__role">
                        Senior Specialist, Knowledge Operations &amp; Tools @ Wealthsimple
                        <img src={wsLogo} alt="" className="t-hero__ws-logo" />
                    </p>
                </header>
                <TerminalAbout />
                <TerminalSkills />
                <TerminalProjects/>
            </div>
            <TerminalStatusBar />
        </div>
    )
}

export default TerminalMode

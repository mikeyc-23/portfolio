import { useState, useEffect, useRef } from 'react'
import TerminalTabs from '../components/terminal/TerminalTabs'
import TerminalAbout from '../components/terminal/TerminalAbout'
import TerminalSkills from '../components/terminal/TerminalSkills'
import TerminalStatusBar from '../components/terminal/TerminalStatusBar'
import TerminalProjects from '../components/terminal/TerminalProjects'
import TerminalBlog from '../components/terminal/TerminalBlog'
import wsLogo from '../assets/icons/wealthsimple.svg'
import TerminalContact from '../components/terminal/TerminalContact'
import { ScrollContainerContext } from '../context/ScrollContainerContext'

const tabs = ['ABOUT', 'SKILLS', 'PROJECTS', 'BLOG', 'CONTACT']

function TerminalMode() {
    const [activeTab, setActiveTab] = useState('ABOUT')
    const scrollRef = useRef<HTMLDivElement>(null)
    const [scrollContainer, setScrollContainer] = useState<HTMLElement | null>(null)

    // expose the scroll container to child components via context
    useEffect(() => {
        if (scrollRef.current) setScrollContainer(scrollRef.current)
    }, [])

    useEffect(() => {
        const container = scrollRef.current
        if (!container) return

        const sectionIds = tabs.map(t => t.toLowerCase())

        let current = sectionIds[0]

        const handleScroll = () => {
            const scrollTop = container.scrollTop
            const offset = 100 // how far past a section's top before it becomes "active"

            // walk backwards — last section whose top has scrolled past the offset wins
            let best = sectionIds[0]
            for (const id of sectionIds) {
                const el = document.getElementById(id)
                if (!el) continue
                if (el.offsetTop - offset <= scrollTop) {
                    best = id
                }
            }

            // also snap to last section if scrolled to bottom
            if (container.scrollHeight - scrollTop - container.clientHeight < 2) {
                best = sectionIds[sectionIds.length - 1]
            }

            if (best !== current) {
                current = best
                setActiveTab(best.toUpperCase())
            }
        }

        container.addEventListener('scroll', handleScroll, { passive: true })
        handleScroll()
        return () => container.removeEventListener('scroll', handleScroll)
    }, [])

    return (
        <div className="page t-terminal">
            <TerminalTabs tabs={tabs} activeTab={activeTab} />
            <ScrollContainerContext.Provider value={scrollContainer}>
                <div className="t-terminal__scroll" ref={scrollRef}>
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
                    <TerminalBlog/>
                    <TerminalContact/>
                </div>
            </ScrollContainerContext.Provider>
            <TerminalStatusBar />
        </div>
    )
}

export default TerminalMode

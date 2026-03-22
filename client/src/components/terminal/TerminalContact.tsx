import { useState, useEffect, useRef, useContext } from 'react'
import { ScrollContainerContext } from '../../context/ScrollContainerContext'

const LINES = [
    '> initializing contact protocols...',
    '> scanning available channels...',
    '> 3 connections found.',
    '> ready.',
]

function TerminalContact() {
    const sectionRef = useRef<HTMLElement>(null)
    const scrollRoot = useContext(ScrollContainerContext)
    const [showBox, setShowBox] = useState(false)
    const [visibleLines, setVisibleLines] = useState(0)
    const [showAscii, setShowAscii] = useState(false)
    const [showLinks, setShowLinks] = useState(false)
    const [hasTriggered, setHasTriggered] = useState(false)

    // trigger boot sequence when section scrolls into view
    useEffect(() => {
        const el = sectionRef.current
        if (!el || hasTriggered) return

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setHasTriggered(true)
                    observer.disconnect()
                }
            },
            { threshold: 0.1, root: scrollRoot ?? undefined }
        )

        observer.observe(el)
        return () => observer.disconnect()
    }, [hasTriggered, scrollRoot])

    // orchestrated boot sequence
    useEffect(() => {
        if (!hasTriggered) return
        const timers: ReturnType<typeof setTimeout>[] = []

        // 1) border draws in
        timers.push(setTimeout(() => setShowBox(true), 50))

        // 2) boot lines snap in after box is drawn
        const bootStart = 650
        LINES.forEach((_, i) => {
            timers.push(setTimeout(() => setVisibleLines(i + 1), bootStart + i * 150))
        })

        // 3) ASCII header + links appear after boot
        const bootEnd = bootStart + LINES.length * 150
        timers.push(setTimeout(() => setShowAscii(true), bootEnd + 100))
        timers.push(setTimeout(() => setShowLinks(true), bootEnd + 250))

        return () => timers.forEach(clearTimeout)
    }, [hasTriggered])

    return (
        <section className="t-contact" id="contact" ref={sectionRef}>
            <h2 className="t-section__header">// 05 — CONTACT</h2>
            <div className={`t-contact__terminal${showBox ? ' t-contact__terminal--visible' : ''}`}>
                <div className="t-contact__boot">
                    {LINES.map((line, i) => (
                        <p
                            key={i}
                            className={`t-contact__boot-line ${i < visibleLines ? 't-contact__boot-line--visible' : ''}`}
                        >
                            {line}
                        </p>
                    ))}
                </div>

                <pre className={`t-contact__ascii${showAscii ? ' t-contact__ascii--visible' : ''}`}>
{`╔══════════════════════════════════════╗
║  OUTBOUND TRANSMISSION CHANNELS     ║
╚══════════════════════════════════════╝`}
                </pre>

                <div className="t-contact__links">
                    <a href="https://github.com/mikeyc-23" target="_blank" rel="noopener noreferrer"
                        className={`t-contact__link ${showLinks ? 't-contact__link--visible' : ''}`}
                        style={{ transitionDelay: '0ms' }}>
                        <span className="t-contact__index">[01]</span>
                        <span className="t-contact__protocol">SSH</span>
                        <span className="t-contact__separator">://</span>
                        <span className="t-contact__value">github.com/mikeyc-23</span>
                        <span className="t-contact__status" style={{ animationDelay: '0s' }}>● ACTIVE</span>
                    </a>
                    <a href="https://www.linkedin.com/in/mike-corrado-77a069a9/" target="_blank" rel="noopener noreferrer"
                        className={`t-contact__link ${showLinks ? 't-contact__link--visible' : ''}`}
                        style={{ transitionDelay: '150ms' }}>
                        <span className="t-contact__index">[02]</span>
                        <span className="t-contact__protocol">NET</span>
                        <span className="t-contact__separator">://</span>
                        <span className="t-contact__value">linkedin/mike-corrado</span>
                        <span className="t-contact__status" style={{ animationDelay: '0.8s' }}>● ACTIVE</span>
                    </a>
                    <a href="mailto:michaelcorrado23@gmail.com"
                        className={`t-contact__link ${showLinks ? 't-contact__link--visible' : ''}`}
                        style={{ transitionDelay: '300ms' }}>
                        <span className="t-contact__index">[03]</span>
                        <span className="t-contact__protocol">SMTP</span>
                        <span className="t-contact__separator">://</span>
                        <span className="t-contact__value">michaelcorrado23@gmail.com</span>
                        <span className="t-contact__status" style={{ animationDelay: '1.6s' }}>● ACTIVE</span>
                    </a>
                </div>

                <div className={`t-contact__footer ${showLinks ? 't-contact__footer--visible' : ''}`}>
                    <span className="t-contact__prompt">mikey@portfolio:~$</span>
                    <span>ready for transmission</span>
                    <span className="t-contact__blink">_</span>
                </div>
            </div>
        </section>
    )
}

export default TerminalContact

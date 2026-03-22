import { useScrollReveal } from '../../hooks/useScrollReveal'
import { useState, useEffect, useRef } from 'react'

const LINES = [
    '> initializing contact protocols...',
    '> scanning available channels...',
    '> 3 connections found.',
    '> ready.',
]

function TerminalContact() {
    const ref = useScrollReveal()
    const sectionRef = useRef<HTMLElement>(null)
    const [visibleLines, setVisibleLines] = useState(0)
    const [showLinks, setShowLinks] = useState(false)
    const [hasTriggered, setHasTriggered] = useState(false)

    // trigger boot sequence only when section scrolls into view
    useEffect(() => {
        const el = sectionRef.current
        if (!el) return

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && !hasTriggered) {
                    setHasTriggered(true)
                    observer.unobserve(el)
                }
            },
            { threshold: 0.3 }
        )

        observer.observe(el)
        return () => observer.disconnect()
    }, [hasTriggered])

    // run the boot animation after scroll trigger
    useEffect(() => {
        if (!hasTriggered) return
        const timers: ReturnType<typeof setTimeout>[] = []
        LINES.forEach((_, i) => {
            timers.push(setTimeout(() => setVisibleLines(i + 1), 300 + i * 350))
        })
        // show links after all boot lines have appeared
        timers.push(setTimeout(() => setShowLinks(true), 300 + LINES.length * 350 + 200))
        return () => timers.forEach(clearTimeout)
    }, [hasTriggered])

    return (
        <section className="t-contact" id="contact" ref={(node) => {
            // combine both refs
            (ref as React.MutableRefObject<HTMLElement | null>).current = node;
            (sectionRef as React.MutableRefObject<HTMLElement | null>).current = node;
        }}>
            <h2 className="t-section__header">// 04 — CONTACT</h2>
            <div className="t-contact__terminal">
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

                <pre className="t-contact__ascii">
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

                <p className={`t-contact__footer ${showLinks ? 't-contact__footer--visible' : ''}`}>
                    &gt; select a channel to transmit
                </p>
            </div>
        </section>
    )
}

export default TerminalContact

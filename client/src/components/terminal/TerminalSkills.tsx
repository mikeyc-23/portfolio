import { useRef, useEffect, useState } from 'react'
import { skillGroups } from '../../data/content'
import { useScrollReveal } from '../../hooks/useScrollReveal'

const ICON_COLOR = '8ac860'
const SPEED = 40 // pixels per second — consistent across all rows

function SkillTag({ skill }: { skill: { name: string; icon: string; localIcon: string } }) {
    const iconSrc = skill.localIcon
        ? skill.localIcon
        : skill.icon
            ? `https://cdn.simpleicons.org/${skill.icon}/${ICON_COLOR}`
            : ''
    return (
        <span className="t-skills__tag">
            {iconSrc && (
                <img
                    src={iconSrc}
                    alt=""
                    className={`t-skills__icon${skill.localIcon ? ' t-skills__icon--local' : ''}`}
                />
            )}
            {skill.name}
        </span>
    )
}

function TerminalSkills() {
    const wrapRefs = useRef<(HTMLDivElement | null)[]>([])
    const trackRefs = useRef<(HTMLDivElement | null)[]>([])
    const innerRefs = useRef<(HTMLDivElement | null)[]>([])
    // how many times to repeat the skills list WITHIN each half (so each half fills the screen)
    const [repeats, setRepeats] = useState<number[]>([])

    useEffect(() => {
        // measure how many repeats are needed so each half-track exceeds viewport width
        const r = skillGroups.map((_, i) => {
            const track = trackRefs.current[i]
            const wrap = wrapRefs.current[i]
            if (!track || !wrap) return 2
            const trackW = track.offsetWidth
            const viewW = wrap.offsetWidth
            // each half needs to be at least as wide as the viewport for seamless scroll
            return Math.max(2, Math.ceil(viewW / trackW) + 1)
        })
        setRepeats(r)
    }, [])

    // once repeats are set, re-measure the now-wider tracks and start animation
    useEffect(() => {
        if (repeats.length === 0) return
        requestAnimationFrame(() => {
            trackRefs.current.forEach((track, i) => {
                const inner = innerRefs.current[i]
                if (!track || !inner) return
                // track now contains repeated skills, measure its full width
                const trackW = track.offsetWidth
                const duration = (trackW / SPEED).toFixed(2)
                inner.style.animationDuration = `${duration}s`
                inner.style.animationPlayState = 'running'
            })
        })
    }, [repeats])

    const getRepeats = (gi: number) => repeats[gi] || 1
    const scrollRef = useScrollReveal()

    return (
        <section className="t-skills" id="skills" ref={scrollRef}>
            <h2 className="t-section__header">// 02 — SKILLS</h2>
            <div className="t-skills__groups">
                {skillGroups.map((group, gi) => (
                    <div key={group.category} className="t-skills__group">
                            <span className="t-skills__category">{group.category}</span>
                            <div
                                className="t-skills__ticker-wrap"
                                ref={el => { wrapRefs.current[gi] = el }}
                            >
                                <div
                                    className="t-skills__ticker-inner"
                                    ref={el => { innerRefs.current[gi] = el }}
                                >
                                    {/* Two identical halves — animation shifts by exactly -50% */}
                                    {[0, 1].map(half => (
                                        <div
                                            key={half}
                                            className="t-skills__ticker-track"
                                            ref={half === 0 ? el => { trackRefs.current[gi] = el } : undefined}
                                            aria-hidden={half === 1}
                                        >
                                            {Array.from({ length: getRepeats(gi) }, (_, r) =>
                                                group.skills.map(skill => (
                                                    <SkillTag key={`${skill.name}-${r}`} skill={skill} />
                                                ))
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>
                    </div>
                ))}
            </div>
        </section>
    )
}

export default TerminalSkills

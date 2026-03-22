import { useState, useEffect } from 'react'
import geminiPortrait from '../../assets/portrait-studio.png'
import { useScrollReveal } from '../../hooks/useScrollReveal'

const FACE_MSG = '> Hey, why are you clicking my face and not my contact links!'

function TerminalAbout() {
    const ref = useScrollReveal()
    const [faceClicked, setFaceClicked] = useState(false)
    const [typedText, setTypedText] = useState('')

    useEffect(() => {
        if (!faceClicked) {
            setTypedText('')
            return
        }
        let i = 0
        const interval = setInterval(() => {
            i++
            setTypedText(FACE_MSG.slice(0, i))
            if (i >= FACE_MSG.length) clearInterval(interval)
        }, 40)
        const hideTimeout = setTimeout(() => setFaceClicked(false), 10000)
        return () => { clearInterval(interval); clearTimeout(hideTimeout) }
    }, [faceClicked])
    return (
        <section className="t-about" id="about" ref={ref}>
            <h2 className="t-section__header">// 01 — ABOUT</h2>
            <div className="t-about__body">
                <div className="t-about__text">
                    <div className="t-about__bio-wrap">
                        <p className="t-about__bio">
                            [ Hey, I'm Mikey. I studied psychology at York, got hooked on building things,
                                and landed at Wealthsimple, where I went from helping clients directly to
                                shaping the knowledge and content systems that power the entire Client Experience
                                team. I build tools, design workflows, and make sure information works for both
                                humans and AI. Now I'm learning to code the solutions I used to spec out.
                                This portfolio is where I showcase my projects, passions, and everything
                                I'm building along the way. When I'm not at a keyboard for work, I'm probably
                                at a keyboard learning something new, or hiking, cooking, reading, and
                                spending time with friends. ]
                        </p>
                    </div>
                    <div className="t-about__meta">
                        <span className="t-about__meta-label">EDUCATION</span>
                        <span className="t-about__meta-value">BrainStation · Software Engineering · 2026</span>
                        <span className="t-about__meta-label"></span>
                        <span className="t-about__meta-value">York University · B.A. Honours Psychology · 2023</span>
                        <span className="t-about__meta-label">LOCATION</span>
                        <span className="t-about__meta-value">Toronto, ON</span>
                        <span className="t-about__meta-label">STATUS</span>
                        <span className="t-about__meta-value t-about__meta-value--open">● Employed Full Time</span>
                    </div>
                    <div className="t-about__interests">
                        <span className="t-about__interests-label">INTERESTS</span>
                        <div className="t-about__interests-tags">
                            <span className="t-about__interest">hiking</span>
                            <span className="t-about__interest">cooking</span>
                            <span className="t-about__interest">reading</span>
                            <span className="t-about__interest">AI tooling</span>
                            <span className="t-about__interest">learning</span>
                        </div>
                    </div>
                </div>
                <div className="t-about__portraits">
                    <div
                        className="t-about__portrait t-about__portrait--gemini"
                        onClick={() => setFaceClicked(true)}
                        style={{ cursor: 'pointer' }}
                    >
                        <img src={geminiPortrait} alt="portrait" className="t-about__portrait-img t-about__portrait-img--gemini" />
                    </div>
                </div>
            </div>
            {faceClicked && (
                <p className="t-about__face-msg">
                    {typedText}
                    <span className="t-about__face-cursor">_</span>
                </p>
            )}
        </section>
    )
}

export default TerminalAbout

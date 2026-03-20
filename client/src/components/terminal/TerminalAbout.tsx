import geminiPortrait from '../../assets/portrait-studio.png'

function TerminalAbout() {
    return (
        <section className="t-about" id="about">
            <h2 className="t-section__header">// 01 — ABOUT</h2>
            <div className="t-about__body">
                <div className="t-about__text">
                    <p className="t-about__bio">
                        [ My name is Michael but you can call me Mikey for short, welcome to my portfolio!
                            I love nature, and technology and this is where I show case my projects as well
                            as some updates on things near and dear to me! This side of my portfolio is less
                            serious and more fun and creative, hope you like what you see! ]
                    </p>
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
                </div>
                <div className="t-about__portraits">
                    <div className="t-about__portrait t-about__portrait--gemini">
                        <img src={geminiPortrait} alt="portrait" className="t-about__portrait-img t-about__portrait-img--gemini" />
                    </div>
                </div>
            </div>
        </section>
    )
}

export default TerminalAbout

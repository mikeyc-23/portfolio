function TerminalAbout() {
    return (
        <section className="t-about" id="about">
            <h2 className="t-section__header">// 01 — ABOUT</h2>
            <div className="t-about__body">
                <div className="t-about__text">
                    <p className="t-about__bio">
                        [ your bio here ]
                    </p>
                    <div className="t-about__meta">
                        <span className="t-about__meta-label">ROLE</span>
                        <span className="t-about__meta-value">Senior Specialist, Knowledge Operations & Tools</span>
                        <span className="t-about__meta-label">EMPLOYER</span>
                        <span className="t-about__meta-value">Wealthsimple</span>
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
                <div className="t-about__portrait">
                    {/* Fallout portrait goes here once generated */}
                    <div className="t-about__portrait-placeholder">[ LOADING SUBJECT... ]</div>
                </div>
            </div>
        </section>
    )
}

export default TerminalAbout

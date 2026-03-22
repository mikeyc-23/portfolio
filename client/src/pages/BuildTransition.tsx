import {useState, useEffect} from 'react'
import treeVideo from '../assets/mascot-tree.mp4'

type LineType = 'ok' | 'info' | 'warn' | 'done'
type BuildLine = { text: string; type: LineType }

type Props = {
    mode: string
    onDone: () => void
}

function BuildTransition({mode, onDone} : Props) {
    const [lines, setLines] = useState<BuildLine[]>([])
    const [progress, setProgress] = useState(0)

    useEffect(() =>{
        const sequence: BuildLine[] = mode === 'terminal'
        ? [
            { text: '$ mikey.exe --build --mode=terminal', type: 'ok' },
            { text: '  Initialising dev environment...', type: 'info' },
            { text: '  ✔  Portfolio modules loaded', type: 'ok' },
            { text: '  ✔  React components compiled  (18 files)', type: 'ok' },
            { text: '  ✔  Assets bundled — 142kb gzipped', type: 'ok' },
            { text: '  ✔  Green palette applied', type: 'ok' },
            { text: '  ✔  Matrix rain initialised', type: 'ok' },
            { text: '  ✔  Pixel turtle deployed', type: 'ok' },
            { text: '  ✔  Build complete — 1.8s', type: 'ok' },
            { text: '', type: 'info' },
            { text: '  Launching terminal mode...', type: 'done' },
        ] : [
            { text: '$ mikey.exe --build --mode=light', type: 'ok' },
            { text: '  Initialising build pipeline...', type: 'info' },
            { text: '  ✔  Design tokens loaded  (52 values)', type: 'ok' },
            { text: '  ✔  React components compiled  (26 files)', type: 'ok' },
            { text: '  ✔  Assets bundled — 147kb gzipped', type: 'ok' },
            { text: '  ✔  Earth tone palette applied', type: 'ok' },
            { text: '  ✔  Build complete — 2.4s', type: 'ok' },
            { text: '', type: 'info' },
            { text: '  Launching light mode...', type: 'done' },
        ]

        setLines([])
        setProgress(0)
        let i = 0
        const interval = setInterval(() => {
            const item = sequence[i]
            if (!item) { clearInterval(interval); return }
            i++
            setLines(prev => [...prev, item])
            setProgress(Math.round((i / sequence.length) * 100))
            if (i >= sequence.length) {
                clearInterval(interval)
                setTimeout(onDone, 600)
            }
        }, 250)
        return () => clearInterval(interval)
    }, [mode])

    return (
        <div className="page b-build">
            <div className="b-build__header">
                <div className="b-build__mascot">
                    <video
                        src={treeVideo}
                        autoPlay
                        loop
                        muted
                        playsInline
                        className="b-build__mascot-video"
                    />
                </div>
                <div className="b-build__meta">
                    <p className="b-build__meta-name">mikey.exe v1.0.0</p>
                    <p className="b-build__meta-item">build: stable · status: ready</p>
                    <p className="b-build__meta-item">/users/mikey/code/portfolio</p>
                    <p className="b-build__meta-item">Vibes: immaculate</p>
                </div>
            </div>
            <div className="b-build__progress">
                <div className="b-build__fill" style={{ width: `${progress}%` }} />
            </div>
            <div className="b-build__lines">
                {lines.filter(line => !!line).map((line, index) => (
                    <p key={index} className={`b-build__line b-build__line--${line.type}`}>{line.text}</p>
                ))}
            </div>
        </div>
    )
}

export default BuildTransition

import {useState, useEffect} from 'react'
import turtle from '../assets/turtle-removebg-preview.png'
type Props = {
    mode: string
    onDone: () => void
}

function BuildTransition({mode, onDone} : Props) {
    const [lines, setLines] = useState<string[]>([])
    const sequence = mode === 'terminal'
    ? [
        '> Initializing dev environment...',
        '> Loading portfolio modules...',
        '> Counting Tokens...',
        '> Using water for some reason...',
        '> Compiling components...',
        '> Zig-zagging through the matrix...',
        '> All systems ready.',
    ] : [
        '> Preparing your experience...',
        '> Loading case studies...',
        '> Curating Projects...',
        '> Adding luck...',
        '> Zig-zagging through the details...',
        '> Welcome.',
    ]

    useEffect(() =>{
        let i = 0
        const interval = setInterval(() => {
            setLines(prev => [...prev, sequence[i]])
            i++
            if (i === sequence.length) {
                clearInterval(interval)
                setTimeout(onDone, 800)
            }
        }, 800)
        return () => clearInterval(interval)
    }, [])
    return (
        <div className="page b-build">
            <div className="b-build__header">
                <img src={turtle} alt="" className="b-build__turtle" />
                <div className="b-build__meta">
                    <p className="b-build__meta-name">mikey.exe v1.0.0</p>
                    <p className="b-build__meta-item">Model: Sonnet 4.6 · Max ∞</p>
                    <p className="b-build__meta-item">/users/mikey/code/portfolio</p>
                    <p className="b-build__meta-item">Vibes: immaculate</p>
                </div>
            </div>
            <div className="b-build__lines">
                {lines.map((line, index) => (
                    <p key={index} className="b-build__line">{line}</p>
                ))}
            </div>
        </div>
    )
}

export default BuildTransition
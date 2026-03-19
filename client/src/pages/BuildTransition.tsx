import {useState, useEffect} from 'react'
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
            {lines.map((line, index) => (
                <p key={index} className="b-build__line">{line}</p>
            ))}
        </div>
    )
}

export default BuildTransition
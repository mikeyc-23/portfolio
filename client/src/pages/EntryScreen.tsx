import {useState, useEffect} from 'react';
import MatrixRain from '../components/MatrixRain'

type Props = {
    onSelect: () => void
}

function EntryScreen({ onSelect }: Props) {
    const [displayName, setDisplayName] = useState('');
    const [showCursor, setShowCursor] = useState(true);

    useEffect(() => {
        const fullName = "MICHAEL CORRADO"
        let i = 0
        const timeout = setTimeout(() => {
            const interval = setInterval(() => {
                setDisplayName(fullName.slice(0, i + 1))
                i++
                if (i === fullName.length) clearInterval(interval)
            }, 100)
        }, 1000)
        return () => clearTimeout(timeout)
    }, [])

    useEffect(() => {
        const blink = setInterval(() => {
            setShowCursor(c => !c)
        }, 500)
        return () => clearInterval(blink)
    }, [])

    return (
        <div className="page e-entry">
            <MatrixRain />
            <div className="e-entry__content">
                <h1 className="e-entry__title">
                    {displayName}<span className="e-entry__cursor">{showCursor ? '_' : '\u00A0'}</span>
                </h1>
                <p className="e-entry__subtitle">welcome to my portfolio</p>
                <div className="e-entry__buttons">
                    <button className="e-entry__btn" onClick={onSelect}>Enter</button>
                </div>
            </div>
        </div>
    )
}

export default EntryScreen; 
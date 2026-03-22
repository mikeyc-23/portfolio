import { useEffect, useRef, useContext } from 'react'
import { ScrollContainerContext } from '../context/ScrollContainerContext'

export function useScrollReveal() {
    const ref = useRef<HTMLElement>(null)
    const root = useContext(ScrollContainerContext)

    useEffect(() => {
        const el = ref.current
        if (!el) return

        el.style.opacity = '0'
        el.style.transform = 'translateY(20px)'
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease'

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    el.style.opacity = '1'
                    el.style.transform = 'translateY(0)'
                    observer.unobserve(el)
                }
            },
            { threshold: 0.15, root: root ?? undefined }
        )

        observer.observe(el)
        return () => observer.disconnect()
    }, [root])

    return ref
}

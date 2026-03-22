import { useState, useEffect, useCallback } from 'react'
import { blogPosts } from '../../data/content'
import { useScrollReveal } from '../../hooks/useScrollReveal'
import BlogEmblem from './BlogEmblem'

function TerminalBlog() {
    const ref = useScrollReveal()
    const [activePost, setActivePost] = useState<string | null>(null)
    const [search, setSearch] = useState('')
    const [fullscreen, setFullscreen] = useState(false)

    const closeModal = useCallback(() => {
        setActivePost(null)
        setFullscreen(false)
    }, [])

    // close modal on Escape key
    useEffect(() => {
        if (!activePost) return
        const handleKey = (e: KeyboardEvent) => {
            if (e.key === 'Escape') closeModal()
        }
        window.addEventListener('keydown', handleKey)
        return () => window.removeEventListener('keydown', handleKey)
    }, [activePost, closeModal])

    // sort newest first, then filter by title or tags
    const filteredPosts = [...blogPosts]
        .sort((a, b) => b.date.localeCompare(a.date))
        .filter(post => {
            if (!search) return true
            const q = search.toLowerCase()
            return (
                post.title.toLowerCase().includes(q) ||
                post.tags.some(tag => tag.toLowerCase().includes(q)) ||
                post.date.includes(q)
            )
        })

    const selectedPost = blogPosts.find(post => post.id === activePost)

    return (
        <section className="t-blog" id="blog" ref={ref}>
            <h2 className="t-section__header">// 04 — BLOG</h2>

            <div className="t-blog__search-wrap">
                <span className="t-blog__search-icon">&gt;</span>
                <input
                    type="text"
                    className="t-blog__search"
                    placeholder="search posts..."
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                />
            </div>

            <div className="t-blog__track">
                {filteredPosts.map(post => (
                    <button
                        key={post.id}
                        className="t-blog__card"
                        onClick={() => setActivePost(post.id)}
                    >
                        <div className="t-blog__emblem-wrap">
                            <BlogEmblem tag={post.tags[0]} />
                        </div>
                        <span className="t-blog__date">{post.date}</span>
                        <span className="t-blog__title">{post.title}</span>
                        <div className="t-blog__tags">
                            {post.tags.map(tag => (
                                <span key={tag} className="t-blog__tag">[{tag}]</span>
                            ))}
                        </div>
                        <p className="t-blog__preview">{post.preview}</p>
                    </button>
                ))}

                {filteredPosts.length === 0 && (
                    <p className="t-blog__empty">&gt; no posts found matching "{search}"</p>
                )}
            </div>

            {selectedPost && (
                <div className="t-blog__modal-overlay" onClick={closeModal}>
                    <div
                        className={`t-blog__modal${fullscreen ? ' t-blog__modal--fullscreen' : ''}`}
                        onClick={e => e.stopPropagation()}
                    >
                        <div className="t-blog__modal-header">
                            <span className="t-blog__modal-date">{selectedPost.date}</span>
                            <div className="t-blog__modal-actions">
                                <button
                                    className="t-blog__modal-fullscreen"
                                    onClick={() => setFullscreen(prev => !prev)}
                                >
                                    {fullscreen ? '[_] exit' : '[■] fullscreen'}
                                </button>
                                <button className="t-blog__modal-close" onClick={closeModal}>
                                    [x] close
                                </button>
                            </div>
                        </div>
                        <h3 className="t-blog__modal-title">{selectedPost.title}</h3>
                        <div className="t-blog__modal-tags">
                            {selectedPost.tags.map(tag => (
                                <span key={tag} className="t-blog__tag">[{tag}]</span>
                            ))}
                        </div>
                        <div className="t-blog__modal-body">
                            {selectedPost.body.split('\n\n').map((paragraph, i) => (
                                <p key={i}>{paragraph}</p>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </section>
    )
}

export default TerminalBlog

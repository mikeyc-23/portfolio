import { useState, useEffect, useCallback } from 'react'
import Markdown from 'react-markdown'
import { blogPosts } from '../../data/content'
import { useScrollReveal } from '../../hooks/useScrollReveal'
import BlogEmblem from './BlogEmblem'

function TerminalBlog() {
    const ref = useScrollReveal()
    const [activePost, setActivePost] = useState<string | null>(null)
    const [search, setSearch] = useState('')

    const closeModal = useCallback(() => {
        setActivePost(null)
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
                        className="t-blog__modal"
                        onClick={e => e.stopPropagation()}
                    >
                        {(selectedPost as any).video && (
                            <>
                                <video
                                    className="t-blog__modal-video"
                                    src={(selectedPost as any).video}
                                    autoPlay
                                    loop
                                    muted
                                    playsInline
                                />
                                <div className="t-blog__modal-scanlines" />
                            </>
                        )}
                        <div className="t-blog__modal-header">
                            <span className="t-blog__modal-date">{selectedPost.date}</span>
                            <button className="t-blog__modal-close" onClick={closeModal}>
                                [x] close
                            </button>
                        </div>
                        <h3 className="t-blog__modal-title">{selectedPost.title}</h3>
                        <div className="t-blog__modal-tags">
                            {selectedPost.tags.map(tag => (
                                <span key={tag} className="t-blog__tag">[{tag}]</span>
                            ))}
                        </div>
                        <div className="t-blog__modal-body">
                            <Markdown>{selectedPost.body}</Markdown>
                        </div>
                    </div>
                </div>
            )}
        </section>
    )
}

export default TerminalBlog

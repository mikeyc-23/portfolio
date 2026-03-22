import { projects } from '../../data/content'
import { useScrollReveal } from '../../hooks/useScrollReveal'

function TerminalProjects () {
    const ref = useScrollReveal()
    return (
        <section className="t-projects" id="projects" ref={ref}>
            <h2 className="t-section__header">// 03 — PROJECTS</h2>
            <div className="t-projects__grid">
                {projects.map(project => (
                    <div key={project.id} className="t-projects__card">
                        <h3 className="t-projects__name">{project.name}</h3>
                        <p className="t-projects__desc">{project.description}</p>
                        <div className="t-projects__stack">
                            {project.stack.map(tech => (
                                <span key={tech} className="t-projects__tech">{tech}</span>
                            ))}
                        </div>
                        <div className="t-projects__links">
                            {project.githubUrl && (
                                <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="t-projects__link">
                                    Github
                                </a>
                            )}
                            {project.githubBackendUrl && (
                                <a href={project.githubBackendUrl} target="_blank" rel="noopener noreferrer" className="t-projects__link">
                                    Backend
                                </a>
                            )}
                            {project.liveUrl && (
                                <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="t-projects__link">
                                    Live Demo 
                                </a>
                            )}
                        </div>
                    </div>    
                ))}
            </div>
        </section>
    )
}

export default TerminalProjects;
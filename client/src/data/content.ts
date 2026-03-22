import slackIcon from '../assets/icons/slack.svg'
import sourcegraphIcon from '../assets/icons/sourcegraph.svg'
import presetIcon from '../assets/icons/preset.svg'
import instockPreview from '../assets/instock-preview.png'
import simplanPreview from '../assets/simplan-preview.png'
import btConsolePreview from '../assets/bt-console-preview.png'

export const projects = [
    {
        id: 'instock',
        name: 'InStock',
        stack: ['React', 'Node.js', 'Express', 'MySQL'],
        description: 'Inventory management system built with a team during an agile sprint.',
        image: instockPreview,
        githubUrl: 'https://github.com/mikeyc-23/InStockFrontEnd',
        githubBackendUrl: 'https://github.com/mikeyc-23/InStockBackEnd',
        liveUrl: null,
        featured: true,
    },

    {
        id: 'simplan',
        name: 'CAN-SIMPLAN',
        stack: ['React', 'SCSS', 'Node.js', 'Express', 'MySQL', 'JWT'],
        description: 'A mock simulation-driven decision platform for Mississauga urban planners.',
        image: simplanPreview,
        githubUrl: 'https://github.com/mikeyc-23/Industry-Sprint-Front-End',
        githubBackendUrl: 'https://github.com/mikeyc-23/Industry-Sprint-Back-End',
        liveUrl: null,
        featured: true,
    },

    {
        id: 'bt-console',
        name: 'BT Sprint Console',
        stack: ['HTML', 'SCSS', 'JavaScript', 'Canvas'],
        description: 'Cyberpunk-themed sign-up console with immersive Canvas animations.',
        image: btConsolePreview,
        githubUrl: 'https://github.com/mikeyc-23/IndustrySprint1',
        githubBackendUrl: null,
        liveUrl: null,
        featured: false,
    },
]

// icon: Simple Icons CDN slug (e.g. 'react')
// localIcon: pre-imported SVG path for icons not on the CDN
export const skillGroups = [
    {
        category: 'FRONTEND',
        skills: [
            { name: 'React',       icon: 'react',      localIcon: '' },
            { name: 'TypeScript',  icon: 'typescript',  localIcon: '' },
            { name: 'JavaScript',  icon: 'javascript',  localIcon: '' },
            { name: 'HTML5',       icon: 'html5',       localIcon: '' },
            { name: 'CSS',         icon: 'css',         localIcon: '' },
            { name: 'Sass',        icon: 'sass',        localIcon: '' },
        ],
    },
    {
        category: 'BACKEND',
        skills: [
            { name: 'Node.js',  icon: 'nodedotjs',  localIcon: '' },
            { name: 'Express',  icon: 'express',     localIcon: '' },
            { name: 'MySQL',    icon: 'mysql',       localIcon: '' },
            { name: 'SQL',      icon: 'postgresql',  localIcon: '' },
            { name: 'Python',   icon: 'python',      localIcon: '' },
        ],
    },
    {
        category: 'TOOLING',
        skills: [
            { name: 'Git',          icon: 'git',        localIcon: '' },
            { name: 'Docker',       icon: 'docker',     localIcon: '' },
            { name: 'Vite',         icon: 'vite',       localIcon: '' },
            { name: 'Sourcegraph',  icon: '',            localIcon: sourcegraphIcon },
            { name: 'Preset',       icon: '',            localIcon: presetIcon },
            { name: 'Claude Code',  icon: 'anthropic',  localIcon: '' },
            { name: 'WorkATO',      icon: '',            localIcon: '' },
            { name: 'GURU',         icon: '',            localIcon: '' },
            { name: 'Zendesk',      icon: 'zendesk',    localIcon: '' },
            { name: 'Contentful',   icon: 'contentful', localIcon: '' },
            { name: 'Slack',        icon: '',            localIcon: slackIcon },
        ],
    },
]

export const contact = {
    email: 'michaelcorrado23@gmail.com',
    github: 'https://github.com/mikeyc-23',
    linkedin: 'https://www.linkedin.com/in/mike-corrado-77a069a9/',
    location: 'Toronto, ON',
}

export const blogPosts = [
    {
        id: 'why-i-code',
        title: '[Coming Soon]',
        date: '2026-03-22',
        tags: ['learning', 'career'],
        preview: '[Coming Soon]',
        body: 'Full post coming soon...',
    },
    {
        id: 'claude-code-workflow',
        title: '[Coming Soon]',
        date: '2026-03-18',
        tags: ['AI tooling', 'workflow'],
        preview: '[Coming Soon]',
        body: 'Full post coming soon...',
    },
    {
        id: 'building-this-portfolio',
        title: '[Coming Soon]',
        date: '2026-03-10',
        tags: ['projects', 'design'],
        preview: '[Coming Soon]',
        body: 'Full post coming soon...',
    },
    {
        id: 'knowledge-systems',
        title: '[Coming Soon]',
        date: '2026-02-28',
        tags: ['career', 'systems thinking'],
        preview: '[Coming Soon]',
        body: 'Full post coming soon...',
    },
    {
        id: 'psychology-to-tech',
        title: '[Coming Soon]',
        date: '2026-02-15',
        tags: ['career', 'learning'],
        preview: '[Coming Soon]',
        body: 'Full post coming soon...',
    },
    {
        id: 'react-mental-model',
        title: '[Coming Soon]',
        date: '2026-02-01',
        tags: ['learning', 'projects'],
        preview: '[Coming Soon]',
        body: 'Full post coming soon...',
    },
    {
        id: 'hiking-and-debugging',
        title: '[Coming Soon]',
        date: '2026-01-20',
        tags: ['life', 'learning'],
        preview: '[Coming Soon]',
        body: 'Full post coming soon...',
    },
    {
        id: 'ai-at-work',
        title: '[Coming Soon]',
        date: '2026-01-10',
        tags: ['AI tooling', 'career'],
        preview: '[Coming Soon]',
        body: 'Full post coming soon...',
    },
    {
        id: 'first-hackathon',
        title: '[Coming Soon]',
        date: '2025-12-15',
        tags: ['projects', 'learning'],
        preview: '[Coming Soon]',
        body: 'Full post coming soon...',
    },
]
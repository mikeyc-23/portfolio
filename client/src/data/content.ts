import slackIcon from '../assets/icons/slack.svg'
import sourcegraphIcon from '../assets/icons/sourcegraph.svg'
import presetIcon from '../assets/icons/preset.svg'

export const projects = [
    {
        id: 'instock',
        name: 'InStock',
        stack: ['React', 'Node.js', 'Express', 'MySQL'],
        description: 'Inventory management system built with a team during an agile sprint.',
        githubUrl: 'https://github.com/mikeyc-23/InStock-Frontend-Funky-Flamingos',
        githubBackendUrl: null,
        liveUrl: null,
        featured: true,
    },
    // ⚠️ REMOVE BEFORE LAUNCH — TD intellectual property. Do not publish.
    {
        id: 'simplan',
        name: 'CAN-SIMPLAN',
        stack: ['React 19', 'SCSS', 'Node.js', 'Express', 'MySQL', 'JWT'],
        description: 'Simulation-driven decision platform for Mississauga urban planners, built for TD Bank Industry Sprint.',
        githubUrl: 'https://github.com/mikeyc-23/Industry-Sprint-Front-End',
        githubBackendUrl: 'https://github.com/mikeyc-23/Industry-Sprint-Back-End',
        liveUrl: null,
        featured: true,
    },
    // ⚠️ REMOVE BEFORE LAUNCH — TD intellectual property. Do not publish.
    {
        id: 'td-console',
        name: 'TD Sprint Console',
        stack: ['HTML', 'SCSS', 'JavaScript', 'Canvas'],
        description: 'Cyberpunk-themed sign-up console with immersive Canvas animations.',
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

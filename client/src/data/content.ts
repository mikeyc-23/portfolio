import slackIcon from '../assets/icons/slack.svg'
import sourcegraphIcon from '../assets/icons/sourcegraph.svg'
import presetIcon from '../assets/icons/preset.svg'
import instockPreview from '../assets/instock-preview.png'
import simplanPreview from '../assets/simplan-preview.png'
import btConsolePreview from '../assets/bt-console-preview.png'
import voidVideo from '../assets/void.mp4'

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
        id: 'life',
        title: 'hello world',
        date: '2026-03-30',
        tags: ['the void', 'technology'],
        preview: 'The world is crazy, but so are we.',
        video: voidVideo,
        body: "Growing up around technology I don't think I ever truly knew just how much it would control my life and the lives of all of those around me. I still remember the first video games I grew up playing with my brother. From Mario Kart, 007, and Kirby Air Ride, I was genuinely excited each day to get home and play more. As time evolved so did technology, so did the games we played and the devices that powered and delivered them. Our TVs got larger, got slimmer, and stopped making that nostalgic ringing sound just from being powered on. Fast forward and devices we put in our pockets today could theoretically run every game we played in the good old days, but is that a good thing? Just because we can, should we?\n\nToday every game, every TV, and every piece of software and hardware feels the same and I find myself never asking how it actually works anymore. The magic seems to be gone, the nostalgia replaced with convenience and short term dopamine rushes. Rarely these days does a game truly wow me, rarely these days do I look forward to looking at more pixels on my screen. Technology seems to have been sucked of its magic. Today everyone is an expert in the same technologies they once ridiculed, but do people truly enjoy these marvels or do they simply play the part to get the job or fit in with society?\n\nWith the emergence of AI, I feel this 10x more. AI once seemed cool, it seemed like a technology that would project humans into the future, and don't get me wrong it definitely will. However, I fear we have entered this phase of AI where the shortsightedness of human nature has skewed our views of what AI truly promises us. AI today seems to be built into every piece of software, and now every piece of hardware in new emerging trends, but what is the point? Today chatbots lurk in every search bar, everyone wants to automate their lives away and for what? AI was meant to allow people to work less, but as AI gets better, it seems humans are just working 10x more and expected to output 100 fold. Everyone is suddenly an AI expert on LinkedIn but these same people barely understand how AI works, what it should and shouldn't be used for.\n\nAll this to say that AI itself has appeared to have lost its magic too, at least temporarily. We generate AI slop, fill the internet with bots, prop our stock market on the promise of what AI might one day be, all while abusing what AI truly should be.\n\nSo where did the magic go? I don't have the answer. Maybe it's buried under the noise, maybe we stopped looking for it, or maybe we just got too comfortable to care. All I know is that somewhere between the first time I picked up a controller and now, something changed. And I don't think it was the technology. I think it was us.\n\n- Mikey",
    },
]
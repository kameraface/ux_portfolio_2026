import linkedinIcon from '../assets/icons/linkedin.png'
import emailIcon from '../assets/icons/email.png'
import flickrIcon from '../assets/icons/flickr.png'
import instagramIcon from '../assets/icons/instagram.png'
import roastyGhostCard from '../assets/roasty-ghost-card.jpg'
import playBiking from '../assets/play-biking.jpg'
import playAnimation from '../assets/play-animation.gif'

export type SectionId = 'about' | 'skills' | 'work' | 'play' | 'connect'

export interface NavItem {
  label: string
  section?: SectionId
  href?: string
}

export const RESUME_URL = 'https://docs.google.com/document/d/15u7Clygpc_VA1A65mRjq5klhNpCNqSShjV-b-GAD9go/view'

export const navItems: NavItem[] = [
  { label: 'About', section: 'about' },
  { label: 'Skills', section: 'skills' },
  { label: 'Work', section: 'work' },
  { label: 'Play', section: 'play' },
  { label: 'Connect', section: 'connect' },
  { label: 'Resume', href: RESUME_URL },
]

export interface ContactLink {
  label: string
  lines: string[]
  href: string
  icon: string | 'globe'
}

export const contactLinks: ContactLink[] = [
  {
    label: 'LinkedIn',
    lines: ['linkedin.com/in', '/karl-uschold'],
    href: 'https://www.linkedin.com/in/karl-uschold',
    icon: linkedinIcon,
  },
  {
    label: 'Email',
    lines: ['karl@karluschold.com'],
    href: 'mailto:karl@karluschold.com',
    icon: emailIcon,
  },
  {
    label: 'Website',
    lines: ['karluschold.com'],
    href: 'https://karluschold.com',
    icon: 'globe',
  },
  {
    label: 'Flickr',
    lines: ['flickr.com/photos', '/whittikerowens'],
    href: 'https://www.flickr.com/photos/whittikerowens',
    icon: flickrIcon,
  },
  {
    label: 'Instagram',
    lines: ['instagram.com', '/signage_plus'],
    href: 'https://www.instagram.com/signage_plus',
    icon: instagramIcon,
  },
]

export interface Project {
  slug: string
  title: string
  accent: string
  summary: string
  role: string
  tools: string
  image?: { src: string; alt: string }
  placeholderColor?: string
}

export const projects: Project[] = [
  {
    slug: 'reader-dashboard',
    title: 'Reader Dashboard',
    accent: 'var(--color-accent-reader)',
    summary:
      'Our organization relies on a third-party tool to manage user preferences. Their UI and UX leave a lot of room for growth. And with a desire to start moving away from reliance on third-parties, we built our own "Reader" Dashboard to provide an on-brand experience that provides clearer navigation and less frustration.',
    role: 'Role: Research, Product design lead, User flows, testing, handoff',
    tools: 'Tools: Figma, Google docs, sheets, Google Chrome Dev Tools',
    placeholderColor: '#00ff3c',
  },
  {
    slug: 'obituaries',
    title: 'Obituaries',
    accent: 'var(--color-accent-obituaries)',
    summary: 'Developing a nature-conscious camping trip planner for the whole crew.',
    role: 'Roles: Product designer, research planning, interviewing, wireframing, testing, prototype development',
    tools: 'Tools: Adobe XD, Figma, Adobe Illustrator, User Interviews, Surveys, Miro, Trello, InVison',
    placeholderColor: '#8a0000',
  },
  {
    slug: 'roasty-ghost-coffee',
    title: 'Roasty Ghost Coffee',
    accent: 'var(--color-accent-roasty)',
    summary:
      'Roasty Ghost Coffee is a local start-up coffee roaster with the aim of becoming a friendly and knowledgeable presence in the Denver area.',
    role: 'Role: Project management, product design, wireframes, style guides, redlining, interviewing, prototyping.',
    tools: 'Tools: Figma, Google forms, Miro, Adobe Illustrator, Maze, Trello',
    image: {
      src: roastyGhostCard,
      alt: 'Roasty Ghost Coffee mobile ordering screen on a phone, set against roasted coffee beans',
    },
  },
]

export function findProject(slug: string | undefined) {
  return projects.find((p) => p.slug === slug)
}

export const skillGroups: { title: string; body: string }[] = [
  {
    title: 'Research / Strategy',
    body: 'A/B testing, card sorting, moderated interviewing, usability testing, guerrilla testing, qualitative, quantitative, planning, recruting',
  },
  {
    title: 'Soft Skills',
    body: 'Interpersonal communication, Creative problem solving, Project management, Strategic Planning, Organization, Mentoring, Training, Customer advocate, Public speaking',
  },
  {
    title: 'UX/UI',
    body: 'User flows, Discovery, UI design, wireframing, prototyping, illustration, style guides, Design Systems, Figma, Adobe XD, Pen.Dev, Adobe Illustrator, Adobe Photoshop, Adobe InDesign, SolidWorks, Sketchup',
  },
  {
    title: 'Development',
    body: 'Webflow, Conversational in HTML, CSS, Bootstrap, JavaScript, JQuery, Claude, Cursor',
  },
  {
    title: 'Industry Experience',
    body: 'Automotive Accessories, Cycling, Experiential Graphic Design, Film Production, Industrial Design, Manufacturing, Outdoors, Photography, Production, Soft-goods, Telecommunication, Television Broadcast, Textiles',
  },
]

export interface PlayItem {
  label: string
  src: string
  alt: string
  width: number
  height: number
}

export const playItems: PlayItem[] = [
  {
    label: 'Photography',
    src: 'https://images.unsplash.com/photo-1608010110006-521beebba9bc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=660',
    alt: 'Light painting of glowing red script against a dark night sky',
    width: 220,
    height: 300,
  },
  {
    label: 'Bicycling and Adventures',
    src: playBiking,
    alt: 'Karl standing with his road bike on a gravel path beside a freight train',
    width: 200,
    height: 200,
  },
  {
    label: 'Animation of signage at LakeSide Park',
    src: playAnimation,
    alt: 'Animated "wild chipmunk" sign lettering from LakeSide Park',
    width: 280,
    height: 280,
  },
]

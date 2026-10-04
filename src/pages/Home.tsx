import type { CSSProperties } from 'react'
import { Link } from 'react-router'
import portrait from '../assets/karl-portrait.jpg'
import { Button } from '../components/Button'
import { Layout } from '../components/Layout'
import { SubNav } from '../components/SubNav'
import { playItems, projects, skillGroups, type Project, type SectionId } from '../content/site'
import { useActiveSection } from '../hooks/useActiveSection'
import './Home.css'

const SECTION_IDS: readonly SectionId[] = ['about', 'work', 'skills', 'play', 'connect']

function ProjectCard({ project }: { project: Project }) {
  return (
    <article
      id={`project-${project.slug}`}
      className="project-card"
      style={{ '--card-accent': project.accent } as CSSProperties}
      aria-labelledby={`project-${project.slug}-title`}
    >
      <div className="project-card__body">
        <h3 id={`project-${project.slug}-title`} className="project-card__title">
          Case Study: {project.title}
        </h3>
        <div className="project-card__text">
          <p>{project.summary}</p>
          <p>
            {project.role}
            <br />
            {project.tools}
          </p>
        </div>
        <Button asChild size="lg">
          <Link to={`/work/${project.slug}`}>
            View Work<span className="visually-hidden">: {project.title}</span>
          </Link>
        </Button>
      </div>
      {project.image ? (
        <img className="project-card__media" src={project.image.src} alt={project.image.alt} loading="lazy" />
      ) : (
        <div
          className="project-card__media project-card__media--placeholder"
          style={{ background: project.placeholderColor }}
          aria-hidden
        />
      )}
    </article>
  )
}

export function Home() {
  const activeSection = useActiveSection(SECTION_IDS)

  return (
    <Layout title="Karl Uschold UX — Product Designer" activeSection={activeSection}>
      <section id="about" className="about" aria-labelledby="about-title">
        <img
          className="about__portrait"
          src={portrait}
          alt="Karl Uschold smiling outdoors, wearing glasses and a checked button-up shirt"
          width={266}
          height={361}
        />
        <div className="about__content">
          <h1 id="about-title" className="about__title">
            Building better experiences for your customers.
          </h1>
          <div className="about__bio">
            <p>
              Hello! I'm Karl, an analytical Product Designer. My approach to design is to balance our users'
              needs with the business for the best outcome for both of them. I believe in working
              strategically, understanding users and business needs, and communicating clearly with the teams
              involved. I have a record of growing strong teams through collaboration, self-accountability, and
              mentoring.
            </p>
            <p>
              Eager for new challenges and growth, I'm currently exploring opportunities to surround myself with
              passionate peers and mentors in collaborative environments. Let's connect and see how we might
              make the world better together!
            </p>
          </div>
          <Button asChild>
            <Link to={{ hash: '#connect' }}>Let's Connect</Link>
          </Button>
        </div>
      </section>

      <section id="work" className="work" aria-labelledby="work-title">
        <div className="work__header">
          <h2 id="work-title" className="section-title work__title">
            Work
          </h2>
          <SubNav
            label="Projects:"
            items={projects.map((p) => ({ href: `#project-${p.slug}`, label: `Case Study: ${p.title}` }))}
          />
        </div>
        {projects.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </section>

      <section id="skills" className="skills" aria-labelledby="skills-title">
        <div className="skills__panel">
          <h2 id="skills-title" className="skills__title">
            Skills
          </h2>
          <div className="skills__columns">
            {skillGroups.map((group) => (
              <div key={group.title} className="skills__group">
                <h3 className="skills__group-title">{group.title}</h3>
                <p className="skills__group-body">{group.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="play" className="play" aria-labelledby="play-title">
        <h2 id="play-title" className="section-title">
          Play
        </h2>
        <div className="play__grid">
          {playItems.map((item) => (
            <figure key={item.label} className="play__item" style={{ width: item.width }}>
              <figcaption className="play__label">{item.label}</figcaption>
              <img
                className="play__image"
                src={item.src}
                alt={item.alt}
                width={item.width}
                height={item.height}
                loading="lazy"
              />
            </figure>
          ))}
        </div>
      </section>
    </Layout>
  )
}

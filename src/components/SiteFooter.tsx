import { ArrowUp, Globe } from 'lucide-react'
import { contactLinks } from '../content/site'
import { Logo } from './Logo'
import { NavLinks } from './NavLinks'
import './SiteFooter.css'

function scrollToTop() {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  window.scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' })
  document.querySelector<HTMLElement>('.site-header .logo')?.focus({ preventScroll: true })
}

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <section id="connect" className="connect" aria-labelledby="connect-title">
        <h2 id="connect-title" className="section-title connect__title">
          Let's connect!
        </h2>
        <ul className="connect__list">
          {contactLinks.map((link) => {
            const external = link.href.startsWith('http')
            return (
            <li key={link.label}>
              <a
                className="contact-link"
                href={link.href}
                {...(external && { target: '_blank', rel: 'noopener noreferrer' })}
              >
                {link.icon === 'globe' ? (
                  <Globe className="contact-link__icon" color="var(--color-primary)" aria-hidden />
                ) : (
                  <img className="contact-link__icon" src={link.icon} alt="" width={40} height={40} />
                )}
                <span className="contact-link__text">
                  {link.lines.map((line) => (
                    <span key={line}>{line}</span>
                  ))}
                  {external && <span className="visually-hidden"> (opens in a new tab)</span>}
                </span>
              </a>
            </li>
            )
          })}
        </ul>
      </section>

      <div className="footer-bar">
        <div className="footer-bar__inner">
          <Logo size="sm" />
          <nav aria-label="Footer" className="footer-bar__nav">
            <NavLinks />
          </nav>
          <button type="button" className="icon-button back-to-top" onClick={scrollToTop} aria-label="Back to top">
            <ArrowUp size={16} aria-hidden />
          </button>
        </div>
      </div>
    </footer>
  )
}

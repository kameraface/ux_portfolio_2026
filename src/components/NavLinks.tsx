import { Link } from 'react-router'
import { navItems, type SectionId } from '../content/site'
import './NavLinks.css'

interface NavLinksProps {
  activeSection?: SectionId | null
  onNavigate?: () => void
  className?: string
}

export function NavLinks({ activeSection, onNavigate, className }: NavLinksProps) {
  return (
    <ul className={['nav-links', className].filter(Boolean).join(' ')}>
      {navItems.map((item) => {
        const isActive = item.section != null && item.section === activeSection
        return (
          <li key={item.label}>
            {item.section ? (
              <Link
                to={{ pathname: '/', hash: `#${item.section}` }}
                className={`topnav-link${isActive ? ' is-active' : ''}`}
                aria-current={isActive ? 'location' : undefined}
                onClick={onNavigate}
              >
                {item.label}
              </Link>
            ) : (
              <a className="topnav-link" href={item.href} onClick={onNavigate}>
                {item.label}
              </a>
            )}
          </li>
        )
      })}
    </ul>
  )
}

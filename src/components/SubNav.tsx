import './SubNav.css'

interface SubNavProps {
  label: string
  items: { href: string; label: string; active?: boolean }[]
}

export function SubNav({ label, items }: SubNavProps) {
  return (
    <nav className="subnav" aria-labelledby="subnav-label">
      <span id="subnav-label" className="subnav__label">
        {label}
      </span>
      <ul className="subnav__list">
        {items.map((item) => (
          <li key={item.href}>
            <a
              href={item.href}
              className={`subnav-item${item.active ? ' is-active' : ''}`}
              aria-current={item.active ? 'location' : undefined}
            >
              {item.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}

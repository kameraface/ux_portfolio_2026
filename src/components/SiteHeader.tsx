import { useState } from 'react'
import { Popover } from 'radix-ui'
import { X } from 'lucide-react'
import type { SectionId } from '../content/site'
import { Logo } from './Logo'
import { NavLinks } from './NavLinks'
import './SiteHeader.css'

interface SiteHeaderProps {
  activeSection?: SectionId | null
}

export function SiteHeader({ activeSection }: SiteHeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header className="site-header">
      <div className="site-header__bar">
        <Logo size="lg" />
        <nav aria-label="Main" className="site-header__nav">
          <NavLinks activeSection={activeSection} className="site-header__desktop-links" />

          <Popover.Root open={menuOpen} onOpenChange={setMenuOpen}>
            <Popover.Trigger className="icon-button hamburger" aria-label={menuOpen ? 'Close menu' : 'Open menu'}>
              {menuOpen ? (
                <X size={16} strokeWidth={2.5} aria-hidden />
              ) : (
                <span className="hamburger__lines" aria-hidden>
                  <span />
                  <span />
                  <span />
                </span>
              )}
            </Popover.Trigger>
            <Popover.Content className="mobile-menu" align="end" sideOffset={16}>
              <NavLinks
                activeSection={activeSection}
                className="mobile-menu__links"
                onNavigate={() => setMenuOpen(false)}
              />
            </Popover.Content>
          </Popover.Root>
        </nav>
      </div>
    </header>
  )
}

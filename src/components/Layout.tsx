import { useEffect, type ReactNode } from 'react'
import { useLocation } from 'react-router'
import type { SectionId } from '../content/site'
import { SiteHeader } from './SiteHeader'
import { SiteFooter } from './SiteFooter'

interface LayoutProps {
  title: string
  activeSection?: SectionId | null
  children: ReactNode
}

function useScrollToHash() {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    if (!hash) {
      window.scrollTo(0, 0)
      return
    }
    const target = document.getElementById(decodeURIComponent(hash.slice(1)))
    if (!target) return
    target.scrollIntoView()
    if (!target.hasAttribute('tabindex')) target.setAttribute('tabindex', '-1')
    target.focus({ preventScroll: true })
  }, [pathname, hash])
}

export function Layout({ title, activeSection, children }: LayoutProps) {
  useScrollToHash()

  return (
    <>
      <title>{title}</title>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <SiteHeader activeSection={activeSection} />
      <main id="main" className="page-main" tabIndex={-1}>
        {children}
      </main>
      <SiteFooter />
    </>
  )
}

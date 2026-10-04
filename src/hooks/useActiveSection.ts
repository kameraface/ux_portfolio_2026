import { useEffect, useState } from 'react'

export function useActiveSection<T extends string>(ids: readonly T[]): T | null {
  const [active, setActive] = useState<T | null>(null)

  useEffect(() => {
    const elements = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el != null)

    const visible = new Map<string, number>()
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          visible.set(entry.target.id, entry.isIntersecting ? entry.intersectionRatio : 0)
        }
        let best: T | null = null
        let bestRatio = 0
        for (const id of ids) {
          const ratio = visible.get(id) ?? 0
          if (ratio > bestRatio) {
            best = id
            bestRatio = ratio
          }
        }
        setActive(best)
      },
      { rootMargin: '-30% 0px -50% 0px', threshold: [0, 0.25, 0.5, 0.75, 1] },
    )

    elements.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [ids])

  return active
}

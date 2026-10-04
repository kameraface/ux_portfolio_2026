import { useEffect } from 'react'

declare global {
  interface Window {
    FlickrEmbedr?: { process: (mode: string) => void }
  }
}

const SCRIPT_SRC = 'https://embedr.flickr.com/assets/client-code.js'

interface FlickrEmbedProps {
  href: string
  title: string
  imageSrc: string
  width: number
  height: number
  className?: string
}

function escapeAttr(value: string) {
  return value.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;')
}

export function FlickrEmbed({ href, title, imageSrc, width, height, className }: FlickrEmbedProps) {
  useEffect(() => {
    if (window.FlickrEmbedr) {
      window.FlickrEmbedr.process('inline')
      return
    }
    if (document.querySelector(`script[src="${SCRIPT_SRC}"]`)) return
    const script = document.createElement('script')
    script.src = SCRIPT_SRC
    script.async = true
    script.charset = 'utf-8'
    document.body.appendChild(script)
  }, [])

  // Flickr's script swaps the link for an iframe, so React must not own these children.
  const markup =
    `<a data-flickr-embed="true" data-header="true" href="${escapeAttr(href)}" title="${escapeAttr(title)}">` +
    `<img src="${escapeAttr(imageSrc)}" width="${width}" height="${height}" alt="${escapeAttr(title)}"/></a>`

  return (
    <div
      className={['flickr-embed', className].filter(Boolean).join(' ')}
      style={{ width, maxWidth: '100%' }}
      dangerouslySetInnerHTML={{ __html: markup }}
    />
  )
}

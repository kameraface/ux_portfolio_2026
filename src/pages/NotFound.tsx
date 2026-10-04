import { Link } from 'react-router'
import { Button } from '../components/Button'
import { Layout } from '../components/Layout'
import './NotFound.css'

export function NotFound() {
  return (
    <Layout title="Page not found (404) — Karl Uschold UX">
      <section className="not-found">
        <h1 className="not-found__title">
          Sorry, this isn't the page <br className="not-found__break" />
          you were looking for.
        </h1>
        <Button asChild>
          <Link to="/">Return Home</Link>
        </Button>
      </section>
    </Layout>
  )
}

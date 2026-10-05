import { useState, type FormEvent } from 'react'
import { useParams } from 'react-router'
import { Form } from 'radix-ui'
import { Button } from '../components/Button'
import { FormField } from '../components/FormField'
import { Layout } from '../components/Layout'
import { findProject, type Project } from '../content/site'
import { isUnlocked, requestAccess, verifyPassword, type AccessRequestResult } from '../lib/access'
import { NotFound } from './NotFound'
import './CaseStudyGate.css'

function PasswordForm({ project, onUnlock }: { project: Project; onUnlock: () => void }) {
  const [error, setError] = useState<string | null>(null)
  const [checking, setChecking] = useState(false)

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const password = String(new FormData(event.currentTarget).get('password') ?? '')
    setChecking(true)
    const ok = await verifyPassword(password)
    setChecking(false)
    if (ok) onUnlock()
    else setError("That password didn't work. Try again, or request access below.")
  }

  return (
    <Form.Root className="gate-form" onSubmit={handleSubmit} onClearServerErrors={() => setError(null)}>
      <h1 className="gate-form__title">
        Password, please<span className="visually-hidden"> — Case Study: {project.title}</span>
      </h1>
      <FormField
        name="password"
        label="Password"
        type="password"
        placeholder="Enter your password"
        autoComplete="current-password"
        required
        messages={{ valueMissing: 'Please enter the password.' }}
        serverError={error}
        onChange={() => error && setError(null)}
      />
      <Form.Submit asChild>
        <Button block disabled={checking}>
          Submit
        </Button>
      </Form.Submit>
    </Form.Root>
  )
}

function RequestAccessForm({ project }: { project: Project }) {
  const [result, setResult] = useState<AccessRequestResult | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [sending, setSending] = useState(false)

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    setSending(true)
    setError(null)
    try {
      setResult(
        await requestAccess({
          name: String(data.get('name') ?? ''),
          email: String(data.get('email') ?? ''),
          message: String(data.get('message') ?? ''),
          caseStudy: project.title,
        }),
      )
    } catch {
      setError('Something went wrong sending your request. Please email karl@karluschold.com instead.')
    } finally {
      setSending(false)
    }
  }

  return (
    <Form.Root className="gate-form" onSubmit={handleSubmit}>
      <h2 className="gate-form__title">Request Password</h2>
      <FormField
        name="name"
        label="Name"
        placeholder="Your Name"
        autoComplete="name"
        required
        messages={{ valueMissing: 'Please enter your name.' }}
      />
      <FormField
        name="email"
        label="Email Address"
        type="email"
        placeholder="your@email.address"
        autoComplete="email"
        required
        messages={{
          valueMissing: 'Please enter your email address.',
          typeMismatch: 'Please enter a valid email address.',
        }}
      />
      <FormField name="message" label="Message (Optional)" placeholder="optional message here" />
      <Form.Submit asChild>
        <Button block disabled={sending}>
          Request Access
        </Button>
      </Form.Submit>
      <div role="status" className="gate-form__status">
        {result === 'sent' && "Thanks! Your request is on its way, and I'll be in touch soon."}
        {result === 'mailto' && (
          <>
            Your email app should open with your request ready to send. If nothing opened, email{' '}
            <a href="mailto:karl@karluschold.com">karl@karluschold.com</a>.
          </>
        )}
      </div>
      {error && (
        <p role="alert" className="form-field__error">
          {error}
        </p>
      )}
    </Form.Root>
  )
}

export function CaseStudyGate() {
  const { slug } = useParams()
  const project = findProject(slug)
  const [unlocked, setUnlocked] = useState(isUnlocked)

  if (!project) return <NotFound />

  if (unlocked) {
    return (
      <Layout title={`Case Study: ${project.title} — Karl Uschold UX`}>
        <section className="gate gate--unlocked">
          <h1 className="gate-form__title">Case Study: {project.title}</h1>
          <p>This case study is on its way. Check back soon.</p>
        </section>
      </Layout>
    )
  }

  return (
    <Layout title={`Password required: ${project.title} — Karl Uschold UX`}>
      <section className="gate" aria-label="Case study access">
        <div className="gate__stack">
          <PasswordForm project={project} onUnlock={() => setUnlocked(true)} />
          <RequestAccessForm project={project} />
        </div>
      </section>
    </Layout>
  )
}

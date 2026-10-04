import { Link } from 'react-router'
import logo from '../assets/ku-logo.png'

interface LogoProps {
  size: 'lg' | 'sm'
}

export function Logo({ size }: LogoProps) {
  return (
    <Link to="/" className={`logo logo--${size}`}>
      <img src={logo} alt="Karl Uschold, UX Product Designer — home" width={800} height={200} />
    </Link>
  )
}

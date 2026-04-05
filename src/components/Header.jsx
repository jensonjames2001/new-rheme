import { Link, useLocation } from 'react-router-dom'

export default function Header() {
  const location = useLocation()

  return (
    <header className="header">
      <div className="header-inner">
        <Link to="/" className="logo">
          <span className="logo-icon">🎓</span>
          <span className="logo-text">PhDConnect</span>
        </Link>
        <nav className="nav">
          <Link to="/" className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}>
            Browse Research
          </Link>
          <Link to="/submit" className={`nav-link ${location.pathname === '/submit' ? 'active' : ''}`}>
            Submit Research
          </Link>
        </nav>
      </div>
    </header>
  )
}

import './Nav.css'

export default function Nav() {
  return (
    <header className="nav" role="banner">
      <span className="nav-name">Leonard Kuan</span>
      <nav className="nav-links" aria-label="Site sections">
        <a href="#about" className="nav-link">About</a>
        <a href="#work" className="nav-link">Work</a>
      </nav>
    </header>
  )
}

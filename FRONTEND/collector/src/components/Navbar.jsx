import { NavLink } from 'react-router-dom'

/* ================================
   RECYCLING LOGO
================================ */

function RecyclingIcon() {
  return (
    <svg
      viewBox="0 0 100 100"
      className="recycling-icon"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Top arrow */}
      <path
        d="M50 8 L69 41 L57 41 L50 29 L43 41 L31 41 Z"
        fill="currentColor"
      />

      {/* Left arrow */}
      <path
        d="M31 41 L18 64 L31 64 L38 52 L45 64 L53 50 L44 34 Z"
        fill="currentColor"
      />

      {/* Right arrow */}
      <path
        d="M69 41 L82 64 L69 64 L62 52 L55 64 L47 50 L56 34 Z"
        fill="currentColor"
      />

      {/* Bottom arrow */}
      <path
        d="M31 64 L43 64 L50 76 L57 64 L69 64 L50 94 Z"
        fill="currentColor"
      />
    </svg>
  )
}


/* ================================
   NAVBAR
================================ */

function Navbar() {
  return (
    <header className="navbar">

      {/* BRAND */}
      <NavLink to="/" className="navbar-brand">

        <div className="brand-logo">
          <RecyclingIcon />
        </div>

        <div className="brand-name">
          <span className="brand-recy">Recy</span>
          <span className="brand-link">Link</span>
        </div>

      </NavLink>


      {/* NAVIGATION */}
      <nav className="navbar-menu">

        <NavLink
          to="/"
          end
          className={({ isActive }) =>
            `navbar-link ${isActive ? 'active' : ''}`
          }
        >
          Dashboard
        </NavLink>

        <NavLink
          to="/demands"
          className={({ isActive }) =>
            `navbar-link ${isActive ? 'active' : ''}`
          }
        >
          Nearby Demands
        </NavLink>

        <NavLink
          to="/add-ewaste"
          className={({ isActive }) =>
            `navbar-link ${isActive ? 'active' : ''}`
          }
        >
          Add E-Waste
        </NavLink>

        <NavLink
          to="/ai-assessment"
          className={({ isActive }) =>
            `navbar-link ${isActive ? 'active' : ''}`
          }
        >
          AI Check
        </NavLink>

        <NavLink
          to="/offers"
          className={({ isActive }) =>
            `navbar-link ${isActive ? 'active' : ''}`
          }
        >
          My Offers
        </NavLink>

      </nav>


      {/* RIGHT SIDE */}
      <div className="navbar-right">

        {/* Notification */}
        <button
          className="notification-button"
          aria-label="Notifications"
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M18 9a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9" />
            <path d="M10 21h4" />
          </svg>

          <span>3</span>
        </button>


        {/* Profile */}
        <NavLink to="/profile" className="profile-link">
          <div className="profile-circle">
            C
          </div>
        </NavLink>

      </div>

    </header>
  )
}

export default Navbar
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
      aria-hidden="true"
    >
      <path
        d="M50 8 L69 42 L57 42 L50 29 L43 42 L31 42 Z"
        fill="currentColor"
      />

      <path
        d="M30 42 L13 71 L28 71 L35 59 L42 71 L51 56 L42 41 Z"
        fill="currentColor"
      />

      <path
        d="M70 42 L87 71 L72 71 L65 59 L58 71 L49 56 L58 41 Z"
        fill="currentColor"
      />

      <path
        d="M28 71 L42 71 L50 85 L58 71 L72 71 L50 96 Z"
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
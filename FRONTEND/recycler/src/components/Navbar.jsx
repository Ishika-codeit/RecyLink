import { NavLink, Link } from 'react-router-dom'

function Navbar() {
  return (
    <header className="recycler-navbar">

      <Link to="/recycler" className="recycler-brand">

        <div className="recycler-logo">
          ♻
        </div>

        <div>
          <strong>
            Recy<span>Link</span>
          </strong>

          <small>RECYCLER PORTAL</small>
        </div>

      </Link>


      <nav className="recycler-nav">

        <NavLink to="/recycler">
          Dashboard
        </NavLink>

        <NavLink to="/recycler/demands">
          Demands
        </NavLink>

        <NavLink to="/recycler/ewaste">
          Incoming E-Waste
        </NavLink>

        <NavLink to="/recycler/collections">
          Collections
        </NavLink>

      </nav>


      <div className="navbar-actions">

        <button className="notification-btn">
          ♢
          <span>3</span>
        </button>

        <Link to="/recycler/profile" className="recycler-user">
          <div className="user-avatar">
            EC
          </div>

          <div>
            <strong>EcoCycle</strong>
            <small>Verified Recycler</small>
          </div>
        </Link>

      </div>

    </header>
  )
}

export default Navbar
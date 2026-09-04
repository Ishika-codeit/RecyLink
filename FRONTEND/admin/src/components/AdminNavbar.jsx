import { NavLink } from 'react-router-dom'
function AdminNavbar() {
  return (
    <header className="admin-navbar">

      <div>
        <h1>Admin Dashboard</h1>
        <p>Monitor and manage the RecyLink ecosystem</p>
      </div>

      <div className="admin-nav-actions">

        <button className="notification-btn">
          ♢
          <span>3</span>
        </button>

        <NavLink to="/admin/profile" className="admin-nav-user">
  <div className="nav-avatar">
    A
  </div>

  <div>
    <strong>Admin</strong>
    <small>Administrator</small>
  </div>
</NavLink>

      </div>

    </header>
  )
}

export default AdminNavbar
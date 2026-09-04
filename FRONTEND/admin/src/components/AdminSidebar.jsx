import { NavLink } from 'react-router-dom'

function AdminSidebar() {
  const menuItems = [
    { name: 'Dashboard', path: '/admin', icon: '▦' },
    { name: 'Collectors', path: '/admin/collectors', icon: '♻' },
    { name: 'Recyclers', path: '/admin/recyclers', icon: '▣' },
    { name: 'E-Waste', path: '/admin/ewaste', icon: '◈' },
    { name: 'Demands', path: '/admin/demands', icon: '⌁' },
    { name: 'Collections', path: '/admin/collections', icon: '↻' },
    { name: 'Reports', path: '/admin/reports', icon: '▤' },
  ]

  return (
    <aside className="admin-sidebar">

      <div className="sidebar-brand">
        <div className="sidebar-logo">♻</div>
        <div>
          <h2>
            <span>Recy</span>Link
          </h2>
          <small>ADMIN PANEL</small>
        </div>
      </div>

      <div className="sidebar-section">
        <p>MAIN MENU</p>

        <nav>
          {menuItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === '/admin'}
              className={({ isActive }) =>
                isActive ? 'sidebar-link active' : 'sidebar-link'
              }
            >
              <span className="sidebar-icon">{item.icon}</span>
              {item.name}
            </NavLink>
          ))}
        </nav>
      </div>

      <div className="sidebar-bottom">

        <NavLink
          to="/admin/profile"
          className={({ isActive }) =>
            isActive ? 'sidebar-link active' : 'sidebar-link'
          }
        >
          <span className="sidebar-icon">◉</span>
          Admin Profile
        </NavLink>

        <button
  className="logout-btn"
  onClick={() => window.location.href = '/'}
>
  <span className="sidebar-icon">↪</span>
  <span>Logout</span>
</button>
        <div className="sidebar-user">
          <div className="user-avatar">A</div>
          <div>
            <strong>Admin</strong>
            <small>System Administrator</small>
          </div>
        </div>

      </div>

    </aside>
  )
}

export default AdminSidebar
import { useState } from 'react'

function AdminProfile() {
  const [activeTab, setActiveTab] = useState('profile')
  const [editing, setEditing] = useState(false)

  const savedAdmin = JSON.parse(
    localStorage.getItem('adminProfile') || 'null'
  )

  const [admin, setAdmin] = useState(
    savedAdmin || {
      name: 'Admin',
      email: 'admin@recyLink.com',
      phone: '',
      role: 'System Administrator',
      organization: 'RecyLink',
      joined: 'January 2026',
    }
  )

  const handleChange = (e) => {
    setAdmin({
      ...admin,
      [e.target.name]: e.target.value,
    })
  }

  const handleSave = () => {
    localStorage.setItem(
      'adminProfile',
      JSON.stringify(admin)
    )

    setEditing(false)

    alert('Profile updated successfully!')
  }

  const getInitials = (name) => {
    if (!name) return 'A'

    return name
      .trim()
      .split(' ')
      .map((word) => word[0])
      .join('')
      .slice(0, 2)
      .toUpperCase()
  }

  return (
    <div className="management-page">

      {/* HEADER */}

      <div className="page-title-row">

        <div>
          <h2>Admin Profile</h2>

          <p>
            Manage your administrator account and settings
          </p>
        </div>

        {activeTab === 'profile' && (
          <button
            className="export-btn"
            onClick={() => setEditing(!editing)}
          >
            {editing ? 'Cancel' : 'Edit Profile'}
          </button>
        )}

      </div>


      {/* PROFILE HEADER */}

      <div className="admin-profile-header">

        <div className="admin-large-avatar">
          {getInitials(admin.name)}
        </div>

        <div className="admin-profile-info">

          <div className="admin-name-row">

            <h2>
              {admin.name}
            </h2>

            <span className="verified-badge">
              ✓ Administrator
            </span>

          </div>

          <p>
            {admin.role}
          </p>

          <span>
            {admin.organization} Administration
          </span>

        </div>

      </div>


      {/* TABS */}

      <div className="profile-tabs">

        <button
          className={
            activeTab === 'profile'
              ? 'active'
              : ''
          }
          onClick={() =>
            setActiveTab('profile')
          }
        >
          Profile Information
        </button>


        <button
          className={
            activeTab === 'security'
              ? 'active'
              : ''
          }
          onClick={() =>
            setActiveTab('security')
          }
        >
          Security
        </button>


        <button
          className={
            activeTab === 'activity'
              ? 'active'
              : ''
          }
          onClick={() =>
            setActiveTab('activity')
          }
        >
          Recent Activity
        </button>

      </div>


      {/* PROFILE INFORMATION */}

      {activeTab === 'profile' && (

        <div className="profile-content-card">

          <div className="profile-section-title">

            <h3>
              Personal Information
            </h3>

            <p>
              Basic administrator account details
            </p>

          </div>


          <div className="profile-form-grid">

            {/* NAME */}

            <div className="profile-field">

              <label>
                Full Name
              </label>

              {editing ? (

                <input
                  name="name"
                  value={admin.name}
                  onChange={handleChange}
                />

              ) : (

                <div className="profile-value">
                  {admin.name}
                </div>

              )}

            </div>


            {/* EMAIL */}

            <div className="profile-field">

              <label>
                Email Address
              </label>

              {editing ? (

                <input
                  type="email"
                  name="email"
                  value={admin.email}
                  onChange={handleChange}
                />

              ) : (

                <div className="profile-value">
                  {admin.email}
                </div>

              )}

            </div>


            {/* PHONE */}

            <div className="profile-field">

              <label>
                Phone Number
              </label>

              {editing ? (

                <input
                  name="phone"
                  placeholder="Enter phone number"
                  value={admin.phone}
                  onChange={handleChange}
                />

              ) : (

                <div className="profile-value">
                  {admin.phone || 'Not provided'}
                </div>

              )}

            </div>


            {/* ROLE */}

            <div className="profile-field">

              <label>
                Role
              </label>

              <div className="profile-value">
                {admin.role}
              </div>

            </div>


            {/* ORGANIZATION */}

            <div className="profile-field">

              <label>
                Organization
              </label>

              <div className="profile-value">
                {admin.organization}
              </div>

            </div>


            {/* JOINED */}

            <div className="profile-field">

              <label>
                Member Since
              </label>

              <div className="profile-value">
                {admin.joined}
              </div>

            </div>

          </div>


          {/* SAVE */}

          {editing && (

            <div className="profile-save-row">

              <button
                className="save-profile-btn"
                onClick={handleSave}
              >
                Save Changes
              </button>

            </div>

          )}

        </div>

      )}


      {/* SECURITY */}

      {activeTab === 'security' && (

        <div className="profile-content-card">

          <div className="profile-section-title">

            <h3>
              Account Security
            </h3>

            <p>
              Security controls available for the administrator account
            </p>

          </div>


          <div className="security-list">

            {/* PASSWORD */}

            <div className="security-item">

              <div>

                <strong>
                  Password
                </strong>

                <span>
                  Password management is handled by the authentication system.
                </span>

              </div>

              <button
                className="outline-btn"
                onClick={() =>
                  alert(
                    'Password management will be connected when authentication APIs are added.'
                  )
                }
              >
                Manage
              </button>

            </div>


            {/* 2FA */}

            <div className="security-item">

              <div>

                <strong>
                  Two-Factor Authentication
                </strong>

                <span>
                  Additional account protection.
                </span>

              </div>

              <button
                className="security-toggle"
                onClick={() =>
                  alert(
                    'Two-factor authentication is not available in the current backend.'
                  )
                }
              >
                Not Available
              </button>

            </div>


            {/* SESSIONS */}

            <div className="security-item">

              <div>

                <strong>
                  Login Sessions
                </strong>

                <span>
                  Session management will be available with authentication APIs.
                </span>

              </div>

              <button
                className="outline-btn"
                onClick={() =>
                  alert(
                    'Session management is not available in the current backend.'
                  )
                }
              >
                View
              </button>

            </div>

          </div>

        </div>

      )}


      {/* ACTIVITY */}

      {activeTab === 'activity' && (

        <div className="profile-content-card">

          <div className="profile-section-title">

            <h3>
              Recent Admin Activity
            </h3>

            <p>
              Activity tracking available in the current prototype
            </p>

          </div>


          <div className="admin-activity-list">

            <div className="admin-activity-item">

              <div className="activity-dot"></div>

              <div>

                <strong>
                  Viewed platform reports
                </strong>

                <span>
                  Current session
                </span>

              </div>

            </div>


            <div className="admin-activity-item">

              <div className="activity-dot"></div>

              <div>

                <strong>
                  Reviewed e-waste submissions
                </strong>

                <span>
                  Current session
                </span>

              </div>

            </div>


            <div className="admin-activity-item">

              <div className="activity-dot"></div>

              <div>

                <strong>
                  Reviewed recycler demands
                </strong>

                <span>
                  Current session
                </span>

              </div>

            </div>


            <div className="admin-activity-item">

              <div className="activity-dot"></div>

              <div>

                <strong>
                  Checked collection activity
                </strong>

                <span>
                  Current session
                </span>

              </div>

            </div>

          </div>

        </div>

      )}

    </div>
  )
}

export default AdminProfile
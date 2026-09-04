import { useState } from 'react'

function AdminProfile() {
  const [activeTab, setActiveTab] = useState('profile')

  const [admin, setAdmin] = useState({
    name: 'Admin',
    email: 'admin@recyLink.com',
    phone: '+91 98XXXXXX10',
    role: 'System Administrator',
    organization: 'RecyLink',
    joined: 'January 2026'
  })

  const [editing, setEditing] = useState(false)

  const handleChange = (e) => {
    setAdmin({
      ...admin,
      [e.target.name]: e.target.value
    })
  }

  const handleSave = () => {
    setEditing(false)
    alert('Profile updated successfully!')
  }

  return (
    <div className="management-page">

      {/* HEADER */}

      <div className="page-title-row">
        <div>
          <h2>Admin Profile</h2>
          <p>Manage your administrator account and settings</p>
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
          A
        </div>

        <div className="admin-profile-info">
          <div className="admin-name-row">
            <h2>{admin.name}</h2>
            <span className="verified-badge">
              ✓ Verified
            </span>
          </div>

          <p>{admin.role}</p>
          <span>RecyLink Administration</span>
        </div>

      </div>

      {/* TABS */}

      <div className="profile-tabs">

        <button
          className={activeTab === 'profile' ? 'active' : ''}
          onClick={() => setActiveTab('profile')}
        >
          Profile Information
        </button>

        <button
          className={activeTab === 'security' ? 'active' : ''}
          onClick={() => setActiveTab('security')}
        >
          Security
        </button>

        <button
          className={activeTab === 'activity' ? 'active' : ''}
          onClick={() => setActiveTab('activity')}
        >
          Recent Activity
        </button>

      </div>

      {/* PROFILE INFORMATION */}

      {activeTab === 'profile' && (

        <div className="profile-content-card">

          <div className="profile-section-title">
            <h3>Personal Information</h3>
            <p>Basic administrator account details</p>
          </div>

          <div className="profile-form-grid">

            <div className="profile-field">
              <label>Full Name</label>

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

            <div className="profile-field">
              <label>Email Address</label>

              {editing ? (
                <input
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

            <div className="profile-field">
              <label>Phone Number</label>

              {editing ? (
                <input
                  name="phone"
                  value={admin.phone}
                  onChange={handleChange}
                />
              ) : (
                <div className="profile-value">
                  {admin.phone}
                </div>
              )}
            </div>

            <div className="profile-field">
              <label>Role</label>

              <div className="profile-value">
                {admin.role}
              </div>
            </div>

            <div className="profile-field">
              <label>Organization</label>

              <div className="profile-value">
                {admin.organization}
              </div>
            </div>

            <div className="profile-field">
              <label>Member Since</label>

              <div className="profile-value">
                {admin.joined}
              </div>
            </div>

          </div>

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
            <h3>Account Security</h3>
            <p>Manage your password and account security</p>
          </div>

          <div className="security-list">

            <div className="security-item">
              <div>
                <strong>Password</strong>
                <span>Last changed 30 days ago</span>
              </div>

              <button className="outline-btn">
                Change Password
              </button>
            </div>

            <div className="security-item">
              <div>
                <strong>Two-Factor Authentication</strong>
                <span>Add an extra layer of account protection</span>
              </div>

              <button className="security-toggle">
                Enable
              </button>
            </div>

            <div className="security-item">
              <div>
                <strong>Login Sessions</strong>
                <span>Manage devices currently signed in</span>
              </div>

              <button className="outline-btn">
                View Sessions
              </button>
            </div>

          </div>

        </div>

      )}

      {/* ACTIVITY */}

      {activeTab === 'activity' && (

        <div className="profile-content-card">

          <div className="profile-section-title">
            <h3>Recent Admin Activity</h3>
            <p>Latest actions performed from this account</p>
          </div>

          <div className="admin-activity-list">

            <div className="admin-activity-item">
              <div className="activity-dot"></div>
              <div>
                <strong>Verified GreenTech Recyclers</strong>
                <span>Today · 10:42 AM</span>
              </div>
            </div>

            <div className="admin-activity-item">
              <div className="activity-dot"></div>
              <div>
                <strong>Approved collector COL-1025</strong>
                <span>Today · 09:18 AM</span>
              </div>
            </div>

            <div className="admin-activity-item">
              <div className="activity-dot"></div>
              <div>
                <strong>Reviewed e-waste submission EW-2048</strong>
                <span>Yesterday · 04:35 PM</span>
              </div>
            </div>

            <div className="admin-activity-item">
              <div className="activity-dot"></div>
              <div>
                <strong>Created platform report</strong>
                <span>Yesterday · 02:10 PM</span>
              </div>
            </div>

          </div>

        </div>

      )}

    </div>
  )
}

export default AdminProfile
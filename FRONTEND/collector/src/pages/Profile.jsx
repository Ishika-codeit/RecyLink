import { useState } from 'react'

function Profile() {
  const [activeTab, setActiveTab] = useState('overview')

  const collections = [
    {
      material: 'Desktop Computers',
      quantity: 12,
      recycler: 'GreenTech Recyclers',
      location: 'Ghaziabad',
      date: '28 Aug 2026',
      earnings: '₹5,040',
    },
    {
      material: 'Mobile Phones',
      quantity: 20,
      recycler: 'Clean Earth Recycling',
      location: 'Delhi',
      date: '24 Aug 2026',
      earnings: '₹4,200',
    },
    {
      material: 'Printers',
      quantity: 8,
      recycler: 'GreenLoop India',
      location: 'Faridabad',
      date: '20 Aug 2026',
      earnings: '₹2,880',
    },
    {
      material: 'Laptops',
      quantity: 5,
      recycler: 'EcoCycle Recycling',
      location: 'Noida',
      date: '15 Aug 2026',
      earnings: '₹2,900',
    },
  ]

  return (
    <div className="profile-page">

      {/* PROFILE HEADER */}
      <section className="profile-hero">
        <div className="profile-main">
          <div className="profile-avatar">
            RK
          </div>

          <div className="profile-identity">
            <div className="profile-name-row">
              <h1>Raj Kumar</h1>
              <span className="verified-profile">
                ✓ Verified Collector
              </span>
            </div>

            <p>Independent E-Waste Collector</p>

            <div className="profile-meta">
              <span>📍 Delhi NCR</span>
              <span>•</span>
              <span>Member since Jan 2026</span>
            </div>
          </div>
        </div>

        <button className="edit-profile-button">
          ✎ Edit Profile
        </button>
      </section>


      {/* TABS */}
      <div className="profile-tabs">

        <button
          className={activeTab === 'overview' ? 'active' : ''}
          onClick={() => setActiveTab('overview')}
        >
          Overview
        </button>

        <button
          className={activeTab === 'collections' ? 'active' : ''}
          onClick={() => setActiveTab('collections')}
        >
          My Collections
        </button>

        <button
          className={activeTab === 'settings' ? 'active' : ''}
          onClick={() => setActiveTab('settings')}
        >
          Account Settings
        </button>

      </div>


      {/* ================= OVERVIEW ================= */}

      {activeTab === 'overview' && (
        <>
          {/* STATS */}
          <section className="profile-stats">

            <div className="profile-stat">
              <span>♻️</span>
              <div>
                <strong>248 kg</strong>
                <small>E-Waste Collected</small>
              </div>
            </div>

            <div className="profile-stat">
              <span>📦</span>
              <div>
                <strong>18</strong>
                <small>Completed Collections</small>
              </div>
            </div>

            <div className="profile-stat">
              <span>🏢</span>
              <div>
                <strong>7</strong>
                <small>Recyclers Connected</small>
              </div>
            </div>

            <div className="profile-stat">
              <span>⭐</span>
              <div>
                <strong>4.8 / 5</strong>
                <small>Collector Rating</small>
              </div>
            </div>

          </section>


          {/* TWO COLUMNS */}
          <div className="profile-grid">

            {/* INFORMATION */}
            <section className="profile-card">

              <div className="profile-card-heading">
                <div>
                  <h2>Collector Information</h2>
                  <p>Your basic account information</p>
                </div>
              </div>

              <div className="profile-info-list">

                <div>
                  <span>Full Name</span>
                  <strong>Raj Kumar</strong>
                </div>

                <div>
                  <span>Phone Number</span>
                  <strong>+91 98XXXXXX42</strong>
                </div>

                <div>
                  <span>Email Address</span>
                  <strong>raj.kumar@example.com</strong>
                </div>

                <div>
                  <span>Service Area</span>
                  <strong>Delhi NCR</strong>
                </div>

                <div>
                  <span>Collector Type</span>
                  <strong>Independent Collector</strong>
                </div>

                <div>
                  <span>Account Status</span>
                  <strong className="active-account">
                    ● Active
                  </strong>
                </div>

              </div>

            </section>


            {/* IMPACT */}
            <section className="profile-card impact-card">

              <div className="profile-card-heading">
                <div>
                  <h2>Environmental Impact</h2>
                  <p>Your contribution to responsible recycling</p>
                </div>
              </div>

              <div className="impact-big">
                <strong>248</strong>
                <span>kg e-waste responsibly collected</span>
              </div>

              <div className="impact-stat-line">
                <span>Collections Completed</span>
                <strong>18</strong>
              </div>

              <div className="impact-bar">
                <span style={{ width: '82%' }}></span>
              </div>

              <div className="impact-stat-line">
                <span>Recycler Connections</span>
                <strong>7</strong>
              </div>

              <div className="impact-bar">
                <span style={{ width: '65%' }}></span>
              </div>

              <div className="impact-message">
                🌱 Every collection helps move e-waste
                toward the formal recycling ecosystem.
              </div>

            </section>

          </div>


          {/* RECENT COLLECTIONS */}
          <section className="profile-card recent-collections">

            <div className="profile-card-heading">

              <div>
                <h2>Recent Collections</h2>
                <p>Your latest completed e-waste collections</p>
              </div>

              <button
                className="view-all-button"
                onClick={() => setActiveTab('collections')}
              >
                View All →
              </button>

            </div>


            <div className="collection-table">

              <div className="table-header">
                <span>Material</span>
                <span>Recycler</span>
                <span>Quantity</span>
                <span>Date</span>
                <span>Earnings</span>
                <span>Status</span>
              </div>


              {collections.map((item, index) => (

                <div className="table-row" key={index}>

                  <strong>{item.material}</strong>

                  <span>{item.recycler}</span>

                  <span>{item.quantity} units</span>

                  <span>{item.date}</span>

                  <strong className="earning">
                    {item.earnings}
                  </strong>

                  <span className="completed-status">
                    ✓ Completed
                  </span>

                </div>

              ))}

            </div>

          </section>
        </>
      )}


      {/* ================= COLLECTIONS ================= */}

      {activeTab === 'collections' && (

        <section className="profile-card">

          <div className="profile-card-heading">
            <div>
              <h2>My Collections</h2>
              <p>Complete history of your e-waste collections</p>
            </div>
          </div>


          <div className="full-collection-list">

            {collections.map((item, index) => (

              <div
                className="full-collection-item"
                key={index}
              >

                <div className="collection-item-icon">
                  ♻️
                </div>

                <div className="collection-item-main">

                  <h3>{item.material}</h3>

                  <p>
                    {item.quantity} units • {item.recycler}
                  </p>

                  <small>
                    📍 {item.location} • {item.date}
                  </small>

                </div>

                <div className="collection-item-right">

                  <strong>{item.earnings}</strong>

                  <span>
                    ✓ Completed
                  </span>

                </div>

              </div>

            ))}

          </div>

        </section>

      )}


      {/* ================= SETTINGS ================= */}

      {activeTab === 'settings' && (

        <section className="profile-card settings-card">

          <div className="profile-card-heading">

            <div>
              <h2>Account Settings</h2>
              <p>Manage your RecyLink account preferences</p>
            </div>

          </div>


          <div className="settings-list">

            <div className="setting-item">
              <div>
                <strong>Notification Preferences</strong>
                <p>
                  Receive alerts for new demands and recycler offers.
                </p>
              </div>

              <button className="setting-action">
                Manage
              </button>
            </div>


            <div className="setting-item">
              <div>
                <strong>Service Location</strong>
                <p>Delhi NCR</p>
              </div>

              <button className="setting-action">
                Update
              </button>
            </div>


            <div className="setting-item">
              <div>
                <strong>Privacy & Security</strong>
                <p>
                  Manage your account security and privacy.
                </p>
              </div>

              <button className="setting-action">
                Manage
              </button>
            </div>


            <div className="setting-item">
              <div>
                <strong>Help & Support</strong>
                <p>
                  Contact the RecyLink support team.
                </p>
              </div>

              <button className="setting-action">
                Contact
              </button>
            </div>

          </div>

        </section>

      )}

    </div>
  )
}

export default Profile
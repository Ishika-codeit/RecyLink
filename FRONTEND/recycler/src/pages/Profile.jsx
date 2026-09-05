import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

function Profile() {
  return (
    <div className="recycler-app">
      <Navbar />

      <main className="recycler-profile-page">

        {/* Header */}
        <div className="profile-page-header">
          <div>
            <span className="eyebrow">ACCOUNT & VERIFICATION</span>
            <h1>Recycler Profile</h1>
            <p>
              Manage your organization details, verification and recycling
              preferences.
            </p>
          </div>

          <button className="profile-edit-btn">
            Edit Profile
          </button>
        </div>

        <div className="profile-layout">

          {/* Left */}
          <div className="profile-main">

            {/* Organization */}
            <section className="profile-card organization-card">

              <div className="profile-cover">
                <div className="large-profile-avatar">EC</div>

                <div className="verified-profile-badge">
                  ✓ Verified Recycler
                </div>
              </div>

              <div className="organization-content">
                <span className="card-eyebrow">ORGANIZATION</span>

                <h2>EcoCycle Recycling Pvt. Ltd.</h2>

                <p className="profile-description">
                  Authorized e-waste collection and recycling organization
                  focused on responsible material recovery and circular
                  processing.
                </p>

                <div className="organization-meta">
                  <span>● Delhi NCR</span>
                  <span>◉ eco-cycle@example.com</span>
                  <span>◷ Joined Jan 2025</span>
                </div>
              </div>
            </section>

            {/* Details */}
            <section className="profile-card">

              <div className="profile-card-heading">
                <div>
                  <span className="card-eyebrow">BUSINESS INFORMATION</span>
                  <h2>Organization Details</h2>
                </div>

                <button className="text-action">Edit</button>
              </div>

              <div className="profile-info-grid">

                <div>
                  <span>ORGANIZATION NAME</span>
                  <strong>EcoCycle Recycling Pvt. Ltd.</strong>
                </div>

                <div>
                  <span>CONTACT PERSON</span>
                  <strong>Arjun Mehta</strong>
                </div>

                <div>
                  <span>EMAIL ADDRESS</span>
                  <strong>eco-cycle@example.com</strong>
                </div>

                <div>
                  <span>PHONE NUMBER</span>
                  <strong>+91 98XX XXX 421</strong>
                </div>

                <div>
                  <span>LOCATION</span>
                  <strong>Sector 62, Noida</strong>
                </div>

                <div>
                  <span>OPERATING REGION</span>
                  <strong>Delhi NCR</strong>
                </div>

              </div>
            </section>

            {/* Capabilities */}
            <section className="profile-card">

              <div className="profile-card-heading">
                <div>
                  <span className="card-eyebrow">RECYCLING CAPABILITIES</span>
                  <h2>Accepted E-Waste</h2>
                </div>
              </div>

              <div className="accepted-materials">
                <span>💻 Laptops</span>
                <span>🖥️ Desktops</span>
                <span>📱 Mobile Phones</span>
                <span>🖨️ Printers</span>
                <span>🔌 PCBs</span>
                <span>⌨️ Peripherals</span>
              </div>

            </section>

            {/* Preferences */}
            <section className="profile-card">

              <div className="profile-card-heading">
                <div>
                  <span className="card-eyebrow">OPERATING PREFERENCES</span>
                  <h2>Collection Preferences</h2>
                </div>
              </div>

              <div className="preference-list">

                <div className="preference-item">
                  <div>
                    <strong>Recycler Pickup</strong>
                    <span>Allow collectors to request pickup from their location.</span>
                  </div>

                  <div className="toggle active">
                    <span />
                  </div>
                </div>

                <div className="preference-item">
                  <div>
                    <strong>Demand Notifications</strong>
                    <span>Receive alerts when new collector submissions match your demands.</span>
                  </div>

                  <div className="toggle active">
                    <span />
                  </div>
                </div>

                <div className="preference-item">
                  <div>
                    <strong>AI Assessment Alerts</strong>
                    <span>Get notified when a new e-waste submission is AI assessed.</span>
                  </div>

                  <div className="toggle active">
                    <span />
                  </div>
                </div>

              </div>
            </section>

          </div>

          {/* Right */}
          <aside className="profile-sidebar">

            {/* Verification */}
            <section className="verification-card">

              <div className="verification-icon">✓</div>

              <span className="card-eyebrow">VERIFICATION STATUS</span>

              <h2>Verified Recycler</h2>

              <p>
                Your organization has completed RecyLink's recycler
                verification process.
              </p>

              <div className="verification-items">
                <div>
                  <span>✓</span>
                  <strong>Organization verified</strong>
                </div>

                <div>
                  <span>✓</span>
                  <strong>Recycler credentials verified</strong>
                </div>

                <div>
                  <span>✓</span>
                  <strong>Operating location verified</strong>
                </div>
              </div>

              <small>Verified on 18 Jan 2025</small>

            </section>

            {/* Performance */}
            <section className="profile-performance">

              <span className="card-eyebrow">PERFORMANCE</span>

              <h2>Recycler Overview</h2>

              <div className="performance-stat">
                <strong>4.9</strong>
                <span>Average Rating</span>
              </div>

              <div className="performance-stat">
                <strong>126</strong>
                <span>Completed Collections</span>
              </div>

              <div className="performance-stat">
                <strong>2,840 kg</strong>
                <span>E-Waste Recycled</span>
              </div>

            </section>

            <Link to="/recycler/demands/create" className="profile-cta">
              + Create New Demand
            </Link>

          </aside>

        </div>

      </main>

      <Footer />
    </div>
  )
}

export default Profile
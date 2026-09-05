import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

function Dashboard() {
  return (
    <div className="recycler-app">

      <Navbar />

      <main className="recycler-dashboard">

        {/* Header */}
        <section className="dashboard-header">
          <div>
            <span className="eyebrow">RECYCLER PORTAL</span>

            <h1>Good evening, EcoCycle Recycling 👋</h1>

            <p>
              Manage your e-waste demands, review incoming material and
              connect with verified collectors.
            </p>
          </div>

          <Link to="/recycler/demands/create" className="primary-btn">
            + Create Demand
          </Link>
        </section>


        {/* Stats */}
        <section className="recycler-stats">

          <div className="recycler-stat stat-green">
            <div className="stat-icon">♻</div>

            <div>
              <span>Active Demands</span>
              <strong>8</strong>
              <small>2 new this week</small>
            </div>
          </div>

          <div className="recycler-stat stat-blue">
            <div className="stat-icon">◉</div>

            <div>
              <span>Incoming E-Waste</span>
              <strong>24</strong>
              <small>Awaiting review</small>
            </div>
          </div>

          <div className="recycler-stat stat-dark">
            <div className="stat-icon">₹</div>

            <div>
              <span>Pending Offers</span>
              <strong>7</strong>
              <small>3 require action</small>
            </div>
          </div>

          <div className="recycler-stat stat-teal">
            <div className="stat-icon">✓</div>

            <div>
              <span>Completed Collections</span>
              <strong>126</strong>
              <small>+12 this month</small>
            </div>
          </div>

        </section>


        {/* Main grid */}
        <section className="dashboard-main-grid">

          {/* Demands */}
          <div className="dashboard-panel">

            <div className="panel-heading">
              <div>
                <span className="panel-label">DEMAND MANAGEMENT</span>
                <h2>Active Demands</h2>
              </div>

              <Link to="/recycler/demands">
                View all →
              </Link>
            </div>


            <div className="dashboard-demand-list">

              <div className="dashboard-demand">
                <div className="material-icon">💻</div>

                <div className="demand-info">
                  <strong>Laptops</strong>
                  <span>25 units · Noida Sector 62</span>
                </div>

                <div className="demand-price">
                  <strong>₹450–₹650</strong>
                  <span>/ unit</span>
                </div>

                <span className="status-badge open">
                  Open
                </span>
              </div>


              <div className="dashboard-demand">
                <div className="material-icon">🖥️</div>

                <div className="demand-info">
                  <strong>Desktop Computers</strong>
                  <span>15 units · Ghaziabad</span>
                </div>

                <div className="demand-price">
                  <strong>₹350–₹500</strong>
                  <span>/ unit</span>
                </div>

                <span className="status-badge open">
                  Open
                </span>
              </div>


              <div className="dashboard-demand">
                <div className="material-icon">📱</div>

                <div className="demand-info">
                  <strong>Mobile Phones</strong>
                  <span>40 units · Delhi NCR</span>
                </div>

                <div className="demand-price">
                  <strong>₹120–₹250</strong>
                  <span>/ unit</span>
                </div>

                <span className="status-badge open">
                  Open
                </span>
              </div>

            </div>

          </div>


          {/* Incoming */}
          <div className="dashboard-panel">

            <div className="panel-heading">
              <div>
                <span className="panel-label">COLLECTOR ACTIVITY</span>
                <h2>Incoming E-Waste</h2>
              </div>

              <Link to="/recycler/ewaste">
                View all →
              </Link>
            </div>


            <div className="incoming-list">

              <div className="incoming-item">
                <div className="collector-avatar">RK</div>

                <div>
                  <strong>Rahul Kumar</strong>
                  <span>5 × Dell Latitude Laptop</span>
                </div>

                <span className="ai-badge">
                  AI 94%
                </span>
              </div>


              <div className="incoming-item">
                <div className="collector-avatar">AS</div>

                <div>
                  <strong>Aman Sharma</strong>
                  <span>8 × Desktop Computer</span>
                </div>

                <span className="ai-badge">
                  AI 91%
                </span>
              </div>


              <div className="incoming-item">
                <div className="collector-avatar">PM</div>

                <div>
                  <strong>Priya Mehta</strong>
                  <span>12 × Mobile Phone</span>
                </div>

                <span className="ai-badge">
                  AI 96%
                </span>
              </div>

            </div>

          </div>

        </section>


        {/* Bottom */}
        <section className="dashboard-bottom-grid">

          <div className="dashboard-panel offer-preview">

            <div className="panel-heading">
              <div>
                <span className="panel-label">OFFERS</span>
                <h2>Pending Offers</h2>
              </div>

              <Link to="/recycler/ewaste">
                Manage →
              </Link>
            </div>

            <div className="offer-summary">
              <div>
                <strong>7</strong>
                <span>Offers awaiting action</span>
              </div>

              <Link
                to="/recycler/ewaste"
                className="secondary-btn"
              >
                Review Offers
              </Link>
            </div>

          </div>


          <div className="impact-card">

            <div className="impact-glow"></div>

            <span>RECYCLING IMPACT</span>

            <h2>Make every collection count.</h2>

            <p>
              Track the material you divert from landfill and your
              contribution to a circular economy.
            </p>

            <div className="impact-number">
              <strong>2,840</strong>
              <span>kg e-waste recycled</span>
            </div>

          </div>

        </section>

      </main>

      <Footer />

    </div>
  )
}

export default Dashboard
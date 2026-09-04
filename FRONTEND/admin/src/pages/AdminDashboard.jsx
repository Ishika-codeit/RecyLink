import AdminSidebar from '../components/AdminSidebar'
import AdminNavbar from '../components/AdminNavbar'

function AdminDashboard() {

  const stats = [
    {
      title: 'Registered Collectors',
      value: '1,248',
      change: '+12.4%',
      sub: '+130 this month',
      icon: '♟',
      type: 'green'
    },
    {
      title: 'Verified Recyclers',
      value: '86',
      change: '+8.9%',
      sub: '+7 this month',
      icon: '▦',
      type: 'blue'
    },
    {
      title: 'Total E-Waste Collected',
      value: '18.6 T',
      change: '+21.8%',
      sub: '+3.2 T this month',
      icon: '♻',
      type: 'green'
    },
    {
      title: 'Active Demands',
      value: '42',
      change: '+16.7%',
      sub: '+6 this month',
      icon: '▤',
      type: 'blue'
    }
  ]

  const recentCollections = [
    {
      id: 'COL-1025',
      item: 'Laptops',
      collector: 'Ramesh Kumar',
      location: 'Delhi',
      status: 'Completed'
    },
    {
      id: 'COL-1024',
      item: 'Mobile Phones',
      collector: 'Priya Singh',
      location: 'Noida',
      status: 'In Transit'
    },
    {
      id: 'COL-1023',
      item: 'E-Waste Mix',
      collector: 'Arjun Verma',
      location: 'Gurgaon',
      status: 'Pending'
    },
    {
      id: 'COL-1022',
      item: 'Monitors',
      collector: 'Sneha Patel',
      location: 'Faridabad',
      status: 'Completed'
    }
  ]

  const categories = [
    { name: 'Laptops', value: 28 },
    { name: 'Mobile Phones', value: 24 },
    { name: 'Desktops', value: 18 },
    { name: 'Printers', value: 12 },
    { name: 'Monitors', value: 10 },
    { name: 'Others', value: 8 }
  ]

  const bars = [28, 40, 50, 46, 58, 67, 75, 92, 82]

  return (
    <div className="admin-layout">

      <AdminSidebar />

      <main className="admin-main">

        <AdminNavbar />

        <div className="admin-content dashboard-modern">

          {/* WELCOME */}

          <section className="dashboard-welcome">

            <div className="welcome-content">
              <span className="welcome-small">
                RECYLINK ADMINISTRATION
              </span>

              <h1>
                Welcome back, <span>Admin!</span> 👋
              </h1>

              <p>
                Together for a cleaner, greener India.
              </p>

              <small>
                "Small actions make a big impact."
              </small>
            </div>

            <div className="welcome-visual">
              <div className="welcome-globe">🌍</div>
              <div className="welcome-leaf leaf-one">🌿</div>
              <div className="welcome-leaf leaf-two">🍃</div>
            </div>

            <div className="welcome-date">
              <strong>Thu, 4 Sep 2026</strong>
              <span>Here's what's happening with RecyLink today.</span>
            </div>

          </section>

          {/* STATS */}

          <div className="modern-stats">

            {stats.map((stat) => (

              <div className="modern-stat-card" key={stat.title}>

                <div className={`modern-stat-icon ${stat.type}`}>
                  {stat.icon}
                </div>

                <div className="modern-stat-info">

                  <span>{stat.title}</span>

                  <div className="modern-stat-value">
                    <strong>{stat.value}</strong>

                    <small>
                      ↑ {stat.change.replace('+', '')}
                    </small>
                  </div>

                  <p>{stat.sub}</p>

                </div>

              </div>

            ))}

          </div>

          {/* CHART + CATEGORY */}

          <div className="dashboard-modern-grid">

            {/* COLLECTION TREND */}

            <section className="modern-card collection-chart-card">

              <div className="modern-card-header">

                <div>
                  <h3>Collection Trend</h3>
                  <p>Monthly e-waste collection in kg</p>
                </div>

                <select>
                  <option>This Year</option>
                  <option>Last 6 Months</option>
                  <option>Last 30 Days</option>
                </select>

              </div>

              <div className="trend-chart">

                <div className="chart-y-axis">
                  <span>2.5K</span>
                  <span>2K</span>
                  <span>1.5K</span>
                  <span>1K</span>
                  <span>500</span>
                  <span>0</span>
                </div>

                <div className="chart-main">

                  <div className="chart-grid-lines">
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>

                  <div className="trend-bars">

                    {bars.map((height, index) => (

                      <div className="trend-column" key={index}>

                        <div
                          className="trend-bar"
                          style={{ height: `${height}%` }}
                        ></div>

                        <span>
                          {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'][index]}
                        </span>

                      </div>

                    ))}

                  </div>

                </div>

              </div>

              <div className="chart-legend">
                <span>
                  <i className="legend-green"></i>
                  E-Waste Collected
                </span>

                <span>
                  <i className="legend-blue"></i>
                  Completed Collections
                </span>
              </div>

            </section>

            {/* CATEGORY */}

            <section className="modern-card category-card">

              <div className="modern-card-header">
                <div>
                  <h3>E-Waste by Category</h3>
                  <p>Distribution of collected material</p>
                </div>

                <button className="more-btn">⋮</button>
              </div>

              <div className="category-content">

                <div className="donut-chart">
                  <div className="donut-center">
                    <strong>18.6 T</strong>
                    <span>Total</span>
                  </div>
                </div>

                <div className="category-list">

                  {categories.map((category, index) => (

                    <div className="category-list-item" key={category.name}>

                      <div>
                        <i className={`category-dot dot-${index}`}></i>
                        <span>{category.name}</span>
                      </div>

                      <strong>{category.value}%</strong>

                    </div>

                  ))}

                </div>

              </div>

            </section>

          </div>

          {/* RECENT COLLECTIONS + IMPACT */}

          <div className="dashboard-modern-grid bottom-grid">

            {/* RECENT COLLECTIONS */}

            <section className="modern-card recent-collections-card">

              <div className="modern-card-header">

                <div>
                  <h3>Recent Collections</h3>
                  <p>Latest e-waste collection activity</p>
                </div>

                <button className="text-link">
                  View All
                </button>

              </div>

              <div className="modern-table-wrapper">

                <table className="modern-table">

                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Item</th>
                      <th>Collector</th>
                      <th>Location</th>
                      <th>Status</th>
                    </tr>
                  </thead>

                  <tbody>

                    {recentCollections.map((collection) => (

                      <tr key={collection.id}>

                        <td>
                          <strong>{collection.id}</strong>
                        </td>

                        <td>
                          <span className="item-icon">♻</span>
                          {collection.item}
                        </td>

                        <td>{collection.collector}</td>

                        <td>{collection.location}</td>

                        <td>
                          <span
                            className={`collection-status ${collection.status
                              .toLowerCase()
                              .replaceAll(' ', '-')}`}
                          >
                            {collection.status}
                          </span>
                        </td>

                      </tr>

                    ))}

                  </tbody>

                </table>

              </div>

            </section>

            {/* ENVIRONMENTAL IMPACT */}

            <section className="modern-card impact-card">

              <div className="modern-card-header">

                <div>
                  <h3>Environmental Impact</h3>
                  <p>Platform impact this year</p>
                </div>

                <select>
                  <option>This Year</option>
                  <option>Last 6 Months</option>
                </select>

              </div>

              <div className="impact-modern-grid">

                <div className="impact-modern-item">
                  <div className="impact-icon green">♻</div>
                  <div>
                    <strong>18.6 T</strong>
                    <span>E-Waste Diverted</span>
                  </div>
                </div>

                <div className="impact-modern-item">
                  <div className="impact-icon blue">☁</div>
                  <div>
                    <strong>42.8 T</strong>
                    <span>CO₂e Avoided</span>
                  </div>
                </div>

                <div className="impact-modern-item">
                  <div className="impact-icon green">♻</div>
                  <div>
                    <strong>12.4 T</strong>
                    <span>Material Recovered</span>
                  </div>
                </div>

                <div className="impact-modern-item">
                  <div className="impact-icon blue">♟</div>
                  <div>
                    <strong>3,642</strong>
                    <span>Completed Collections</span>
                  </div>
                </div>

              </div>

              <div className="impact-message">
                🌱 Every device recycled is a step towards a cleaner planet.
              </div>

            </section>

          </div>

        </div>

      </main>

    </div>
  )
}

export default AdminDashboard
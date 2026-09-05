import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const collections = [
  {
    id: 'COL-1048',
    collector: 'Rahul Kumar',
    initials: 'RK',
    material: 'Dell Latitude Laptop',
    category: 'Laptop',
    quantity: 5,
    weight: '11.5 kg',
    location: 'Delhi NCR',
    value: '₹2,900',
    status: 'Scheduled',
    date: '12 Sep 2026',
    progress: 75,
  },
  {
    id: 'COL-1047',
    collector: 'Aman Sharma',
    initials: 'AS',
    material: 'Desktop Computer',
    category: 'Desktop',
    quantity: 8,
    weight: '24 kg',
    location: 'Ghaziabad',
    value: '₹3,360',
    status: 'Pickup Pending',
    date: '13 Sep 2026',
    progress: 45,
  },
  {
    id: 'COL-1043',
    collector: 'Priya Mehta',
    initials: 'PM',
    material: 'Samsung Mobile Phones',
    category: 'Mobile',
    quantity: 12,
    weight: '4.8 kg',
    location: 'Delhi',
    value: '₹2,520',
    status: 'Completed',
    date: '08 Sep 2026',
    progress: 100,
  },
  {
    id: 'COL-1041',
    collector: 'Vikash Singh',
    initials: 'VS',
    material: 'HP Laser Printer',
    category: 'Printer',
    quantity: 6,
    weight: '18 kg',
    location: 'Faridabad',
    value: '₹2,400',
    status: 'Completed',
    date: '07 Sep 2026',
    progress: 100,
  },
]

function statusClass(status) {
  if (status === 'Completed') return 'completed'
  if (status === 'Scheduled') return 'scheduled'
  return 'pending'
}

function Collections() {
  return (
    <div className="recycler-app">
      <Navbar />

      <main className="collections-page">

        <div className="collections-header">
          <div>
            <span className="eyebrow">COLLECTION OPERATIONS</span>
            <h1>Collections</h1>
            <p>
              Track pickups, received material and completed recycling
              collections from one place.
            </p>
          </div>

          <div className="collection-header-stat">
            <span>THIS MONTH</span>
            <strong>18</strong>
            <small>Collections completed</small>
          </div>
        </div>

        {/* Stats */}
        <div className="collections-stats">
          <div className="collection-stat-card">
            <div className="collection-stat-icon green">↗</div>
            <div>
              <span>Active Collections</span>
              <strong>4</strong>
            </div>
          </div>

          <div className="collection-stat-card">
            <div className="collection-stat-icon blue">◷</div>
            <div>
              <span>Pickup Pending</span>
              <strong>7</strong>
            </div>
          </div>

          <div className="collection-stat-card">
            <div className="collection-stat-icon teal">✓</div>
            <div>
              <span>Completed</span>
              <strong>126</strong>
            </div>
          </div>

          <div className="collection-stat-card">
            <div className="collection-stat-icon dark">♻</div>
            <div>
              <span>Total Recycled</span>
              <strong>2,840 kg</strong>
            </div>
          </div>
        </div>

        {/* Toolbar */}
        <div className="collections-toolbar">
          <div className="collection-search">
            <span>⌕</span>
            <input placeholder="Search collector, material or ID..." />
          </div>

          <select defaultValue="all">
            <option value="all">All Status</option>
            <option>Scheduled</option>
            <option>Pickup Pending</option>
            <option>Completed</option>
          </select>

          <select defaultValue="all">
            <option value="all">All Categories</option>
            <option>Laptop</option>
            <option>Desktop</option>
            <option>Mobile</option>
            <option>Printer</option>
          </select>
        </div>

        {/* Collection List */}
        <section className="collections-list">

          <div className="collections-list-heading">
            <div>
              <span className="card-eyebrow">COLLECTION PIPELINE</span>
              <h2>Recent Collections</h2>
            </div>

            <span>Showing 4 collections</span>
          </div>

          {collections.map((item) => (
            <div className="collection-row" key={item.id}>

              <div className="collection-row-main">

                <div className="collection-material-icon">
                  {item.category === 'Mobile'
                    ? '📱'
                    : item.category === 'Printer'
                    ? '🖨️'
                    : '💻'}
                </div>

                <div className="collection-material">
                  <div className="collection-id">{item.id}</div>
                  <h3>{item.material}</h3>
                  <p>
                    {item.category} · {item.quantity} units · {item.weight}
                  </p>
                </div>

              </div>

              <div className="collection-collector">
                <div className="mini-avatar">{item.initials}</div>
                <div>
                  <strong>{item.collector}</strong>
                  <span>{item.location}</span>
                </div>
              </div>

              <div className="collection-value">
                <span>OFFER VALUE</span>
                <strong>{item.value}</strong>
              </div>

              <div className="collection-progress">
                <div className="progress-top">
                  <span>Progress</span>
                  <strong>{item.progress}%</strong>
                </div>

                <div className="collection-progress-bar">
                  <span style={{ width: `${item.progress}%` }} />
                </div>

                <small>{item.date}</small>
              </div>

              <div className="collection-status-area">
                <span className={`collection-status ${statusClass(item.status)}`}>
                  {item.status}
                </span>

                <button className="collection-view-btn">
                  View →
                </button>
              </div>

            </div>
          ))}

        </section>

        {/* Info */}
        <div className="collections-info">
          <div className="collections-info-icon">✦</div>

          <div>
            <strong>Collection tracking</strong>
            <p>
              Keep pickup progress and received material records updated to
              maintain transparent e-waste movement from collector to recycler.
            </p>
          </div>
        </div>

      </main>

      <Footer />
    </div>
  )
}

export default Collections
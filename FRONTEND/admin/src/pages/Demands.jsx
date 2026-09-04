import { useState } from 'react'

function Demands() {
  const [search, setSearch] = useState('')
  const [status, setStatus] = useState('All')

  const demands = [
    {
      id: 'DEM-3012',
      recycler: 'EcoCycle Recycling',
      category: 'Laptop',
      quantity: 25,
      price: '₹450–₹650',
      location: 'Noida Sector 62',
      deadline: '12 Sep 2026',
      status: 'Open',
      match: '94%'
    },
    {
      id: 'DEM-3011',
      recycler: 'GreenTech Recyclers',
      category: 'Desktop',
      quantity: 15,
      price: '₹350–₹500',
      location: 'Ghaziabad',
      deadline: '15 Sep 2026',
      status: 'Open',
      match: '89%'
    },
    {
      id: 'DEM-3010',
      recycler: 'Clean Earth Recycling',
      category: 'Mobile',
      quantity: 40,
      price: '₹120–₹250',
      location: 'Delhi',
      deadline: '18 Sep 2026',
      status: 'Open',
      match: '86%'
    },
    {
      id: 'DEM-3009',
      recycler: 'GreenLoop India',
      category: 'Printer',
      quantity: 10,
      price: '₹300–₹450',
      location: 'Faridabad',
      deadline: '20 Sep 2026',
      status: 'Open',
      match: '78%'
    },
    {
      id: 'DEM-3008',
      recycler: 'ReNew E-Waste Solutions',
      category: 'Monitor',
      quantity: 18,
      price: '₹250–₹400',
      location: 'Greater Noida',
      deadline: '22 Sep 2026',
      status: 'Closed',
      match: '75%'
    },
    {
      id: 'DEM-3007',
      recycler: 'EcoRecover India',
      category: 'Battery',
      quantity: 30,
      price: '₹180–₹320',
      location: 'Delhi',
      deadline: '24 Sep 2026',
      status: 'Expired',
      match: '71%'
    }
  ]

  const filteredDemands = demands.filter((demand) => {
    const text = search.toLowerCase()

    const matchesSearch =
      demand.id.toLowerCase().includes(text) ||
      demand.recycler.toLowerCase().includes(text) ||
      demand.category.toLowerCase().includes(text) ||
      demand.location.toLowerCase().includes(text)

    const matchesStatus =
      status === 'All' || demand.status === status

    return matchesSearch && matchesStatus
  })

  return (
    <div className="management-page">

      {/* HEADER */}

      <div className="page-title-row">
        <div>
          <h2>Demand Management</h2>
          <p>Monitor and manage e-waste demands posted by recyclers</p>
        </div>

        <button className="export-btn">
          ↓ Export Data
        </button>
      </div>

      {/* STATS */}

      <div className="management-stats">

        <div className="mini-stat">
          <div className="mini-icon green">⌁</div>
          <div>
            <span>Total Demands</span>
            <strong>642</strong>
          </div>
        </div>

        <div className="mini-stat">
          <div className="mini-icon blue">●</div>
          <div>
            <span>Open Demands</span>
            <strong>142</strong>
          </div>
        </div>

        <div className="mini-stat">
          <div className="mini-icon orange">◷</div>
          <div>
            <span>Closing Soon</span>
            <strong>27</strong>
          </div>
        </div>

        <div className="mini-stat">
          <div className="mini-icon purple">✓</div>
          <div>
            <span>Completed</span>
            <strong>473</strong>
          </div>
        </div>

      </div>

      {/* TABLE */}

      <div className="management-card">

        <div className="table-toolbar">

          <div className="search-box">
            <span>⌕</span>

            <input
              type="text"
              placeholder="Search demand, recycler, category or location..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option>All</option>
            <option>Open</option>
            <option>Closed</option>
            <option>Expired</option>
          </select>

        </div>

        <div className="table-wrapper">

          <table className="data-table">

            <thead>
              <tr>
                <th>Demand</th>
                <th>Recycler</th>
                <th>Category</th>
                <th>Quantity</th>
                <th>Price Range</th>
                <th>Location</th>
                <th>Deadline</th>
                <th>Status</th>
                <th>Match</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>

              {filteredDemands.map((demand) => (

                <tr key={demand.id}>

                  <td>
                    <div className="person-cell">
                      <div className="person-avatar">
                        ⌁
                      </div>

                      <div>
                        <strong>{demand.category} Demand</strong>
                        <small>{demand.id}</small>
                      </div>
                    </div>
                  </td>

                  <td>{demand.recycler}</td>

                  <td>
                    <span className="category-badge">
                      {demand.category}
                    </span>
                  </td>

                  <td>{demand.quantity}</td>

                  <td>{demand.price}</td>

                  <td>{demand.location}</td>

                  <td>{demand.deadline}</td>

                  <td>
                    <span
                      className={`status-badge ${demand.status.toLowerCase()}`}
                    >
                      {demand.status}
                    </span>
                  </td>

                  <td>
                    <span className="match-score">
                      {demand.match}
                    </span>
                  </td>

                  <td>
                    <button className="action-btn">
                      View
                    </button>
                  </td>

                </tr>

              ))}

            </tbody>

          </table>

          {filteredDemands.length === 0 && (
            <div className="empty-state">
              No demands found.
            </div>
          )}

        </div>

        <div className="table-footer">
          Showing {filteredDemands.length} of {demands.length} demands
        </div>

      </div>

    </div>
  )
}

export default Demands
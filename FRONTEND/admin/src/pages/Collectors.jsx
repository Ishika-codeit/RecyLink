import { useState } from 'react'

function Collectors() {
  const [search, setSearch] = useState('')
  const [status, setStatus] = useState('All')

  const collectors = [
    {
      id: 'COL-1024',
      name: 'Raj Kumar',
      phone: '+91 98XXXXXX42',
      location: 'Delhi NCR',
      collections: 18,
      waste: '248 kg',
      rating: '4.8',
      status: 'Active',
      joined: 'Jan 2026'
    },
    {
      id: 'COL-1025',
      name: 'Amit Sharma',
      phone: '+91 97XXXXXX18',
      location: 'Noida',
      collections: 14,
      waste: '192 kg',
      rating: '4.7',
      status: 'Active',
      joined: 'Feb 2026'
    },
    {
      id: 'COL-1026',
      name: 'Rahul Kumar',
      phone: '+91 96XXXXXX73',
      location: 'Ghaziabad',
      collections: 9,
      waste: '116 kg',
      rating: '4.5',
      status: 'Pending',
      joined: 'Mar 2026'
    },
    {
      id: 'COL-1027',
      name: 'Neha Singh',
      phone: '+91 95XXXXXX61',
      location: 'Faridabad',
      collections: 21,
      waste: '305 kg',
      rating: '4.9',
      status: 'Active',
      joined: 'Dec 2025'
    },
    {
      id: 'COL-1028',
      name: 'Suresh Verma',
      phone: '+91 94XXXXXX29',
      location: 'Delhi',
      collections: 6,
      waste: '78 kg',
      rating: '4.3',
      status: 'Inactive',
      joined: 'Apr 2026'
    },
    {
      id: 'COL-1029',
      name: 'Pooja Yadav',
      phone: '+91 93XXXXXX45',
      location: 'Greater Noida',
      collections: 11,
      waste: '143 kg',
      rating: '4.6',
      status: 'Active',
      joined: 'Feb 2026'
    }
  ]

  const filteredCollectors = collectors.filter((collector) => {
    const matchesSearch =
      collector.name.toLowerCase().includes(search.toLowerCase()) ||
      collector.id.toLowerCase().includes(search.toLowerCase()) ||
      collector.location.toLowerCase().includes(search.toLowerCase())

    const matchesStatus =
      status === 'All' || collector.status === status

    return matchesSearch && matchesStatus
  })

  return (
    <div className="management-page">

      <div className="page-title-row">
        <div>
          <h2>Collectors</h2>
          <p>Manage and monitor registered e-waste collectors</p>
        </div>

        <button className="export-btn">
          ↓ Export Data
        </button>
      </div>

      {/* SUMMARY */}

      <div className="management-stats">

        <div className="mini-stat">
          <div className="mini-icon green">♻</div>
          <div>
            <span>Total Collectors</span>
            <strong>1,248</strong>
          </div>
        </div>

        <div className="mini-stat">
          <div className="mini-icon blue">✓</div>
          <div>
            <span>Active</span>
            <strong>1,126</strong>
          </div>
        </div>

        <div className="mini-stat">
          <div className="mini-icon orange">!</div>
          <div>
            <span>Pending Verification</span>
            <strong>78</strong>
          </div>
        </div>

        <div className="mini-stat">
          <div className="mini-icon purple">◈</div>
          <div>
            <span>E-Waste Collected</span>
            <strong>18.6 T</strong>
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
              placeholder="Search collector, ID or location..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option>All</option>
            <option>Active</option>
            <option>Pending</option>
            <option>Inactive</option>
          </select>

        </div>

        <div className="table-wrapper">

          <table className="data-table">

            <thead>
              <tr>
                <th>Collector</th>
                <th>Location</th>
                <th>Collections</th>
                <th>E-Waste</th>
                <th>Rating</th>
                <th>Status</th>
                <th>Joined</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>

              {filteredCollectors.map((collector) => (

                <tr key={collector.id}>

                  <td>
                    <div className="person-cell">
                      <div className="person-avatar">
                        {collector.name.charAt(0)}
                      </div>

                      <div>
                        <strong>{collector.name}</strong>
                        <small>{collector.id}</small>
                      </div>
                    </div>
                  </td>

                  <td>{collector.location}</td>

                  <td>{collector.collections}</td>

                  <td>{collector.waste}</td>

                  <td>
                    <span className="rating">
                      ★ {collector.rating}
                    </span>
                  </td>

                  <td>
                    <span
                      className={`status-badge ${collector.status.toLowerCase()}`}
                    >
                      {collector.status}
                    </span>
                  </td>

                  <td>{collector.joined}</td>

                  <td>
                    <button className="action-btn">
                      View
                    </button>
                  </td>

                </tr>

              ))}

            </tbody>

          </table>

          {filteredCollectors.length === 0 && (
            <div className="empty-state">
              No collectors found.
            </div>
          )}

        </div>

        <div className="table-footer">
          Showing {filteredCollectors.length} of {collectors.length} collectors
        </div>

      </div>

    </div>
  )
}

export default Collectors
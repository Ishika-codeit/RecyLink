import { useState } from 'react'

function Collections() {
  const [search, setSearch] = useState('')
  const [status, setStatus] = useState('All')

  const collections = [
    {
      id: 'COLL-4082',
      collector: 'Raj Kumar',
      collectorId: 'COL-1024',
      recycler: 'EcoCycle Recycling',
      category: 'Laptop',
      quantity: 5,
      weight: '11.5 kg',
      amount: '₹2,900',
      location: 'Noida Sector 62',
      pickup: '05 Sep 2026',
      status: 'In Progress'
    },
    {
      id: 'COLL-4081',
      collector: 'Amit Sharma',
      collectorId: 'COL-1025',
      recycler: 'Clean Earth Recycling',
      category: 'Mobile',
      quantity: 20,
      weight: '8.2 kg',
      amount: '₹4,200',
      location: 'Delhi',
      pickup: '04 Sep 2026',
      status: 'Completed'
    },
    {
      id: 'COLL-4080',
      collector: 'Neha Singh',
      collectorId: 'COL-1027',
      recycler: 'GreenTech Recyclers',
      category: 'Desktop',
      quantity: 12,
      weight: '72 kg',
      amount: '₹5,040',
      location: 'Ghaziabad',
      pickup: '04 Sep 2026',
      status: 'Pending Pickup'
    },
    {
      id: 'COLL-4079',
      collector: 'Suresh Verma',
      collectorId: 'COL-1028',
      recycler: 'GreenLoop India',
      category: 'Printer',
      quantity: 8,
      weight: '38 kg',
      amount: '₹2,880',
      location: 'Faridabad',
      pickup: '03 Sep 2026',
      status: 'In Progress'
    },
    {
      id: 'COLL-4078',
      collector: 'Pooja Yadav',
      collectorId: 'COL-1029',
      recycler: 'EcoCycle Recycling',
      category: 'PCB',
      quantity: 25,
      weight: '16.5 kg',
      amount: '₹6,250',
      location: 'Greater Noida',
      pickup: '02 Sep 2026',
      status: 'Completed'
    },
    {
      id: 'COLL-4077',
      collector: 'Rahul Kumar',
      collectorId: 'COL-1026',
      recycler: 'ReNew E-Waste Solutions',
      category: 'Battery',
      quantity: 10,
      weight: '48 kg',
      amount: '₹2,400',
      location: 'Delhi',
      pickup: '01 Sep 2026',
      status: 'Pending Pickup'
    },
    {
      id: 'COLL-4076',
      collector: 'Amit Sharma',
      collectorId: 'COL-1025',
      recycler: 'GreenTech Recyclers',
      category: 'Monitor',
      quantity: 6,
      weight: '31 kg',
      amount: '₹2,520',
      location: 'Noida',
      pickup: '30 Aug 2026',
      status: 'Completed'
    }
  ]

  const filteredCollections = collections.filter((item) => {
    const text = search.toLowerCase()

    const matchesSearch =
      item.id.toLowerCase().includes(text) ||
      item.collector.toLowerCase().includes(text) ||
      item.recycler.toLowerCase().includes(text) ||
      item.category.toLowerCase().includes(text) ||
      item.location.toLowerCase().includes(text)

    const matchesStatus =
      status === 'All' || item.status === status

    return matchesSearch && matchesStatus
  })

  return (
    <div className="management-page">

      {/* HEADER */}

      <div className="page-title-row">
        <div>
          <h2>Collection Management</h2>
          <p>Track e-waste pickups and collection progress</p>
        </div>

        <button className="export-btn">
          ↓ Export Data
        </button>
      </div>

      {/* STATS */}

      <div className="management-stats">

        <div className="mini-stat">
          <div className="mini-icon green">↻</div>
          <div>
            <span>Total Collections</span>
            <strong>3,642</strong>
          </div>
        </div>

        <div className="mini-stat">
          <div className="mini-icon orange">◷</div>
          <div>
            <span>Pending Pickup</span>
            <strong>186</strong>
          </div>
        </div>

        <div className="mini-stat">
          <div className="mini-icon blue">↗</div>
          <div>
            <span>In Progress</span>
            <strong>428</strong>
          </div>
        </div>

        <div className="mini-stat">
          <div className="mini-icon purple">✓</div>
          <div>
            <span>Completed</span>
            <strong>3,028</strong>
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
              placeholder="Search collection, collector, recycler..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option>All</option>
            <option>Pending Pickup</option>
            <option>In Progress</option>
            <option>Completed</option>
          </select>

        </div>

        <div className="table-wrapper">

          <table className="data-table">

            <thead>
              <tr>
                <th>Collection</th>
                <th>Collector</th>
                <th>Recycler</th>
                <th>Category</th>
                <th>Qty.</th>
                <th>Weight</th>
                <th>Amount</th>
                <th>Pickup</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>

              {filteredCollections.map((item) => (

                <tr key={item.id}>

                  {/* COLLECTION */}

                  <td>
                    <div className="person-cell">

                      <div className="person-avatar">
                        ↻
                      </div>

                      <div>
                        <strong>{item.id}</strong>
                        <small>{item.location}</small>
                      </div>

                    </div>
                  </td>

                  {/* COLLECTOR */}

                  <td>
                    <div>
                      <strong>{item.collector}</strong>
                      <small>{item.collectorId}</small>
                    </div>
                  </td>

                  {/* RECYCLER */}

                  <td>{item.recycler}</td>

                  {/* CATEGORY */}

                  <td>
                    <span className="category-badge">
                      {item.category}
                    </span>
                  </td>

                  {/* QUANTITY */}

                  <td>{item.quantity}</td>

                  {/* WEIGHT */}

                  <td>{item.weight}</td>

                  {/* AMOUNT */}

                  <td>
                    <strong className="amount-text">
                      {item.amount}
                    </strong>
                  </td>

                  {/* PICKUP */}

                  <td>{item.pickup}</td>

                  {/* STATUS */}

                  <td>
                    <span
                      className={`status-badge ${item.status
                        .toLowerCase()
                        .replaceAll(' ', '-')}`}
                    >
                      {item.status}
                    </span>
                  </td>

                  {/* ACTION */}

                  <td>
                    <button className="action-btn">
                      View
                    </button>
                  </td>

                </tr>

              ))}

            </tbody>

          </table>

          {filteredCollections.length === 0 && (
            <div className="empty-state">
              No collections found.
            </div>
          )}

        </div>

        <div className="table-footer">
          Showing {filteredCollections.length} of {collections.length} collections
        </div>

      </div>

    </div>
  )
}

export default Collections
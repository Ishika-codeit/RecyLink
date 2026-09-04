import { useState } from 'react'

function EWaste() {
  const [search, setSearch] = useState('')
  const [status, setStatus] = useState('All')
  const [category, setCategory] = useState('All')

  const submissions = [
    {
      id: 'EW-2048',
      collector: 'Raj Kumar',
      category: 'Laptop',
      item: 'Dell Latitude Laptop',
      quantity: 5,
      weight: '11.5 kg',
      ai: 'Repair / Refurbish',
      confidence: '87%',
      recycler: 'EcoCycle Recycling',
      status: 'In Progress',
      date: '04 Sep 2026'
    },
    {
      id: 'EW-2047',
      collector: 'Amit Sharma',
      category: 'Mobile',
      item: 'Smartphones',
      quantity: 20,
      weight: '8.2 kg',
      ai: 'Recycle',
      confidence: '91%',
      recycler: 'Clean Earth Recycling',
      status: 'Completed',
      date: '03 Sep 2026'
    },
    {
      id: 'EW-2046',
      collector: 'Neha Singh',
      category: 'Desktop',
      item: 'Desktop Computers',
      quantity: 12,
      weight: '72 kg',
      ai: 'Needs Inspection',
      confidence: '68%',
      recycler: 'GreenTech Recyclers',
      status: 'Pending',
      date: '03 Sep 2026'
    },
    {
      id: 'EW-2045',
      collector: 'Suresh Verma',
      category: 'Printer',
      item: 'Laser Printers',
      quantity: 8,
      weight: '38 kg',
      ai: 'Repair / Refurbish',
      confidence: '82%',
      recycler: 'GreenLoop India',
      status: 'In Progress',
      date: '02 Sep 2026'
    },
    {
      id: 'EW-2044',
      collector: 'Pooja Yadav',
      category: 'PCB',
      item: 'Electronic PCB Boards',
      quantity: 25,
      weight: '16.5 kg',
      ai: 'Recycle',
      confidence: '95%',
      recycler: 'EcoCycle Recycling',
      status: 'Completed',
      date: '01 Sep 2026'
    },
    {
      id: 'EW-2043',
      collector: 'Rahul Kumar',
      category: 'Battery',
      item: 'UPS Batteries',
      quantity: 10,
      weight: '48 kg',
      ai: 'Needs Inspection',
      confidence: '64%',
      recycler: 'ReNew E-Waste Solutions',
      status: 'Pending',
      date: '31 Aug 2026'
    },
    {
      id: 'EW-2042',
      collector: 'Amit Sharma',
      category: 'Monitor',
      item: 'LED Monitors',
      quantity: 6,
      weight: '31 kg',
      ai: 'Repair / Refurbish',
      confidence: '79%',
      recycler: 'GreenTech Recyclers',
      status: 'Completed',
      date: '30 Aug 2026'
    }
  ]

  const filteredSubmissions = submissions.filter((item) => {
    const searchText = search.toLowerCase()

    const matchesSearch =
      item.id.toLowerCase().includes(searchText) ||
      item.collector.toLowerCase().includes(searchText) ||
      item.item.toLowerCase().includes(searchText) ||
      item.recycler.toLowerCase().includes(searchText)

    const matchesStatus =
      status === 'All' || item.status === status

    const matchesCategory =
      category === 'All' || item.category === category

    return matchesSearch && matchesStatus && matchesCategory
  })

  return (
    <div className="management-page">

      {/* PAGE HEADER */}

      <div className="page-title-row">
        <div>
          <h2>E-Waste Management</h2>
          <p>Monitor all e-waste submissions across the RecyLink platform</p>
        </div>

        <button className="export-btn">
          ↓ Export Data
        </button>
      </div>

      {/* SUMMARY */}

      <div className="management-stats">

        <div className="mini-stat">
          <div className="mini-icon green">◈</div>
          <div>
            <span>Total Submissions</span>
            <strong>3,642</strong>
          </div>
        </div>

        <div className="mini-stat">
          <div className="mini-icon orange">!</div>
          <div>
            <span>Pending Assessment</span>
            <strong>186</strong>
          </div>
        </div>

        <div className="mini-stat">
          <div className="mini-icon blue">↻</div>
          <div>
            <span>In Progress</span>
            <strong>428</strong>
          </div>
        </div>

        <div className="mini-stat">
          <div className="mini-icon purple">✓</div>
          <div>
            <span>Processed</span>
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
              placeholder="Search ID, collector, item or recycler..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div className="table-filters">

            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option>All</option>
              <option>Laptop</option>
              <option>Mobile</option>
              <option>Desktop</option>
              <option>Printer</option>
              <option>PCB</option>
              <option>Battery</option>
              <option>Monitor</option>
            </select>

            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option>All</option>
              <option>Pending</option>
              <option>In Progress</option>
              <option>Completed</option>
            </select>

          </div>

        </div>

        <div className="table-wrapper">

          <table className="data-table">

            <thead>
              <tr>
                <th>Submission</th>
                <th>Collector</th>
                <th>Category</th>
                <th>Quantity</th>
                <th>Weight</th>
                <th>AI Recommendation</th>
                <th>Recycler</th>
                <th>Status</th>
                <th>Date</th>
              </tr>
            </thead>

            <tbody>

              {filteredSubmissions.map((item) => (

                <tr key={item.id}>

                  <td>
                    <div className="person-cell">
                      <div className="person-avatar">
                        ◈
                      </div>

                      <div>
                        <strong>{item.item}</strong>
                        <small>{item.id}</small>
                      </div>
                    </div>
                  </td>

                  <td>{item.collector}</td>

                  <td>
                    <span className="category-badge">
                      {item.category}
                    </span>
                  </td>

                  <td>{item.quantity}</td>

                  <td>{item.weight}</td>

                  <td>
                    <div className="ai-result">
                      <strong>{item.ai}</strong>
                      <small>{item.confidence} confidence</small>
                    </div>
                  </td>

                  <td>{item.recycler}</td>

                  <td>
                    <span
                      className={`status-badge ${item.status
                        .toLowerCase()
                        .replace(' ', '-')}`}
                    >
                      {item.status}
                    </span>
                  </td>

                  <td>{item.date}</td>

                </tr>

              ))}

            </tbody>

          </table>

          {filteredSubmissions.length === 0 && (
            <div className="empty-state">
              No e-waste submissions found.
            </div>
          )}

        </div>

        <div className="table-footer">
          Showing {filteredSubmissions.length} of {submissions.length} submissions
        </div>

      </div>

    </div>
  )
}

export default EWaste
import { useEffect, useMemo, useState } from 'react'

function Collectors() {
  const [search, setSearch] = useState('')
  const [status, setStatus] = useState('All')

  const [waste, setWaste] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchCollectors = async () => {
      try {
        setLoading(true)

        const response = await fetch(
          'https://recylink-zt6e.onrender.com/api/waste'
        )

        const result = await response.json()

        if (!response.ok) {
          throw new Error(
            result.message ||
            'Failed to fetch collector data'
          )
        }

        setWaste(result.wastes || [])

      } catch (err) {
        console.error(
          'Fetch Collectors Error:',
          err
        )

        setError(
          err.message ||
          'Unable to load collectors'
        )
      } finally {
        setLoading(false)
      }
    }

    fetchCollectors()
  }, [])


  /* -----------------------------
     BUILD COLLECTORS FROM WASTE
  ----------------------------- */

  const collectors = useMemo(() => {
    const collectorMap = {}

    waste.forEach((item) => {
      const name =
        item.collectorName ||
        'Unknown Collector'

      if (!collectorMap[name]) {
        collectorMap[name] = {
          id: `COL-${String(
            Object.keys(collectorMap).length + 1
          ).padStart(4, '0')}`,

          name,

          phone: 'Not available',

          location:
            item.location ||
            'N/A',

          collections: 0,

          waste: 0,

          rating: '—',

          status: 'Active',

          joined:
            item.createdAt
              ? new Date(
                  item.createdAt
                ).toLocaleDateString(
                  'en-IN',
                  {
                    month: 'short',
                    year: 'numeric',
                  }
                )
              : '—',
        }
      }

      collectorMap[name].collections += 1

      collectorMap[name].waste +=
        Number(item.quantity) || 0

      // Keep the latest known location
      if (item.location) {
        collectorMap[name].location =
          item.location
      }
    })

    return Object.values(
      collectorMap
    ).map((collector) => ({
      ...collector,

      waste:
        `${collector.waste} units`,
    }))

  }, [waste])


  /* -----------------------------
     FILTER
  ----------------------------- */

  const filteredCollectors =
    collectors.filter((collector) => {

      const searchValue =
        search.toLowerCase()

      const matchesSearch =
        collector.name
          .toLowerCase()
          .includes(searchValue) ||

        collector.id
          .toLowerCase()
          .includes(searchValue) ||

        collector.location
          .toLowerCase()
          .includes(searchValue)

      const matchesStatus =
        status === 'All' ||
        collector.status === status

      return (
        matchesSearch &&
        matchesStatus
      )
    })


  /* -----------------------------
     SUMMARY STATS
  ----------------------------- */

  const totalCollectors =
    collectors.length

  const activeCollectors =
    collectors.filter(
      (collector) =>
        collector.status === 'Active'
    ).length

  const pendingCollectors =
    collectors.filter(
      (collector) =>
        collector.status === 'Pending'
    ).length

  const totalWaste =
    waste.reduce(
      (total, item) =>
        total +
        (Number(item.quantity) || 0),
      0
    )


  return (
    <div className="management-page">

      <div className="page-title-row">

        <div>

          <h2>
            Collectors
          </h2>

          <p>
            Manage and monitor registered
            e-waste collectors
          </p>

        </div>

        <button className="export-btn">
          ↓ Export Data
        </button>

      </div>


      {/* ERROR */}

      {error && (

        <div className="offer-info">

          <span>
            ⚠️
          </span>

          <div>

            <strong>
              Unable to load collectors
            </strong>

            <p>
              {error}
            </p>

          </div>

        </div>

      )}


      {/* SUMMARY */}

      <div className="management-stats">

        <div className="mini-stat">

          <div className="mini-icon green">
            ♻
          </div>

          <div>

            <span>
              Total Collectors
            </span>

            <strong>
              {loading
                ? '—'
                : totalCollectors}
            </strong>

          </div>

        </div>


        <div className="mini-stat">

          <div className="mini-icon blue">
            ✓
          </div>

          <div>

            <span>
              Active
            </span>

            <strong>
              {loading
                ? '—'
                : activeCollectors}
            </strong>

          </div>

        </div>


        <div className="mini-stat">

          <div className="mini-icon orange">
            !
          </div>

          <div>

            <span>
              Pending Verification
            </span>

            <strong>
              {loading
                ? '—'
                : pendingCollectors}
            </strong>

          </div>

        </div>


        <div className="mini-stat">

          <div className="mini-icon purple">
            ◈
          </div>

          <div>

            <span>
              E-Waste Collected
            </span>

            <strong>
              {loading
                ? '—'
                : `${totalWaste} units`}
            </strong>

          </div>

        </div>

      </div>


      {/* TABLE */}

      <div className="management-card">

        <div className="table-toolbar">

          <div className="search-box">

            <span>
              ⌕
            </span>

            <input
              type="text"
              placeholder="Search collector, ID or location..."
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
            />

          </div>


          <select
            value={status}
            onChange={(e) =>
              setStatus(e.target.value)
            }
          >

            <option>
              All
            </option>

            <option>
              Active
            </option>

            <option>
              Pending
            </option>

            <option>
              Inactive
            </option>

          </select>

        </div>


        <div className="table-wrapper">

          <table className="data-table">

            <thead>

              <tr>

                <th>
                  Collector
                </th>

                <th>
                  Location
                </th>

                <th>
                  Collections
                </th>

                <th>
                  E-Waste
                </th>

                <th>
                  Rating
                </th>

                <th>
                  Status
                </th>

                <th>
                  Joined
                </th>

                <th>
                  Action
                </th>

              </tr>

            </thead>


            <tbody>

              {loading ? (

                <tr>

                  <td
                    colSpan="8"
                    style={{
                      textAlign: 'center',
                      padding: '30px',
                    }}
                  >
                    Loading collectors...
                  </td>

                </tr>

              ) : (

                filteredCollectors.map(
                  (collector) => (

                    <tr
                      key={collector.id}
                    >

                      <td>

                        <div className="person-cell">

                          <div className="person-avatar">

                            {collector.name
                              .charAt(0)
                              .toUpperCase()}

                          </div>


                          <div>

                            <strong>
                              {collector.name}
                            </strong>

                            <small>
                              {collector.id}
                            </small>

                          </div>

                        </div>

                      </td>


                      <td>
                        {collector.location}
                      </td>


                      <td>
                        {collector.collections}
                      </td>


                      <td>
                        {collector.waste}
                      </td>


                      <td>

                        <span className="rating">

                          ★{' '}
                          {collector.rating}

                        </span>

                      </td>


                      <td>

                        <span
                          className={`status-badge ${collector.status.toLowerCase()}`}
                        >
                          {collector.status}
                        </span>

                      </td>


                      <td>
                        {collector.joined}
                      </td>


                      <td>

                        <button className="action-btn">
                          View
                        </button>

                      </td>

                    </tr>

                  )
                )

              )}

            </tbody>

          </table>


          {!loading &&
            filteredCollectors.length === 0 && (

              <div className="empty-state">
                No collectors found.
              </div>

            )}

        </div>


        <div className="table-footer">

          Showing{' '}
          {filteredCollectors.length}{' '}
          of{' '}
          {collectors.length}{' '}
          collectors

        </div>

      </div>

    </div>
  )
}

export default Collectors
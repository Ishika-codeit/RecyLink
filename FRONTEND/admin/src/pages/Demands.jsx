import { useEffect, useMemo, useState } from 'react'

function Demands() {
  const [search, setSearch] = useState('')
  const [status, setStatus] = useState('All')

  const [demands, setDemands] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchDemands = async () => {
      try {
        setLoading(true)
        setError('')

        const response = await fetch(
          'https://recylink-zt6e.onrender.com/api/demands'
        )

        const result = await response.json()

        if (!response.ok) {
          throw new Error(
            result.message ||
            'Failed to fetch demands'
          )
        }

        setDemands(
          result.demands || []
        )

      } catch (err) {
        console.error(
          'Fetch Demands Error:',
          err
        )

        setError(
          err.message ||
          'Unable to load demands.'
        )
      } finally {
        setLoading(false)
      }
    }

    fetchDemands()
  }, [])


  /* -----------------------------
     FORMAT BACKEND DEMANDS
  ----------------------------- */

  const formattedDemands = useMemo(() => {
    return demands.map(
      (demand, index) => {

        const deadline =
          demand.deadline
            ? new Date(
                demand.deadline
              )
            : null

        let demandStatus = 'Open'

        if (
          deadline &&
          deadline < new Date()
        ) {
          demandStatus = 'Expired'
        }

        return {
          id:
            demand._id
              ? `DEM-${demand._id
                  .slice(-6)
                  .toUpperCase()}`
              : `DEM-${index + 1}`,

          recycler:
            demand.recyclerName ||
            'Verified Recycler',

          category:
            demand.wasteType ||
            'E-Waste',

          quantity:
            Number(demand.quantity) ||
            0,

          price:
            `₹${Number(
              demand.minPrice || 0
            ).toLocaleString('en-IN')}–₹${Number(
              demand.maxPrice || 0
            ).toLocaleString('en-IN')}`,

          location:
            demand.location ||
            'N/A',

          deadline:
            deadline
              ? deadline.toLocaleDateString(
                  'en-IN',
                  {
                    day: '2-digit',
                    month: 'short',
                    year: 'numeric',
                  }
                )
              : '—',

          status:
            demand.status ||
            demandStatus,

          match: '—',

          condition:
            demand.condition ||
            'Any Condition',

          description:
            demand.description ||
            '',
        }
      }
    )
  }, [demands])


  /* -----------------------------
     FILTER
  ----------------------------- */

  const filteredDemands =
    formattedDemands.filter(
      (demand) => {

        const text =
          search.toLowerCase()

        const matchesSearch =
          demand.id
            .toLowerCase()
            .includes(text) ||

          demand.recycler
            .toLowerCase()
            .includes(text) ||

          demand.category
            .toLowerCase()
            .includes(text) ||

          demand.location
            .toLowerCase()
            .includes(text)

        const matchesStatus =
          status === 'All' ||
          demand.status === status

        return (
          matchesSearch &&
          matchesStatus
        )
      }
    )


  /* -----------------------------
     SUMMARY
  ----------------------------- */

  const totalDemands =
    formattedDemands.length

  const openDemands =
    formattedDemands.filter(
      (demand) =>
        demand.status === 'Open'
    ).length

  const closingSoon =
    formattedDemands.filter(
      (demand) => {

        if (!demand.deadline) {
          return false
        }

        const deadline =
          new Date(
            demands.find(
              (item) =>
                item._id &&
                `DEM-${item._id
                  .slice(-6)
                  .toUpperCase()}` ===
                  demand.id
            )?.deadline
          )

        const now =
          new Date()

        const difference =
          deadline.getTime() -
          now.getTime()

        const days =
          difference /
          (1000 * 60 * 60 * 24)

        return (
          demand.status === 'Open' &&
          days >= 0 &&
          days <= 3
        )
      }
    ).length

  const completed =
    formattedDemands.filter(
      (demand) =>
        demand.status === 'Completed' ||
        demand.status === 'Closed'
    ).length


  return (
    <div className="management-page">

      {/* HEADER */}

      <div className="page-title-row">

        <div>

          <h2>
            Demand Management
          </h2>

          <p>
            Monitor and manage e-waste
            demands posted by recyclers
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
              Unable to load demands
            </strong>

            <p>
              {error}
            </p>

          </div>

        </div>

      )}


      {/* STATS */}

      <div className="management-stats">

        <div className="mini-stat">

          <div className="mini-icon green">
            ⌁
          </div>

          <div>

            <span>
              Total Demands
            </span>

            <strong>
              {loading
                ? '—'
                : totalDemands}
            </strong>

          </div>

        </div>


        <div className="mini-stat">

          <div className="mini-icon blue">
            ●
          </div>

          <div>

            <span>
              Open Demands
            </span>

            <strong>
              {loading
                ? '—'
                : openDemands}
            </strong>

          </div>

        </div>


        <div className="mini-stat">

          <div className="mini-icon orange">
            ◷
          </div>

          <div>

            <span>
              Closing Soon
            </span>

            <strong>
              {loading
                ? '—'
                : closingSoon}
            </strong>

          </div>

        </div>


        <div className="mini-stat">

          <div className="mini-icon purple">
            ✓
          </div>

          <div>

            <span>
              Completed
            </span>

            <strong>
              {loading
                ? '—'
                : completed}
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
              placeholder="Search demand, recycler, category or location..."
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
              Open
            </option>

            <option>
              Closed
            </option>

            <option>
              Expired
            </option>

            <option>
              Completed
            </option>

          </select>

        </div>


        <div className="table-wrapper">

          <table className="data-table">

            <thead>

              <tr>

                <th>
                  Demand
                </th>

                <th>
                  Recycler
                </th>

                <th>
                  Category
                </th>

                <th>
                  Quantity
                </th>

                <th>
                  Price Range
                </th>

                <th>
                  Location
                </th>

                <th>
                  Deadline
                </th>

                <th>
                  Status
                </th>

                <th>
                  Match
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
                    colSpan="10"
                    style={{
                      textAlign:
                        'center',
                      padding:
                        '30px',
                    }}
                  >
                    Loading demands...
                  </td>

                </tr>

              ) : (

                filteredDemands.map(
                  (demand) => (

                    <tr
                      key={demand.id}
                    >

                      <td>

                        <div className="person-cell">

                          <div className="person-avatar">
                            ⌁
                          </div>

                          <div>

                            <strong>
                              {demand.category}{' '}
                              Demand
                            </strong>

                            <small>
                              {demand.id}
                            </small>

                          </div>

                        </div>

                      </td>


                      <td>
                        {demand.recycler}
                      </td>


                      <td>

                        <span className="category-badge">
                          {demand.category}
                        </span>

                      </td>


                      <td>
                        {demand.quantity}
                      </td>


                      <td>
                        {demand.price}
                      </td>


                      <td>
                        {demand.location}
                      </td>


                      <td>
                        {demand.deadline}
                      </td>


                      <td>

                        <span
                          className={`status-badge ${demand.status
                            .toLowerCase()
                            .replaceAll(
                              ' ',
                              '-'
                            )}`}
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

                  )
                )

              )}

            </tbody>

          </table>


          {!loading &&
            filteredDemands.length === 0 && (

              <div className="empty-state">
                No demands found.
              </div>

            )}

        </div>


        <div className="table-footer">

          Showing{' '}
          {filteredDemands.length}{' '}
          of{' '}
          {formattedDemands.length}{' '}
          demands

        </div>

      </div>

    </div>
  )
}

export default Demands
import { useEffect, useMemo, useState } from 'react'

function Collections() {
  const [search, setSearch] = useState('')
  const [status, setStatus] = useState('All')

  const [collections, setCollections] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchCollections = async () => {
      try {
        setLoading(true)
        setError('')

        const [wasteResponse, quotesResponse] =
          await Promise.all([
            fetch('https://recylink-zt6e.onrender.com/api/waste'),
            fetch('https://recylink-zt6e.onrender.com/api/quotes'),
          ])

        const wasteResult =
          await wasteResponse.json()

        const quotesResult =
          await quotesResponse.json()

        if (!wasteResponse.ok) {
          throw new Error(
            wasteResult.message ||
              'Failed to fetch e-waste'
          )
        }

        if (!quotesResponse.ok) {
          throw new Error(
            quotesResult.message ||
              'Failed to fetch quotes'
          )
        }

        const wastes =
          wasteResult.wastes || []

        const quotes =
          quotesResult.quotes || []

        /*
          A collection is created from an
          accepted quote.
        */
        const selectedQuotes =
          quotes.filter(
            (quote) =>
              quote.status === 'SELECTED'
          )

        const formattedCollections =
          selectedQuotes.map(
            (quote, index) => {

              const selectedWaste =
                wastes.find(
                  (item) =>
                    item._id ===
                    String(
                      quote.wasteId?._id ||
                        quote.wasteId
                    )
                )

              return {
                id:
                  `COLL-${String(
                    index + 1
                  ).padStart(4, '0')}`,

                collector:
                  selectedWaste?.collectorName ||
                  quote.collectorId ||
                  'Unknown Collector',

                collectorId:
                  quote.collectorId ||
                  'Collector',

                recycler:
                  quote.recyclerName ||
                  'Verified Recycler',

                category:
                  selectedWaste?.category ||
                  selectedWaste?.wasteType ||
                  'E-Waste',

                quantity:
                  Number(
                    quote.quantity ||
                      selectedWaste?.quantity ||
                      0
                  ),

                weight:
                  'Not provided',

                amount:
                  `₹${Number(
                    quote.amount || 0
                  ).toLocaleString(
                    'en-IN'
                  )}`,

                location:
                  selectedWaste?.location ||
                  'N/A',

                pickup:
                  quote.createdAt
                    ? new Date(
                        quote.createdAt
                      ).toLocaleDateString(
                        'en-IN',
                        {
                          day: '2-digit',
                          month: 'short',
                          year: 'numeric',
                        }
                      )
                    : '—',

                status:
                  'Pending Pickup',

                wasteId:
                  selectedWaste?._id ||
                  quote.wasteId,
              }
            }
          )

        setCollections(
          formattedCollections
        )

      } catch (err) {
        console.error(
          'Fetch Collections Error:',
          err
        )

        setError(
          err.message ||
            'Unable to load collections.'
        )
      } finally {
        setLoading(false)
      }
    }

    fetchCollections()
  }, [])


  /* -----------------------------
     FILTER
  ----------------------------- */

  const filteredCollections =
    collections.filter((item) => {

      const text =
        search.toLowerCase()

      const matchesSearch =
        item.id
          .toLowerCase()
          .includes(text) ||

        item.collector
          .toLowerCase()
          .includes(text) ||

        item.recycler
          .toLowerCase()
          .includes(text) ||

        item.category
          .toLowerCase()
          .includes(text) ||

        item.location
          .toLowerCase()
          .includes(text)

      const matchesStatus =
        status === 'All' ||
        item.status === status

      return (
        matchesSearch &&
        matchesStatus
      )
    })


  /* -----------------------------
     STATS
  ----------------------------- */

  const totalCollections =
    collections.length

  const pendingPickup =
    collections.filter(
      (item) =>
        item.status ===
        'Pending Pickup'
    ).length

  const inProgress =
    collections.filter(
      (item) =>
        item.status ===
        'In Progress'
    ).length

  const completed =
    collections.filter(
      (item) =>
        item.status ===
        'Completed'
    ).length


  return (
    <div className="management-page">

      {/* HEADER */}

      <div className="page-title-row">

        <div>

          <h2>
            Collection Management
          </h2>

          <p>
            Track e-waste pickups and
            collection progress
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
              Unable to load collections
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
            ↻
          </div>

          <div>

            <span>
              Total Collections
            </span>

            <strong>
              {loading
                ? '—'
                : totalCollections}
            </strong>

          </div>

        </div>


        <div className="mini-stat">

          <div className="mini-icon orange">
            ◷
          </div>

          <div>

            <span>
              Pending Pickup
            </span>

            <strong>
              {loading
                ? '—'
                : pendingPickup}
            </strong>

          </div>

        </div>


        <div className="mini-stat">

          <div className="mini-icon blue">
            ↗
          </div>

          <div>

            <span>
              In Progress
            </span>

            <strong>
              {loading
                ? '—'
                : inProgress}
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
              placeholder="Search collection, collector, recycler..."
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
              Pending Pickup
            </option>

            <option>
              In Progress
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
                  Collection
                </th>

                <th>
                  Collector
                </th>

                <th>
                  Recycler
                </th>

                <th>
                  Category
                </th>

                <th>
                  Qty.
                </th>

                <th>
                  Weight
                </th>

                <th>
                  Amount
                </th>

                <th>
                  Pickup
                </th>

                <th>
                  Status
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
                    Loading collections...
                  </td>

                </tr>

              ) : (

                filteredCollections.map(
                  (item) => (

                    <tr
                      key={item.id}
                    >

                      {/* COLLECTION */}

                      <td>

                        <div className="person-cell">

                          <div className="person-avatar">
                            ↻
                          </div>

                          <div>

                            <strong>
                              {item.id}
                            </strong>

                            <small>
                              {item.location}
                            </small>

                          </div>

                        </div>

                      </td>


                      {/* COLLECTOR */}

                      <td>

                        <div>

                          <strong>
                            {item.collector}
                          </strong>

                          <small>
                            {item.collectorId}
                          </small>

                        </div>

                      </td>


                      {/* RECYCLER */}

                      <td>
                        {item.recycler}
                      </td>


                      {/* CATEGORY */}

                      <td>

                        <span className="category-badge">
                          {item.category}
                        </span>

                      </td>


                      {/* QUANTITY */}

                      <td>
                        {item.quantity}
                      </td>


                      {/* WEIGHT */}

                      <td>
                        {item.weight}
                      </td>


                      {/* AMOUNT */}

                      <td>

                        <strong className="amount-text">
                          {item.amount}
                        </strong>

                      </td>


                      {/* PICKUP */}

                      <td>
                        {item.pickup}
                      </td>


                      {/* STATUS */}

                      <td>

                        <span
                          className={`status-badge ${item.status
                            .toLowerCase()
                            .replaceAll(
                              ' ',
                              '-'
                            )}`}
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

                  )
                )

              )}

            </tbody>

          </table>


          {!loading &&
            filteredCollections.length ===
              0 && (

              <div className="empty-state">

                No collections found.

              </div>

            )}

        </div>


        <div className="table-footer">

          Showing{' '}
          {filteredCollections.length}{' '}
          of{' '}
          {collections.length}{' '}
          collections

        </div>

      </div>

    </div>
  )
}

export default Collections
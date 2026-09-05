import { useEffect, useMemo, useState } from 'react'

function EWaste() {
  const [search, setSearch] = useState('')
  const [status, setStatus] = useState('All')
  const [category, setCategory] = useState('All')

  const [waste, setWaste] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchEWaste = async () => {
      try {
        setLoading(true)
        setError('')

        const response = await fetch(
          'http://localhost:5000/api/waste'
        )

        const result = await response.json()

        if (!response.ok) {
          throw new Error(
            result.message ||
            'Failed to fetch e-waste'
          )
        }

        setWaste(result.wastes || [])

      } catch (err) {
        console.error(
          'Fetch E-Waste Error:',
          err
        )

        setError(
          err.message ||
          'Unable to load e-waste submissions.'
        )
      } finally {
        setLoading(false)
      }
    }

    fetchEWaste()
  }, [])


  /* -----------------------------
     FORMAT BACKEND DATA
  ----------------------------- */

  const submissions = useMemo(() => {
    return waste.map((item, index) => {
      const recommendation =
        item.recommendation
          ? item.recommendation.replaceAll(
              '_',
              ' '
            )
          : 'Pending'

      let statusValue = 'Pending'

      if (
        item.recommendation ===
        'REFURBISH'
      ) {
        statusValue = 'In Progress'
      } else if (
        item.recommendation ===
        'RECYCLE'
      ) {
        statusValue = 'Completed'
      }

      return {
        id:
          item._id
            ? `EW-${item._id
                .slice(-6)
                .toUpperCase()}`
            : `EW-${index + 1}`,

        collector:
          item.collectorName ||
          'Unknown Collector',

        category:
          item.category ||
          item.wasteType ||
          'E-Waste',

        item:
          item.category ||
          item.wasteType ||
          'E-Waste',

        quantity:
          Number(item.quantity) || 0,

        weight:
          'Not provided',

        ai:
          recommendation,

        confidence:
          item.classificationConfidence
            ? `${Math.round(
                item.classificationConfidence *
                  100
              )}%`
            : 'N/A',

        recycler:
          'Not assigned',

        status:
          statusValue,

        date:
          item.createdAt
            ? new Date(
                item.createdAt
              ).toLocaleDateString(
                'en-IN',
                {
                  day: '2-digit',
                  month: 'short',
                  year: 'numeric',
                }
              )
            : '—',
      }
    })
  }, [waste])


  /* -----------------------------
     CATEGORY OPTIONS
  ----------------------------- */

  const categoryOptions = useMemo(() => {
    const categories = new Set()

    submissions.forEach((item) => {
      categories.add(item.category)
    })

    return [
      'All',
      ...Array.from(categories),
    ]
  }, [submissions])


  /* -----------------------------
     FILTER
  ----------------------------- */

  const filteredSubmissions =
    submissions.filter((item) => {

      const searchText =
        search.toLowerCase()

      const matchesSearch =
        item.id
          .toLowerCase()
          .includes(searchText) ||

        item.collector
          .toLowerCase()
          .includes(searchText) ||

        item.item
          .toLowerCase()
          .includes(searchText) ||

        item.recycler
          .toLowerCase()
          .includes(searchText)

      const matchesStatus =
        status === 'All' ||
        item.status === status

      const matchesCategory =
        category === 'All' ||
        item.category === category

      return (
        matchesSearch &&
        matchesStatus &&
        matchesCategory
      )
    })


  /* -----------------------------
     SUMMARY
  ----------------------------- */

  const totalSubmissions =
    submissions.length

  const pendingAssessment =
    submissions.filter(
      (item) =>
        item.ai === 'Pending'
    ).length

  const inProgress =
    submissions.filter(
      (item) =>
        item.status ===
        'In Progress'
    ).length

  const processed =
    submissions.filter(
      (item) =>
        item.status ===
          'Completed' ||
        item.status ===
          'In Progress'
    ).length


  return (
    <div className="management-page">

      {/* PAGE HEADER */}

      <div className="page-title-row">

        <div>

          <h2>
            E-Waste Management
          </h2>

          <p>
            Monitor all e-waste submissions
            across the RecyLink platform
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
              Unable to load e-waste
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
            ◈
          </div>

          <div>

            <span>
              Total Submissions
            </span>

            <strong>
              {loading
                ? '—'
                : totalSubmissions}
            </strong>

          </div>

        </div>


        <div className="mini-stat">

          <div className="mini-icon orange">
            !
          </div>

          <div>

            <span>
              Pending Assessment
            </span>

            <strong>
              {loading
                ? '—'
                : pendingAssessment}
            </strong>

          </div>

        </div>


        <div className="mini-stat">

          <div className="mini-icon blue">
            ↻
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
              Processed
            </span>

            <strong>
              {loading
                ? '—'
                : processed}
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
              placeholder="Search ID, collector, item or recycler..."
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
            />

          </div>


          <div className="table-filters">

            <select
              value={category}
              onChange={(e) =>
                setCategory(e.target.value)
              }
            >

              {categoryOptions.map(
                (option) => (
                  <option
                    key={option}
                    value={option}
                  >
                    {option}
                  </option>
                )
              )}

            </select>


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
                Pending
              </option>

              <option>
                In Progress
              </option>

              <option>
                Completed
              </option>

            </select>

          </div>

        </div>


        <div className="table-wrapper">

          <table className="data-table">

            <thead>

              <tr>

                <th>
                  Submission
                </th>

                <th>
                  Collector
                </th>

                <th>
                  Category
                </th>

                <th>
                  Quantity
                </th>

                <th>
                  Weight
                </th>

                <th>
                  AI Recommendation
                </th>

                <th>
                  Recycler
                </th>

                <th>
                  Status
                </th>

                <th>
                  Date
                </th>

              </tr>

            </thead>


            <tbody>

              {loading ? (

                <tr>

                  <td
                    colSpan="9"
                    style={{
                      textAlign:
                        'center',
                      padding:
                        '30px',
                    }}
                  >
                    Loading e-waste
                    submissions...
                  </td>

                </tr>

              ) : (

                filteredSubmissions.map(
                  (item) => (

                    <tr
                      key={item.id}
                    >

                      <td>

                        <div className="person-cell">

                          <div className="person-avatar">
                            ◈
                          </div>

                          <div>

                            <strong>
                              {item.item}
                            </strong>

                            <small>
                              {item.id}
                            </small>

                          </div>

                        </div>

                      </td>


                      <td>
                        {item.collector}
                      </td>


                      <td>

                        <span className="category-badge">
                          {item.category}
                        </span>

                      </td>


                      <td>
                        {item.quantity}
                      </td>


                      <td>
                        {item.weight}
                      </td>


                      <td>

                        <div className="ai-result">

                          <strong>
                            {item.ai}
                          </strong>

                          <small>
                            {item.confidence}{' '}
                            confidence
                          </small>

                        </div>

                      </td>


                      <td>
                        {item.recycler}
                      </td>


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


                      <td>
                        {item.date}
                      </td>

                    </tr>

                  )
                )

              )}

            </tbody>

          </table>


          {!loading &&
            filteredSubmissions.length === 0 && (

              <div className="empty-state">
                No e-waste submissions
                found.
              </div>

            )}

        </div>


        <div className="table-footer">

          Showing{' '}
          {filteredSubmissions.length}{' '}
          of{' '}
          {submissions.length}{' '}
          submissions

        </div>

      </div>

    </div>
  )
}

export default EWaste
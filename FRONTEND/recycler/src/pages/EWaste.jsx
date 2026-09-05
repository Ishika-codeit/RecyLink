import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'

function EWaste() {
  const [submissions, setSubmissions] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const [search, setSearch] = useState('')
  const [categoryFilter, setCategoryFilter] = useState('all')
  const [statusFilter, setStatusFilter] = useState('pending')

  // Fetch real e-waste from backend
  useEffect(() => {
    const fetchSubmissions = async () => {
      try {
        setLoading(true)

        const response = await fetch(
          'http://localhost:5000/api/waste'
        )

        const result = await response.json()

        if (!response.ok) {
          throw new Error(
            result.message || 'Failed to fetch e-waste'
          )
        }

        const wastes = result.wastes || []

        const formattedData = wastes.map((item) => ({
          id: item._id,
          collector: item.collectorName || 'Unknown Collector',
          initials: item.collectorName
            ? item.collectorName
                .split(' ')
                .map((word) => word[0])
                .join('')
                .slice(0, 2)
                .toUpperCase()
            : 'C',
          device: item.category || item.wasteType,
          category: item.category || item.wasteType,
          quantity: item.quantity,
          condition: item.condition,
          location: item.location,
          aiScore: item.classificationConfidence
            ? Math.round(item.classificationConfidence * 100)
            : 0,
          recommendation: item.recommendation
            ? item.recommendation.replaceAll('_', ' ')
            : 'Pending',
          reusePotential: item.reusePotential || 'N/A',
          submitted: new Date(item.createdAt).toLocaleString(),
          status: 'Awaiting Offer',
        }))

        setSubmissions(formattedData)

      } catch (err) {
        console.error('Fetch E-Waste Error:', err)
        setError(err.message || 'Unable to load submissions')
      } finally {
        setLoading(false)
      }
    }

    fetchSubmissions()
  }, [])


  // Search + filters
  const filteredSubmissions = useMemo(() => {
    return submissions.filter((item) => {
      const searchText = search.toLowerCase()

      const matchesSearch =
        item.collector.toLowerCase().includes(searchText) ||
        item.device.toLowerCase().includes(searchText) ||
        item.category.toLowerCase().includes(searchText) ||
        item.location.toLowerCase().includes(searchText)

      const matchesCategory =
        categoryFilter === 'all' ||
        item.category.toLowerCase() === categoryFilter.toLowerCase()

      const matchesStatus =
        statusFilter === 'all' ||
        (statusFilter === 'pending' &&
          item.status === 'Awaiting Offer') ||
        (statusFilter === 'sent' &&
          item.status === 'Offer Sent')

      return (
        matchesSearch &&
        matchesCategory &&
        matchesStatus
      )
    })
  }, [
    submissions,
    search,
    categoryFilter,
    statusFilter,
  ])


  const awaitingOffers = submissions.filter(
    (item) => item.status === 'Awaiting Offer'
  ).length


  const totalWeight = submissions.reduce(
    (total, item) => total + (Number(item.weight) || 0),
    0
  )


  return (
    <div className="recycler-app">

      <div className="ewaste-content">

        {/* Header */}
        <div className="ewaste-header">

          <div>

            <Link
              to="/recycler"
              className="back-link"
            >
              ← Dashboard
            </Link>

            <span className="eyebrow">
              COLLECTOR SUBMISSIONS
            </span>

            <h1>
              Incoming E-Waste
            </h1>

            <p>
              Review collector submissions, AI assessments and
              create competitive offers.
            </p>

          </div>

        </div>


        {/* Stats */}
        <div className="ewaste-stats">

          <div className="ewaste-stat">
            <span>NEW SUBMISSIONS</span>

            <strong>
              {submissions.length}
            </strong>

            <small>
              From collectors
            </small>
          </div>


          <div className="ewaste-stat">
            <span>AWAITING OFFER</span>

            <strong>
              {awaitingOffers}
            </strong>

            <small>
              Requires action
            </small>
          </div>


          <div className="ewaste-stat">
            <span>AI ASSESSED</span>

            <strong>
              {
                submissions.filter(
                  (item) => item.aiScore > 0
                ).length
              }
            </strong>

            <small>
              AI processed
            </small>
          </div>


          <div className="ewaste-stat">
            <span>TOTAL ITEMS</span>

            <strong>
              {
                submissions.reduce(
                  (total, item) =>
                    total + Number(item.quantity || 0),
                  0
                )
              }
            </strong>

            <small>
              Units submitted
            </small>
          </div>

        </div>


        {/* Toolbar */}
        <div className="ewaste-toolbar">

          <div className="ewaste-search">

            <span>
              ⌕
            </span>

            <input
              type="text"
              placeholder="Search collector or device..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />

          </div>


          <select
            value={categoryFilter}
            onChange={(e) =>
              setCategoryFilter(e.target.value)
            }
          >

            <option value="all">
              All Categories
            </option>

            <option value="Laptop">
              Laptop
            </option>

            <option value="Television">
              Television
            </option>

            <option value="Mobile">
              Mobile
            </option>

            <option value="Mouse">
              Mouse
            </option>

            <option value="Printer">
              Printer
            </option>

            <option value="Desktop">
              Desktop
            </option>

            <option value="Keyboard">
              Keyboard
            </option>

          </select>


          <select
            value={statusFilter}
            onChange={(e) =>
              setStatusFilter(e.target.value)
            }
          >

            <option value="pending">
              Awaiting Offer
            </option>

            <option value="sent">
              Offer Sent
            </option>

            <option value="all">
              All Submissions
            </option>

          </select>

        </div>


        {/* Loading */}
        {loading && (

          <div className="ewaste-info-banner">
            <div className="ewaste-info-icon">
              AI
            </div>

            <div>
              <strong>
                Loading submissions...
              </strong>

              <p>
                Fetching collector e-waste from RecyLink backend.
              </p>
            </div>
          </div>

        )}


        {/* Error */}
        {!loading && error && (

          <div className="ewaste-info-banner">

            <div className="ewaste-info-icon">
              !
            </div>

            <div>
              <strong>
                Unable to load submissions
              </strong>

              <p>
                {error}
              </p>
            </div>

          </div>

        )}


        {/* Empty */}
        {!loading &&
          !error &&
          filteredSubmissions.length === 0 && (

          <div className="ewaste-info-banner">

            <div className="ewaste-info-icon">
              AI
            </div>

            <div>
              <strong>
                No e-waste submissions found
              </strong>

              <p>
                Try changing your search or filters.
              </p>
            </div>

          </div>

        )}


        {/* Submission list */}
        {!loading &&
          !error &&
          filteredSubmissions.length > 0 && (

          <div className="ewaste-list">

            {filteredSubmissions.map((item) => (

              <div
                className="ewaste-card"
                key={item.id}
              >

                {/* Collector */}
                <div className="ewaste-collector">

                  <div className="collector-avatar large">
                    {item.initials}
                  </div>

                  <div>

                    <strong>
                      {item.collector}
                    </strong>

                    <span>
                      {item.location}
                    </span>

                    <small>
                      Submitted {item.submitted}
                    </small>

                  </div>

                </div>


                {/* Device */}
                <div className="ewaste-device">

                  <div className="device-icon">

                    {item.category === 'Laptop' && '💻'}
                    {item.category === 'Desktop' && '🖥️'}
                    {item.category === 'Mobile' && '📱'}
                    {item.category === 'Mouse' && '🖱️'}
                    {item.category === 'Keyboard' && '⌨️'}
                    {item.category === 'Printer' && '🖨️'}
                    {item.category === 'Television' && '📺'}

                  </div>


                  <div>

                    <strong>
                      {item.device}
                    </strong>

                    <span>
                      {item.quantity} units
                    </span>

                    <small>
                      Condition: {item.condition}
                    </small>

                  </div>

                </div>


                {/* AI */}
                <div className="ai-assessment">

                  <div className="ai-score">

                    <strong>
                      {item.aiScore}%
                    </strong>

                    <span>
                      AI Confidence
                    </span>

                  </div>


                  <div className="ai-recommendation">

                    <span>
                      RECOMMENDATION
                    </span>

                    <strong>
                      {item.recommendation}
                    </strong>

                  </div>

                </div>


                {/* Status */}
                <div className="ewaste-status-area">

                  <span className="ewaste-status pending">
                    Awaiting Offer
                  </span>

                  <Link
                    to={`/recycler/ewaste/${item.id}`}
                    className="offer-btn"
                  >
                    Review & Offer →
                  </Link>

                </div>

              </div>

            ))}

          </div>

        )}


        {/* Info */}
        <div className="ewaste-info-banner">

          <div className="ewaste-info-icon">
            AI
          </div>

          <div>

            <strong>
              AI-assisted e-waste assessment
            </strong>

            <p>
              RecyLink analyzes uploaded e-waste images and
              condition information to help recyclers make
              faster repair, refurbish or recycling decisions.
            </p>

          </div>

        </div>

      </div>

    </div>
  )
}

export default EWaste
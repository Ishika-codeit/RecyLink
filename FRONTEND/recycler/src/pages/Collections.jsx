import { useEffect, useMemo, useState } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

function statusClass(status) {
  if (status === 'Completed') return 'completed'
  if (status === 'Scheduled') return 'scheduled'
  return 'pending'
}

function Collections() {
  const [wastes, setWastes] = useState([])
  const [quotes, setQuotes] = useState([])

  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [categoryFilter, setCategoryFilter] = useState('all')

  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchCollections = async () => {
      try {
        setLoading(true)
        setError('')

        const [wasteResponse, quoteResponse] =
          await Promise.all([
            fetch('https://recylink-zt6e.onrender.com/api/waste'),
            fetch('https://recylink-zt6e.onrender.com/api/quotes'),
          ])

        const wasteResult = await wasteResponse.json()
        const quoteResult = await quoteResponse.json()

        if (!wasteResponse.ok) {
          throw new Error(
            wasteResult.message ||
              'Failed to fetch e-waste'
          )
        }

        if (!quoteResponse.ok) {
          throw new Error(
            quoteResult.message ||
              'Failed to fetch quotes'
          )
        }

        setWastes(wasteResult.wastes || [])
        setQuotes(quoteResult.quotes || [])
      } catch (err) {
        console.error(
          'Collections Error:',
          err
        )

        setError(
          err.message ||
            'Failed to load collections'
        )
      } finally {
        setLoading(false)
      }
    }

    fetchCollections()
  }, [])


  // =================================
  // COLLECTIONS
  // =================================

  const collections = useMemo(() => {
    return quotes
      .filter(
        (quote) =>
          quote.status === 'SELECTED'
      )
      .map((quote) => {
        const waste = wastes.find(
          (item) =>
            String(item._id) ===
            String(quote.wasteId)
        )

        const category =
          waste?.category ||
          waste?.wasteType ||
          'E-Waste'

        const quantity =
          Number(quote.quantity) ||
          Number(waste?.quantity) ||
          0

        const amount =
          Number(quote.amount) || 0

        return {
          id: quote._id,

          collector:
            waste?.collectorName ||
            'Unknown Collector',

          initials:
            (waste?.collectorName ||
              'UC')
              .split(' ')
              .map(
                (word) =>
                  word[0]
              )
              .join('')
              .slice(0, 2)
              .toUpperCase(),

          material: category,

          category,

          quantity,

          weight: 'Not provided',

          location:
            waste?.location ||
            'Location unavailable',

          value:
            amount > 0
              ? `₹${amount.toLocaleString(
                  'en-IN'
                )}`
              : 'Value unavailable',

          // Backend currently has no
          // pickup-progress field.
          status: 'Pickup Pending',

          date:
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
              : 'Date unavailable',

          progress: null,
        }
      })
  }, [quotes, wastes])


  // =================================
  // CATEGORIES
  // =================================

  const categories = useMemo(() => {
    return [
      ...new Set(
        collections.map(
          (item) => item.category
        )
      ),
    ]
  }, [collections])


  // =================================
  // FILTERED COLLECTIONS
  // =================================

  const filteredCollections = useMemo(() => {
    const query =
      search.trim().toLowerCase()

    return collections.filter(
      (item) => {
        const matchesSearch =
          !query ||
          item.collector
            .toLowerCase()
            .includes(query) ||
          item.material
            .toLowerCase()
            .includes(query) ||
          item.id
            .toLowerCase()
            .includes(query)

        const matchesStatus =
          statusFilter === 'all' ||
          item.status === statusFilter

        const matchesCategory =
          categoryFilter === 'all' ||
          item.category === categoryFilter

        return (
          matchesSearch &&
          matchesStatus &&
          matchesCategory
        )
      }
    )
  }, [
    collections,
    search,
    statusFilter,
    categoryFilter,
  ])


  // =================================
  // STATS
  // =================================

  const activeCollections =
    collections.filter(
      (item) =>
        item.status !== 'Completed'
    ).length

  const pickupPending =
    collections.filter(
      (item) =>
        item.status ===
        'Pickup Pending'
    ).length

  const completed =
    collections.filter(
      (item) =>
        item.status === 'Completed'
    ).length

  const totalUnits =
    collections.reduce(
      (sum, item) =>
        sum +
        Number(item.quantity || 0),
      0
    )


  // =================================
  // LOADING
  // =================================

  if (loading) {
    return (
      <div className="recycler-app">
        <Navbar />

        <main className="collections-page">
          <section className="collections-list">
            <p>
              Loading collections...
            </p>
          </section>
        </main>

        <Footer />
      </div>
    )
  }


  return (
    <div className="recycler-app">

      <Navbar />

      <main className="collections-page">

        {/* =================================
            HEADER
        ================================= */}

        <div className="collections-header">

          <div>

            <span className="eyebrow">
              COLLECTION OPERATIONS
            </span>

            <h1>
              Collections
            </h1>

            <p>
              Track selected recycler offers
              and collection activity from
              one place.
            </p>

          </div>


          <div className="collection-header-stat">

            <span>
              THIS MONTH
            </span>

            <strong>
              {completed}
            </strong>

            <small>
              Collections completed
            </small>

          </div>

        </div>


        {/* =================================
            ERROR
        ================================= */}

        {error && (
          <div
            className="collections-info"
            style={{
              marginBottom: '20px',
            }}
          >
            <div className="collections-info-icon">
              !
            </div>

            <div>
              <strong>
                Unable to load some data
              </strong>

              <p>
                {error}
              </p>
            </div>
          </div>
        )}


        {/* =================================
            STATS
        ================================= */}

        <div className="collections-stats">

          <div className="collection-stat-card">

            <div className="collection-stat-icon green">
              ↗
            </div>

            <div>

              <span>
                Active Collections
              </span>

              <strong>
                {activeCollections}
              </strong>

            </div>

          </div>


          <div className="collection-stat-card">

            <div className="collection-stat-icon blue">
              ◷
            </div>

            <div>

              <span>
                Pickup Pending
              </span>

              <strong>
                {pickupPending}
              </strong>

            </div>

          </div>


          <div className="collection-stat-card">

            <div className="collection-stat-icon teal">
              ✓
            </div>

            <div>

              <span>
                Completed
              </span>

              <strong>
                {completed}
              </strong>

            </div>

          </div>


          <div className="collection-stat-card">

            <div className="collection-stat-icon dark">
              ♻
            </div>

            <div>

              <span>
                Total Units
              </span>

              <strong>
                {totalUnits}
              </strong>

            </div>

          </div>

        </div>


        {/* =================================
            TOOLBAR
        ================================= */}

        <div className="collections-toolbar">

          <div className="collection-search">

            <span>
              ⌕
            </span>

            <input
              placeholder="Search collector, material or ID..."
              value={search}
              onChange={(e) =>
                setSearch(
                  e.target.value
                )
              }
            />

          </div>


          <select
            value={statusFilter}
            onChange={(e) =>
              setStatusFilter(
                e.target.value
              )
            }
          >

            <option value="all">
              All Status
            </option>

            <option value="Scheduled">
              Scheduled
            </option>

            <option value="Pickup Pending">
              Pickup Pending
            </option>

            <option value="Completed">
              Completed
            </option>

          </select>


          <select
            value={categoryFilter}
            onChange={(e) =>
              setCategoryFilter(
                e.target.value
              )
            }
          >

            <option value="all">
              All Categories
            </option>

            {categories.map(
              (category) => (
                <option
                  key={category}
                  value={category}
                >
                  {category}
                </option>
              )
            )}

          </select>

        </div>


        {/* =================================
            COLLECTION LIST
        ================================= */}

        <section className="collections-list">

          <div className="collections-list-heading">

            <div>

              <span className="card-eyebrow">
                COLLECTION PIPELINE
              </span>

              <h2>
                Recent Collections
              </h2>

            </div>


            <span>
              Showing{' '}
              {filteredCollections.length}{' '}
              collections
            </span>

          </div>


          {filteredCollections.length === 0 ? (

            <div
              style={{
                padding: '30px 0',
              }}
            >
              <p>
                No collections found.
              </p>
            </div>

          ) : (

            filteredCollections.map(
              (item) => (

                <div
                  className="collection-row"
                  key={item.id}
                >

                  {/* MATERIAL */}

                  <div className="collection-row-main">

                    <div className="collection-material-icon">

                      {item.category
                        .toLowerCase()
                        .includes('mobile')
                        ? '📱'
                        : item.category
                            .toLowerCase()
                            .includes(
                              'printer'
                            )
                        ? '🖨️'
                        : item.category
                            .toLowerCase()
                            .includes(
                              'keyboard'
                            )
                        ? '⌨️'
                        : item.category
                            .toLowerCase()
                            .includes(
                              'mouse'
                            )
                        ? '🖱️'
                        : '💻'}

                    </div>


                    <div className="collection-material">

                      <div className="collection-id">
                        {String(
                          item.id
                        ).slice(-8)}
                      </div>

                      <h3>
                        {item.material}
                      </h3>

                      <p>
                        {item.category}
                        {' · '}
                        {item.quantity}
                        {' units · '}
                        {item.weight}
                      </p>

                    </div>

                  </div>


                  {/* COLLECTOR */}

                  <div className="collection-collector">

                    <div className="mini-avatar">
                      {item.initials}
                    </div>

                    <div>

                      <strong>
                        {item.collector}
                      </strong>

                      <span>
                        {item.location}
                      </span>

                    </div>

                  </div>


                  {/* VALUE */}

                  <div className="collection-value">

                    <span>
                      OFFER VALUE
                    </span>

                    <strong>
                      {item.value}
                    </strong>

                  </div>


                  {/* PROGRESS */}

                  <div className="collection-progress">

                    <div className="progress-top">

                      <span>
                        Progress
                      </span>

                      <strong>
                        {item.progress !== null
                          ? `${item.progress}%`
                          : '—'}
                      </strong>

                    </div>


                    <div className="collection-progress-bar">

                      <span
                        style={{
                          width:
                            item.progress !==
                            null
                              ? `${item.progress}%`
                              : '0%',
                        }}
                      />

                    </div>


                    <small>
                      {item.date}
                    </small>

                  </div>


                  {/* STATUS */}

                  <div className="collection-status-area">

                    <span
                      className={`collection-status ${statusClass(
                        item.status
                      )}`}
                    >
                      {item.status}
                    </span>


                    <button
                      className="collection-view-btn"
                      type="button"
                      onClick={() =>
                        window.location.href =
                          `/recycler/ewaste/${item.id}`
                      }
                    >
                      View →
                    </button>

                  </div>

                </div>

              )
            )

          )}

        </section>


        {/* =================================
            INFO
        ================================= */}

        <div className="collections-info">

          <div className="collections-info-icon">
            ✦
          </div>


          <div>

            <strong>
              Collection tracking
            </strong>

            <p>
              Selected recycler offers are
              shown here as collection records.
              Pickup progress and received
              weight will be added when those
              backend workflows are available.
            </p>

          </div>

        </div>

      </main>


      <Footer />

    </div>
  )
}

export default Collections
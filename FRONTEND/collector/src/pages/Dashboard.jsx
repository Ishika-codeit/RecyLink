import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'

function Dashboard() {
  const user = JSON.parse(
    localStorage.getItem('user') || 'null'
  )

  const collector = {
    name: user?.name || 'Collector',
    location: 'Delhi NCR',
    verified: true,
  }

  const [demands, setDemands] = useState([])
  const [wastes, setWastes] = useState([])
  const [quotes, setQuotes] = useState([])

  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true)
        setError('')

        const [
          demandsResponse,
          wasteResponse,
          quotesResponse,
        ] = await Promise.all([
          fetch('https://recylink-zt6e.onrender.com/api/demands'),
          fetch('https://recylink-zt6e.onrender.com/api/waste'),
          fetch('https://recylink-zt6e.onrender.com/api/quotes'),
        ])

        const demandsResult =
          await demandsResponse.json()

        const wasteResult =
          await wasteResponse.json()

        const quotesResult =
          await quotesResponse.json()

        if (!demandsResponse.ok) {
          throw new Error(
            demandsResult.message ||
              'Failed to fetch demands'
          )
        }

        if (!wasteResponse.ok) {
          throw new Error(
            wasteResult.message ||
              'Failed to fetch e-waste'
          )
        }

        if (!quotesResponse.ok) {
          throw new Error(
            quotesResult.message ||
              'Failed to fetch offers'
          )
        }

        setDemands(
          demandsResult.demands || []
        )

        setWastes(
          wasteResult.wastes || []
        )

        setQuotes(
          quotesResult.quotes || []
        )
      } catch (err) {
        console.error(
          'Dashboard Error:',
          err
        )

        setError(
          err.message ||
            'Failed to load dashboard'
        )
      } finally {
        setLoading(false)
      }
    }

    fetchDashboardData()
  }, [])


  // =================================
  // COLLECTOR WASTE
  // =================================

  const collectorWastes = useMemo(() => {
    return wastes.filter((item) => {
      if (!item.collectorName) return false

      return (
        item.collectorName
          .trim()
          .toLowerCase() ===
        collector.name
          .trim()
          .toLowerCase()
      )
    })
  }, [wastes, collector.name])


  // =================================
  // COLLECTOR QUOTES
  // =================================

  const collectorQuotes = useMemo(() => {
    return quotes.filter((quote) => {
      if (!quote.collectorId) return false

      return (
        String(quote.collectorId)
          .trim()
          .toLowerCase() ===
        collector.name
          .trim()
          .toLowerCase()
      )
    })
  }, [quotes, collector.name])


  // =================================
  // STATS
  // =================================

  const openDemands = useMemo(() => {
    const now = new Date()

    return demands.filter((demand) => {
      if (!demand.deadline) return true

      return (
        new Date(demand.deadline) >= now
      )
    })
  }, [demands])


  const newOffers = useMemo(() => {
    return collectorQuotes.filter(
      (quote) =>
        quote.status === 'PENDING'
    )
  }, [collectorQuotes])


  const totalCollected = useMemo(() => {
    return collectorWastes.reduce(
      (sum, item) =>
        sum + Number(item.quantity || 0),
      0
    )
  }, [collectorWastes])


  const completedCollections = useMemo(() => {
    return collectorQuotes.filter(
      (quote) =>
        quote.status === 'SELECTED'
    )
  }, [collectorQuotes])


  const totalEarnings = useMemo(() => {
    return completedCollections.reduce(
      (sum, quote) =>
        sum + Number(quote.amount || 0),
      0
    )
  }, [completedCollections])


  // =================================
  // RECOMMENDED DEMAND
  // =================================

  const recommendedDemand =
    openDemands.length > 0
      ? openDemands[0]
      : null


  // =================================
  // RECENT DEMANDS
  // =================================

  const nearbyDemands = useMemo(() => {
    return openDemands.slice(0, 4)
  }, [openDemands])


  // =================================
  // RECENT OFFERS
  // =================================

  const recentOffers = useMemo(() => {
    return [...collectorQuotes]
      .sort(
        (a, b) =>
          new Date(b.createdAt) -
          new Date(a.createdAt)
      )
      .slice(0, 4)
  }, [collectorQuotes])


  // =================================
  // ACTIVE COLLECTIONS
  // =================================

  const activeCollections = useMemo(() => {
    return completedCollections
      .map((quote) => {
        const waste = wastes.find(
          (item) =>
            String(item._id) ===
            String(quote.wasteId)
        )

        return {
          id: quote._id,

          material:
            waste?.category ||
            waste?.wasteType ||
            'E-Waste',

          quantity:
            Number(quote.quantity) ||
            Number(waste?.quantity) ||
            0,

          location:
            waste?.location ||
            'Location unavailable',

          recycler:
            'Verified Recycler',

          status: 'Selected',
        }
      })
      .slice(0, 4)
  }, [
    completedCollections,
    wastes,
  ])


  // =================================
  // RECENT ACTIVITY
  // =================================

  const recentActivity = useMemo(() => {
    const activities = []

    collectorQuotes
      .slice()
      .sort(
        (a, b) =>
          new Date(b.createdAt) -
          new Date(a.createdAt)
      )
      .slice(0, 3)
      .forEach((quote) => {
        activities.push({
          id: `quote-${quote._id}`,
          type: 'offer',
          title:
            quote.status === 'SELECTED'
              ? 'Recycler offer selected'
              : 'Recycler offer received',
          description:
            quote.amount
              ? `Offer amount: ₹${Number(
                  quote.amount
                ).toLocaleString('en-IN')}.`
              : 'A recycler offer is available.',
          time: quote.createdAt
            ? new Date(
                quote.createdAt
              ).toLocaleString('en-IN')
            : 'Recent',
        })
      })

    collectorWastes
      .slice()
      .sort(
        (a, b) =>
          new Date(b.createdAt) -
          new Date(a.createdAt)
      )
      .slice(0, 3)
      .forEach((waste) => {
        activities.push({
          id: `waste-${waste._id}`,
          type: 'upload',
          title: 'E-waste submitted',
          description: `${
            waste.category ||
            waste.wasteType ||
            'E-waste'
          } submission processed.`,
          time: waste.createdAt
            ? new Date(
                waste.createdAt
              ).toLocaleString('en-IN')
            : 'Recent',
        })
      })

    return activities
      .sort(
        (a, b) =>
          new Date(b.time) -
          new Date(a.time)
      )
      .slice(0, 5)
  }, [collectorQuotes, collectorWastes])


  // =================================
  // LOADING
  // =================================

  if (loading) {
    return (
      <div className="dashboard">

        <section className="dashboard-section">
          <p>Loading dashboard...</p>
        </section>

      </div>
    )
  }


  return (
    <div className="dashboard">

      {/* =================================
          ERROR
      ================================= */}

      {error && (
        <section className="dashboard-section">
          <p style={{ color: '#c0392b' }}>
            {error}
          </p>
        </section>
      )}


      {/* =================================
          WELCOME HEADER
      ================================= */}

      <section className="dashboard-header">

        <div>

          <p>
            Welcome back,
          </p>

          <h1>
            {collector.name}
          </h1>

          <span>
            📍 {collector.location}
          </span>

        </div>


        {collector.verified && (
          <div>
            <span>
              ✓ Verified Collector
            </span>
          </div>
        )}

      </section>


      {/* =================================
          STATS
      ================================= */}

      <section className="stats-grid">

        <div className="stat-card">

          <span>
            Nearby Demands
          </span>

          <strong>
            {openDemands.length}
          </strong>

          <small>
            Open demands available
          </small>

        </div>


        <div className="stat-card">

          <span>
            New Offers
          </span>

          <strong>
            {newOffers.length}
          </strong>

          <small>
            Offers awaiting action
          </small>

        </div>


        <div className="stat-card">

          <span>
            E-Waste Collected
          </span>

          <strong>
            {totalCollected}
          </strong>

          <small>
            Units submitted
          </small>

        </div>


        <div className="stat-card">

          <span>
            Total Earnings
          </span>

          <strong>
            {totalEarnings > 0
              ? `₹${totalEarnings.toLocaleString(
                  'en-IN'
                )}`
              : '—'}
          </strong>

          <small>
            From selected offers
          </small>

        </div>

      </section>


      {/* =================================
          QUICK ACTIONS
      ================================= */}

      <section className="quick-actions">

        <h2>
          Quick Actions
        </h2>

        <div>

          <Link to="/demands">
            Find Nearby Demands
          </Link>

          <Link to="/add-ewaste">
            + Add E-Waste
          </Link>

          <Link to="/offers">
            View Offers
          </Link>

        </div>

      </section>


      {/* =================================
          RECOMMENDED DEMAND
      ================================= */}

      {recommendedDemand && (

        <section className="recommended-demand">

          <div className="recommended-header">

            <div>

              <span>
                AVAILABLE DEMAND
              </span>

              <h2>
                Open Recycler Demand
              </h2>

            </div>

            <strong>
              —
            </strong>

          </div>


          <div className="recommended-content">

            <div className="recommended-main">

              <h3>
                {recommendedDemand.wasteType ||
                  'E-Waste'}
              </h3>

              <p>
                Verified Recycler
              </p>


              <div className="recommended-details">

                <span>
                  📦{' '}
                  {recommendedDemand.quantity ||
                    0}{' '}
                  units
                </span>

                <span>
                  📍{' '}
                  {recommendedDemand.location ||
                    'Location unavailable'}
                </span>

              </div>

            </div>


            <div className="recommended-price">

              <small>
                Expected Price
              </small>

              <strong>

                ₹
                {Number(
                  recommendedDemand.minPrice ||
                    0
                ).toLocaleString('en-IN')}

                {' – '}

                ₹
                {Number(
                  recommendedDemand.maxPrice ||
                    0
                ).toLocaleString('en-IN')}

                {' / unit'}

              </strong>


              <span>

                Deadline:{' '}

                {recommendedDemand.deadline
                  ? new Date(
                      recommendedDemand.deadline
                    ).toLocaleDateString(
                      'en-IN',
                      {
                        day: '2-digit',
                        month: 'short',
                        year: 'numeric',
                      }
                    )
                  : 'Not specified'}

              </span>

            </div>


            <Link
              to={`/demands/${recommendedDemand._id}`}
              className="recommended-button"
            >
              View Demand →
            </Link>

          </div>

        </section>

      )}


      {/* =================================
          NO DEMAND
      ================================= */}

      {!recommendedDemand && (

        <section className="recommended-demand">

          <div className="recommended-header">

            <div>

              <span>
                DEMAND NETWORK
              </span>

              <h2>
                No Open Demands
              </h2>

            </div>

          </div>


          <div className="recommended-content">

            <div className="recommended-main">

              <p>
                There are currently no active
                recycler demands available.
              </p>

            </div>


            <Link
              to="/demands"
              className="recommended-button"
            >
              Browse Demands →
            </Link>

          </div>

        </section>

      )}


      {/* =================================
          NEARBY DEMANDS
      ================================= */}

      <section className="dashboard-section">

        <div className="section-heading">

          <div>

            <h2>
              Recycler Demands
            </h2>

            <p>
              Currently open demands on RecyLink.
            </p>

          </div>


          <Link to="/demands">
            View All
          </Link>

        </div>


        <div className="demand-list">

          {nearbyDemands.length === 0 ? (

            <p>
              No open demands available.
            </p>

          ) : (

            nearbyDemands.map(
              (demand) => (

                <div
                  className="demand-item"
                  key={demand._id}
                >

                  <div>

                    <h3>
                      {demand.wasteType ||
                        'E-Waste'}
                    </h3>

                    <p>
                      Verified Recycler
                    </p>

                  </div>


                  <div>

                    <span>
                      📦{' '}
                      {demand.quantity ||
                        0}{' '}
                      units
                    </span>

                    <span>
                      📍{' '}
                      {demand.location ||
                        'Location unavailable'}
                    </span>

                  </div>


                  <div>

                    <strong>

                      ₹
                      {Number(
                        demand.minPrice ||
                          0
                      ).toLocaleString(
                        'en-IN'
                      )}

                      {' – '}

                      ₹
                      {Number(
                        demand.maxPrice ||
                          0
                      ).toLocaleString(
                        'en-IN'
                      )}

                      {' / unit'}

                    </strong>


                    <small>

                      {demand.deadline
                        ? new Date(
                            demand.deadline
                          ).toLocaleDateString(
                            'en-IN'
                          )
                        : 'No deadline'}

                    </small>

                  </div>


                  <div>

                    <span>
                      {demand.deadline &&
                      new Date(
                        demand.deadline
                      ) < new Date()
                        ? 'Expired'
                        : 'Open'}
                    </span>

                    <Link
                      to={`/demands/${demand._id}`}
                    >
                      Details
                    </Link>

                  </div>

                </div>

              )
            )

          )}

        </div>

      </section>


      {/* =================================
          ACTIVE COLLECTIONS
      ================================= */}

      <section className="dashboard-section">

        <div className="section-heading">

          <div>

            <h2>
              My Selected Collections
            </h2>

            <p>
              Recycler offers you have selected.
            </p>

          </div>

        </div>


        <div className="active-collections">

          {activeCollections.length === 0 ? (

            <p>
              No selected collections yet.
            </p>

          ) : (

            activeCollections.map(
              (collection) => (

                <div
                  className="collection-card"
                  key={collection.id}
                >

                  <div className="collection-top">

                    <div>

                      <h3>
                        {collection.material}
                      </h3>

                      <p>
                        {collection.recycler}
                      </p>

                    </div>


                    <span>
                      {collection.status}
                    </span>

                  </div>


                  <div className="collection-info">

                    <span>
                      📦{' '}
                      {collection.quantity}{' '}
                      units
                    </span>

                    <span>
                      📍{' '}
                      {collection.location}
                    </span>

                  </div>


                  <div className="progress-area">

                    <div className="progress-label">

                      <span>
                        Collection Progress
                      </span>

                      <strong>
                        —
                      </strong>

                    </div>


                    <div className="progress-bar">

                      <div
                        style={{
                          width: '100%',
                        }}
                      ></div>

                    </div>

                  </div>

                </div>

              )
            )

          )}

        </div>

      </section>


      {/* =================================
          OFFERS + ACTIVITY
      ================================= */}

      <section className="dashboard-two-column">


        {/* OFFERS */}

        <div className="dashboard-panel">

          <div className="section-heading">

            <div>

              <h2>
                Recent Offers
              </h2>

              <p>
                Latest recycler offers.
              </p>

            </div>


            <Link to="/offers">
              View All
            </Link>

          </div>


          <div className="offer-list">

            {recentOffers.length === 0 ? (

              <p>
                No offers received yet.
              </p>

            ) : (

              recentOffers.map(
                (offer) => {

                  const waste =
                    wastes.find(
                      (item) =>
                        String(
                          item._id
                        ) ===
                        String(
                          offer.wasteId
                        )
                    )

                  return (

                    <div
                      className="offer-item"
                      key={offer._id}
                    >

                      <div className="offer-icon">
                        ₹
                      </div>


                      <div className="offer-details">

                        <strong>
                          Verified Recycler
                        </strong>

                        <span>

                          {waste?.category ||
                            waste?.wasteType ||
                            'E-Waste'}

                          {' · '}

                          {offer.quantity ||
                            waste?.quantity ||
                            0}{' '}
                          units

                        </span>

                      </div>


                      <div className="offer-price">

                        <strong>

                          {Number(
                            offer.pricePerUnit ||
                              0
                          ) > 0
                            ? `₹${Number(
                                offer.pricePerUnit
                              ).toLocaleString(
                                'en-IN'
                              )} / unit`
                            : 'Price unavailable'}

                        </strong>


                        <small>

                          {offer.createdAt
                            ? new Date(
                                offer.createdAt
                              ).toLocaleDateString(
                                'en-IN'
                              )
                            : 'Recent'}

                        </small>

                      </div>

                    </div>

                  )
                }
              )

            )}

          </div>

        </div>


        {/* ACTIVITY */}

        <div className="dashboard-panel">

          <div className="section-heading">

            <div>

              <h2>
                Recent Activity
              </h2>

              <p>
                Your latest RecyLink activity.
              </p>

            </div>

          </div>


          <div className="activity-list">

            {recentActivity.length === 0 ? (

              <p>
                No recent activity available.
              </p>

            ) : (

              recentActivity.map(
                (activity) => (

                  <div
                    className="activity-item"
                    key={activity.id}
                  >

                    <div className="activity-icon">

                      {activity.type ===
                        'offer' && '₹'}

                      {activity.type ===
                        'upload' && '↑'}

                      {activity.type ===
                        'ai' && '✦'}

                      {activity.type ===
                        'completed' && '✓'}

                    </div>


                    <div>

                      <strong>
                        {activity.title}
                      </strong>

                      <p>
                        {activity.description}
                      </p>

                      <small>
                        {activity.time}
                      </small>

                    </div>

                  </div>

                )
              )

            )}

          </div>

        </div>

      </section>


      {/* =================================
          IMPACT
      ================================= */}

      <section className="impact-section">

        <div>

          <span>
            YOUR RECYCLING ACTIVITY
          </span>

          <h2>
            Making every collection count.
          </h2>

          <p>
            Your submissions help connect collected
            e-waste with the formal recycling ecosystem.
          </p>

        </div>


        <div className="impact-stats">

          <div>

            <strong>
              {totalCollected}
            </strong>

            <span>
              E-Waste Units
            </span>

          </div>


          <div>

            <strong>
              {completedCollections.length}
            </strong>

            <span>
              Selected Collections
            </span>

          </div>


          <div>

            <strong>
              {collectorQuotes.length}
            </strong>

            <span>
              Recycler Offers
            </span>

          </div>

        </div>

      </section>

    </div>
  )
}

export default Dashboard
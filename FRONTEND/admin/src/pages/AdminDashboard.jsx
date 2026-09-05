import { useEffect, useMemo, useState } from 'react'
import AdminSidebar from '../components/AdminSidebar'
import AdminNavbar from '../components/AdminNavbar'

function AdminDashboard() {
  const [waste, setWaste] = useState([])
  const [demands, setDemands] = useState([])
  const [quotes, setQuotes] = useState([])

  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true)
        setError('')

        const [
          wasteResponse,
          demandsResponse,
          quotesResponse,
        ] = await Promise.all([
          fetch('http://localhost:5000/api/waste'),
          fetch('http://localhost:5000/api/demands'),
          fetch('http://localhost:5000/api/quotes'),
        ])

        const wasteResult =
          await wasteResponse.json()

        const demandsResult =
          await demandsResponse.json()

        const quotesResult =
          await quotesResponse.json()

        if (!wasteResponse.ok) {
          throw new Error(
            wasteResult.message ||
            'Failed to fetch e-waste'
          )
        }

        if (!demandsResponse.ok) {
          throw new Error(
            demandsResult.message ||
            'Failed to fetch demands'
          )
        }

        if (!quotesResponse.ok) {
          throw new Error(
            quotesResult.message ||
            'Failed to fetch quotes'
          )
        }

        setWaste(
          wasteResult.wastes || []
        )

        setDemands(
          demandsResult.demands || []
        )

        setQuotes(
          quotesResult.quotes || []
        )

      } catch (err) {
        console.error(
          'Admin Dashboard Error:',
          err
        )

        setError(
          err.message ||
          'Unable to load dashboard data.'
        )
      } finally {
        setLoading(false)
      }
    }

    fetchDashboardData()
  }, [])


  /* -----------------------------
     REAL DASHBOARD STATS
  ----------------------------- */

  const registeredCollectors = useMemo(() => {
    const names = waste
      .map(
        (item) =>
          item.collectorName
      )
      .filter(Boolean)

    return new Set(names).size
  }, [waste])


  const verifiedRecyclers = useMemo(() => {
    return new Set(
      quotes.map(
        (quote) =>
          quote.recyclerName ||
          quote.recyclerId ||
          quote._id
      )
    ).size
  }, [quotes])


  const totalQuantity = useMemo(() => {
    return waste.reduce(
      (total, item) =>
        total +
        (Number(item.quantity) || 0),
      0
    )
  }, [waste])


  const activeDemands = useMemo(() => {
    return demands.filter((demand) => {
      if (!demand.deadline) {
        return true
      }

      return (
        new Date(demand.deadline) >=
        new Date()
      )
    }).length
  }, [demands])


  const stats = [
    {
      title: 'Registered Collectors',
      value: registeredCollectors,
      change: '',
      sub: 'Unique collectors with submissions',
      icon: '♟',
      type: 'green',
    },
    {
      title: 'Verified Recyclers',
      value: verifiedRecyclers,
      change: '',
      sub: 'Recycler quote activity',
      icon: '▦',
      type: 'blue',
    },
    {
      title: 'Total E-Waste Collected',
      value: `${totalQuantity} units`,
      change: '',
      sub: 'Based on submitted e-waste quantity',
      icon: '♻',
      type: 'green',
    },
    {
      title: 'Active Demands',
      value: activeDemands,
      change: '',
      sub: 'Currently open demands',
      icon: '▤',
      type: 'blue',
    },
  ]


  /* -----------------------------
     RECENT E-WASTE ACTIVITY
  ----------------------------- */

  const recentCollections = useMemo(() => {
    return [...waste]
      .sort(
        (a, b) =>
          new Date(b.createdAt) -
          new Date(a.createdAt)
      )
      .slice(0, 4)
      .map((item, index) => ({
        id:
          item._id
            ? `EW-${item._id.slice(-6).toUpperCase()}`
            : `EW-${index + 1}`,

        item:
          item.category ||
          item.wasteType ||
          'E-Waste',

        collector:
          item.collectorName ||
          'Unknown Collector',

        location:
          item.location ||
          'N/A',

        status:
          'Submitted',
      }))
  }, [waste])


  /* -----------------------------
     CATEGORY DISTRIBUTION
  ----------------------------- */

  const categories = useMemo(() => {
    const categoryMap = {}

    waste.forEach((item) => {
      const category =
        item.category ||
        item.wasteType ||
        'Other'

      const quantity =
        Number(item.quantity) || 0

      categoryMap[category] =
        (categoryMap[category] || 0) +
        quantity
    })

    const total =
      Object.values(categoryMap).reduce(
        (sum, value) =>
          sum + value,
        0
      )

    return Object.entries(categoryMap)
      .map(
        ([name, value]) => ({
          name,
          value:
            total > 0
              ? Math.round(
                  (value / total) *
                    100
                )
              : 0,
        })
      )
      .sort(
        (a, b) =>
          b.value - a.value
      )
      .slice(0, 6)

  }, [waste])


  /* -----------------------------
     TREND DATA
  ----------------------------- */

  const bars = useMemo(() => {
    const monthly = Array(9).fill(0)

    const now =
      new Date()

    waste.forEach((item) => {
      if (!item.createdAt) return

      const date =
        new Date(item.createdAt)

      const monthDiff =
        (now.getFullYear() -
          date.getFullYear()) *
          12 +
        (now.getMonth() -
          date.getMonth())

      if (
        monthDiff >= 0 &&
        monthDiff < 9
      ) {
        monthly[
          8 - monthDiff
        ] +=
          Number(item.quantity) || 0
      }
    })

    const max =
      Math.max(
        ...monthly,
        1
      )

    return monthly.map(
      (value) =>
        value === 0
          ? 3
          : Math.max(
              (value / max) *
                100,
              8
            )
    )
  }, [waste])


  const monthLabels = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
  ]


  /* -----------------------------
     IMPACT
  ----------------------------- */

  const totalWeight =
    totalQuantity


  return (
    <div className="admin-layout">

      <AdminSidebar />

      <main className="admin-main">

        <AdminNavbar />

        <div className="admin-content dashboard-modern">

          {/* WELCOME */}

          <section className="dashboard-welcome">

            <div className="welcome-content">

              <span className="welcome-small">
                RECYLINK ADMINISTRATION
              </span>

              <h1>
                Welcome back,{' '}
                <span>Admin!</span> 👋
              </h1>

              <p>
                Together for a cleaner,
                greener India.
              </p>

              <small>
                "Small actions make a
                big impact."
              </small>

            </div>


            <div className="welcome-visual">

              <div className="welcome-globe">
                🌍
              </div>

              <div className="welcome-leaf leaf-one">
                🌿
              </div>

              <div className="welcome-leaf leaf-two">
                🍃
              </div>

            </div>


            <div className="welcome-date">

              <strong>
                {new Date().toLocaleDateString(
                  'en-IN',
                  {
                    weekday: 'short',
                    day: 'numeric',
                    month: 'short',
                    year: 'numeric',
                  }
                )}
              </strong>

              <span>
                Here's what's happening
                with RecyLink today.
              </span>

            </div>

          </section>


          {/* ERROR */}

          {error && (

            <div className="offer-info">

              <span>
                ⚠️
              </span>

              <div>

                <strong>
                  Dashboard data unavailable
                </strong>

                <p>
                  {error}
                </p>

              </div>

            </div>

          )}


          {/* STATS */}

          <div className="modern-stats">

            {stats.map((stat) => (

              <div
                className="modern-stat-card"
                key={stat.title}
              >

                <div
                  className={`modern-stat-icon ${stat.type}`}
                >
                  {stat.icon}
                </div>


                <div className="modern-stat-info">

                  <span>
                    {stat.title}
                  </span>

                  <div className="modern-stat-value">

                    <strong>
                      {loading
                        ? '—'
                        : stat.value}
                    </strong>

                  </div>

                  <p>
                    {stat.sub}
                  </p>

                </div>

              </div>

            ))}

          </div>


          {/* CHART + CATEGORY */}

          <div className="dashboard-modern-grid">

            {/* COLLECTION TREND */}

            <section className="modern-card collection-chart-card">

              <div className="modern-card-header">

                <div>

                  <h3>
                    Collection Trend
                  </h3>

                  <p>
                    E-waste submissions
                    over recent months
                  </p>

                </div>

                <select>
                  <option>
                    Recent 9 Months
                  </option>

                  <option>
                    This Year
                  </option>
                </select>

              </div>


              <div className="trend-chart">

                <div className="chart-y-axis">

                  <span>100%</span>
                  <span>80%</span>
                  <span>60%</span>
                  <span>40%</span>
                  <span>20%</span>
                  <span>0</span>

                </div>


                <div className="chart-main">

                  <div className="chart-grid-lines">

                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>

                  </div>


                  <div className="trend-bars">

                    {bars.map(
                      (
                        height,
                        index
                      ) => (

                        <div
                          className="trend-column"
                          key={index}
                        >

                          <div
                            className="trend-bar"
                            style={{
                              height: `${height}%`,
                            }}
                          ></div>

                          <span>
                            {
                              monthLabels[
                                index
                              ]
                            }
                          </span>

                        </div>

                      )
                    )}

                  </div>

                </div>

              </div>


              <div className="chart-legend">

                <span>

                  <i className="legend-green"></i>

                  E-Waste Submitted

                </span>

              </div>

            </section>


            {/* CATEGORY */}

            <section className="modern-card category-card">

              <div className="modern-card-header">

                <div>

                  <h3>
                    E-Waste by Category
                  </h3>

                  <p>
                    Distribution of submitted
                    material
                  </p>

                </div>

                <button className="more-btn">
                  ⋮
                </button>

              </div>


              <div className="category-content">

                <div className="donut-chart">

                  <div className="donut-center">

                    <strong>
                      {loading
                        ? '—'
                        : `${totalQuantity}`}
                    </strong>

                    <span>
                      Units
                    </span>

                  </div>

                </div>


                <div className="category-list">

                  {categories.length === 0 ? (

                    <p>
                      No category data yet.
                    </p>

                  ) : (

                    categories.map(
                      (
                        category,
                        index
                      ) => (

                        <div
                          className="category-list-item"
                          key={category.name}
                        >

                          <div>

                            <i
                              className={`category-dot dot-${index}`}
                            ></i>

                            <span>
                              {category.name}
                            </span>

                          </div>

                          <strong>
                            {category.value}%
                          </strong>

                        </div>

                      )
                    )

                  )}

                </div>

              </div>

            </section>

          </div>


          {/* RECENT ACTIVITY + IMPACT */}

          <div className="dashboard-modern-grid bottom-grid">

            {/* RECENT */}

            <section className="modern-card recent-collections-card">

              <div className="modern-card-header">

                <div>

                  <h3>
                    Recent E-Waste Activity
                  </h3>

                  <p>
                    Latest collector submissions
                  </p>

                </div>

              </div>


              <div className="modern-table-wrapper">

                <table className="modern-table">

                  <thead>

                    <tr>

                      <th>
                        ID
                      </th>

                      <th>
                        Item
                      </th>

                      <th>
                        Collector
                      </th>

                      <th>
                        Location
                      </th>

                      <th>
                        Status
                      </th>

                    </tr>

                  </thead>


                  <tbody>

                    {loading ? (

                      <tr>

                        <td colSpan="5">
                          Loading activity...
                        </td>

                      </tr>

                    ) : recentCollections.length === 0 ? (

                      <tr>

                        <td colSpan="5">
                          No e-waste submissions yet.
                        </td>

                      </tr>

                    ) : (

                      recentCollections.map(
                        (
                          collection
                        ) => (

                          <tr
                            key={
                              collection.id
                            }
                          >

                            <td>

                              <strong>
                                {
                                  collection.id
                                }
                              </strong>

                            </td>

                            <td>

                              <span className="item-icon">
                                ♻
                              </span>

                              {
                                collection.item
                              }

                            </td>

                            <td>
                              {
                                collection.collector
                              }
                            </td>

                            <td>
                              {
                                collection.location
                              }
                            </td>

                            <td>

                              <span
                                className={`collection-status ${collection.status
                                  .toLowerCase()
                                  .replaceAll(
                                    ' ',
                                    '-'
                                  )}`}
                              >
                                {
                                  collection.status
                                }
                              </span>

                            </td>

                          </tr>

                        )
                      )

                    )}

                  </tbody>

                </table>

              </div>

            </section>


            {/* IMPACT */}

            <section className="modern-card impact-card">

              <div className="modern-card-header">

                <div>

                  <h3>
                    Platform Activity
                  </h3>

                  <p>
                    Current RecyLink activity
                  </p>

                </div>

              </div>


              <div className="impact-modern-grid">

                <div className="impact-modern-item">

                  <div className="impact-icon green">
                    ♻
                  </div>

                  <div>

                    <strong>
                      {totalQuantity}
                    </strong>

                    <span>
                      E-Waste Units
                    </span>

                  </div>

                </div>


                <div className="impact-modern-item">

                  <div className="impact-icon blue">
                    ☁
                  </div>

                  <div>

                    <strong>
                      {quotes.length}
                    </strong>

                    <span>
                      Offers Received
                    </span>

                  </div>

                </div>


                <div className="impact-modern-item">

                  <div className="impact-icon green">
                    ♻
                  </div>

                  <div>

                    <strong>
                      {demands.length}
                    </strong>

                    <span>
                      Total Demands
                    </span>

                  </div>

                </div>


                <div className="impact-modern-item">

                  <div className="impact-icon blue">
                    ♟
                  </div>

                  <div>

                    <strong>
                      {
                        quotes.filter(
                          (quote) =>
                            quote.status ===
                            'SELECTED'
                        ).length
                      }
                    </strong>

                    <span>
                      Accepted Offers
                    </span>

                  </div>

                </div>

              </div>


              <div className="impact-message">

                🌱 Every device recycled is a
                step towards a cleaner planet.

              </div>

            </section>

          </div>

        </div>

      </main>

    </div>
  )
}

export default AdminDashboard
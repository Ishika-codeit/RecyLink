import { useEffect, useMemo, useState } from 'react'

function Reports() {
  const [period, setPeriod] = useState('This Year')

  const [wastes, setWastes] = useState([])
  const [demands, setDemands] = useState([])
  const [quotes, setQuotes] = useState([])

  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchReportsData = async () => {
      try {
        setLoading(true)
        setError('')

        const [wasteRes, demandRes, quoteRes] = await Promise.all([
          fetch('http://localhost:5000/api/waste'),
          fetch('http://localhost:5000/api/demands'),
          fetch('http://localhost:5000/api/quotes'),
        ])

        const wasteData = await wasteRes.json()
        const demandData = await demandRes.json()
        const quoteData = await quoteRes.json()

        if (!wasteRes.ok) {
          throw new Error(
            wasteData.message || 'Failed to fetch e-waste data'
          )
        }

        if (!demandRes.ok) {
          throw new Error(
            demandData.message || 'Failed to fetch demand data'
          )
        }

        if (!quoteRes.ok) {
          throw new Error(
            quoteData.message || 'Failed to fetch quote data'
          )
        }

        setWastes(wasteData.wastes || [])
        setDemands(demandData.demands || [])
        setQuotes(quoteData.quotes || [])
      } catch (err) {
        console.error('Reports Error:', err)
        setError(err.message || 'Failed to load reports')
      } finally {
        setLoading(false)
      }
    }

    fetchReportsData()
  }, [])

  // -----------------------------------
  // DATE FILTER
  // -----------------------------------

  const getPeriodStart = () => {
    const now = new Date()

    if (period === 'Last 30 Days') {
      const date = new Date()
      date.setDate(now.getDate() - 30)
      return date
    }

    if (period === 'Last 6 Months') {
      const date = new Date()
      date.setMonth(now.getMonth() - 6)
      return date
    }

    return new Date(now.getFullYear(), 0, 1)
  }

  const filteredWastes = useMemo(() => {
    const startDate = getPeriodStart()

    return wastes.filter((item) => {
      const createdAt = new Date(item.createdAt)
      return createdAt >= startDate
    })
  }, [wastes, period])

  const filteredDemands = useMemo(() => {
    const startDate = getPeriodStart()

    return demands.filter((item) => {
      const createdAt = new Date(item.createdAt)
      return createdAt >= startDate
    })
  }, [demands, period])

  const filteredQuotes = useMemo(() => {
    const startDate = getPeriodStart()

    return quotes.filter((item) => {
      const createdAt = new Date(item.createdAt)
      return createdAt >= startDate
    })
  }, [quotes, period])

  // -----------------------------------
  // KEY METRICS
  // -----------------------------------

  const totalWasteQuantity = useMemo(() => {
    return filteredWastes.reduce(
      (sum, item) => sum + Number(item.quantity || 0),
      0
    )
  }, [filteredWastes])

  const completedCollections = useMemo(() => {
    return filteredQuotes.filter(
      (quote) => quote.status === 'SELECTED'
    ).length
  }, [filteredQuotes])

  const pendingOffers = useMemo(() => {
    return filteredQuotes.filter(
      (quote) => quote.status === 'PENDING'
    ).length
  }, [filteredQuotes])

  const activeDemands = useMemo(() => {
    const now = new Date()

    return filteredDemands.filter((demand) => {
      if (!demand.deadline) return true

      return new Date(demand.deadline) >= now
    }).length
  }, [filteredDemands])

  // -----------------------------------
  // MONTHLY TREND
  // -----------------------------------

  const monthlyData = useMemo(() => {
    const now = new Date()

    let months = []

    if (period === 'Last 30 Days') {
      months = Array.from({ length: 4 }, (_, index) => {
        const date = new Date(now)
        date.setMonth(now.getMonth() - (3 - index))

        return {
          key: `${date.getFullYear()}-${date.getMonth()}`,
          month: date.toLocaleString('en-US', {
            month: 'short',
          }),
          collections: 0,
          waste: 0,
        }
      })
    } else if (period === 'Last 6 Months') {
      months = Array.from({ length: 6 }, (_, index) => {
        const date = new Date(now)
        date.setMonth(now.getMonth() - (5 - index))

        return {
          key: `${date.getFullYear()}-${date.getMonth()}`,
          month: date.toLocaleString('en-US', {
            month: 'short',
          }),
          collections: 0,
          waste: 0,
        }
      })
    } else {
      months = Array.from({ length: 12 }, (_, index) => {
        const date = new Date(now.getFullYear(), index, 1)

        return {
          key: `${date.getFullYear()}-${date.getMonth()}`,
          month: date.toLocaleString('en-US', {
            month: 'short',
          }),
          collections: 0,
          waste: 0,
        }
      })
    }

    const monthMap = {}

    months.forEach((month) => {
      monthMap[month.key] = month
    })

    filteredWastes.forEach((item) => {
      const date = new Date(item.createdAt)

      const key = `${date.getFullYear()}-${date.getMonth()}`

      if (monthMap[key]) {
        monthMap[key].waste += Number(item.quantity || 0)
      }
    })

    filteredQuotes.forEach((quote) => {
      if (quote.status !== 'SELECTED') return

      const date = new Date(quote.createdAt)

      const key = `${date.getFullYear()}-${date.getMonth()}`

      if (monthMap[key]) {
        monthMap[key].collections += 1
      }
    })

    return months
  }, [filteredWastes, filteredQuotes, period])

  const maxWaste = Math.max(
    ...monthlyData.map((item) => item.waste),
    1
  )

  // -----------------------------------
  // CATEGORY BREAKDOWN
  // -----------------------------------

  const categoryData = useMemo(() => {
    const categoryMap = {}

    filteredWastes.forEach((item) => {
      const category =
        item.category ||
        item.wasteType ||
        'Unknown'

      const quantity = Number(item.quantity || 0)

      categoryMap[category] =
        (categoryMap[category] || 0) + quantity
    })

    const total = Object.values(categoryMap).reduce(
      (sum, value) => sum + value,
      0
    )

    if (!total) {
      return []
    }

    return Object.entries(categoryMap)
      .map(([name, value]) => ({
        name,
        value: Math.round((value / total) * 100),
        quantity: value,
      }))
      .sort((a, b) => b.value - a.value)
      .slice(0, 6)
  }, [filteredWastes])

  // -----------------------------------
  // COLLECTOR COUNT
  // -----------------------------------

  const collectorCount = useMemo(() => {
    const names = new Set()

    filteredWastes.forEach((item) => {
      if (item.collectorName) {
        names.add(item.collectorName)
      }
    })

    return names.size
  }, [filteredWastes])

  // -----------------------------------
  // RECYCLER PROXY
  // -----------------------------------

  const recyclerCount = useMemo(() => {
    /*
      Backend currently doesn't have a separate Recycler model.

      Therefore we only count unique collectorId values
      from quotes as a proxy for participating accounts.
    */

    const recyclers = new Set()

    filteredQuotes.forEach((quote) => {
      if (quote.collectorId) {
        recyclers.add(quote.collectorId)
      }
    })

    return recyclers.size
  }, [filteredQuotes])

  // -----------------------------------
  // DEMAND FULFILLMENT
  // -----------------------------------

  const fulfillmentRate = useMemo(() => {
    if (!filteredDemands.length) return 0

    const fulfilledDemandIds = new Set()

    filteredQuotes
      .filter((quote) => quote.status === 'SELECTED')
      .forEach((quote) => {
        if (quote.wasteId) {
          fulfilledDemandIds.add(String(quote.wasteId))
        }
      })

    /*
      Demand-to-waste linkage isn't currently present
      in the backend, so a true fulfillment rate cannot
      be calculated.

      We therefore don't display a fabricated percentage.
    */

    return null
  }, [filteredDemands, filteredQuotes])

  // -----------------------------------
  // EXPORT REPORT
  // -----------------------------------

  const handleExport = () => {
    const report = {
      period,
      generatedAt: new Date().toISOString(),

      summary: {
        eWasteUnits: totalWasteQuantity,
        submittedWasteRecords: filteredWastes.length,
        completedCollections,
        pendingOffers,
        activeDemands,
        collectorsConnected: collectorCount,
        recyclerParticipants: recyclerCount,
      },

      monthlyTrend: monthlyData,

      categoryBreakdown: categoryData,

      note:
        'Environmental impact, earnings, verified recycler counts and physical weight are not available in the current backend and are therefore not fabricated.',
    }

    const blob = new Blob(
      [JSON.stringify(report, null, 2)],
      { type: 'application/json' }
    )

    const url = URL.createObjectURL(blob)

    const link = document.createElement('a')
    link.href = url
    link.download = `recyLink-report-${period
      .toLowerCase()
      .replaceAll(' ', '-')}.json`

    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)

    URL.revokeObjectURL(url)
  }

  return (
    <div className="management-page">

      {/* HEADER */}

      <div className="page-title-row">
        <div>
          <h2>Reports & Analytics</h2>
          <p>
            Track RecyLink platform performance and network activity
          </p>
        </div>

        <div className="report-actions">

          <select
            value={period}
            onChange={(e) => setPeriod(e.target.value)}
          >
            <option>This Year</option>
            <option>Last 6 Months</option>
            <option>Last 30 Days</option>
          </select>

          <button
            className="export-btn"
            onClick={handleExport}
          >
            ↓ Export Report
          </button>

        </div>
      </div>

      {/* LOADING */}

      {loading && (
        <div className="report-card">
          <p>Loading reports...</p>
        </div>
      )}

      {/* ERROR */}

      {error && (
        <div className="report-card">
          <p style={{ color: '#c0392b' }}>
            {error}
          </p>
        </div>
      )}

      {!loading && !error && (
        <>
          {/* KEY METRICS */}

          <div className="management-stats">

            <div className="mini-stat">
              <div className="mini-icon green">♻</div>

              <div>
                <span>E-Waste Units</span>

                <strong>
                  {totalWasteQuantity}
                </strong>

                <small>
                  Submitted in {period.toLowerCase()}
                </small>
              </div>
            </div>


            <div className="mini-stat">
              <div className="mini-icon blue">↻</div>

              <div>
                <span>Completed Collections</span>

                <strong>
                  {completedCollections}
                </strong>

                <small>
                  Selected recycler offers
                </small>
              </div>
            </div>


            <div className="mini-stat">
              <div className="mini-icon orange">₹</div>

              <div>
                <span>Offers Received</span>

                <strong>
                  {filteredQuotes.length}
                </strong>

                <small>
                  {pendingOffers} pending
                </small>
              </div>
            </div>


            <div className="mini-stat">
              <div className="mini-icon purple">◎</div>

              <div>
                <span>Active Demands</span>

                <strong>
                  {activeDemands}
                </strong>

                <small>
                  Currently open
                </small>
              </div>
            </div>

          </div>


          {/* CHART SECTION */}

          <div className="reports-grid">

            {/* COLLECTION TREND */}

            <div className="report-card large">

              <div className="report-card-header">

                <div>
                  <h3>
                    Collection & E-Waste Trend
                  </h3>

                  <p>
                    Monthly platform activity
                  </p>
                </div>

                <span className="report-period">
                  {period}
                </span>

              </div>


              <div className="chart-area">

                <div className="chart-labels">
                  <span>
                    {maxWaste} units
                  </span>

                  <span>
                    {Math.round(maxWaste * 0.8)} units
                  </span>

                  <span>
                    {Math.round(maxWaste * 0.6)} units
                  </span>

                  <span>
                    {Math.round(maxWaste * 0.4)} units
                  </span>

                  <span>
                    {Math.round(maxWaste * 0.2)} units
                  </span>

                  <span>0</span>
                </div>


                <div className="bar-chart">

                  {monthlyData.map((item) => (

                    <div
                      className="bar-column"
                      key={item.key}
                    >

                      <div className="bar-value">
                        {item.waste}
                      </div>

                      <div
                        className="chart-bar"
                        style={{
                          height: `${
                            (item.waste / maxWaste) * 170
                          }px`,
                        }}
                      ></div>

                      <span>
                        {item.month}
                      </span>

                    </div>

                  ))}

                </div>

              </div>

            </div>


            {/* CATEGORY BREAKDOWN */}

            <div className="report-card">

              <div className="report-card-header">

                <div>
                  <h3>
                    E-Waste by Category
                  </h3>

                  <p>
                    Share of submitted material
                  </p>
                </div>

              </div>


              <div className="category-report">

                {categoryData.length === 0 ? (

                  <p>
                    No category data available.
                  </p>

                ) : (

                  categoryData.map((item) => (

                    <div
                      className="category-row"
                      key={item.name}
                    >

                      <div className="category-row-top">

                        <span>
                          {item.name}
                        </span>

                        <strong>
                          {item.value}%
                        </strong>

                      </div>

                      <div className="progress-track">

                        <div
                          className="progress-fill"
                          style={{
                            width: `${item.value}%`,
                          }}
                        ></div>

                      </div>

                    </div>

                  ))

                )}

              </div>

            </div>

          </div>


          {/* NETWORK IMPACT */}

          <div className="report-card impact-report">

            <div className="report-card-header">

              <div>
                <h3>
                  Network & Platform Impact
                </h3>

                <p>
                  Metrics calculated from current backend data
                </p>
              </div>

            </div>


            <div className="impact-grid">

              <div className="impact-item">

                <div className="impact-number">
                  {totalWasteQuantity}
                </div>

                <strong>
                  E-Waste Units
                </strong>

                <span>
                  Total submitted quantity
                </span>

              </div>


              <div className="impact-item">

                <div className="impact-number">
                  {filteredWastes.length}
                </div>

                <strong>
                  Waste Submissions
                </strong>

                <span>
                  Records processed through platform
                </span>

              </div>


              <div className="impact-item">

                <div className="impact-number">
                  {completedCollections}
                </div>

                <strong>
                  Completed Selections
                </strong>

                <span>
                  Offers selected by collectors
                </span>

              </div>


              <div className="impact-item">

                <div className="impact-number">
                  {collectorCount}
                </div>

                <strong>
                  Collectors Connected
                </strong>

                <span>
                  Unique collectors in submissions
                </span>

              </div>


              <div className="impact-item">

                <div className="impact-number">
                  {recyclerCount}
                </div>

                <strong>
                  Participating Accounts
                </strong>

                <span>
                  Derived from quote activity
                </span>

              </div>


              <div className="impact-item">

                <div className="impact-number">
                  {filteredDemands.length}
                </div>

                <strong>
                  Demands Created
                </strong>

                <span>
                  Recycler requirements submitted
                </span>

              </div>

            </div>


            <div className="impact-note">

              <strong>Note:</strong>{' '}
              Physical e-waste weight, CO₂e avoided,
              material recovery, collector earnings,
              verified recycler count and verification
              rates are not currently available in the
              backend API. These figures are intentionally
              not fabricated.

            </div>

          </div>


          {/* PLATFORM SUMMARY */}

          <div className="reports-grid bottom-reports">

            {/* NETWORK PERFORMANCE */}

            <div className="report-card">

              <div className="report-card-header">

                <div>
                  <h3>
                    Network Performance
                  </h3>

                  <p>
                    Current ecosystem statistics
                  </p>
                </div>

              </div>


              <div className="network-list">

                <div>
                  <span>
                    E-Waste Submissions
                  </span>

                  <strong>
                    {filteredWastes.length}
                  </strong>
                </div>


                <div>
                  <span>
                    Active Demands
                  </span>

                  <strong>
                    {activeDemands}
                  </strong>
                </div>


                <div>
                  <span>
                    Offers Received
                  </span>

                  <strong>
                    {filteredQuotes.length}
                  </strong>
                </div>


                <div>
                  <span>
                    Selected Offers
                  </span>

                  <strong>
                    {completedCollections}
                  </strong>
                </div>

              </div>

            </div>


            {/* TOP RECYCLERS */}

            <div className="report-card">

              <div className="report-card-header">

                <div>
                  <h3>
                    Recycler Activity
                  </h3>

                  <p>
                    Based on current quote activity
                  </p>
                </div>

              </div>


              <div className="recycler-ranking">

                {filteredQuotes.length === 0 ? (

                  <p>
                    No recycler activity available.
                  </p>

                ) : (

                  <>
                    <div>
                      <span className="rank">
                        01
                      </span>

                      <div>
                        <strong>
                          Active Quote Network
                        </strong>

                        <small>
                          {filteredQuotes.length} offers received
                        </small>
                      </div>
                    </div>


                    <div>
                      <span className="rank">
                        02
                      </span>

                      <div>
                        <strong>
                          Selected Offers
                        </strong>

                        <small>
                          {completedCollections} collections selected
                        </small>
                      </div>
                    </div>


                    <div>
                      <span className="rank">
                        03
                      </span>

                      <div>
                        <strong>
                          Pending Offers
                        </strong>

                        <small>
                          {pendingOffers} awaiting selection
                        </small>
                      </div>
                    </div>
                  </>

                )}

              </div>

            </div>

          </div>
        </>
      )}

    </div>
  )
}

export default Reports
import { useState } from 'react'

function Reports() {
  const [period, setPeriod] = useState('This Year')

  const monthlyData = [
    { month: 'Jan', collections: 210, waste: 980 },
    { month: 'Feb', collections: 260, waste: 1180 },
    { month: 'Mar', collections: 310, waste: 1420 },
    { month: 'Apr', collections: 285, waste: 1290 },
    { month: 'May', collections: 340, waste: 1580 },
    { month: 'Jun', collections: 375, waste: 1720 },
    { month: 'Jul', collections: 410, waste: 1890 },
    { month: 'Aug', collections: 452, waste: 2140 },
    { month: 'Sep', collections: 398, waste: 1860 },
  ]

  const categoryData = [
    { name: 'Laptops', value: 28 },
    { name: 'Mobile Phones', value: 24 },
    { name: 'Desktop Computers', value: 18 },
    { name: 'Printers', value: 12 },
    { name: 'Monitors', value: 10 },
    { name: 'Others', value: 8 }
  ]

  return (
    <div className="management-page">

      {/* HEADER */}

      <div className="page-title-row">
        <div>
          <h2>Reports & Analytics</h2>
          <p>Track RecyLink platform performance and environmental impact</p>
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

          <button className="export-btn">
            ↓ Export Report
          </button>
        </div>
      </div>

      {/* KEY METRICS */}

      <div className="management-stats">

        <div className="mini-stat">
          <div className="mini-icon green">♻</div>
          <div>
            <span>E-Waste Diverted</span>
            <strong>18.6 T</strong>
            <small className="stat-positive">+21.8%</small>
          </div>
        </div>

        <div className="mini-stat">
          <div className="mini-icon blue">↻</div>
          <div>
            <span>Completed Collections</span>
            <strong>3,642</strong>
            <small className="stat-positive">+18.4%</small>
          </div>
        </div>

        <div className="mini-stat">
          <div className="mini-icon orange">₹</div>
          <div>
            <span>Collector Earnings</span>
            <strong>₹18.4L</strong>
            <small className="stat-positive">+16.2%</small>
          </div>
        </div>

        <div className="mini-stat">
          <div className="mini-icon purple">CO₂</div>
          <div>
            <span>CO₂e Avoided</span>
            <strong>42.8 T</strong>
            <small className="stat-positive">Estimated</small>
          </div>
        </div>

      </div>

      {/* CHART SECTION */}

      <div className="reports-grid">

        {/* COLLECTION TREND */}

        <div className="report-card large">

          <div className="report-card-header">
            <div>
              <h3>Collection & E-Waste Trend</h3>
              <p>Monthly platform activity</p>
            </div>

            <span className="report-period">
              {period}
            </span>
          </div>

          <div className="chart-area">

            <div className="chart-labels">
              <span>2.5K kg</span>
              <span>2K kg</span>
              <span>1.5K kg</span>
              <span>1K kg</span>
              <span>500 kg</span>
              <span>0</span>
            </div>

            <div className="bar-chart">

              {monthlyData.map((item) => (

                <div className="bar-column" key={item.month}>

                  <div className="bar-value">
                    {item.waste}
                  </div>

                  <div
                    className="chart-bar"
                    style={{
                      height: `${(item.waste / 2500) * 170}px`
                    }}
                  ></div>

                  <span>{item.month}</span>

                </div>

              ))}

            </div>

          </div>

        </div>

        {/* CATEGORY BREAKDOWN */}

        <div className="report-card">

          <div className="report-card-header">
            <div>
              <h3>E-Waste by Category</h3>
              <p>Share of collected material</p>
            </div>
          </div>

          <div className="category-report">

            {categoryData.map((item) => (

              <div className="category-row" key={item.name}>

                <div className="category-row-top">
                  <span>{item.name}</span>
                  <strong>{item.value}%</strong>
                </div>

                <div className="progress-track">
                  <div
                    className="progress-fill"
                    style={{ width: `${item.value}%` }}
                  ></div>
                </div>

              </div>

            ))}

          </div>

        </div>

      </div>

      {/* IMPACT SECTION */}

      <div className="report-card impact-report">

        <div className="report-card-header">
          <div>
            <h3>Environmental & Social Impact</h3>
            <p>Estimated impact generated through the RecyLink network</p>
          </div>
        </div>

        <div className="impact-grid">

          <div className="impact-item">
            <div className="impact-number">
              18.6 T
            </div>
            <strong>E-Waste Diverted</strong>
            <span>Kept away from informal dumping</span>
          </div>

          <div className="impact-item">
            <div className="impact-number">
              12.4 T
            </div>
            <strong>Material Recovered</strong>
            <span>Estimated recyclable material</span>
          </div>

          <div className="impact-item">
            <div className="impact-number">
              42.8 T
            </div>
            <strong>CO₂e Avoided</strong>
            <span>Estimated environmental benefit</span>
          </div>

          <div className="impact-item">
            <div className="impact-number">
              1,248
            </div>
            <strong>Collectors Connected</strong>
            <span>Informal collectors onboarded</span>
          </div>

          <div className="impact-item">
            <div className="impact-number">
              86
            </div>
            <strong>Verified Recyclers</strong>
            <span>Formal recycling partners</span>
          </div>

          <div className="impact-item">
            <div className="impact-number">
              3,642
            </div>
            <strong>Completed Collections</strong>
            <span>Successfully processed through network</span>
          </div>

        </div>

        <div className="impact-note">
          <strong>Note:</strong> Environmental impact figures are
          prototype estimates and can be replaced with verified
          recycling and recovery data from the backend.
        </div>

      </div>

      {/* PLATFORM SUMMARY */}

      <div className="reports-grid bottom-reports">

        <div className="report-card">

          <div className="report-card-header">
            <div>
              <h3>Network Performance</h3>
              <p>Current ecosystem statistics</p>
            </div>
          </div>

          <div className="network-list">

            <div>
              <span>Collector Verification Rate</span>
              <strong>93.7%</strong>
            </div>

            <div>
              <span>Recycler Verification Rate</span>
              <strong>91.4%</strong>
            </div>

            <div>
              <span>Demand Fulfillment Rate</span>
              <strong>82.6%</strong>
            </div>

            <div>
              <span>Collection Completion Rate</span>
              <strong>87.2%</strong>
            </div>

          </div>

        </div>

        <div className="report-card">

          <div className="report-card-header">
            <div>
              <h3>Top Recycling Partners</h3>
              <p>By completed collections</p>
            </div>
          </div>

          <div className="recycler-ranking">

            <div>
              <span className="rank">01</span>
              <div>
                <strong>EcoCycle Recycling</strong>
                <small>628 collections</small>
              </div>
            </div>

            <div>
              <span className="rank">02</span>
              <div>
                <strong>GreenTech Recyclers</strong>
                <small>514 collections</small>
              </div>
            </div>

            <div>
              <span className="rank">03</span>
              <div>
                <strong>Clean Earth Recycling</strong>
                <small>482 collections</small>
              </div>
            </div>

            <div>
              <span className="rank">04</span>
              <div>
                <strong>GreenLoop India</strong>
                <small>396 collections</small>
              </div>
            </div>

          </div>

        </div>

      </div>

    </div>
  )
}

export default Reports